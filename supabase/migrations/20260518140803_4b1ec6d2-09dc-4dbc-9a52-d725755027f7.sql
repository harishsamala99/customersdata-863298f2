-- customers
DROP POLICY IF EXISTS "admin select customers" ON public.customers;
DROP POLICY IF EXISTS "admin insert customers" ON public.customers;
DROP POLICY IF EXISTS "admin update customers" ON public.customers;
DROP POLICY IF EXISTS "admin delete customers" ON public.customers;
CREATE POLICY "public all customers" ON public.customers FOR ALL USING (true) WITH CHECK (true);

-- bookings
DROP POLICY IF EXISTS "admin select bookings" ON public.bookings;
DROP POLICY IF EXISTS "admin insert bookings" ON public.bookings;
DROP POLICY IF EXISTS "admin update bookings" ON public.bookings;
DROP POLICY IF EXISTS "admin delete bookings" ON public.bookings;
CREATE POLICY "public all bookings" ON public.bookings FOR ALL USING (true) WITH CHECK (true);

-- customer_notes
DROP POLICY IF EXISTS "admin select notes" ON public.customer_notes;
DROP POLICY IF EXISTS "admin insert notes" ON public.customer_notes;
DROP POLICY IF EXISTS "admin delete notes" ON public.customer_notes;
CREATE POLICY "public all notes" ON public.customer_notes FOR ALL USING (true) WITH CHECK (true);