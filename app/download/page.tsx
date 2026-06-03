import Link from 'next/link';
import AlphaDownload from '@/components/AlphaDownload';

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

        <AlphaDownload />
      </div>
    </main>
  );
}
