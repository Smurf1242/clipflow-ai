import { createClient } from '@/utils/supabase/server';
import AuthButton from '@/components/AuthButton';
import Dashboard from '@/components/Dashboard';

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="ClipFlow AI"
              className="h-9 w-auto"
            />
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="/" className="transition hover:text-violet-400">Home</a>
            <a href="/why" className="transition hover:text-violet-400">Why Us</a>
            <a href="/vela" className="transition hover:text-violet-400">VELA</a>
            <a href="/pricing" className="transition hover:text-violet-400">Pricing</a>
            <a href="/terms" className="transition hover:text-violet-400">Terms</a>
            <a href="/alpha" className="transition hover:text-violet-400">Alpha Signup</a>
            <a href="/download" className="rounded-full bg-violet-500 px-4 py-2 font-bold text-white transition hover:bg-violet-400">Alpha Download</a>
          </nav>

          <AuthButton user={user} />
        </div>
      </header>

      {user ? (
        <Dashboard />
      ) : (
        <main className="mx-auto max-w-6xl px-6 pb-24 pt-28 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/5 px-6 py-2.5 text-sm">
            ⚡ AI-Powered Twitch Repurposing
          </div>

          <h1 className="mb-8 text-7xl font-bold leading-none tracking-tighter md:text-8xl">
            Turn Your Twitch Streams<br />
            Into Viral Content
          </h1>

          <p className="mx-auto mb-12 max-w-3xl text-2xl text-zinc-400">
            Automatically detect highlights, generate captions, and export to X, YouTube Shorts & TikTok — saving you hours every week.
          </p>

          <div className="mb-20 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <AuthButton user={null} />
            <a
              href="/download"
              className="rounded-xl border border-violet-400/60 bg-violet-500/10 px-6 py-3 font-bold text-violet-100 transition hover:bg-violet-500 hover:text-white"
            >
              Download Alpha Desktop App
            </a>
            <a
              href="/alpha"
              className="rounded-xl border border-cyan-400/50 bg-cyan-400/10 px-6 py-3 font-bold text-cyan-100 transition hover:bg-cyan-400 hover:text-black"
            >
              Sign Up for Alpha Access
            </a>
          </div>

          <section className="mb-20 overflow-hidden rounded-[2rem] border border-violet-500/30 bg-gradient-to-br from-violet-500/15 via-fuchsia-500/10 to-cyan-500/10 p-8 text-left shadow-2xl shadow-violet-950/30 md:p-12">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="mb-4 inline-flex rounded-full border border-violet-400/40 bg-black/30 px-4 py-2 text-sm font-bold text-violet-200">
                  Meet VELA — our RP-aware clipping AI
                </div>

                <h2 className="mb-5 text-4xl font-black leading-tight md:text-5xl">
                  Built for creators whose best clips are hidden inside the story.
                </h2>

                <p className="mb-6 text-lg leading-8 text-zinc-300">
                  Most clipping tools only look for loud moments, kills, or obvious reactions. ClipFlow-AI is being tuned around Grand Theft Auto FiveM roleplay, where the best moments can be a betrayal, a police chase, a funny argument, a character reveal, or one perfectly timed line of dialogue.
                </p>

                <p className="text-lg leading-8 text-zinc-300">
                  VELA is designed to understand roleplay pacing, storylines, character conflict, comedy, chaos, and emotional payoffs so it can surface clips that generic AI tools often miss.
                </p>

                <a
                  href="/vela"
                  className="mt-7 inline-flex rounded-xl border border-violet-400/50 bg-violet-500/10 px-6 py-3 font-bold text-violet-100 transition hover:bg-violet-500 hover:text-white"
                >
                  See how VELA is tuned
                </a>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500 text-3xl shadow-lg shadow-violet-500/30">
                  ✨
                </div>

                <h3 className="mb-5 text-2xl font-bold">
                  VELA looks for:
                </h3>

                <div className="grid gap-3 text-zinc-300">
                  {[
                    'Police chases, gang conflict, EMS and court scenes',
                    'Funny voice chat moments and unexpected chaos',
                    'Story progression, betrayal, drama and character reveals',
                    'Clip-ready captions, titles, hashtags and platform exports',
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <span className="mr-2 text-violet-300">✓</span>{item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mb-20 rounded-[2rem] border border-cyan-400/20 bg-cyan-400/5 p-8 text-left md:p-10">
            <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
              <div>
                <div className="mb-4 inline-flex rounded-full bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-200">
                  Next-gen streaming tools are coming
                </div>
                <h2 className="text-4xl font-black leading-tight">
                  ClipFlow-AI is becoming more than a clipper.
                </h2>
              </div>

              <p className="text-lg leading-8 text-zinc-300">
                Alongside AI clipping and captioning, we are building livestream studio features for recording, scenes, source layouts, chat, alerts, hardware encoding, and future AI-assisted stream tools — giving creators one place to stream, record, clip, caption, and repurpose content.
              </p>
            </div>
          </section>

          <section className="mb-20 rounded-[2rem] border border-violet-500/30 bg-gradient-to-br from-violet-500/15 via-black to-cyan-500/10 p-8 text-left md:p-10">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="mb-4 inline-flex rounded-full bg-violet-500/15 px-4 py-2 text-sm font-bold text-violet-200">
                  Limited alpha access
                </div>
                <h2 className="mb-4 text-4xl font-black leading-tight">
                  Want to test ClipFlow-AI before public release?
                </h2>
                <p className="max-w-3xl text-lg leading-8 text-zinc-300">
                  Apply as an early creator tester and tell us about your stream, average viewers, content style, Discord, and platform profile. We will review applications manually before giving access.
                </p>
              </div>

              <a
                href="/alpha"
                className="inline-flex justify-center rounded-xl bg-white px-7 py-4 font-black text-black transition hover:bg-zinc-200"
              >
                Apply for Alpha
              </a>
            </div>
          </section>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {[
              { title: 'Save 10+ hours per week', desc: 'No more manual clipping and editing' },
              { title: 'Grow faster across platforms', desc: 'Post optimized content everywhere' },
              { title: 'Pro Desktop App included', desc: 'Heavy video processing locally' },
            ].map((f, i) => (
              <div key={i} className="glass rounded-3xl border border-white/10 p-10 text-left transition-all hover:border-white/30">
                <h3 className="mb-3 text-2xl font-semibold">{f.title}</h3>
                <p className="text-zinc-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </main>
      )}
    </div>
  );
}
