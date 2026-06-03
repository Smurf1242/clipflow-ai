import { createClient } from '@/utils/supabase/server';
import AuthButton from '@/components/AuthButton';
import Dashboard from '@/components/Dashboard';

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Modern Header */}
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center font-bold text-xl">
              C
            </div>
            <h1 className="text-3xl font-bold tracking-tighter">ClipFlow AI</h1>
          </div>
          <AuthButton user={user} />
        </div>
      </header>

      {user ? (
        <Dashboard />
      ) : (
        <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 text-white/70 px-4 py-1.5 rounded-full mb-6">
            🔥 Now Live on Netlify
          </div>
          
          <h2 className="text-7xl font-bold tracking-tighter mb-6 leading-none">
            Turn Hours of Twitch<br />
            into <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Viral Clips</span>
          </h2>
          
          <p className="text-2xl text-zinc-400 max-w-2xl mx-auto mb-12">
            AI automatically finds the best moments from your streams and creates ready-to-post content for X, YouTube Shorts & TikTok.
          </p>

          <AuthButton user={null} />

          <div className="mt-20 grid grid-cols-3 gap-8 text-left max-w-3xl mx-auto">
            {['Save 10+ hours/week', 'Grow faster on all platforms', 'Pro Desktop App included'].map((feature, i) => (
              <div key={i} className="glass p-6 rounded-3xl">
                <div className="text-violet-400 text-2xl mb-3">✓</div>
                <p className="font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}