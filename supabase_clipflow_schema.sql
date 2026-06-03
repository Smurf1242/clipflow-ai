-- ClipFlow-AI helper schema updates
-- Run this in Supabase SQL editor if saving Twitch profile data or clip jobs errors.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  twitch_access_token text,
  twitch_refresh_token text,
  twitch_token_expires_at timestamptz,
  twitch_user_id text,
  twitch_login text,
  twitch_display_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles add column if not exists twitch_access_token text;
alter table public.profiles add column if not exists twitch_refresh_token text;
alter table public.profiles add column if not exists twitch_token_expires_at timestamptz;
alter table public.profiles add column if not exists twitch_user_id text;
alter table public.profiles add column if not exists twitch_login text;
alter table public.profiles add column if not exists twitch_display_name text;

create table if not exists public.clips (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  vod_id text,
  vod_url text,
  title text,
  caption text,
  start_seconds integer,
  end_seconds integer,
  status text default 'queued',
  output_url text,
  created_at timestamptz default now()
);

alter table public.clips add column if not exists vod_id text;
alter table public.clips add column if not exists vod_url text;
alter table public.clips add column if not exists title text;
alter table public.clips add column if not exists caption text;
alter table public.clips add column if not exists start_seconds integer;
alter table public.clips add column if not exists end_seconds integer;
alter table public.clips add column if not exists status text default 'queued';
alter table public.clips add column if not exists output_url text;
