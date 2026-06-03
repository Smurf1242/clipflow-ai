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
              By accessing or using ClipFlow-AI, you agree to be bound by
              these Terms & Conditions. If you do not agree to these terms,
              you must discontinue use of the platform immediately.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              2. AI Generated Content Disclaimer
            </h2>

            <p>
              ClipFlow-AI uses artificial intelligence to generate captions,
              titles, hashtags, highlight suggestions, transcripts, and other
              automated content.
            </p>

            <p className="mt-4">
              We do not guarantee the accuracy, legality, originality,
              appropriateness, reliability, or quality of AI-generated output.
            </p>

            <p className="mt-4">
              Users are fully responsible for reviewing, editing, approving,
              and verifying all generated content before publishing or sharing.
            </p>

            <p className="mt-4">
              ClipFlow-AI is not liable for damages, bans, strikes,
              demonetization, copyright claims, reputational harm, or platform
              moderation actions resulting from generated content.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              3. User Responsibility
            </h2>

            <p>
              Users are solely responsible for ensuring they have the legal
              right to upload, process, edit, or distribute any content used
              with ClipFlow-AI.
            </p>

            <p className="mt-4">
              Users agree not to use ClipFlow-AI for unlawful, abusive,
              fraudulent, harassing, infringing, or malicious purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              4. Third-Party Services
            </h2>

            <p>
              ClipFlow-AI may integrate with third-party services including
              Twitch, YouTube, TikTok, X (Twitter), OpenAI, Supabase,
              FFmpeg, and other APIs or services.
            </p>

            <p className="mt-4">
              We are not responsible for outages, API limitations, account
              suspensions, service interruptions, policy changes, or data loss
              caused by third-party platforms or providers.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              5. Limitation of Liability
            </h2>

            <p>
              ClipFlow-AI and its creators shall not be held liable for:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Incorrect AI-generated captions or suggestions</li>
              <li>Lost revenue or business interruption</li>
              <li>Content moderation or bans on third-party platforms</li>
              <li>Loss of clips, files, or generated data</li>
              <li>Hardware, software, or compatibility issues</li>
              <li>AI hallucinations or inaccurate outputs</li>
              <li>Service downtime or interruptions</li>
              <li>Export/rendering failures</li>
              <li>Data corruption or failed uploads</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              6. Refund Policy
            </h2>

            <p>
              All purchases, subscriptions, licenses, and digital services
              provided by ClipFlow-AI are generally non-refundable unless
              otherwise required by applicable law.
            </p>

            <p className="mt-4">
              By purchasing access to ClipFlow-AI, users acknowledge they are
              purchasing access to digital software services and features.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              7. Chargebacks & Payment Disputes
            </h2>

            <p>
              Fraudulent chargebacks, payment disputes, or attempts to reverse
              legitimate payments may result in:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Immediate account suspension</li>
              <li>Permanent bans from ClipFlow-AI services</li>
              <li>Blacklisting from future access</li>
              <li>Termination of active subscriptions</li>
            </ul>

            <p className="mt-4">
              We reserve the right to dispute chargebacks using account
              activity logs, payment records, IP logs, usage records,
              exported data, and other supporting evidence.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              8. Alpha & Beta Software Disclaimer
            </h2>

            <p>
              ClipFlow-AI may provide alpha, beta, experimental, or
              early-access software features.
            </p>

            <p className="mt-4">
              These features may contain bugs, crashes, incomplete
              functionality, inaccurate AI outputs, or unexpected behavior.
            </p>

            <p className="mt-4">
              Users acknowledge they use early-access software entirely
              at their own risk.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              9. Account Suspension & Termination
            </h2>

            <p>
              We reserve the right to suspend, restrict, or permanently
              terminate accounts for:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Fraudulent activity</li>
              <li>Chargebacks or payment abuse</li>
              <li>API abuse or excessive automated usage</li>
              <li>Harassment or abusive conduct</li>
              <li>Attempts to exploit or reverse engineer the platform</li>
              <li>Violations of these Terms</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              10. Service Availability
            </h2>

            <p>
              ClipFlow-AI does not guarantee uninterrupted service,
              compatibility, uptime, export success, or permanent access
              to any feature, API integration, or generated content.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              11. Intellectual Property
            </h2>

            <p>
              The ClipFlow-AI platform, software, branding, user interface,
              logos, and associated technology remain the intellectual
              property of ClipFlow-AI and its creators.
            </p>

            <p className="mt-4">
              Users may not reverse engineer, redistribute, resell,
              reproduce, exploit, or copy any part of ClipFlow-AI without
              written permission.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-white">
              12. Changes to Terms
            </h2>

            <p>
              We reserve the right to update or modify these Terms &
              Conditions at any time without prior notice.
            </p>

            <p className="mt-4">
              Continued use of ClipFlow-AI after changes are published
              constitutes acceptance of the updated Terms.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}