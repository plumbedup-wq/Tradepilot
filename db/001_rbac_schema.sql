-- TradePilot RBAC + tenant schema (run in Supabase SQL editor)
create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_user_id uuid not null,
  created_at timestamptz not null default now()
);

create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  is_system boolean not null default true
);

create table if not exists public.permissions (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  description text not null
);

create table if not exists public.role_permissions (
  role_id uuid not null references public.roles(id) on delete cascade,
  permission_id uuid not null references public.permissions(id) on delete cascade,
  primary key (role_id, permission_id)
);

create table if not exists public.company_members (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid not null,
  role_id uuid not null references public.roles(id),
  full_name text,
  created_at timestamptz not null default now(),
  unique (company_id, user_id)
);

create table if not exists public.member_permission_overrides (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.company_members(id) on delete cascade,
  permission_id uuid not null references public.permissions(id) on delete cascade,
  allowed boolean not null,
  unique(member_id, permission_id)
);
