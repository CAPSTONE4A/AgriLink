-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Auth role enum
create type public.auth_role as enum ('farmer', 'cooperative', 'buyer', 'extension', 'lender', 'admin');

-- Profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  role public.auth_role not null default 'farmer',
  full_name text not null,
  phone text unique,
  email text unique,
  avatar_url text,
  address text,
  barangay text,
  municipality text,
  province text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Farmer profiles
create table public.farmer_profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null unique,
  farm_name text not null,
  farm_type text,
  farm_size_hectares numeric,
  crops_grown jsonb,
  years_farming integer,
  cooperative_id uuid,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Buyer profiles
create table public.buyer_profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null unique,
  business_name text not null,
  business_type text,
  preferred_crops jsonb,
  typical_order_volume text,
  delivery_address text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Marketplace listings
create table public.listings (
  id uuid primary key default uuid_generate_v4(),
  farmer_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  category text not null,
  price_per_unit numeric not null,
  unit text not null,
  quantity_available numeric not null,
  quantity_sold numeric default 0 not null,
  location text not null,
  images jsonb,
  badge text,
  status text default 'active' not null,
  harvest_date date,
  expiry_date date,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Orders
create table public.orders (
  id uuid primary key default uuid_generate_v4(),
  buyer_id uuid references public.profiles(id) on delete cascade not null,
  listing_id uuid references public.listings(id) on delete set null,
  status text default 'pending' not null,
  total_amount numeric not null,
  quantity numeric not null,
  delivery_method text,
  delivery_address text,
  notes text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Messages
create table public.messages (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references public.orders(id) on delete cascade,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  receiver_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  read boolean default false not null,
  created_at timestamptz default now() not null
);

-- Payments
create table public.payments (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references public.orders(id) on delete cascade not null,
  amount numeric not null,
  method text not null,
  status text default 'pending' not null,
  reference text,
  paid_at timestamptz,
  created_at timestamptz default now() not null
);

-- Row Level Security policies
alter table public.profiles enable row level security;
alter table public.farmer_profiles enable row level security;
alter table public.buyer_profiles enable row level security;
alter table public.listings enable row level security;
alter table public.orders enable row level security;
alter table public.messages enable row level security;
alter table public.payments enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- Farmer profiles policies
create policy "Farmer profiles are viewable by everyone"
  on public.farmer_profiles for select using (true);

create policy "Farmers can update own profile"
  on public.farmer_profiles for update using (auth.uid() = user_id);

create policy "Farmers can insert own profile"
  on public.farmer_profiles for insert with check (auth.uid() = user_id);

-- Buyer profiles policies
create policy "Buyer profiles are viewable by everyone"
  on public.buyer_profiles for select using (true);

create policy "Buyers can update own profile"
  on public.buyer_profiles for update using (auth.uid() = user_id);

create policy "Buyers can insert own profile"
  on public.buyer_profiles for insert with check (auth.uid() = user_id);

-- Listings policies
create policy "Listings are viewable by everyone"
  on public.listings for select using (true);

create policy "Farmers can insert own listings"
  on public.listings for insert with check (auth.uid() = farmer_id);

create policy "Farmers can update own listings"
  on public.listings for update using (auth.uid() = farmer_id);

-- Orders policies
create policy "Buyers can view own orders"
  on public.orders for select using (auth.uid() = buyer_id);

create policy "Sellers can view orders for their listings"
  on public.orders for select using (
    exists (
      select 1 from public.listings
      where listings.id = orders.listing_id
      and listings.farmer_id = auth.uid()
    )
  );

create policy "Buyers can insert own orders"
  on public.orders for insert with check (auth.uid() = buyer_id);

create policy "Buyers can update own orders"
  on public.orders for update using (auth.uid() = buyer_id);

-- Messages policies
create policy "Users can view messages they sent or received"
  on public.messages for select using (auth.uid() = sender_id or auth.uid() = receiver_id);

create policy "Users can insert messages"
  on public.messages for insert with check (auth.uid() = sender_id);

-- Payments policies
create policy "Buyers can view own payments"
  on public.payments for select using (
    exists (
      select 1 from public.orders
      where orders.id = payments.order_id
      and orders.buyer_id = auth.uid()
    )
  );

create policy "System can insert payments"
  on public.payments for insert with check (true);

-- Functions
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', 'User'),
    new.email,
    new.raw_user_meta_data->>'phone'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Updated_at trigger helper
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_profile_updated
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger on_farmer_profile_updated
  before update on public.farmer_profiles
  for each row execute procedure public.handle_updated_at();

create trigger on_buyer_profile_updated
  before update on public.buyer_profiles
  for each row execute procedure public.handle_updated_at();

create trigger on_listing_updated
  before update on public.listings
  for each row execute procedure public.handle_updated_at();

create trigger on_order_updated
  before update on public.orders
  for each row execute procedure public.handle_updated_at();
