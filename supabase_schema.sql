-- Create a table for public profiles linked to Supabase auth.users
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  first_name text,
  last_name text,
  company text,
  role text default 'user', -- 'user' or 'admin' 
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- Create a trigger to automatically create a profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, first_name, last_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- Create table for Products (3D Models in Shop)
create table public.products (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  price numeric(10,2) not null,
  category text,
  image_url text,
  rating numeric(3,2),
  reviews_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for products
alter table public.products enable row level security;
create policy "Products are viewable by everyone." on public.products for select using (true);
-- Only admins can insert/update/delete (handled by roles or manual inserts in dashboard for now)


-- Create table for Materials (Pricing & Request options)
create table public.materials (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  type text, -- 'SLA', 'FDM', 'SLS'
  price_per_cm3 numeric(10,2) not null,
  tensile_strength text,
  heat_deflection text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for materials
alter table public.materials enable row level security;
create policy "Materials are viewable by everyone." on public.materials for select using (true);


-- Create table for Custom Quotes (Requests)
create table public.quotes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  material_id uuid references public.materials(id),
  file_url text not null, -- URL to the STL stored in Supabase Storage
  status text default 'pending', -- 'pending', 'analyzing', 'quoted', 'rejected', 'accepted'
  estimated_cost numeric(10,2),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for quotes
alter table public.quotes enable row level security;
create policy "Users can view their own quotes" on public.quotes for select using (auth.uid() = user_id);
create policy "Users can insert their own quotes" on public.quotes for insert with check (auth.uid() = user_id);


-- Create table for Orders
create table public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  status text default 'processing', -- 'processing', 'printing', 'shipping', 'delivered'
  total_amount numeric(10,2) not null,
  shipping_address jsonb,
  tracking_number text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for orders
alter table public.orders enable row level security;
create policy "Users can view their own orders" on public.orders for select using (auth.uid() = user_id);
create policy "Users can insert their own orders" on public.orders for insert with check (auth.uid() = user_id);


-- Create table for Order Items
create table public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id), -- If they bought a pre-made model
  quote_id uuid references public.quotes(id), -- If they bought a custom quote
  quantity integer default 1 not null,
  unit_price numeric(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for order_items
alter table public.order_items enable row level security;
create policy "Users can view their own order items" on public.order_items
  for select using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

-- Create storage bucket for STL uploads
insert into storage.buckets (id, name, public) values ('stl_uploads', 'stl_uploads', true);

-- Enable RLS for storage (Assume users must be logged in to upload, but anyone can read for now to render previews)
create policy "Anyone can view files" on storage.objects for select using ( bucket_id = 'stl_uploads' );
create policy "Authenticated users can upload files" on storage.objects for insert with check ( bucket_id = 'stl_uploads' and auth.role() = 'authenticated' );
create policy "Users can update their own files" on storage.objects for update using ( bucket_id = 'stl_uploads' and auth.uid() = owner );
create policy "Users can delete their own files" on storage.objects for delete using ( bucket_id = 'stl_uploads' and auth.uid() = owner );

-- Create storage bucket for Product images
insert into storage.buckets (id, name, public) values ('product_images', 'product_images', true);
create policy "Public images are viewable by everyone" on storage.objects for select using ( bucket_id = 'product_images' );
