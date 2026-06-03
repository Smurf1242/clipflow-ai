export default function WhyPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6">Why Creators Choose ClipFlow AI</h1>
          <p className="text-2xl text-zinc-400 max-w-3xl mx-auto">
            Stop spending hours editing clips. Let AI do the heavy lifting.
          </p>
        </div>

        {/* Free Version Benefits */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-8 text-center">Free Version - Perfect to Start</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass p-10 rounded-3xl">
              <h3 className="text-2xl font-semibold mb-6">What you get for free:</h3>
              <ul className="space-y-5 text-lg">
                <li className="flex gap-4">
                  <span className="text-emerald-400 text-2xl">✓</span>
                  <span>5 High-quality AI clip suggestions per month</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-emerald-400 text-2xl">✓</span>
                  <span>Viral-optimized captions tailored to your style</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-emerald-400 text-2xl">✓</span>
                  <span>Ready-to-post content for X and YouTube Shorts</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-emerald-400 text-2xl">✓</span>
                  <span>Full access to see how the tool works</span>
                </li>
              </ul>
            </div>
            <div className="glass p-10 rounded-3xl">
              <p className="text-xl leading-relaxed text-zinc-300">
                Even the free version saves you hours every month. 
                Many creators start here and see immediate results — 
                more consistent posting, better engagement, and faster growth.
              </p>
            </div>
          </div>
        </div>

        {/* Why Upgrade */}
        <div>
          <h2 className="text-4xl font-bold mb-8 text-center">Why Upgrade to Pro?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass p-10 rounded-3xl">
              <h3 className="text-3xl font-bold text-violet-400 mb-8">Pro Plan (€19/month)</h3>
              <ul className="space-y-6 text-lg">
                <li>✅ Unlimited AI clip generations</li>
                <li>✅ Auto-post to X (Twitter)</li>
                <li>✅ Desktop App for faster local processing</li>
                <li>✅ Priority AI performance</li>
                <li>✅ Custom content style training</li>
                <li>✅ Full analytics & performance tracking</li>
              </ul>
            </div>
            <div className="glass p-10 rounded-3xl">
              <p className="text-2xl leading-tight mb-8">
                Most creators who upgrade say it’s the best investment they’ve made in their channel.
              </p>
              <p className="text-zinc-400">
                The time you save + extra reach from consistent high-quality clips usually pays for the Pro plan many times over.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-20">
          <a href="/pricing" className="inline-block bg-white text-black px-10 py-4 rounded-2xl text-xl font-semibold hover:bg-zinc-200 transition">
            See Pricing & Upgrade
          </a>
        </div>
      </div>
    </div>
  );
}