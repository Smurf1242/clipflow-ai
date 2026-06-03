'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

export default function Dashboard() {
  const [vods, setVods] = useState<any[]>([]);
  const [clips, setClips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    fetchVods();
  }, []);

  const fetchVods = async () => {
    const res = await fetch('/api/twitch/vods');
    if (res.ok) {
      const data = await res.json();
      setVods(data);
    }
    setLoading(false);
  };

  const generateClips = async (vodId: string) => {
    const res = await fetch('/api/generate-clip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vodId })
    });

    if (res.ok) {
      const data = await res.json();
      setClips(prev => [...prev, data]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Navigation Bar */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-5xl font-bold">Your Recent VODs</h2>
        
        <div className="flex gap-4">
          <Link href="/why" className="px-6 py-3 border border-white/30 hover:bg-white/5 rounded-2xl transition">
            Why ClipFlow
          </Link>
          <Link href="/pricing" className="px-6 py-3 bg-white text-black rounded-2xl font-semibold hover:bg-zinc-200 transition">
            View Pricing
          </Link>
        </div>
      </div>

      {loading ? (
        <p className="text-center py-20 text-zinc-500 text-xl">Loading your streams from Twitch...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vods.map((vod) => (
            <div key={vod.id} className="glass rounded-3xl overflow-hidden hover:border-violet-500 border border-white/10 transition-all">
              <div className="h-48 bg-zinc-800 relative">
                {vod.thumbnail_url && (
                  <img src={vod.thumbnail_url} alt={vod.title} className="w-full h-full object-cover" />
                )}
                <div className="absolute bottom-3 right-3 bg-black/70 px-3 py-1 rounded text-xs">
                  {vod.duration}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-4 line-clamp-2">{vod.title}</h3>
                
                <button
                  onClick={() => generateClips(vod.id)}
                  className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 py-4 rounded-2xl font-semibold transition-all"
                >
                  ✨ Generate AI Clips & Posts
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Generated Clips Section */}
      {clips.length > 0 && (
        <div className="mt-16">
          <h3 className="text-3xl font-bold mb-8">Generated Clips</h3>
          {clips.map((clip, i) => (
            <div key={i} className="glass p-8 rounded-3xl mb-6">
              <p className="text-lg leading-relaxed">{clip.caption}</p>
              <div className="mt-6 flex gap-4">
                <button className="bg-zinc-800 hover:bg-zinc-700 px-8 py-3 rounded-2xl">Post to X</button>
                <button className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3 rounded-2xl">Download Clip</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}