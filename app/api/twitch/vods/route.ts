import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

type TwitchUser = {
  id: string;
  login: string;
  display_name: string;
};

type TwitchVideo = {
  id: string;
  user_id: string;
  user_name: string;
  title: string;
  description: string;
  created_at: string;
  published_at: string;
  url: string;
  thumbnail_url: string;
  viewable: string;
  view_count: number;
  language: string;
  type: string;
  duration: string;
  muted_segments?: unknown;
};

function formatThumbnail(url: string) {
  return url.replace('%{width}', '640').replace('%{height}', '360');
}

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('twitch_access_token')
    .eq('id', user.id)
    .single();

  if (!profile?.twitch_access_token) {
    return NextResponse.json(
      { error: 'Please reconnect your Twitch account' },
      { status: 400 },
    );
  }

  const twitchHeaders = {
    'Client-ID': process.env.TWITCH_CLIENT_ID ?? '',
    Authorization: `Bearer ${profile.twitch_access_token}`,
  };

  try {
    const meResponse = await fetch('https://api.twitch.tv/helix/users', {
      headers: twitchHeaders,
      cache: 'no-store',
    });

    if (!meResponse.ok) {
      const message = await meResponse.text();
      return NextResponse.json(
        { error: 'Twitch login has expired. Please reconnect Twitch.', details: message },
        { status: meResponse.status },
      );
    }

    const meData = (await meResponse.json()) as { data?: TwitchUser[] };
    const twitchUser = meData.data?.[0];

    if (!twitchUser?.id) {
      return NextResponse.json(
        { error: 'Could not find your Twitch user from the connected account.' },
        { status: 404 },
      );
    }

    const videosUrl = new URL('https://api.twitch.tv/helix/videos');
    videosUrl.searchParams.set('user_id', twitchUser.id);
    videosUrl.searchParams.set('first', '12');
    videosUrl.searchParams.set('type', 'archive');
    videosUrl.searchParams.set('sort', 'time');

    const vodResponse = await fetch(videosUrl, {
      headers: twitchHeaders,
      cache: 'no-store',
    });

    if (!vodResponse.ok) {
      const message = await vodResponse.text();
      return NextResponse.json(
        { error: 'Failed to fetch Twitch VODs.', details: message },
        { status: vodResponse.status },
      );
    }

    const vodData = (await vodResponse.json()) as { data?: TwitchVideo[] };

    const vods = (vodData.data ?? []).map((vod) => ({
      ...vod,
      thumbnail_url: formatThumbnail(vod.thumbnail_url),
    }));

    return NextResponse.json({ user: twitchUser, vods });
  } catch (error) {
    console.error('Twitch VOD fetch failed:', error);
    return NextResponse.json({ error: 'Failed to fetch VODs' }, { status: 500 });
  }
}
