
-- Enums
CREATE TYPE public.ride_status AS ENUM ('pending','confirmed','completed','cancelled');
CREATE TYPE public.payment_status AS ENUM ('unpaid','paid','refunded','partial');
CREATE TYPE public.customer_tag AS ENUM ('VIP','Corporate','Frequent');

-- Customers
CREATE TABLE public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  home_address TEXT,
  company_name TEXT,
  preferred_vehicle TEXT,
  notes TEXT,
  tags public.customer_tag[] NOT NULL DEFAULT '{}',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_customers_search ON public.customers USING gin (
  to_tsvector('simple', coalesce(full_name,'') || ' ' || coalesce(email,'') || ' ' || coalesce(phone,''))
);
CREATE INDEX idx_customers_name ON public.customers (full_name);

-- Bookings
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  pickup_location TEXT NOT NULL,
  dropoff_location TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  chauffeur_assigned TEXT,
  vehicle TEXT,
  ride_status public.ride_status NOT NULL DEFAULT 'pending',
  payment_status public.payment_status NOT NULL DEFAULT 'unpaid',
  amount NUMERIC(10,2) NOT NULL DEFAULT 0,
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_bookings_customer ON public.bookings (customer_id);
CREATE INDEX idx_bookings_date ON public.bookings (booking_date);

-- Customer notes timeline
CREATE TABLE public.customer_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_customer_notes_customer ON public.customer_notes (customer_id);

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

CREATE TRIGGER trg_customers_touch BEFORE UPDATE ON public.customers
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_bookings_touch BEFORE UPDATE ON public.bookings
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- RLS
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_notes ENABLE ROW LEVEL SECURITY;

-- Single-admin model: any authenticated user has full access
CREATE POLICY "auth full access customers" ON public.customers
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth full access bookings" ON public.bookings
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth full access notes" ON public.customer_notes
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Stats view for customers
CREATE OR REPLACE VIEW public.customer_stats AS
SELECT
  c.id AS customer_id,
  COUNT(b.id) AS total_trips,
  COALESCE(SUM(b.amount) FILTER (WHERE b.payment_status = 'paid'), 0) AS total_amount_spent
FROM public.customers c
LEFT JOIN public.bookings b ON b.customer_id = c.id
GROUP BY c.id;
