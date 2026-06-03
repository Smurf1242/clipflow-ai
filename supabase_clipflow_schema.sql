-- Optional Supabase migration for ClipFlow-AI web clipping/highlight jobs.
-- Run this in Supabase SQL Editor if your generated_clips table only has user_id, vod_id and caption.

alter table public.generated_clips
  add column if not exists title text,
  add column if not exists start_seconds integer,
  add column if not exists end_seconds integer,
  add column if not exists vod_url text,
  add column if not exists status text default 'created',
  add column if not exists created_at timestamptz default now();
