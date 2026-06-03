'use client';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <header className="border-b border-white/10 bg-black/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-600 rounded-2xl flex items-center justify-center text-2xl font-bold">CF</div>
            <h1 className="text-3xl font-bold tracking-tighter">ClipFlow AI</h1>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-violet-400 transition">Home</Link>
            <Link href="/why" className="hover:text-violet-400 transition">Why Us</Link>
            <Link href="/pricing" className="hover:text-violet-400 transition">Pricing</Link>
          </nav>
        </div>

        <div>
          {user ? (
            <button 
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 px-6 py-2.5 rounded-xl text-sm font-medium transition"
            >
              Sign Out
            </button>
          ) : (
            <Link 
              href="/"
              className="bg-white text-black px-8 py-3 rounded-2xl font-semibold hover:bg-zinc-200 transition"
            >
              Login with Twitch
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}