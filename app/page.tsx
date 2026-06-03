import { createClient } from '@/utils/supabase/server';
import AuthButton from '@/components/AuthButton';
import Dashboard from '@/components/Dashboard';

export default async function Home() {
  const supabase = await createClient();   // ← Added "await"
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800 p-6 flex justify-between items-center">
        <h1 className="text-4xl font-bold">ClipFlow AI</h1>
        <AuthButton user={user} />
      </header>

      {user ? <Dashboard /> : (
        <div className="max-w-4xl mx-auto text-center py-24 px-6">
          <h2 className="text-6xl font-bold mb-6">Turn Twitch Streams into Viral Clips Automatically</h2>
          <p className="text-xl text-zinc-400 mb-10">AI-powered for X and YouTube Shorts</p>
          <AuthButton user={null} />
        </div>
      )}
    </div>
  );
}