ALTER TABLE public.customers
  ADD COLUMN IF NOT EXISTS billing_details TEXT,
  ADD COLUMN IF NOT EXISTS chauffeur_preference TEXT,
  ADD COLUMN IF NOT EXISTS account_status TEXT NOT NULL DEFAULT 'active';