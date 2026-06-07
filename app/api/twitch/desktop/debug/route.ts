import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const TWITCH_DESKTOP_REDIRECT_URI = 'https://clipflow-ai.netlify.app/twitch-desktop-auth';

function preview(value: string) {
  if (!value) return '';
  if (value.length <= 8) return `${value} (${value.length} chars)`;
  return `${value.slice(0, 4)}…${value.slice(-4)} (${value.length} chars)`;
}

export async function GET() {
  const clientId = String(process.env.TWITCH_CLIENT_ID || process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID || process.env.CLIPFLOW_TWITCH_CLIENT_ID || '').trim();
  const clientSecret = String(process.env.TWITCH_CLIENT_SECRET || '').trim();
  const looksLikeTwitchClientId = /^[a-z0-9]{20,40}$/.test(clientId);
  const hasClientSecret = clientSecret.length > 10 && !clientSecret.toLowerCase().includes('your') && !clientSecret.toLowerCase().includes('client_id');

  return NextResponse.json({
    ok: looksLikeTwitchClientId && hasClientSecret,
    redirectUri: TWITCH_DESKTOP_REDIRECT_URI,
    hasClientId: Boolean(clientId),
    clientIdPreview: preview(clientId),
    looksLikeTwitchClientId,
    hasClientSecret,
    clientSecretPreview: clientSecret ? preview(clientSecret) : '',
    expectedNetlifyEnvNames: ['TWITCH_CLIENT_ID', 'TWITCH_CLIENT_SECRET'],
    note: 'The desktop app never receives the secret. Netlify uses it server-side only for Twitch token exchange.',
  });
}
