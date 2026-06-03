import { createClient } from '@/utils/supabase/server';
import AuthButton from '@/components/AuthButton';
import Dashboard from '@/components/Dashboard';

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl font-bold">
              CF
            </div>
            <h1 className="text-3xl font-bold tracking-tighter">ClipFlow AI</h1>
          </div>
          <AuthButton user={user} />
        </div>
      </header>

      {user ? (
        <Dashboard />
      ) : (
        <main className="max-w-5xl mx-auto px-6 pt-28 pb-24 text-center">
          <div className="mb-6 inline-flex items-center gap-2 px-5 py-2 bg-white/5 rounded-full text-sm">
            ⚡ AI-Powered Twitch Repurposing
          </div>

          <h1 className="text-7xl md:text-8xl font-bold tracking-tighter leading-none mb-8">
            Turn Your Twitch Streams<br />
            Into <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">Viral Content</span>
          </h1>

          <p className="text-2xl text-zinc-400 max-w-3xl mx-auto mb-12">
            Automatically detect highlights, generate captions, and post to X, YouTube Shorts & TikTok — saving you hours every week.
          </p>

          <div className="flex justify-center mb-16">
            <AuthButton user={null} />
          </div>

          {/* Better Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Save 10+ hours per week",
                desc: "No more manual clipping and editing",
                icon: "⏱️"
              },
              {
                title: "Grow faster across platforms",
                desc: "Post optimized content to X, Shorts & TikTok",
                icon: "📈"
              },
              {
                title: "Pro Desktop App included",
                desc: "Heavy video processing on your machine",
                icon: "💻"
              }
            ].map((feature, i) => (
              <div key={i} className="glass p-10 rounded-3xl text-left hover:border-violet-500 border border-white/10 transition-all group">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-zinc-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </main>
      )}
    </div>
  );
}