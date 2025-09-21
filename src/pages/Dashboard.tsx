import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Users, DollarSign, Car, Package } from 'lucide-react';

interface Analytics {
  revenue: number;
  orders_count: number;
  rides_count: number;
  users_count: number;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  category: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
}

export const Dashboard = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch analytics
        const { data: analyticsData } = await supabase
          .from('analytics')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(1)
          .single();

        if (analyticsData) {
          setAnalytics(analyticsData);
        }

        // Fetch products
        const { data: productsData } = await supabase
          .from('products')
          .select('*')
          .limit(6);

        if (productsData) {
          setProducts(productsData);
        }

        // Fetch services
        const { data: servicesData } = await supabase
          .from('services')
          .select('*')
          .limit(6);

        if (servicesData) {
          setServices(servicesData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <Badge variant="outline" className="text-sm">
          QuickLinks Services - Everywhere in Kenya
        </Badge>
      </div>

      {/* Stats Cards */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KES {analytics.revenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Merchants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,000</div>
              <p className="text-xs text-muted-foreground">
                +15% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Happy Customers</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,000</div>
              <p className="text-xs text-muted-foreground">
                +25% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drivers Online</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">100</div>
              <p className="text-xs text-muted-foreground">
                +5% from last hour
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Products Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Products</CardTitle>
          <CardDescription>Latest products added to the marketplace</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <img 
                  src={product.image_url} 
                  alt={product.title}
                  className="w-full h-32 object-cover rounded mb-3"
                />
                <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">KES {product.price.toLocaleString()}</span>
                  <Badge variant="secondary">{product.category}</Badge>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Stock: {product.stock} units
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Services Section */}
      <Card>
        <CardHeader>
          <CardTitle>Available Services</CardTitle>
          <CardDescription>Services offered by our trusted professionals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <div key={service.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <img 
                  src={service.image_url} 
                  alt={service.title}
                  className="w-full h-32 object-cover rounded mb-3"
                />
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">KES {service.price.toLocaleString()}</span>
                  <Badge variant="secondary">{service.category}</Badge>
                </div>
                <Button className="w-full mt-3" size="sm">
                  Request Service
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact QuickLinks</CardTitle>
          <CardDescription>Get in touch with us for support or inquiries</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="font-medium">Phone:</span>
            <span>0111679286 / 0717562660</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-medium">Service Area:</span>
            <span>Everywhere in Kenya (Currently based in Kerugoya)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-medium">Support:</span>
            <span>24/7 Available</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};