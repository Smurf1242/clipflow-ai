import Link from 'next/link';

export default function HomeButton() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-bold text-white transition hover:border-violet-400/60 hover:bg-violet-500/10"
    >
      ← Home
    </Link>
  );
}
