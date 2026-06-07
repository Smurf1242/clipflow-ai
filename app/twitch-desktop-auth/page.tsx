'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';

export default function TwitchDesktopAuthPage() {
  const deepLink = useMemo(() => {
    if (typeof window === 'undefined') return 'clipflowai://twitch-auth/callback';
    return `clipflowai://twitch-auth/callback${window.location.search || ''}`;
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.location.href = deepLink;
    }, 500);

    return () => window.clearTimeout(timer);
  }, [deepLink]);

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-20 text-white">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-violet-500/30 bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-cyan-500/10 p-8 text-center shadow-2xl shadow-violet-950/30 md:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500 text-3xl shadow-lg shadow-violet-500/30">
          ✓
        </div>

        <h1 className="mb-4 text-4xl font-black">
          Returning to ClipFlow-AI Desktop
        </h1>

        <p className="mb-8 text-lg leading-8 text-zinc-300">
          Twitch has sent your login response back to ClipFlow-AI. Your browser should now ask to open the desktop app.
        </p>

        <a
          href={deepLink}
          className="inline-flex rounded-xl bg-white px-6 py-4 font-black text-black transition hover:bg-zinc-200"
        >
          Open ClipFlow-AI Desktop
        </a>

        <p className="mt-6 text-sm leading-6 text-zinc-400">
          If nothing happens, make sure the desktop app is open and try the button above. You can close this tab after the app confirms Twitch is connected.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-bold text-zinc-200 transition hover:bg-white/10"
        >
          Back to ClipFlow-AI
        </Link>
      </div>
    </main>
  );
}
