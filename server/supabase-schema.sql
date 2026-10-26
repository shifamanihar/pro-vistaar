-- Run in Supabase Dashboard > SQL Editor
create table if not exists public.admin_records (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('customer','enquiry','project','payment')),
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists admin_records_kind_created_idx on public.admin_records(kind, created_at desc);
alter table public.admin_records enable row level security;
-- The server uses the service-role key; never expose it in frontend code.
