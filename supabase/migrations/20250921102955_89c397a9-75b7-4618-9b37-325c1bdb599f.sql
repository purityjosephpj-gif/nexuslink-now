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

-- Create RLS policies for users table (drop existing if any)
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;

CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid()::text = id::text);

CREATE POLICY "Admins can view all users" ON public.users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id::text = auth.uid()::text AND role = 'admin'
        )
    );

-- Create RLS policies for products table
CREATE POLICY "Anyone can view products" ON public.products
    FOR SELECT USING (true);

CREATE POLICY "Sellers can create products" ON public.products
    FOR INSERT WITH CHECK (
        auth.uid()::text = seller_id::text AND
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id::text = auth.uid()::text AND role IN ('seller', 'admin')
        )
    );

CREATE POLICY "Sellers can update their own products" ON public.products
    FOR UPDATE USING (
        auth.uid()::text = seller_id::text AND
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id::text = auth.uid()::text AND role IN ('seller', 'admin')
        )
    );

CREATE POLICY "Sellers can delete their own products" ON public.products
    FOR DELETE USING (
        auth.uid()::text = seller_id::text AND
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id::text = auth.uid()::text AND role IN ('seller', 'admin')
        )
    );

-- Create RLS policies for services table
CREATE POLICY "Anyone can view services" ON public.services
    FOR SELECT USING (true);

CREATE POLICY "Sellers can create services" ON public.services
    FOR INSERT WITH CHECK (
        auth.uid()::text = seller_id::text AND
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id::text = auth.uid()::text AND role IN ('seller', 'admin')
        )
    );

CREATE POLICY "Sellers can update their own services" ON public.services
    FOR UPDATE USING (
        auth.uid()::text = seller_id::text AND
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id::text = auth.uid()::text AND role IN ('seller', 'admin')
        )
    );

CREATE POLICY "Sellers can delete their own services" ON public.services
    FOR DELETE USING (
        auth.uid()::text = seller_id::text AND
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id::text = auth.uid()::text AND role IN ('seller', 'admin')
        )
    );

-- Create RLS policies for rides table
CREATE POLICY "Users can view their own rides" ON public.rides
    FOR SELECT USING (auth.uid()::text IN (driver_id::text, customer_id::text));

CREATE POLICY "Customers can create rides" ON public.rides
    FOR INSERT WITH CHECK (auth.uid()::text = customer_id::text);

CREATE POLICY "Drivers and customers can update rides" ON public.rides
    FOR UPDATE USING (auth.uid()::text IN (driver_id::text, customer_id::text));

CREATE POLICY "Admins can view all rides" ON public.rides
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id::text = auth.uid()::text AND role = 'admin'
        )
    );

-- Create RLS policies for payments table
CREATE POLICY "Users can view their own payments" ON public.payments
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create payments" ON public.payments
    FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Admins can view all payments" ON public.payments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id::text = auth.uid()::text AND role = 'admin'
        )
    );

-- Create RLS policies for analytics table
CREATE POLICY "Admins can view analytics" ON public.analytics
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id::text = auth.uid()::text AND role = 'admin'
        )
    );

CREATE POLICY "Admins can insert analytics" ON public.analytics
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id::text = auth.uid()::text AND role = 'admin'
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

-- Create indexes for better performance
CREATE INDEX idx_products_seller_id ON public.products(seller_id);
CREATE INDEX idx_services_seller_id ON public.services(seller_id);
CREATE INDEX idx_rides_driver_id ON public.rides(driver_id);
CREATE INDEX idx_rides_customer_id ON public.rides(customer_id);
CREATE INDEX idx_payments_user_id ON public.payments(user_id);
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_services_category ON public.services(category);