ALTER TABLE public.blogs
  ADD COLUMN IF NOT EXISTS published_at timestamptz;
