-- Add RERA column to projects table
alter table public.projects 
add column if not exists rera text;

-- Verify the column was added
select * from public.projects limit 1;
