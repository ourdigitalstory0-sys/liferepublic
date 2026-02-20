-- Create posts table
create table public.posts (
  id uuid not null default gen_random_uuid (),
  title text not null,
  slug text not null,
  excerpt text null,
  content text not null,
  image text null,
  author text null default 'Admin'::text,
  published boolean null default false,
  published_at timestamp with time zone null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone null default now(),
  tags text[] null,
  meta_title text null,
  meta_description text null,
  constraint posts_pkey primary key (id),
  constraint posts_slug_key unique (slug)
);

-- Enable RLS
alter table public.posts enable row level security;

-- Create policies
create policy "Enable read access for all users"
on public.posts for select
using (true);

create policy "Enable insert for authenticated users only"
on public.posts for insert
to authenticated
with check (true);

create policy "Enable update for authenticated users only"
on public.posts for update
to authenticated
using (true);

create policy "Enable delete for authenticated users only"
on public.posts for delete
to authenticated
using (true);

-- Create updated_at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger handle_posts_updated_at
before update on public.posts
for each row
execute procedure public.handle_updated_at();
