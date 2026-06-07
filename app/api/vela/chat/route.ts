import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const VELA_MODEL = process.env.OPENAI_MODEL || 'gpt-4.1-mini';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'VELA chat is not connected.' }, { status: 500 });
    }

    const { messages = [], context = {} } = await request.json();
    const safeMessages = Array.isArray(messages)
      ? (messages as ChatMessage[])
          .filter((message) => message?.content && (message.role === 'user' || message.role === 'assistant'))
          .slice(-10)
      : [];

    const displayName = String(context?.displayName || context?.twitchLogin || 'creator').slice(0, 40);

    const completion = await openai.chat.completions.create({
      model: VELA_MODEL,
      messages: [
        {
          role: 'system',
          content:
            'You are VELA, the cute roleplay-aware AI assistant for ClipFlow-AI. You help streamers explain their stream context, choose clip styles, improve captions, and prepare VELA scans. Your vibe is friendly, slightly kawaii/Japanese-inspired, playful, and helpful. You may use tiny touches like “nyaa”, “uwu”, “✨”, or “hehe” occasionally, but do not overdo it. Do not be romantic or flirty. Keep responses short, practical, and focused on clips, VODs, Twitch, captions, roleplay context, and dashboard help.',
        },
        {
          role: 'user',
          content: JSON.stringify({
            instruction:
              'Use this dashboard context when replying. If the creator gives stream context, acknowledge it and explain how it helps future VELA scans. If they ask for help, give clear steps.',
            loggedInCreator: displayName,
            context,
          }),
        },
        ...safeMessages.map((message) => ({
          role: message.role,
          content: message.content.slice(0, 1200),
        })),
      ],
      max_tokens: 450,
    });

    const reply = completion.choices[0]?.message?.content?.trim() ||
      `Nyaa, I’m here ${displayName}. Tell me what happened in the stream and I’ll help shape the scan context.`;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('VELA chat failed:', error);
    return NextResponse.json({ error: 'VELA chat failed.' }, { status: 500 });
  }
}
