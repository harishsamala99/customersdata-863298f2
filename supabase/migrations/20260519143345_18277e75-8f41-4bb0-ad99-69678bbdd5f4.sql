
ALTER TABLE public.customers
  ADD COLUMN IF NOT EXISTS date_of_birth date,
  ADD COLUMN IF NOT EXISTS billing_address text,
  ADD COLUMN IF NOT EXISTS shipping_address text,
  ADD COLUMN IF NOT EXISTS id_type text,
  ADD COLUMN IF NOT EXISTS id_number text,
  ADD COLUMN IF NOT EXISTS card_holder_name text,
  ADD COLUMN IF NOT EXISTS card_brand text,
  ADD COLUMN IF NOT EXISTS card_last4 text,
  ADD COLUMN IF NOT EXISTS card_exp_month smallint,
  ADD COLUMN IF NOT EXISTS card_exp_year smallint;

ALTER TABLE public.customers
  ADD CONSTRAINT customers_card_last4_chk CHECK (card_last4 IS NULL OR card_last4 ~ '^[0-9]{4}$'),
  ADD CONSTRAINT customers_card_exp_month_chk CHECK (card_exp_month IS NULL OR (card_exp_month BETWEEN 1 AND 12)),
  ADD CONSTRAINT customers_card_exp_year_chk CHECK (card_exp_year IS NULL OR (card_exp_year BETWEEN 2024 AND 2100));
