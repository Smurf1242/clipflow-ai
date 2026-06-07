import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function preview(value: string) {
  if (!value) return '';
  return `${value.slice(0, 7)}…${value.slice(-4)} (${value.length} chars)`;
}

export async function GET() {
  const apiKey = process.env.OPENAI_API_KEY ?? '';
  const looksValid = apiKey.startsWith('sk-') && apiKey.length > 30;

  return NextResponse.json({
    ok: looksValid,
    hasOpenAiKey: Boolean(apiKey),
    looksValidOpenAiKey: looksValid,
    keyPreview: apiKey ? preview(apiKey) : '',
    model: process.env.OPENAI_MODEL ?? 'gpt-4.1-mini',
    note: 'OpenAI is used server-side only. The browser and alpha testers never receive the API key.',
  });
}
