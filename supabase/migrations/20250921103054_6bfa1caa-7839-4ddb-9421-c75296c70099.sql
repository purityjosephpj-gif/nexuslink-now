-- Create ENUM types
CREATE TYPE public.user_role AS ENUM ('admin', 'seller', 'driver', 'customer');
CREATE TYPE public.ride_status AS ENUM ('requested', 'accepted', 'in_progress', 'completed', 'cancelled');
CREATE TYPE public.payment_type AS ENUM ('till', 'paybill', 'card', 'cash');
CREATE TYPE public.payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE public.service_category AS ENUM ('cleaning', 'delivery', 'repair', 'moving', 'other');
CREATE TYPE public.product_category AS ENUM ('electronics', 'clothing', 'food', 'home', 'books', 'other');

-- Add columns to existing users table
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS role user_role DEFAULT 'customer';
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS verified BOOLEAN DEFAULT false;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS id_number TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS license_number TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create products table
CREATE TABLE public.products (
    id SERIAL PRIMARY KEY,
    seller_id INTEGER REFERENCES public.users(id) ON DELETE CASCADE,
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
    id SERIAL PRIMARY KEY,
    seller_id INTEGER REFERENCES public.users(id) ON DELETE CASCADE,
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
    id SERIAL PRIMARY KEY,
    driver_id INTEGER REFERENCES public.users(id) ON DELETE SET NULL,
    customer_id INTEGER REFERENCES public.users(id) ON DELETE CASCADE,
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    status ride_status DEFAULT 'requested',
    price DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create payments table
CREATE TABLE public.payments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES public.users(id) ON DELETE CASCADE,
    type payment_type NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status payment_status DEFAULT 'pending',
    reference_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create analytics table
CREATE TABLE public.analytics (
    id SERIAL PRIMARY KEY,
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

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;

-- Create RLS policies for products table
CREATE POLICY "Anyone can view products" ON public.products
    FOR SELECT USING (true);

-- Create RLS policies for services table
CREATE POLICY "Anyone can view services" ON public.services
    FOR SELECT USING (true);

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

-- Insert mock users with extended data
INSERT INTO public.users (name, email, phone, role, verified, id_number, license_number) VALUES
('Admin User', 'admin@quicklinks.co.ke', '0111679286', 'admin', true, '12345678', null),
('John Seller', 'john@quicklinks.co.ke', '0717562660', 'seller', true, '23456789', 'SL123456'),
('Jane Driver', 'jane@quicklinks.co.ke', '0712345678', 'driver', true, '34567890', 'DL123456'),
('Bob Customer', 'bob@quicklinks.co.ke', '0723456789', 'customer', true, null, null),
('Alice Seller', 'alice@quicklinks.co.ke', '0734567890', 'seller', true, '45678901', 'SL789012'),
('Mike Driver', 'mike@quicklinks.co.ke', '0745678901', 'driver', true, '56789012', 'DL789012');

-- Insert mock products
INSERT INTO public.products (seller_id, title, description, category, price, stock, image_url) VALUES
(2, 'Samsung Galaxy A54', 'Latest Android smartphone with excellent camera', 'electronics', 45000.00, 15, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9'),
(2, 'Nike Air Max', 'Comfortable running shoes for athletes', 'clothing', 8500.00, 25, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff'),
(5, 'MacBook Air M2', 'Apple laptop with M2 chip, perfect for work', 'electronics', 125000.00, 5, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8'),
(5, 'Organic Coffee Beans', 'Premium Kenyan coffee beans, freshly roasted', 'food', 1200.00, 50, 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e'),
(2, 'Wireless Headphones', 'Bluetooth headphones with noise cancellation', 'electronics', 6500.00, 20, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e');

-- Insert mock services
INSERT INTO public.services (seller_id, title, description, category, price, image_url) VALUES
(2, 'House Cleaning', 'Professional cleaning service for homes and offices', 'cleaning', 2500.00, 'https://images.unsplash.com/photo-1581578731548-c64695cc6952'),
(5, 'Package Delivery', 'Same-day delivery service within Kerugoya', 'delivery', 500.00, 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088'),
(2, 'Appliance Repair', 'Repair services for electronics and appliances', 'repair', 1500.00, 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e'),
(5, 'Moving Service', 'Professional moving and relocation services', 'moving', 5000.00, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13'),
(2, 'Plumbing Service', 'Emergency plumbing repairs and installations', 'repair', 2000.00, 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39');

-- Insert mock rides
INSERT INTO public.rides (driver_id, customer_id, origin, destination, status, price) VALUES
(3, 4, 'Kerugoya Town', 'Karatina Market', 'completed', 800.00),
(6, 4, 'Kerugoya Hospital', 'Kutus Shopping Center', 'in_progress', 600.00),
(3, 4, 'Kerugoya Bus Station', 'Kerugoya High School', 'requested', 400.00);

-- Insert mock payments
INSERT INTO public.payments (user_id, type, amount, status, reference_id) VALUES
(4, 'till', 800.00, 'completed', 'TXN123456'),
(4, 'paybill', 2500.00, 'completed', 'TXN123457'),
(4, 'card', 45000.00, 'pending', 'TXN123458');

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