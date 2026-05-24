-- Scheduling schema for TradePilot (run in Supabase SQL editor)
create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  title text not null,
  customer_name text,
  site_address text,
  status text not null default 'active',
  priority text not null default 'normal',
  created_at timestamptz not null default now()
);

create table if not exists public.staff_profiles (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid,
  display_name text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.job_assignments (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  job_id uuid not null references public.jobs(id) on delete cascade,
  staff_id uuid references public.staff_profiles(id) on delete set null,
  start_at timestamptz not null,
  end_at timestamptz not null,
  notes text,
  created_by uuid,
  created_at timestamptz not null default now(),
  check (end_at > start_at)
);

create index if not exists idx_job_assignments_company_time
  on public.job_assignments(company_id, start_at, end_at);
