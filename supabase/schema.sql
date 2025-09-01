create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  email text,
  phone text,
  address text not null,
  city text,
  state text,
  zip text,
  lat double precision,
  lng double precision,
  utm jsonb,
  consent boolean default false,
  source text default 'scottsdalesellers',
  created_at timestamptz default now()
);

create table if not exists az_cost_defaults (
  id serial primary key,
  title_escrow_pct numeric default 0.6,
  hoa_transfer numeric default 400,
  recording_fees numeric default 200,
  home_warranty numeric default 700,
  seller_credits numeric default 0,
  other_fees numeric default 0,
  updated_at timestamptz default now()
);

create table if not exists net_sheets (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id) on delete set null,
  sale_price numeric not null,
  loan_payoff numeric default 0,
  commission_rate numeric not null,
  title_escrow_pct numeric,
  hoa_transfer numeric,
  recording_fees numeric,
  home_warranty numeric,
  seller_credits numeric,
  other_fees numeric,
  net_proceeds numeric,
  breakdown jsonb,
  created_at timestamptz default now()
);

create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id) on delete set null,
  address text not null,
  city text,
  state text,
  zip text,
  type text default 'Single Family',
  beds int,
  baths numeric,
  sqft int,
  purchase_price numeric,
  purchase_date date,
  current_value numeric,
  lat double precision,
  lng double precision,
  created_at timestamptz default now()
);

create table if not exists sales (
  id uuid primary key default gen_random_uuid(),
  address text not null,
  city text,
  state text,
  zip text,
  type text,
  beds int,
  baths numeric,
  sqft int,
  sale_price numeric not null,
  dom int,
  sale_date date not null,
  lat double precision,
  lng double precision,
  created_at timestamptz default now()
);

-- sample seed data for demo
insert into properties (address, city, state, zip, type, beds, baths, sqft, purchase_price, purchase_date, current_value)
values
('6623 E El Sendero Rd', 'Carefree', 'AZ', '85377', 'Single Family', 4, 3.5, 3200, 3000000, '2021-06-15', 3662000),
('1247 Victoria Ln', 'Scottsdale', 'AZ', '85255', 'Single Family', 4, 3, 2850, 1850000, '2020-03-08', 2650000);

insert into sales (address, city, state, zip, type, beds, baths, sqft, sale_price, dom, sale_date)
values
('123 Desert Vista Trl', 'Scottsdale', 'AZ', '85255', 'Single Family', 4, 3.5, 2800, 2450000, 18, '2024-12-14'),
('456 Canyon Pass', 'Scottsdale', 'AZ', '85262', 'Townhouse', 3, 2.5, 2200, 1850000, 25, '2024-12-11'),
('789 Pinnacle Peak Rd', 'Scottsdale', 'AZ', '85255', 'Condo', 2, 2, 1400, 1320000, 12, '2024-12-09'),
('321 Maple Ridge Ct', 'Carefree', 'AZ', '85377', 'Single Family', 5, 4, 3200, 2980000, 31, '2024-12-07');
