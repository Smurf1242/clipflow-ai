import Link from 'next/link';

export const dynamic = 'force-static';

export default function AlphaSignupPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-bold transition hover:bg-white/10"
          >
            ← Home
          </Link>

          <Link
            href="/download"
            className="hidden rounded-xl border border-violet-400/50 bg-violet-500/10 px-5 py-3 font-bold text-violet-100 transition hover:bg-violet-500 hover:text-white sm:inline-flex"
          >
            Already invited?
          </Link>
        </div>

        <section className="mb-10 overflow-hidden rounded-[2rem] border border-violet-500/30 bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-cyan-500/10 p-8 shadow-2xl shadow-violet-950/30 md:p-12">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full border border-violet-400/40 bg-black/30 px-4 py-2 text-sm font-bold text-violet-200">
              Alpha creator applications
            </div>

            <h1 className="mb-5 text-5xl font-black leading-tight md:text-6xl">
              Apply to test ClipFlow-AI early.
            </h1>

            <p className="text-lg leading-8 text-zinc-300">
              We are inviting a small group of creators to test VELA, the desktop clip studio, and the early livestream tools. Tell us about your stream so we can prioritise creators who can give useful feedback and help shape the alpha.
            </p>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <form
            name="alpha-signup"
            method="POST"
            action="/alpha/thanks"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/30 md:p-8"
          >
            <input type="hidden" name="form-name" value="alpha-signup" />

            <p className="hidden">
              <label>
                Do not fill this out: <input name="bot-field" />
              </label>
            </p>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-bold text-zinc-300">Creator name *</span>
                <input
                  required
                  name="creator_name"
                  type="text"
                  placeholder="Your name or creator name"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-violet-400"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-bold text-zinc-300">Email *</span>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-violet-400"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-bold text-zinc-300">Discord username *</span>
                <input
                  required
                  name="discord"
                  type="text"
                  placeholder="name#0000 or @username"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-violet-400"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-bold text-zinc-300">Main platform *</span>
                <select
                  required
                  name="platform"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-violet-400"
                >
                  <option value="">Choose one</option>
                  <option>Twitch</option>
                  <option>YouTube</option>
                  <option>Kick</option>
                  <option>TikTok Live</option>
                  <option>Facebook Gaming</option>
                  <option>Multiple platforms</option>
                  <option>Other</option>
                </select>
              </label>

              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-bold text-zinc-300">Streaming profile URL *</span>
                <input
                  required
                  name="stream_url"
                  type="url"
                  placeholder="https://twitch.tv/yourname"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-violet-400"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-bold text-zinc-300">Average live viewers *</span>
                <input
                  required
                  name="average_viewers"
                  type="text"
                  placeholder="Example: 20-50"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-violet-400"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-bold text-zinc-300">Follower/subscriber count</span>
                <input
                  name="follower_count"
                  type="text"
                  placeholder="Example: 4.2k"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-violet-400"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-bold text-zinc-300">Main content type *</span>
                <select
                  required
                  name="content_type"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-violet-400"
                >
                  <option value="">Choose one</option>
                  <option>GTA/FiveM Roleplay</option>
                  <option>Variety roleplay</option>
                  <option>FPS / competitive</option>
                  <option>Variety gaming</option>
                  <option>Just Chatting</option>
                  <option>Other</option>
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-bold text-zinc-300">How often do you stream?</span>
                <select
                  name="stream_frequency"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-violet-400"
                >
                  <option value="">Choose one</option>
                  <option>Daily</option>
                  <option>3-5 times per week</option>
                  <option>1-2 times per week</option>
                  <option>Occasionally</option>
                </select>
              </label>

              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-bold text-zinc-300">What editing/clipping tools do you use now?</span>
                <input
                  name="current_tools"
                  type="text"
                  placeholder="OBS, Streamlabs, Medal, CapCut, Premiere, etc."
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-violet-400"
                />
              </label>

              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-bold text-zinc-300">Why would ClipFlow-AI be useful for your content? *</span>
                <textarea
                  required
                  name="why_alpha"
                  rows={5}
                  placeholder="Tell us what kind of clips you need, what problems you have with current tools, and what you would test."
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-violet-400"
                />
              </label>

              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-bold text-zinc-300">PC specs / notes</span>
                <textarea
                  name="pc_specs"
                  rows={3}
                  placeholder="GPU, CPU, Windows version, streaming setup, capture card, etc."
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-violet-400"
                />
              </label>
            </div>

            <label className="mt-6 flex gap-3 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm leading-6 text-zinc-300">
              <input required name="tester_agreement" type="checkbox" className="mt-1" />
              <span>
                I understand this is an early alpha build and I may be contacted on Discord/email if selected.
              </span>
            </label>

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-4 text-lg font-black text-white transition hover:scale-[1.01]"
            >
              Submit Alpha Application
            </button>
          </form>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-violet-500/30 bg-violet-500/10 p-7">
              <h2 className="mb-4 text-2xl font-black">Who we are looking for</h2>
              <div className="space-y-3 text-zinc-300">
                <p>Creators who stream regularly and can test real VODs, livestream scenes, captions, and RP-aware clip detection.</p>
                <p>FiveM and roleplay creators are ideal, but strong variety creators are welcome too.</p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7">
              <h2 className="mb-4 text-2xl font-black">What helps your application</h2>
              <ul className="space-y-3 text-zinc-300">
                <li>✓ Active Twitch, YouTube, Kick, or TikTok Live profile</li>
                <li>✓ Long-form streams or VODs</li>
                <li>✓ RP, story, comedy, or high-energy content</li>
                <li>✓ Willingness to give honest alpha feedback</li>
                <li>✓ Windows PC for the desktop app</li>
              </ul>
            </div>

            <div className="rounded-[2rem] border border-cyan-400/20 bg-cyan-400/5 p-7">
              <h2 className="mb-4 text-2xl font-black">Where submissions go</h2>
              <p className="leading-7 text-zinc-300">
                Applications are captured through Netlify Forms so they can be reviewed before access is given. You can enable email alerts inside Netlify Forms to receive each application directly.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
