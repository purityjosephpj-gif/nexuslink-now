-- Create ENUM types
CREATE TYPE public.user_role AS ENUM ('admin', 'seller', 'driver', 'customer');
CREATE TYPE public.ride_status AS ENUM ('requested', 'accepted', 'in_progress', 'completed', 'cancelled');
CREATE TYPE public.payment_type AS ENUM ('till', 'paybill', 'card', 'cash');
CREATE TYPE public.payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE public.service_category AS ENUM ('cleaning', 'delivery', 'repair', 'moving', 'other');
CREATE TYPE public.product_category AS ENUM ('electronics', 'clothing', 'food', 'home', 'books', 'other');

-- Create users table
CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    role user_role NOT NULL DEFAULT 'customer',
    verified BOOLEAN DEFAULT false,
    id_number TEXT,
    license_number TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    category product_category NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create services table
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    category service_category NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create rides table
CREATE TABLE public.rides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    customer_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    status ride_status DEFAULT 'requested',
    price DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create payments table
CREATE TABLE public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    type payment_type NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status payment_status DEFAULT 'pending',
    reference_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create analytics table
CREATE TABLE public.analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    revenue DECIMAL(12,2) DEFAULT 0,
    orders_count INTEGER DEFAULT 0,
    rides_count INTEGER DEFAULT 0,
    users_count INTEGER DEFAULT 0,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON public.users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Create RLS policies for products table
CREATE POLICY "Anyone can view products" ON public.products
    FOR SELECT USING (true);

CREATE POLICY "Sellers can create products" ON public.products
    FOR INSERT WITH CHECK (
        auth.uid() = seller_id AND
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('seller', 'admin')
        )
    );

CREATE POLICY "Sellers can update their own products" ON public.products
    FOR UPDATE USING (
        auth.uid() = seller_id AND
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('seller', 'admin')
        )
    );

CREATE POLICY "Sellers can delete their own products" ON public.products
    FOR DELETE USING (
        auth.uid() = seller_id AND
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('seller', 'admin')
        )
    );

-- Create RLS policies for services table
CREATE POLICY "Anyone can view services" ON public.services
    FOR SELECT USING (true);

CREATE POLICY "Sellers can create services" ON public.services
    FOR INSERT WITH CHECK (
        auth.uid() = seller_id AND
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('seller', 'admin')
        )
    );

CREATE POLICY "Sellers can update their own services" ON public.services
    FOR UPDATE USING (
        auth.uid() = seller_id AND
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('seller', 'admin')
        )
    );

CREATE POLICY "Sellers can delete their own services" ON public.services
    FOR DELETE USING (
        auth.uid() = seller_id AND
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('seller', 'admin')
        )
    );

-- Create RLS policies for rides table
CREATE POLICY "Users can view their own rides" ON public.rides
    FOR SELECT USING (auth.uid() IN (driver_id, customer_id));

CREATE POLICY "Customers can create rides" ON public.rides
    FOR INSERT WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Drivers and customers can update rides" ON public.rides
    FOR UPDATE USING (auth.uid() IN (driver_id, customer_id));

CREATE POLICY "Admins can view all rides" ON public.rides
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Create RLS policies for payments table
CREATE POLICY "Users can view their own payments" ON public.payments
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create payments" ON public.payments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all payments" ON public.payments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Create RLS policies for analytics table
CREATE POLICY "Admins can view analytics" ON public.analytics
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can insert analytics" ON public.analytics
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Create function to update updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_rides_updated_at BEFORE UPDATE ON public.rides
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert mock users
INSERT INTO public.users (id, name, email, phone, role, verified, id_number, license_number) VALUES
('11111111-1111-1111-1111-111111111111', 'Admin User', 'admin@quicklinks.co.ke', '0111679286', 'admin', true, '12345678', null),
('22222222-2222-2222-2222-222222222222', 'John Seller', 'john@quicklinks.co.ke', '0717562660', 'seller', true, '23456789', 'SL123456'),
('33333333-3333-3333-3333-333333333333', 'Jane Driver', 'jane@quicklinks.co.ke', '0712345678', 'driver', true, '34567890', 'DL123456'),
('44444444-4444-4444-4444-444444444444', 'Bob Customer', 'bob@quicklinks.co.ke', '0723456789', 'customer', true, null, null),
('55555555-5555-5555-5555-555555555555', 'Alice Seller', 'alice@quicklinks.co.ke', '0734567890', 'seller', true, '45678901', 'SL789012'),
('66666666-6666-6666-6666-666666666666', 'Mike Driver', 'mike@quicklinks.co.ke', '0745678901', 'driver', true, '56789012', 'DL789012');

