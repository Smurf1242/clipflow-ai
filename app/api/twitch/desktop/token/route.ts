import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const TWITCH_DESKTOP_REDIRECT_URI = 'https://clipflow-ai.netlify.app/twitch-desktop-auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const clientId = String(process.env.TWITCH_CLIENT_ID || process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID || '').trim();

    const code = String(body?.code || '').trim();
    const codeVerifier = String(body?.codeVerifier || '').trim();
    // Must match the authorize redirect exactly.
    const redirectUri = TWITCH_DESKTOP_REDIRECT_URI;

    if (!clientId || clientId.length < 10 || clientId.toLowerCase().includes('secret')) {
      return NextResponse.json(
        { ok: false, error: 'Invalid or missing TWITCH_CLIENT_ID. Set the public Twitch Client ID in Netlify, not the Client Secret.', redirectUri },
        { status: 500 }
      );
    }

    if (!code || !codeVerifier) {
      return NextResponse.json(
        { ok: false, error: 'Missing Twitch auth code or code verifier.' },
        { status: 400 }
      );
    }

    const tokenBody = new URLSearchParams({
      client_id: clientId,
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    });

    const response = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: tokenBody,
      cache: 'no-store',
    });

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: json?.message || json?.error_description || json?.error || `Twitch token exchange failed: ${response.status}`,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      ok: true,
      client_id: clientId,
      access_token: json.access_token,
      refresh_token: json.refresh_token,
      expires_in: json.expires_in,
      scope: json.scope || [],
      token_type: json.token_type,
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || 'Could not exchange Twitch login code.' },
      { status: 500 }
    );
  }
}
