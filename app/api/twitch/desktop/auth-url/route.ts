import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const TWITCH_DESKTOP_REDIRECT_URI = 'https://clipflow-ai.netlify.app/twitch-desktop-auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const clientId = String(process.env.TWITCH_CLIENT_ID || process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID || '').trim();

    const state = String(body?.state || '').trim();
    const codeChallenge = String(body?.codeChallenge || '').trim();
    // Always use the exact HTTPS redirect URI registered in the Twitch Developer Console.
    // Do not trust a desktop-provided redirect here, because one mismatch can make Twitch reject the login.
    const redirectUri = TWITCH_DESKTOP_REDIRECT_URI;
    const scopes = Array.isArray(body?.scopes) && body.scopes.length
      ? body.scopes.map((scope: unknown) => String(scope).trim()).filter(Boolean)
      : ['chat:read', 'chat:edit', 'user:read:email', 'channel:read:subscriptions', 'bits:read', 'channel:read:redemptions'];

    if (!clientId || clientId.length < 10 || clientId.toLowerCase().includes('secret')) {
      return NextResponse.json(
        { ok: false, error: 'Invalid or missing TWITCH_CLIENT_ID. Set the public Twitch Client ID in Netlify, not the Client Secret.', redirectUri },
        { status: 500 }
      );
    }

    if (!state || !codeChallenge) {
      return NextResponse.json(
        { ok: false, error: 'Missing Twitch auth state or code challenge.' },
        { status: 400 }
      );
    }

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: scopes.join(' '),
      state,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      force_verify: 'true',
    });

    return NextResponse.json({
      ok: true,
      authUrl: `https://id.twitch.tv/oauth2/authorize?${params.toString()}`,
      redirectUri,
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || 'Could not create Twitch auth URL.' },
      { status: 500 }
    );
  }
}
