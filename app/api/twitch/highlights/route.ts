import { OpenAI } from 'openai';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Highlight = {
  title: string;
  startSeconds: number;
  endSeconds: number;
  reason: string;
  caption: string;
  platforms: string[];
};

type HighlightResponse = {
  highlights: Highlight[];
};

function parseDurationToSeconds(duration: string) {
  const matches = duration.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/);
  if (!matches) return 0;

  const hours = Number(matches[1] ?? 0);
  const minutes = Number(matches[2] ?? 0);
  const seconds = Number(matches[3] ?? 0);
  return hours * 3600 + minutes * 60 + seconds;
}

function fallbackHighlights(durationSeconds: number, title: string): Highlight[] {
  const safeDuration = Math.max(durationSeconds, 180);
  const points = [0.25, 0.5, 0.75];

  return points.map((point, index) => {
    const startSeconds = Math.max(0, Math.floor(safeDuration * point) - 20);
    const endSeconds = Math.min(safeDuration, startSeconds + 45);

    return {
      title: `Potential highlight ${index + 1}`,
      startSeconds,
      endSeconds,
      reason: 'Estimated from VOD length. Add chat/audio analysis later for smarter detection.',
      caption: `${title} had a moment worth clipping 🔥`,
      platforms: ['TikTok', 'YouTube Shorts', 'X'],
    };
  });
}

export async function POST(request: Request) {
  try {
    const { vod } = await request.json();

    if (!vod?.id || !vod?.title) {
      return NextResponse.json({ error: 'Missing VOD data' }, { status: 400 });
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const durationSeconds = parseDurationToSeconds(String(vod.duration ?? ''));

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'You are ClipFlow-AI, a Twitch highlight editor. Return only valid JSON. Suggest punchy, realistic highlight timestamps from VOD metadata. Each clip should be 25-60 seconds long and suitable for TikTok, YouTube Shorts, and X.',
        },
        {
          role: 'user',
          content: JSON.stringify({
            task: 'Suggest 3 likely highlight clips from this Twitch VOD metadata.',
            requiredJsonShape: {
              highlights: [
                {
                  title: 'short clip title',
                  startSeconds: 120,
                  endSeconds: 165,
                  reason: 'why this moment may work as a clip',
                  caption: 'viral caption text',
                  platforms: ['TikTok', 'YouTube Shorts', 'X'],
                },
              ],
            },
            vod: {
              id: vod.id,
              title: vod.title,
              description: vod.description ?? '',
              duration: vod.duration ?? '',
              durationSeconds,
              createdAt: vod.created_at ?? '',
              viewCount: vod.view_count ?? 0,
              language: vod.language ?? '',
              url: vod.url ?? '',
            },
          }),
        },
      ],
      max_tokens: 900,
    });

    const raw = completion.choices[0]?.message?.content ?? '{}';
    let parsed: HighlightResponse = { highlights: [] };

    try {
      parsed = JSON.parse(raw) as HighlightResponse;
    } catch {
      parsed = { highlights: fallbackHighlights(durationSeconds, vod.title) };
    }

    const highlights = Array.isArray(parsed.highlights) && parsed.highlights.length > 0
      ? parsed.highlights.slice(0, 5).map((highlight, index) => {
          const startSeconds = Math.max(0, Math.floor(Number(highlight.startSeconds) || index * 60));
          const endSeconds = Math.max(startSeconds + 20, Math.floor(Number(highlight.endSeconds) || startSeconds + 45));

          return {
            title: highlight.title || `Potential highlight ${index + 1}`,
            startSeconds,
            endSeconds: durationSeconds > 0 ? Math.min(endSeconds, durationSeconds) : endSeconds,
            reason: highlight.reason || 'AI-selected potential highlight.',
            caption: highlight.caption || `${vod.title} 🔥`,
            platforms: highlight.platforms?.length ? highlight.platforms : ['TikTok', 'YouTube Shorts', 'X'],
          };
        })
      : fallbackHighlights(durationSeconds, vod.title);

    await supabase.from('generated_clips').insert(
      highlights.map((highlight) => ({
        user_id: user.id,
        vod_id: vod.id,
        caption: highlight.caption,
        title: highlight.title,
        start_seconds: highlight.startSeconds,
        end_seconds: highlight.endSeconds,
        status: 'highlight_suggested',
      })),
    );

    return NextResponse.json({ success: true, highlights });
  } catch (error) {
    console.error('Highlight detection failed:', error);
    return NextResponse.json({ error: 'Failed to detect highlights' }, { status: 500 });
  }
}
