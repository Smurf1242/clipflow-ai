'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function Dashboard() {
  const [vods, setVods] = useState<any[]>([]);
  const [clips, setClips] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
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
  };

  const generateClips = async (vodId: string) => {
    setLoading(true);
    const res = await fetch('/api/generate-clip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vodId }),
    });

    if (res.ok) {
      const data = await res.json();
      setClips(prev => [...prev, data]);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-semibold">Your Recent VODs</h2>
        <div className="text-sm text-zinc-400">Pro users get Desktop App + unlimited clips</div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vods.map((vod: any) => (
          <div key={vod.id} className="bg-zinc-900 rounded-2xl p-6 hover:bg-zinc-800 transition-all">
            <h3 className="font-medium text-lg mb-4 line-clamp-2">{vod.title}</h3>
            <p className="text-sm text-zinc-500 mb-6">{vod.duration}</p>
            
            <button
              onClick={() => generateClips(vod.id)}
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-700 py-4 rounded-xl font-medium disabled:opacity-50"
            >
              {loading ? "Generating..." : "AI Generate Clips & Posts"}
            </button>
          </div>
        ))}
      </div>

      {clips.length > 0 && (
        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-6">Generated Clips</h3>
          {clips.map((clip, index) => (
            <div key={index} className="bg-zinc-900 p-6 rounded-2xl mb-4">
              <p className="text-lg leading-relaxed">{clip.caption}</p>
              <div className="mt-6 flex gap-4">
                <button className="bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-lg">Post to X</button>
                <button className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg">Download for Desktop</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}