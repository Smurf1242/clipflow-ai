import Link from 'next/link';

export default function VelaPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-bold transition hover:bg-white/10"
          >
            ← Home
          </Link>

          <div className="rounded-full border border-violet-400/30 bg-violet-500/10 px-5 py-2 text-sm font-bold text-violet-200">
            VELA Training & Tuning
          </div>
        </div>

        <section className="mb-14 overflow-hidden rounded-[2rem] border border-violet-500/30 bg-gradient-to-br from-violet-500/15 via-fuchsia-500/10 to-cyan-500/10 p-8 shadow-2xl shadow-violet-950/30 md:p-12">
          <div className="max-w-4xl">
            <h1 className="mb-6 text-5xl font-black leading-tight tracking-tight md:text-7xl">
              How VELA finds the moments normal clipping tools miss.
            </h1>

            <p className="text-xl leading-9 text-zinc-300">
              VELA is ClipFlow-AI&apos;s roleplay-aware analysis layer. Instead of treating every stream like a standard gameplay highlight reel, she is tuned to read the shape of a scene: who is speaking, what the tension is, when the payoff lands, and whether the moment would make sense as a short-form clip.
            </p>
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <div className="mb-5 text-4xl">🎭</div>
            <h2 className="mb-3 text-2xl font-bold">Roleplay signal detection</h2>
            <p className="leading-7 text-zinc-400">
              VELA looks beyond volume spikes. She scores dialogue, conflict, reactions, timing, relationship shifts, and scene payoff so story-driven moments can surface even when they are not loud or obvious.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <div className="mb-5 text-4xl">🧠</div>
            <h2 className="mb-3 text-2xl font-bold">Context-aware clipping</h2>
            <p className="leading-7 text-zinc-400">
              She considers what happened before and after a line, chase, argument, or reveal, helping avoid clips that start too late, end too early, or lose the context that makes them funny or dramatic.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <div className="mb-5 text-4xl">⚡</div>
            <h2 className="mb-3 text-2xl font-bold">Creator-ready outputs</h2>
            <p className="leading-7 text-zinc-400">
              VELA does not just suggest timestamps. She helps shape titles, captions, hashtags, hooks, and short-form framing so a raw stream moment can become something ready for TikTok, Shorts, X, and Reels.
            </p>
          </div>
        </section>

        <section className="mb-14 rounded-[2rem] border border-violet-500/25 bg-violet-500/5 p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <h2 className="mb-4 text-4xl font-black">What VELA is tuned to understand</h2>
              <p className="leading-8 text-zinc-400">
                FiveM and roleplay streams are not always about winning a round. Sometimes the best clip is a tiny mistake, a perfect one-liner, a panic chase, or a character decision that changes the whole story. VELA is built around that kind of content.
              </p>
            </div>

            <div className="grid gap-3">
              {[
                'Escalating arguments where the payoff lands seconds later',
                'Police, EMS, gang, court, mechanic, civilian, and business RP scenes',
                'Funny misunderstandings, failed plans, awkward pauses, and chaotic accidents',
                'Character reveals, betrayals, emotional turns, and long-running story beats',
                'Moments that need captions to make the context instantly understandable',
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/30 p-4 text-zinc-300">
                  <span className="mr-2 text-violet-300">✓</span>{item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-14 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <h2 className="mb-4 text-3xl font-black">Feedback-tuned, not generic</h2>
            <p className="leading-8 text-zinc-400">
              VELA can be improved around creator feedback: clips marked as useful, skipped, too short, too quiet, too late, or not dramatic enough can help guide future scoring. The goal is not just to find “action,” but to learn what each creator considers worth posting.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <h2 className="mb-4 text-3xl font-black">Built for the studio workflow</h2>
            <p className="leading-8 text-zinc-400">
              As ClipFlow-AI expands its livestream studio tools, VELA can become part of the live workflow too: flagging moments while recording, preparing clip candidates after a stream, and helping creators turn long sessions into short-form posts faster.
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-cyan-400/25 bg-cyan-400/5 p-8 text-center md:p-10">
          <h2 className="mb-4 text-4xl font-black">Designed for creators with stories, not just stats.</h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg leading-8 text-zinc-400">
            VELA gives ClipFlow-AI a different focus from standard highlight tools: she is built to understand why a moment matters, not just that something happened on screen.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/download"
              className="rounded-xl bg-white px-6 py-3 font-bold text-black transition hover:bg-zinc-200"
            >
              Download Alpha
            </Link>
            <Link
              href="/why"
              className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-bold transition hover:bg-white/10"
            >
              Why ClipFlow-AI
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
