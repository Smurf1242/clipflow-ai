import { OpenAI } from 'openai';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { vodId } = await request.json();
    
    // Fixed: Await the client
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional Twitch clip editor. Create viral, engaging short captions for gaming content."
        },
        {
          role: "user",
          content: `Create 2-3 viral clip ideas with exciting captions for this Twitch VOD. Make them suitable for X (Twitter) and YouTube Shorts.`
        }
      ],
      max_tokens: 400
    });

    const caption = completion.choices[0]?.message?.content || "Great gaming moment! 🔥";

    await supabase.from('generated_clips').insert({
      user_id: user.id,
      vod_id: vodId,
      caption: caption,
    });

    return NextResponse.json({ caption, success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate clip" }, { status: 500 });
  }
}