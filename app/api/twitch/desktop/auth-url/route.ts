import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const DEFAULT_REDIRECT_URI = 'https://clipflow-ai.netlify.app/twitch-desktop-auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const clientId = process.env.TWITCH_CLIENT_ID || process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID;

    if (!clientId) {
      return NextResponse.json(
        { ok: false, error: 'Missing TWITCH_CLIENT_ID in website environment variables.' },
        { status: 500 }
      );
    }

    const state = String(body?.state || '').trim();
    const codeChallenge = String(body?.codeChallenge || '').trim();
    const redirectUri = String(body?.redirectUri || DEFAULT_REDIRECT_URI).trim();
    const scopes = Array.isArray(body?.scopes) && body.scopes.length
      ? body.scopes.map((scope: unknown) => String(scope).trim()).filter(Boolean)
      : ['chat:read', 'chat:edit', 'user:read:email', 'channel:read:subscriptions', 'bits:read', 'channel:read:redemptions'];

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
