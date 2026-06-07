import { OpenAI } from 'openai';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const VELA_MODEL = process.env.OPENAI_MODEL || 'gpt-4.1-mini';

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

function getPresetPrompt(contentType: string) {
  switch (contentType) {
    case 'gta-fivem-rp':
      return {
        label: 'GTA/FiveM Roleplay',
        guidance: 'Prioritise roleplay moments: funny dialogue, arguments, police chases, EMS scenes, gang tension, betrayals, unexpected chaos, emotional character beats, awkward voice chat, courtroom/interrogation scenes, failed robberies, and moments that make sense as TikTok/Reels RP clips. Do not only chase kills or loud moments. RP clips often work because of dialogue, tension, character story, or comedy.'
      };
    case 'fps-competitive':
      return {
        label: 'FPS/Competitive',
        guidance: 'Prioritise clutch plays, kill streaks, strong reactions, wins, losses, tactical moments, rage/funny comms, and short punchy gameplay highlights.'
      };
    case 'funny-moments':
      return {
        label: 'Funny Moments',
        guidance: 'Prioritise jokes, fails, weird timing, unexpected reactions, chaotic accidents, funny conversations, and quotable moments.'
      };
    case 'story-drama':
      return {
        label: 'Story/Drama',
        guidance: 'Prioritise emotional reveals, arguments, betrayals, tense conversations, character development, decisions, and story progression.'
      };
    case 'just-chatting':
      return {
        label: 'Just Chatting',
        guidance: 'Prioritise strong opinions, funny stories, unexpected chat moments, personal reactions, debates, and quotable lines.'
      };
    default:
      return {
        label: 'General Gaming',
        guidance: 'Prioritise funny, surprising, intense, emotional, or highly quotable stream moments suitable for short-form video.'
      };
  }
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
    const { vod, contentType = 'gta-fivem-rp', streamNotes = '' } = await request.json();

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

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'VELA is not connected because OPENAI_API_KEY is missing from the website environment variables.' },
        { status: 500 },
      );
    }

    const durationSeconds = parseDurationToSeconds(String(vod.duration ?? ''));
    const preset = getPresetPrompt(String(contentType));
    const testerNotes = String(streamNotes ?? '').trim().slice(0, 2500);

    const completion = await openai.chat.completions.create({
      model: VELA_MODEL,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            `You are VELA, ClipFlow-AI's roleplay-aware clipping assistant. Return only valid JSON. You are analysing Twitch VOD metadata plus any creator/tester notes supplied. Be honest that this is a web dashboard scan, not frame-by-frame video transcription unless transcript/notes are supplied. Suggest realistic highlight timestamps. Each clip should be 20-60 seconds long and suitable for TikTok, YouTube Shorts, and X. Current preset: ${preset.label}. ${preset.guidance} Score RP/story value higher than generic noise. Prioritise scenes with story payoff, funny dialogue, conflict, chase escalation, betrayals, emotional turns, EMS/police/gang/court scenes, and moments a creator would actually post.`,
        },
        {
          role: 'user',
          content: JSON.stringify({
            task: `Run a VELA Deep Scan and suggest 3-5 likely highlight clips from this Twitch VOD using metadata, duration, title context, and any creator notes/transcript supplied.`,
            contentType: String(contentType),
            presetGuidance: preset.guidance,
            streamNotesOrTranscript: testerNotes || 'No extra notes or transcript supplied.',
            analysisMode: testerNotes ? 'metadata_plus_creator_notes_or_transcript' : 'metadata_only_web_scan',
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
        content_type: String(contentType),
      })),
    );

    return NextResponse.json({ success: true, highlights });
  } catch (error) {
    console.error('Highlight detection failed:', error);
    return NextResponse.json({ error: 'Failed to detect highlights' }, { status: 500 });
  }
}
