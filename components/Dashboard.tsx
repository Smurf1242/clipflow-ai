'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Vod = {
  id: string;
  title: string;
  description?: string;
  duration: string;
  url: string;
  thumbnail_url: string;
  created_at: string;
  view_count: number;
  language?: string;
};

type Highlight = {
  title: string;
  startSeconds: number;
  endSeconds: number;
  reason: string;
  caption: string;
  platforms: string[];
  vodId?: string;
  vodTitle?: string;
  vodUrl?: string;
};

function formatTime(totalSeconds: number) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export default function Dashboard() {
  const [vods, setVods] = useState<Vod[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [workingVodId, setWorkingVodId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');

  useEffect(() => {
    fetchVods();
  }, []);

  const fetchVods = async () => {
    setLoading(true);
    setStatusMessage('');

    const res = await fetch('/api/twitch/vods');
    const data = await res.json();

    if (res.ok) {
      setVods(Array.isArray(data) ? data : data.vods ?? []);
    } else {
      setStatusMessage(data.error ?? 'Could not fetch Twitch VODs.');
    }

    setLoading(false);
  };

  const detectHighlights = async (vod: Vod) => {
    setWorkingVodId(vod.id);
    setStatusMessage('Detecting possible highlights...');

    const res = await fetch('/api/twitch/highlights', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vod }),
    });

    const data = await res.json();

    if (res.ok) {
      const newHighlights = (data.highlights ?? []).map((highlight: Highlight) => ({
        ...highlight,
        vodId: vod.id,
        vodTitle: vod.title,
        vodUrl: vod.url,
      }));

      setHighlights((prev) => [...newHighlights, ...prev]);
      setStatusMessage('Highlights detected and saved.');
    } else {
      setStatusMessage(data.error ?? 'Highlight detection failed.');
    }

    setWorkingVodId(null);
  };

  const createClipJob = async (highlight: Highlight) => {
    setStatusMessage('Saving clip job...');

    const res = await fetch('/api/clips/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vodId: highlight.vodId,
        title: highlight.title,
        caption: highlight.caption,
        startSeconds: highlight.startSeconds,
        endSeconds: highlight.endSeconds,
        vodUrl: highlight.vodUrl,
      }),
    });

    const data = await res.json();
    setStatusMessage(res.ok ? data.message : data.error ?? 'Clip job failed.');
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-4xl font-black md:text-5xl">Your Recent VODs</h2>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Fetch your Twitch VODs, detect likely highlight moments, then queue clips for rendering.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/why" className="rounded-2xl border border-white/10 px-5 py-3 font-bold transition hover:border-violet-400/60 hover:bg-white/5">
            Why ClipFlow
          </Link>
          <Link href="/pricing" className="rounded-2xl bg-white px-5 py-3 font-bold text-black transition hover:bg-zinc-200">
            Pricing
          </Link>
        </div>
      </div>

      {statusMessage && (
        <div className="mb-8 rounded-2xl border border-violet-400/30 bg-violet-500/10 p-4 text-sm text-violet-100">
          {statusMessage}
        </div>
      )}

      {loading ? (
        <p className="py-20 text-center text-xl text-zinc-500">Loading your streams from Twitch...</p>
      ) : vods.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
          <h3 className="text-2xl font-bold">No VODs found</h3>
          <p className="mt-3 text-zinc-400">
            Reconnect Twitch or stream with VOD saving enabled, then come back here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {vods.map((vod) => (
            <article key={vod.id} className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition hover:border-violet-500/70">
              <div className="relative h-48 bg-zinc-900">
                {vod.thumbnail_url ? (
                  <img src={vod.thumbnail_url} alt={vod.title} className="h-full w-full object-cover" />
                ) : null}
                <div className="absolute bottom-3 right-3 rounded bg-black/75 px-3 py-1 text-xs font-bold">
                  {vod.duration}
                </div>
              </div>

              <div className="p-6">
                <h3 className="mb-3 line-clamp-2 text-lg font-bold">{vod.title}</h3>
                <p className="mb-5 text-sm text-zinc-500">{vod.view_count ?? 0} views</p>

                <button
                  type="button"
                  onClick={() => detectHighlights(vod)}
                  disabled={workingVodId === vod.id}
                  className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-4 font-bold transition hover:from-violet-500 hover:to-fuchsia-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {workingVodId === vod.id ? 'Detecting...' : '✨ Detect Highlights'}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {highlights.length > 0 && (
        <section className="mt-16">
          <h3 className="mb-8 text-3xl font-black">Detected Highlights</h3>

          <div className="grid gap-6 md:grid-cols-2">
            {highlights.map((highlight, index) => (
              <article key={`${highlight.vodId}-${highlight.startSeconds}-${index}`} className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-xl font-black">{highlight.title}</h4>
                    <p className="mt-1 text-sm text-zinc-500">{highlight.vodTitle}</p>
                  </div>
                  <span className="rounded-full bg-violet-500/15 px-3 py-1 text-sm font-bold text-violet-200">
                    {formatTime(highlight.startSeconds)} - {formatTime(highlight.endSeconds)}
                  </span>
                </div>

                <p className="mb-4 text-zinc-300">{highlight.reason}</p>

                <div className="mb-5 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-zinc-100">
                  {highlight.caption}
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => createClipJob(highlight)}
                    className="rounded-2xl bg-emerald-500 px-5 py-3 font-bold text-black transition hover:bg-emerald-400"
                  >
                    Queue Clip
                  </button>
                  {highlight.vodUrl ? (
                    <a
                      href={`${highlight.vodUrl}?t=${highlight.startSeconds}s`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl border border-white/10 px-5 py-3 font-bold transition hover:bg-white/5"
                    >
                      Open VOD Timestamp
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