-- Insert mock products
INSERT INTO public.products (seller_id, title, description, category, price, stock, image_url) VALUES
('22222222-2222-2222-2222-222222222222', 'Samsung Galaxy A54', 'Latest Android smartphone with excellent camera', 'electronics', 45000.00, 15, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9'),
('22222222-2222-2222-2222-222222222222', 'Nike Air Max', 'Comfortable running shoes for athletes', 'clothing', 8500.00, 25, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff'),
('55555555-5555-5555-5555-555555555555', 'MacBook Air M2', 'Apple laptop with M2 chip, perfect for work', 'electronics', 125000.00, 5, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8'),
('55555555-5555-5555-5555-555555555555', 'Organic Coffee Beans', 'Premium Kenyan coffee beans, freshly roasted', 'food', 1200.00, 50, 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e'),
('22222222-2222-2222-2222-222222222222', 'Wireless Headphones', 'Bluetooth headphones with noise cancellation', 'electronics', 6500.00, 20, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e');

-- Insert mock services
INSERT INTO public.services (seller_id, title, description, category, price, image_url) VALUES
('22222222-2222-2222-2222-222222222222', 'House Cleaning', 'Professional cleaning service for homes and offices', 'cleaning', 2500.00, 'https://images.unsplash.com/photo-1581578731548-c64695cc6952'),
('55555555-5555-5555-5555-555555555555', 'Package Delivery', 'Same-day delivery service within Kerugoya', 'delivery', 500.00, 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088'),
('22222222-2222-2222-2222-222222222222', 'Appliance Repair', 'Repair services for electronics and appliances', 'repair', 1500.00, 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e'),
('55555555-5555-5555-5555-555555555555', 'Moving Service', 'Professional moving and relocation services', 'moving', 5000.00, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13'),
('22222222-2222-2222-2222-222222222222', 'Plumbing Service', 'Emergency plumbing repairs and installations', 'repair', 2000.00, 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39');

-- Insert mock rides
INSERT INTO public.rides (driver_id, customer_id, origin, destination, status, price) VALUES
('33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', 'Kerugoya Town', 'Karatina Market', 'completed', 800.00),
('66666666-6666-6666-6666-666666666666', '44444444-4444-4444-4444-444444444444', 'Kerugoya Hospital', 'Kutus Shopping Center', 'in_progress', 600.00),
('33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', 'Kerugoya Bus Station', 'Kerugoya High School', 'requested', 400.00);

-- Insert mock payments
INSERT INTO public.payments (user_id, type, amount, status, reference_id) VALUES
('44444444-4444-4444-4444-444444444444', 'till', 800.00, 'completed', 'TXN123456'),
('44444444-4444-4444-4444-444444444444', 'paybill', 2500.00, 'completed', 'TXN123457'),
('44444444-4444-4444-4444-444444444444', 'card', 45000.00, 'pending', 'TXN123458');

-- Insert analytics data
INSERT INTO public.analytics (revenue, orders_count, rides_count, users_count) VALUES
(153700.00, 47, 23, 2000);

-- Create indexes for better performance
CREATE INDEX idx_products_seller_id ON public.products(seller_id);
CREATE INDEX idx_services_seller_id ON public.services(seller_id);
CREATE INDEX idx_rides_driver_id ON public.rides(driver_id);
CREATE INDEX idx_rides_customer_id ON public.rides(customer_id);
CREATE INDEX idx_payments_user_id ON public.payments(user_id);
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_services_category ON public.services(category);