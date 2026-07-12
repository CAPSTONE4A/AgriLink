-- Seed data for AgriLink demo
-- Run this after migrations: supabase db reset or via SQL Editor

-- Insert demo farmer
insert into public.profiles (id, role, full_name, email, phone, address, barangay, municipality, province)
values (
  '11111111-1111-1111-1111-111111111111',
  'farmer',
  'Mang Romy',
  'mangromy@example.com',
  '09171234567',
  'Calauan, Laguna',
  'Calauan',
  'Calauan',
  'Laguna'
) on conflict (id) do nothing;

insert into public.farmer_profiles (user_id, farm_name, farm_type, farm_size_hectares, crops_grown, years_farming)
values (
  '11111111-1111-1111-1111-111111111111',
  'Romy Rice Farm',
  'Rice',
  2.5,
  '["Rice", "Corn"]'::jsonb,
  15
) on conflict (user_id) do nothing;

-- Insert demo buyer
insert into public.profiles (id, role, full_name, email, phone, address, barangay, municipality, province)
values (
  '22222222-2222-2222-2222-222222222222',
  'buyer',
  'Ate Linda',
  'atelinda@example.com',
  '09287654321',
  'Los Baños, Laguna',
  'Los Baños',
  'Los Baños',
  'Laguna'
) on conflict (id) do nothing;

insert into public.buyer_profiles (user_id, business_name, business_type, preferred_crops, typical_order_volume)
values (
  '22222222-2222-2222-2222-222222222222',
  'Linda Vegetable Supply',
  'Retailer',
  '["Tomatoes", "Pechay", "Corn"]'::jsonb,
  '50-100 kg per order'
) on conflict (user_id) do nothing;

-- Insert demo cooperative
insert into public.profiles (id, role, full_name, email, phone, address, barangay, municipality, province)
values (
  '33333333-3333-3333-3333-333333333333',
  'cooperative',
  'Kuya Tonyo',
  'tonyo@coop.example.com',
  '09331112222',
  'Bay, Laguna',
  'Bay',
  'Bay',
  'Laguna'
) on conflict (id) do nothing;

insert into public.cooperative_profiles (user_id, cooperative_name, registration_number, member_count, total_shared_land_hectares, description)
values (
  '33333333-3333-3333-3333-333333333333',
  'Laguna Farmers Cooperative',
  'LFC-2024-001',
  45,
  120.5,
  'A cooperative of smallholder farmers in Laguna focused on rice and vegetable production.'
) on conflict (user_id) do nothing;

-- Insert demo extension worker
insert into public.profiles (id, role, full_name, email, phone, address, barangay, municipality, province)
values (
  '44444444-4444-4444-4444-444444444444',
  'extension',
  'Dr. Maria Santos',
  'maria.santos@da.gov.ph',
  '09445556666',
  'Laguna',
  'Laguna',
  'Santa Cruz',
  'Laguna'
) on conflict (id) do nothing;

insert into public.extension_profiles (user_id, agency_name, region, province, municipality, specialization, years_experience)
values (
  '44444444-4444-4444-4444-444444444444',
  'Department of Agriculture',
  'Region IV-A',
  'Laguna',
  'Santa Cruz',
  'Crop Protection',
  12
) on conflict (user_id) do nothing;

-- Insert demo lender
insert into public.profiles (id, role, full_name, email, phone, address, barangay, municipality, province)
values (
  '55555555-5555-5555-5555-555555555555',
  'lender',
  'Landbank Laguna',
  'landbank.laguna@landbank.com',
  '09775557777',
  'Laguna',
  'Laguna',
  'Santa Cruz',
  'Laguna'
) on conflict (id) do nothing;

insert into public.lender_profiles (user_id, institution_name, institution_type, region, contact_person, phone, email)
values (
  '55555555-5555-5555-5555-555555555555',
  'Landbank of the Philippines',
  'Government Bank',
  'Region IV-A',
  'Juan Dela Cruz',
  '09775557777',
  'landbank.laguna@landbank.com'
) on conflict (user_id) do nothing;

