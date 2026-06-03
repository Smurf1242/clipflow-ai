'use client';

import { useState } from 'react';

const ALPHA_PASSWORD = 'TwitchTester';
const DOWNLOAD_URL = 'https://drive.google.com/uc?export=download&id=1aHaatoKXkpu63iqx5JX1VItnsu7_g8wS';

export default function AlphaDownload() {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState('');

  const unlock = () => {
    if (password.trim() === ALPHA_PASSWORD) {
      setUnlocked(true);
      setError('');
      return;
    }

    setError('Incorrect alpha password.');
  };

  return (
    <div className="rounded-3xl border border-violet-500/40 bg-violet-500/10 p-10 shadow-2xl shadow-violet-500/10">
      <div className="mb-4 inline-flex rounded-full bg-violet-500 px-4 py-1 text-sm font-bold">
        Invited Alpha Testers Only
      </div>

      <h1 className="mb-5 text-5xl font-black">
        Download ClipFlow-AI Alpha
      </h1>

      <p className="mb-8 text-xl leading-8 text-zinc-300">
        This Windows alpha build includes bundled FFmpeg clipping, portrait exports, caption styling, AI clip suggestions, and GTA/FiveM RP-aware presets.
      </p>

      {!unlocked ? (
        <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
          <label className="mb-3 block text-sm font-bold text-zinc-200">
            Enter your alpha tester password
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') unlock();
              }}
              placeholder="Alpha password"
              className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-400"
            />

            <button
              type="button"
              onClick={unlock}
              className="rounded-xl bg-white px-6 py-3 font-black text-black transition hover:bg-zinc-200"
            >
              Unlock Download
            </button>
          </div>

          {error ? <p className="mt-4 text-sm font-bold text-red-400">{error}</p> : null}
        </div>
      ) : (
        <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-6">
          <p className="mb-5 font-bold text-emerald-300">Access granted.</p>

          <a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-2xl bg-emerald-500 px-8 py-4 text-lg font-black text-black transition hover:bg-emerald-400"
          >
            Download Windows Alpha Installer
          </a>
        </div>
      )}

      <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-6 text-zinc-300">
        <h2 className="mb-3 text-2xl font-bold text-white">Alpha notes</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Windows only for this first alpha test.</li>
          <li>FFmpeg is bundled, so testers should not need to install it manually.</li>
          <li>AI features require the configured OpenAI connection to be working.</li>
          <li>This is an early testing build, so bugs and rough edges are expected.</li>
          <li>Please only share this build with invited testers.</li>
        </ul>
      </div>
    </div>
  );
}
