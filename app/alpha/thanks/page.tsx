import Link from 'next/link';

export const dynamic = 'force-static';

export default function AlphaThanksPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-violet-500/30 bg-violet-500/10 p-10 text-center shadow-2xl shadow-violet-950/30">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-3xl">
          ✓
        </div>
        <h1 className="mb-4 text-5xl font-black">Application sent.</h1>
        <p className="mb-8 text-lg leading-8 text-zinc-300">
          Thanks for applying to test ClipFlow-AI Alpha. If you are selected, we will contact you through the email or Discord details you provided.
        </p>
        <Link
          href="/"
          className="inline-flex rounded-xl bg-white px-6 py-3 font-bold text-black transition hover:bg-zinc-200"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
