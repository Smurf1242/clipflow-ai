import { createClient } from '@/utils/supabase/server';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Header />

      {user ? (
        <Dashboard />
      ) : (
        <main className="max-w-5xl mx-auto px-6 pt-28 pb-24 text-center">
          <div className="mb-6 inline-flex items-center gap-2 px-6 py-2.5 bg-white/5 rounded-full text-sm">
            ⚡ AI-Powered Twitch Repurposing
          </div>

          <h1 className="text-7xl md:text-8xl font-bold tracking-tighter leading-none mb-8">
            Turn Your Twitch Streams<br />
            Into Viral Content
          </h1>

          <p className="text-2xl text-zinc-400 max-w-3xl mx-auto mb-12">
            Automatically detect highlights, generate captions, and post to X, YouTube Shorts & TikTok — saving you hours every week.
          </p>

          <div className="flex justify-center mb-20">
            <a href="/" className="bg-white text-black px-10 py-4 rounded-2xl text-xl font-semibold hover:bg-zinc-200 transition inline-block">
              Login with Twitch
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { title: "Save 10+ hours per week", desc: "No more manual clipping and editing" },
              { title: "Grow faster across platforms", desc: "Post optimized content everywhere" },
              { title: "Pro Desktop App included", desc: "Heavy video processing locally" }
            ].map((f, i) => (
              <div key={i} className="glass p-10 rounded-3xl text-left hover:border-white/30 border border-white/10 transition-all">
                <h3 className="text-2xl font-semibold mb-3">{f.title}</h3>
                <p className="text-zinc-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </main>
      )}
    </div>
  );
}