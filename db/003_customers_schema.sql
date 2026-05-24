-- Customer hub schema for TradePilot (run in Supabase SQL editor)
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  customer_type text not null default 'business',
  business_name text,
  trading_name text,
  first_name text,
  last_name text,
  email text,
  phone text,
  mobile text,
  address_line_1 text,
  address_line_2 text,
  suburb text,
  city text,
  post_code text,
  country text default 'NZ',
  payment_terms_days integer not null default 20,
  hourly_rate numeric(10,2),
  material_markup_percent numeric(5,2),
  material_gp_percent numeric(5,2),
  notes text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (payment_terms_days >= 0),
  check (material_markup_percent is null or material_markup_percent >= 0),
  check (material_gp_percent is null or material_gp_percent >= 0)
);

create index if not exists idx_customers_company on public.customers(company_id);
