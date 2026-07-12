-- Additional tables for cooperative, extension, lender, loans, knowledge base, and Q&A

-- Cooperative profiles
create table public.cooperative_profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null unique,
  cooperative_name text not null,
  registration_number text,
  member_count integer default 0 not null,
  total_shared_land_hectares numeric,
  description text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Extension worker profiles
create table public.extension_profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null unique,
  agency_name text not null,
  region text not null,
  province text not null,
  municipality text not null,
  specialization text,
  years_experience integer,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Lender profiles
create table public.lender_profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null unique,
  institution_name text not null,
  institution_type text not null,
  region text not null,
  contact_person text,
  phone text,
  email text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Loan applications
create table public.loan_applications (
  id uuid primary key default uuid_generate_v4(),
  farmer_id uuid references public.profiles(id) on delete cascade not null,
  lender_id uuid references public.profiles(id) on delete set null,
  amount numeric not null,
  purpose text not null,
  term_months integer not null,
  interest_rate numeric,
  status text default 'pending' not null,
  documents jsonb,
  reviewed_at timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Knowledge base articles
create table public.knowledge_articles (
  id uuid primary key default uuid_generate_v4(),
  author_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  content text not null,
  category text not null,
  tags jsonb,
  region text,
  published boolean default false not null,
  published_at timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Q&A questions
create table public.questions (
  id uuid primary key default uuid_generate_v4(),
  asker_id uuid references public.profiles(id) on delete cascade not null,
  responder_id uuid references public.profiles(id) on delete set null,
  title text not null,
  body text not null,
  category text not null,
  region text,
  status text default 'open' not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable RLS on new tables
alter table public.cooperative_profiles enable row level security;
alter table public.extension_profiles enable row level security;
alter table public.lender_profiles enable row level security;
alter table public.loan_applications enable row level security;
alter table public.knowledge_articles enable row level security;
alter table public.questions enable row level security;

-- Cooperative profiles policies
create policy "Cooperative profiles are viewable by everyone"
  on public.cooperative_profiles for select using (true);

create policy "Cooperative members can update own profile"
  on public.cooperative_profiles for update using (auth.uid() = user_id);

create policy "Cooperative members can insert own profile"
  on public.cooperative_profiles for insert with check (auth.uid() = user_id);

-- Extension profiles policies
create policy "Extension profiles are viewable by everyone"
  on public.extension_profiles for select using (true);

create policy "Extension workers can update own profile"
  on public.extension_profiles for update using (auth.uid() = user_id);

create policy "Extension workers can insert own profile"
  on public.extension_profiles for insert with check (auth.uid() = user_id);

-- Lender profiles policies
create policy "Lender profiles are viewable by everyone"
  on public.lender_profiles for select using (true);

create policy "Lenders can update own profile"
  on public.lender_profiles for update using (auth.uid() = user_id);

create policy "Lenders can insert own profile"
  on public.lender_profiles for insert with check (auth.uid() = user_id);

-- Loan applications policies
create policy "Farmers can view own applications"
  on public.loan_applications for select using (auth.uid() = farmer_id);

create policy "Lenders can view applications in their region"
  on public.loan_applications for select using (
    exists (
      select 1 from public.lender_profiles
      where lender_profiles.user_id = auth.uid()
    )
  );

create policy "Farmers can insert own applications"
  on public.loan_applications for insert with check (auth.uid() = farmer_id);

create policy "Lenders can update applications"
  on public.loan_applications for update using (
    exists (
      select 1 from public.lender_profiles
      where lender_profiles.user_id = auth.uid()
    )
  );

-- Knowledge articles policies
create policy "Published articles are viewable by everyone"
  on public.knowledge_articles for select using (published = true);

create policy "Authors can view own articles"
  on public.knowledge_articles for select using (auth.uid() = author_id);

create policy "Authors can insert own articles"
  on public.knowledge_articles for insert with check (auth.uid() = author_id);

create policy "Authors can update own articles"
  on public.knowledge_articles for update using (auth.uid() = author_id);

-- Questions policies
create policy "Open questions are viewable by everyone"
  on public.questions for select using (status = 'open');

create policy "Askers can view own questions"
  on public.questions for select using (auth.uid() = asker_id);

create policy "Users can insert own questions"
  on public.questions for insert with check (auth.uid() = asker_id);

create policy "Responders can update assigned questions"
  on public.questions for update using (auth.uid() = responder_id);

-- Updated_at triggers for new tables
create trigger on_cooperative_profile_updated
  before update on public.cooperative_profiles
  for each row execute procedure public.handle_updated_at();

create trigger on_extension_profile_updated
  before update on public.extension_profiles
  for each row execute procedure public.handle_updated_at();

create trigger on_lender_profile_updated
  before update on public.lender_profiles
  for each row execute procedure public.handle_updated_at();

create trigger on_loan_application_updated
  before update on public.loan_applications
  for each row execute procedure public.handle_updated_at();

create trigger on_knowledge_article_updated
  before update on public.knowledge_articles
  for each row execute procedure public.handle_updated_at();

create trigger on_question_updated
  before update on public.questions
  for each row execute procedure public.handle_updated_at();