-- Insert demo listings
insert into public.listings (id, farmer_id, title, description, category, price_per_unit, unit, quantity_available, location, badge, status, harvest_date)
values
  ('66666666-6666-6666-6666-666666666666', '11111111-1111-1111-1111-111111111111', 'Freshly Harvested Palay', 'Premium quality palay from Calauan, Laguna.', 'Grains', 22.50, 'kg', 500, 'Calauan, Laguna', 'Hot', 'active', '2024-07-10'),
  ('77777777-7777-7777-7777-777777777777', '11111111-1111-1111-1111-111111111111', 'Sweet Corn (White)', 'Sweet white corn, freshly picked.', 'Vegetables', 18.00, 'kg', 200, 'Bay, Laguna', 'New', 'active', '2024-07-12'),
  ('88888888-8888-8888-8888-888888888888', '11111111-1111-1111-1111-111111111111', 'Organic Tomatoes', 'Organically grown tomatoes.', 'Vegetables', 45.00, 'kg', 80, 'Los Baños, Laguna', 'Organic', 'active', '2024-07-08'),
  ('99999999-9999-9999-9999-999999999999', '11111111-1111-1111-1111-111111111111', 'Native Pechay', 'Fresh native pechay from Victoria.', 'Vegetables', 35.00, 'kg', 150, 'Victoria, Laguna', 'Certified', 'active', '2024-07-11')
on conflict (id) do nothing;

-- Insert demo orders
insert into public.orders (id, buyer_id, listing_id, status, total_amount, quantity, delivery_method, delivery_address)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222222', '88888888-8888-8888-8888-888888888888', 'Delivered', 3600, 80, 'Pickup', 'Los Baños, Laguna'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', '99999999-9999-9999-9999-999999999999', 'Pending', 1750, 50, 'Delivery', 'Los Baños, Laguna'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '22222222-2222-2222-2222-222222222222', '77777777-7777-7777-7777-777777777777', 'Processing', 2160, 120, 'Pickup', 'Los Baños, Laguna')
on conflict (id) do nothing;

-- Insert demo loan applications
insert into public.loan_applications (id, farmer_id, amount, purpose, term_months, interest_rate, status)
values
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', '11111111-1111-1111-1111-111111111111', 50000, 'Farm equipment purchase', 12, 8.5, 'pending'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '11111111-1111-1111-1111-111111111111', 25000, 'Seeds and fertilizer', 6, 7.0, 'approved')
on conflict (id) do nothing;

-- Insert demo knowledge articles
insert into public.knowledge_articles (id, author_id, title, content, category, tags, region, published, published_at)
values
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', '44444444-4444-4444-4444-444444444444', 'Rice Pest Management Guide', 'Comprehensive guide on identifying and managing common rice pests in Laguna.', 'Crop Protection', '["rice", "pests", "IPM"]'::jsonb, 'Region IV-A', true, '2024-07-01'),
  ('gggggggg-gggg-gggg-gggg-gggggggggggg', '44444444-4444-4444-4444-444444444444', 'Organic Farming Techniques', 'Introduction to organic farming methods for smallholder farmers.', 'Organic Farming', '["organic", "sustainable"]'::jsonb, 'Region IV-A', true, '2024-06-15')
on conflict (id) do nothing;

-- Insert demo questions
insert into public.questions (id, asker_id, title, body, category, region, status)
values
  ('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', '11111111-1111-1111-1111-111111111111', 'How to control brown planthopper?', 'My rice field is infested with brown planthoppers. What is the best organic control method?', 'Pest Management', 'Laguna', 'open'),
  ('iiiiiiii-iiii-iiii-iiii-iiiiiiiiiiii', '22222222-2222-2222-2222-222222222222', 'Best practices for tomato storage', 'What are the recommended storage conditions for organic tomatoes to extend shelf life?', 'Post-Harvest', 'Laguna', 'answered')
on conflict (id) do nothing;
