ALTER TABLE public.services
  ADD COLUMN IF NOT EXISTS overview_heading text;

UPDATE public.services
SET overview_heading = 'What you get with our'
WHERE overview_heading IS NULL OR btrim(overview_heading) = '';

ALTER TABLE public.services
  ALTER COLUMN overview_heading SET DEFAULT 'What you get with our',
  ALTER COLUMN overview_heading SET NOT NULL;
