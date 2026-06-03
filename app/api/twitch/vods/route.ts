import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('twitch_access_token')
    .eq('id', user.id)
    .single();

  if (!profile?.twitch_access_token) {
    return NextResponse.json({ error: "Please reconnect your Twitch account" }, { status: 400 });
  }

  try {
    const response = await fetch('https://api.twitch.tv/helix/videos?first=12', {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID!,
        'Authorization': `Bearer ${profile.twitch_access_token}`
      }
    });

    const data = await response.json();
    return NextResponse.json(data.data || []);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch VODs" }, { status: 500 });
  }
}