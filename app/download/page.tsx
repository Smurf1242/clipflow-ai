import Link from 'next/link';
import AlphaDownload from '@/components/AlphaDownload';

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-6 py-20 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-wrap gap-3">
        <Link
          href="/"
          className="mb-10 inline-flex rounded-xl border border-white/10 bg-white/5 px-5 py-3 transition hover:bg-white/10"
        >
          ← Home
        </Link>
        <Link
          href="/alpha/guide"
          className="inline-flex rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 font-bold text-cyan-100 transition hover:bg-cyan-400 hover:text-black"
        >
          Open Alpha Guide
        </Link>
        </div>

        <AlphaDownload />
      </div>
    </main>
  );
}
