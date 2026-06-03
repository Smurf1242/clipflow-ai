'use client';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function AuthButton({ user }: { user: any }) {
  const router = useRouter();
  const supabase = createClient();

  const signIn = () => {
    supabase.auth.signInWithOAuth({
      provider: 'twitch',
      options: {
        scopes: 'user:read:email',
        redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
      },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return user ? (
    <button 
      onClick={signOut}
      className="bg-red-600 px-6 py-2 rounded-lg hover:bg-red-700"
    >
      Sign Out
    </button>
  ) : (
    <button 
      onClick={signIn}
      className="bg-violet-600 hover:bg-violet-700 px-8 py-3 rounded-xl text-lg font-medium"
    >
      Login with Twitch
    </button>
  );
}