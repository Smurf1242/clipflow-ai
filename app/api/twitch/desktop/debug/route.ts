import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const redirectUri = 'https://clipflow-ai.netlify.app/twitch-desktop-auth';

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

export async function GET() {
  const clientId = readClientId();
  return NextResponse.json({
    ok: Boolean(clientId && /^[a-z0-9]{20,40}$/i.test(clientId)),
    redirectUri,
    hasClientId: Boolean(clientId),
    clientIdPreview: safePreview(clientId),
    looksLikeTwitchClientId: /^[a-z0-9]{20,40}$/i.test(clientId),
    expectedNetlifyEnvNames: ['TWITCH_CLIENT_ID', 'NEXT_PUBLIC_TWITCH_CLIENT_ID', 'CLIPFLOW_TWITCH_CLIENT_ID'],
  });
}
