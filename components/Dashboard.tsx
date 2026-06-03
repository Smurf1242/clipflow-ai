'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

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
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-5xl font-bold">Your Recent VODs</h2>
        <p className="text-emerald-400">Pro Plan unlocks unlimited clips + Desktop App</p>
      </div>

      {loading ? (
        <p className="text-center py-20 text-zinc-500">Loading your streams...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vods.map((vod) => (
            <div key={vod.id} className="glass rounded-3xl overflow-hidden hover:border-violet-500 border border-white/10 transition-all">
              <div className="h-48 bg-zinc-800 relative">
                {vod.thumbnail_url && <img src={vod.thumbnail_url} className="w-full h-full object-cover" />}
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{vod.title}</h3>
                <p className="text-sm text-zinc-500 mb-6">{vod.duration}</p>
                <button
                  onClick={() => generateClips(vod.id)}
                  className="w-full bg-white text-black py-4 rounded-2xl font-semibold hover:bg-zinc-200 transition"
                >
                  Generate AI Clips & Posts
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {clips.length > 0 && (
        <div className="mt-16">
          <h3 className="text-3xl font-bold mb-8">Generated Clips</h3>
          {clips.map((clip, i) => (
            <div key={i} className="glass p-8 rounded-3xl mb-6">
              <p className="text-lg">{clip.caption}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}