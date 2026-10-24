UPDATE public.services
SET overview_heading = concat_ws(
  ' ',
  nullif(btrim(overview_heading), ''),
  nullif(btrim(title), '')
)
WHERE btrim(title) <> ''
  AND right(btrim(overview_heading), length(btrim(title))) <> btrim(title);
