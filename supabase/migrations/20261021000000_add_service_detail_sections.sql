ALTER TABLE public.services
  ADD COLUMN IF NOT EXISTS process_heading text,
  ADD COLUMN IF NOT EXISTS process_steps jsonb,
  ADD COLUMN IF NOT EXISTS why_choose_us jsonb;
