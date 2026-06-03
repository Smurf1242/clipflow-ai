import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();   // ← Added await

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Mock data for now
  return NextResponse.json([
    {
      id: "123456",
      title: "Epic 3 Hour Gaming Stream - Best Moments",
      duration: "3h 12m"
    },
    {
      id: "123457",
      title: "Late Night Ranked Grind",
      duration: "2h 45m"
    }
  ]);
}