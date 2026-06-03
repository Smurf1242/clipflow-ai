import Link from 'next/link';

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-6 py-20 text-white">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-10 inline-flex rounded-xl border border-white/10 bg-white/5 px-5 py-3 transition hover:bg-white/10"
        >
          ← Home
        </Link>

        <div className="rounded-3xl border border-violet-500/40 bg-violet-500/10 p-10 shadow-2xl shadow-violet-500/10">
          <div className="mb-4 inline-flex rounded-full bg-violet-500 px-4 py-1 text-sm font-bold">
            Alpha Tester Build
          </div>

          <h1 className="mb-5 text-5xl font-black">
            Download ClipFlow-AI Alpha
          </h1>

          <p className="mb-8 text-xl leading-8 text-zinc-300">
            This Windows alpha build includes local FFmpeg clipping, portrait exports, caption styling, AI clip suggestions, and GTA/FiveM RP-aware presets.
          </p>

          <a
            href="/downloads/ClipFlow-AI-Alpha-Setup.exe"
            download
            className="inline-flex rounded-2xl bg-white px-8 py-4 text-lg font-black text-black transition hover:bg-zinc-200"
          >
            Download Windows Alpha Installer
          </a>

          <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-6 text-zinc-300">
            <h2 className="mb-3 text-2xl font-bold text-white">Alpha notes</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Windows only for this first alpha test.</li>
              <li>FFmpeg is bundled, so testers should not need to install it manually.</li>
              <li>AI features require the configured OpenAI connection to be working.</li>
              <li>This is an early testing build, so bugs and rough edges are expected.</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
