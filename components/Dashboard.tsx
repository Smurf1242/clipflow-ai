'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type OpenAIStatus = {
  ok: boolean;
  hasOpenAiKey: boolean;
  looksValidOpenAiKey: boolean;
  keyPreview?: string;
  model?: string;
};

type TwitchUser = {
  id: string;
  login: string;
  display_name: string;
};

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
  const [contentType, setContentType] = useState<string>('gta-fivem-rp');
  const [twitchUser, setTwitchUser] = useState<TwitchUser | null>(null);
  const [embedParent, setEmbedParent] = useState('clipflow-ai.netlify.app');
  const [openAIStatus, setOpenAIStatus] = useState<OpenAIStatus | null>(null);
  const [streamNotes, setStreamNotes] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setEmbedParent(window.location.hostname || 'clipflow-ai.netlify.app');
    }

    fetchVods();
    fetchOpenAIStatus();
  }, []);

  const fetchOpenAIStatus = async () => {
    try {
      const res = await fetch('/api/openai/status');
      const data = await res.json();
      setOpenAIStatus(data);
    } catch {
      setOpenAIStatus(null);
    }
  };

  const fetchVods = async () => {
    setLoading(true);
    setStatusMessage('');

    const res = await fetch('/api/twitch/vods');
    const data = await res.json();

    if (res.ok) {
      setVods(Array.isArray(data) ? data : data.vods ?? []);
      setTwitchUser(data.user ?? null);
    } else {
      setStatusMessage(data.error ?? 'Could not fetch Twitch VODs.');
    }

    setLoading(false);
  };

  const detectHighlights = async (vod: Vod) => {
    setWorkingVodId(vod.id);
    setStatusMessage('VELA is scanning this VOD context and generating highlight suggestions...');

    const res = await fetch('/api/twitch/highlights', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vod, contentType, streamNotes }),
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
            Fetch your Twitch VODs, choose an AI preset, detect likely highlight moments, then queue clips for rendering.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/why" className="rounded-2xl border border-white/10 px-5 py-3 font-bold transition hover:border-violet-400/60 hover:bg-white/5">
            Why ClipFlow
          </Link>
          <Link href="/pricing" className="rounded-2xl bg-white px-5 py-3 font-bold text-black transition hover:bg-zinc-200">
            Pricing
          </Link>
          <Link href="/terms" className="rounded-2xl border border-white/10 px-5 py-3 font-bold transition hover:border-violet-400/60 hover:bg-white/5">
            Terms
          </Link>
        </div>
      </div>


      <div className="mb-8 overflow-hidden rounded-3xl border border-violet-400/25 bg-gradient-to-br from-violet-500/15 via-emerald-500/10 to-cyan-500/10 p-5 shadow-2xl shadow-violet-950/20">
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <div className="flex items-center gap-4 md:min-w-[320px]">
            <img
              src="/vela-logo.png"
              alt="VELA AI logo"
              className="h-20 w-20 rounded-2xl border border-white/10 bg-black/40 object-cover shadow-lg shadow-violet-500/20"
            />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-200">VELA AI</p>
              <h3 className="mt-1 text-2xl font-black">AI clip preset</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                Pick the content style so VELA scores clips with the right context.
              </p>
            </div>
          </div>

          <div className="flex-1">
            <label className="mb-2 block text-sm font-bold text-emerald-100">Preset / stream type</label>
            <select
              value={contentType}
              onChange={(event) => setContentType(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none"
            >
              <option value="gta-fivem-rp">GTA / FiveM Roleplay</option>
              <option value="general-gaming">General Gaming</option>
              <option value="fps-competitive">FPS / Competitive</option>
              <option value="funny-moments">Funny Moments</option>
              <option value="story-drama">Story / Drama</option>
              <option value="just-chatting">Just Chatting</option>
            </select>
            <p className="mt-3 text-sm leading-6 text-emerald-100/80">
              GTA/FiveM mode looks for RP dialogue, police chases, EMS scenes, gang tension, comedy, betrayals, and character story moments instead of only loud gameplay spikes.
            </p>
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-black text-cyan-100">VELA web scan status</p>
                  <p className="mt-1 text-xs leading-5 text-zinc-400">
                    OpenAI runs server-side from your website environment. Testers never receive the API key.
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-black ${openAIStatus?.ok ? 'bg-emerald-400/15 text-emerald-200' : 'bg-red-400/15 text-red-200'}`}>
                  {openAIStatus?.ok ? `Connected: ${openAIStatus.model ?? 'gpt-4.1-mini'}` : 'OpenAI not connected'}
                </span>
              </div>

              <label className="mb-2 block text-sm font-bold text-zinc-200">Optional stream notes / transcript for VELA</label>
              <textarea
                value={streamNotes}
                onChange={(event) => setStreamNotes(event.target.value)}
                rows={4}
                placeholder="Paste any known moments, rough timestamps, chat notes, or transcript snippets here. Example: 00:42:10 police chase starts, 01:13:22 betrayal reveal, 02:04:55 funny EMS argument."
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300"
              />
              <p className="mt-2 text-xs leading-5 text-zinc-400">
                This improves dashboard suggestions now. Full automatic VOD audio transcription still belongs in the desktop/local pipeline or a future dedicated worker.
              </p>
            </div>
          </div>
        </div>
      </div>


      {twitchUser?.login && (
        <section className="mb-10 rounded-3xl border border-violet-500/30 bg-white/[0.03] p-5 shadow-2xl shadow-violet-500/5">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 className="text-2xl font-black">Live Twitch View</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Watch your connected Twitch channel and chat directly from the ClipFlow-AI dashboard.
              </p>
            </div>

            <a
              href={`https://www.twitch.tv/${twitchUser.login}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-bold transition hover:bg-white/5"
            >
              Open on Twitch
            </a>
          </div>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
              <iframe
                title="Twitch live stream player"
                src={`https://player.twitch.tv/?channel=${twitchUser.login}&parent=${embedParent}&muted=true`}
                allowFullScreen
                className="aspect-video h-full min-h-[260px] w-full"
              />
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
              <iframe
                title="Twitch live chat"
                src={`https://www.twitch.tv/embed/${twitchUser.login}/chat?parent=${embedParent}&darkpopout`}
                className="h-[420px] w-full"
              />
            </div>
          </div>
        </section>
      )}

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
                  {workingVodId === vod.id ? 'Scanning...' : `✨ Run VELA Deep Scan`}
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
