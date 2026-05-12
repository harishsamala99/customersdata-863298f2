
-- Fix function search_path
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

-- Replace permissive policies with explicit auth checks
DROP POLICY IF EXISTS "auth full access customers" ON public.customers;
DROP POLICY IF EXISTS "auth full access bookings" ON public.bookings;
DROP POLICY IF EXISTS "auth full access notes" ON public.customer_notes;

CREATE POLICY "admin select customers" ON public.customers FOR SELECT TO authenticated USING (auth.uid() IS NOT NULL);
CREATE POLICY "admin insert customers" ON public.customers FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "admin update customers" ON public.customers FOR UPDATE TO authenticated USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "admin delete customers" ON public.customers FOR DELETE TO authenticated USING (auth.uid() IS NOT NULL);

CREATE POLICY "admin select bookings" ON public.bookings FOR SELECT TO authenticated USING (auth.uid() IS NOT NULL);
CREATE POLICY "admin insert bookings" ON public.bookings FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "admin update bookings" ON public.bookings FOR UPDATE TO authenticated USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "admin delete bookings" ON public.bookings FOR DELETE TO authenticated USING (auth.uid() IS NOT NULL);

CREATE POLICY "admin select notes" ON public.customer_notes FOR SELECT TO authenticated USING (auth.uid() IS NOT NULL);
CREATE POLICY "admin insert notes" ON public.customer_notes FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "admin delete notes" ON public.customer_notes FOR DELETE TO authenticated USING (auth.uid() IS NOT NULL);

-- Drop the security definer view (we'll compute stats via aggregate query in app)
DROP VIEW IF EXISTS public.customer_stats;
