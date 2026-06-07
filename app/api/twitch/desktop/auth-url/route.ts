import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const TWITCH_DESKTOP_REDIRECT_URI = 'https://clipflow-ai.netlify.app/twitch-desktop-auth';

function readClientId() {
  return String(
    process.env.TWITCH_CLIENT_ID ||
    process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID ||
    process.env.CLIPFLOW_TWITCH_CLIENT_ID ||
    ''
  ).trim();
}

function safePreview(value: string) {
  if (!value) return 'missing';
  if (value.length <= 8) return `${value.length} chars`;
  return `${value.slice(0, 4)}…${value.slice(-4)} (${value.length} chars)`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const clientId = readClientId();

    const state = String(body?.state || '').trim();
    const codeChallenge = String(body?.codeChallenge || '').trim();
    const redirectUri = TWITCH_DESKTOP_REDIRECT_URI;
    const scopes = Array.isArray(body?.scopes) && body.scopes.length
      ? body.scopes.map((scope: unknown) => String(scope).trim()).filter(Boolean)
      : ['chat:read', 'chat:edit', 'user:read:email', 'channel:read:subscriptions', 'bits:read', 'channel:read:redemptions'];

    if (!clientId) {
      return NextResponse.json(
        { ok: false, error: 'TWITCH_CLIENT_ID is missing on Netlify. Add the public Twitch Client ID value, then redeploy.', redirectUri, clientIdPreview: safePreview(clientId) },
        { status: 500 }
      );
    }

    if (!/^[a-z0-9]{20,40}$/i.test(clientId)) {
      return NextResponse.json(
        { ok: false, error: 'TWITCH_CLIENT_ID does not look like a Twitch Client ID. It should be the public Client ID from Twitch Developer Console, not the Client Secret, app name, or a URL.', redirectUri, clientIdPreview: safePreview(clientId) },
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

    const authUrl = `https://id.twitch.tv/oauth2/authorize?${params.toString()}`;

    // Preflight the Twitch authorize URL so the desktop app can show a useful error
    // instead of opening a browser tab that only says {"invalid client"}.
    try {
      const twitchCheck = await fetch(authUrl, { redirect: 'manual', cache: 'no-store' });
      if (twitchCheck.status === 400) {
        const bodyText = await twitchCheck.text().catch(() => '');
        if (/invalid client/i.test(bodyText)) {
          return NextResponse.json(
            {
              ok: false,
              error: 'Twitch rejected the Client ID as invalid. Re-copy the public Client ID from the Twitch Developer Console into Netlify TWITCH_CLIENT_ID, save it, and redeploy.',
              redirectUri,
              clientIdPreview: safePreview(clientId),
              twitchResponse: bodyText.slice(0, 300),
            },
            { status: 500 }
          );
        }
      }
    } catch {
      // Do not block auth if Twitch preflight is unavailable.
    }

    return NextResponse.json({
      ok: true,
      authUrl,
      redirectUri,
      clientIdPreview: safePreview(clientId),
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || 'Could not create Twitch auth URL.' },
      { status: 500 }
    );
  }
}
