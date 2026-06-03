import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-6 py-20 text-white">
      <div className="mx-auto max-w-4xl">

        <Link
          href="/"
          className="mb-10 inline-flex rounded-xl border border-white/10 bg-white/5 px-5 py-3 transition hover:bg-white/10"
        >
          ← Home
        </Link>

        <h1 className="mb-8 text-5xl font-black">
          Terms & Conditions
        </h1>

        <div className="space-y-8 leading-8 text-zinc-300">

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              1. Acceptance of Terms
            </h2>

            <p>
              By using ClipFlow-AI, you agree to these Terms and Conditions.
              If you do not agree, you must stop using the service immediately.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              2. AI Generated Content
            </h2>

            <p>
              ClipFlow-AI uses artificial intelligence to generate captions,
              highlight suggestions, social media text, and other automated
              content.
            </p>

            <p className="mt-4">
              We do not guarantee the accuracy, quality, legality, safety,
              originality, or appropriateness of any AI-generated output.
            </p>

            <p className="mt-4">
              Users are fully responsible for reviewing, editing, approving,
              and verifying all generated content before publishing or sharing.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              3. Limitation of Liability
            </h2>

            <p>
              ClipFlow-AI and its creators are not liable for:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Incorrect or misleading captions</li>
              <li>Offensive or inappropriate AI outputs</li>
              <li>Copyright claims</li>
              <li>Platform bans or account suspensions</li>
              <li>Lost revenue or damages</li>
              <li>Errors in automatically generated clips</li>
              <li>Third-party platform API failures</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              4. User Responsibility
            </h2>

            <p>
              Users are solely responsible for ensuring they own or have
              permission to use uploaded content, streams, VODs, clips,
              captions, and media processed through ClipFlow-AI.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              5. Third-Party Services
            </h2>

            <p>
              ClipFlow-AI integrates with third-party services including
              Twitch, OpenAI, TikTok, YouTube, X (Twitter), and Supabase.
            </p>

            <p className="mt-4">
              We are not responsible for outages, API limitations, policy
              changes, or actions taken by these services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              6. Changes to These Terms
            </h2>

            <p>
              We may update these Terms at any time without prior notice.
              Continued use of ClipFlow-AI constitutes acceptance of any
              updated Terms.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
