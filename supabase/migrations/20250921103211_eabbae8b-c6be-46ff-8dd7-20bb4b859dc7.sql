-- Fix security definer function search path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- Add missing RLS policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid()::text = id::text);

-- Add missing RLS policies for rides table
CREATE POLICY "Users can view their own rides" ON public.rides
    FOR SELECT USING (auth.uid()::text::integer IN (driver_id, customer_id));

CREATE POLICY "Customers can create rides" ON public.rides
    FOR INSERT WITH CHECK (auth.uid()::text::integer = customer_id);

-- Add missing RLS policies for payments table
CREATE POLICY "Users can view their own payments" ON public.payments
    FOR SELECT USING (auth.uid()::text::integer = user_id);

CREATE POLICY "Users can create payments" ON public.payments
    FOR INSERT WITH CHECK (auth.uid()::text::integer = user_id);

-- Add missing RLS policies for analytics table
CREATE POLICY "Public can view analytics" ON public.analytics
    FOR SELECT USING (true);

-- Insert mock users with your contact information
INSERT INTO public.users (name, email, phone, role, verified, id_number, license_number) VALUES
('Admin User', 'admin@quicklinks.co.ke', '0111679286', 'admin', true, '12345678', null),
('John Seller', 'john@quicklinks.co.ke', '0717562660', 'seller', true, '23456789', 'SL123456'),
('Jane Driver', 'jane@quicklinks.co.ke', '0712345678', 'driver', true, '34567890', 'DL123456'),
('Bob Customer', 'bob@quicklinks.co.ke', '0723456789', 'customer', true, null, null),
('Alice Seller', 'alice@quicklinks.co.ke', '0734567890', 'seller', true, '45678901', 'SL789012'),
('Mike Driver', 'mike@quicklinks.co.ke', '0745678901', 'driver', true, '56789012', 'DL789012')
ON CONFLICT (email) DO NOTHING;

-- Get the inserted user IDs for foreign key references
DO $$
DECLARE
    admin_id INTEGER;
    seller1_id INTEGER;
    seller2_id INTEGER;
    driver1_id INTEGER;
    driver2_id INTEGER;
    customer_id INTEGER;
BEGIN
    -- Get user IDs
    SELECT id INTO admin_id FROM public.users WHERE email = 'admin@quicklinks.co.ke';
    SELECT id INTO seller1_id FROM public.users WHERE email = 'john@quicklinks.co.ke';
    SELECT id INTO seller2_id FROM public.users WHERE email = 'alice@quicklinks.co.ke';
    SELECT id INTO driver1_id FROM public.users WHERE email = 'jane@quicklinks.co.ke';
    SELECT id INTO driver2_id FROM public.users WHERE email = 'mike@quicklinks.co.ke';
    SELECT id INTO customer_id FROM public.users WHERE email = 'bob@quicklinks.co.ke';

    -- Insert mock products
    INSERT INTO public.products (seller_id, title, description, category, price, stock, image_url) VALUES
    (seller1_id, 'Samsung Galaxy A54', 'Latest Android smartphone with excellent camera', 'electronics', 45000.00, 15, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9'),
    (seller1_id, 'Nike Air Max', 'Comfortable running shoes for athletes', 'clothing', 8500.00, 25, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff'),
    (seller2_id, 'MacBook Air M2', 'Apple laptop with M2 chip, perfect for work', 'electronics', 125000.00, 5, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8'),
    (seller2_id, 'Organic Coffee Beans', 'Premium Kenyan coffee beans, freshly roasted', 'food', 1200.00, 50, 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e'),
    (seller1_id, 'Wireless Headphones', 'Bluetooth headphones with noise cancellation', 'electronics', 6500.00, 20, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e');

    -- Insert mock services
    INSERT INTO public.services (seller_id, title, description, category, price, image_url) VALUES
    (seller1_id, 'House Cleaning', 'Professional cleaning service for homes and offices', 'cleaning', 2500.00, 'https://images.unsplash.com/photo-1581578731548-c64695cc6952'),
    (seller2_id, 'Package Delivery', 'Same-day delivery service within Kerugoya', 'delivery', 500.00, 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088'),
    (seller1_id, 'Appliance Repair', 'Repair services for electronics and appliances', 'repair', 1500.00, 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e'),
    (seller2_id, 'Moving Service', 'Professional moving and relocation services', 'moving', 5000.00, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13'),
    (seller1_id, 'Plumbing Service', 'Emergency plumbing repairs and installations', 'repair', 2000.00, 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39');

    -- Insert mock rides
    INSERT INTO public.rides (driver_id, customer_id, origin, destination, status, price) VALUES
    (driver1_id, customer_id, 'Kerugoya Town', 'Karatina Market', 'completed', 800.00),
    (driver2_id, customer_id, 'Kerugoya Hospital', 'Kutus Shopping Center', 'in_progress', 600.00),
    (driver1_id, customer_id, 'Kerugoya Bus Station', 'Kerugoya High School', 'requested', 400.00);

    -- Insert mock payments
    INSERT INTO public.payments (user_id, type, amount, status, reference_id) VALUES
    (customer_id, 'till', 800.00, 'completed', 'TXN123456'),
    (customer_id, 'paybill', 2500.00, 'completed', 'TXN123457'),
    (customer_id, 'card', 45000.00, 'pending', 'TXN123458');
END $$;

-- Insert analytics data with updated stats as requested
INSERT INTO public.analytics (revenue, orders_count, rides_count, users_count) VALUES
(153700.00, 47, 23, 2000);