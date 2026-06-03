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
    setLoading(true);
    const res = await fetch('/api/twitch/vods');
    if (res.ok) {
      const data = await res.json();
      setVods(data);
    }
    setLoading(false);
  };

  const generateClips = async (vodId: string, title: string) => {
    const res = await fetch('/api/generate-clip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vodId })
    });

    if (res.ok) {
      const data = await res.json();
      setClips(prev => [...prev, { ...data, vodTitle: title }]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-bold">Your Recent VODs</h2>
        <div className="text-emerald-400 text-sm">Pro users get Desktop App + unlimited clips</div>
      </div>

      {loading ? (
        <p className="text-center text-zinc-400 py-20">Loading your streams...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vods.map((vod: any) => (
            <div key={vod.id} className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-violet-500 transition-all group">
              <div className="aspect-video bg-zinc-800 relative">
                {vod.thumbnail_url && (
                  <img src={vod.thumbnail_url} alt={vod.title} className="w-full h-full object-cover" />
                )}
                <div className="absolute bottom-2 right-2 bg-black/70 text-xs px-2 py-1 rounded">
                  {vod.duration}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-semibold text-lg line-clamp-2 mb-4 group-hover:text-violet-400 transition-colors">
                  {vod.title}
                </h3>
                
                <button
                  onClick={() => generateClips(vod.id, vod.title)}
                  className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 py-4 rounded-2xl font-medium text-lg transition-all active:scale-95"
                >
                  ✨ AI Generate Clips & Posts
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Generated Clips */}
      {clips.length > 0 && (
        <div className="mt-16">
          <h3 className="text-3xl font-bold mb-8">Generated Content Ready</h3>
          {clips.map((clip, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 mb-6">
              <p className="text-lg leading-relaxed text-zinc-200">{clip.caption}</p>
              <div className="mt-6 flex gap-4">
                <button className="bg-zinc-800 hover:bg-zinc-700 px-8 py-3 rounded-2xl">Post to X</button>
                <button className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3 rounded-2xl">Download Video Clip</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}