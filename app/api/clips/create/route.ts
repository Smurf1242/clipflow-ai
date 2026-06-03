import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { vodId, title, caption, startSeconds, endSeconds, vodUrl } = await request.json();

    if (!vodId || typeof startSeconds !== 'number' || typeof endSeconds !== 'number') {
      return NextResponse.json({ error: 'Missing clip job data' }, { status: 400 });
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const clipJob = {
      user_id: user.id,
      vod_id: vodId,
      title: title ?? 'Generated clip',
      caption: caption ?? '',
      start_seconds: startSeconds,
      end_seconds: endSeconds,
      vod_url: vodUrl ?? '',
      status: 'queued_for_web_clipper',
    };

    const { data, error } = await supabase
      .from('generated_clips')
      .insert(clipJob)
      .select()
      .single();

    if (error) {
      console.error('Supabase clip insert failed:', error);
      return NextResponse.json({ error: 'Clip job could not be saved', details: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      clip: data,
      message:
        'Clip job saved. The web app can now track this clip; FFmpeg rendering should be added through a server worker or desktop app next.',
    });
  } catch (error) {
    console.error('Clip job creation failed:', error);
    return NextResponse.json({ error: 'Failed to create clip job' }, { status: 500 });
  }
}
