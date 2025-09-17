// Removed Link import to avoid router context issues on homepage
import { SimpleHeader } from "@/components/Layout/SimpleHeader";
import { SimpleFooter } from "@/components/Layout/SimpleFooter";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingBag, 
  UtensilsCrossed, 
  Car, 
  Building, 
  Package,
  Search,
  Shield,
  Zap,
  Clock,
  Star
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SimpleHeader />
      
      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center text-white space-y-8 animate-fade-in">
            <Badge className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              🚀 Your All-in-One Service Platform
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              QUICKLINK
              <span className="block text-secondary">SERVICES</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Connect with local stores, restaurants, drivers and trusted service professionals — fast. 
              Built for convenience, security and speed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/auth/register">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 btn-gold text-lg px-8 py-6">
                  Get Started Free
                </Button>
              </a>
              <a href="/marketplace">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6">
                  Explore Services
                </Button>
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              <div className="text-center">
                <div className="text-3xl font-bold">1000+</div>
                <div className="text-white/80">Active Merchants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-white/80">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-white/80">Drivers Online</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-white/80">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Everything You Need, One Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From shopping to dining, transportation to real estate — QUICKLINK brings all essential services under one roof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Marketplace"
              description="Shop from thousands of local and international sellers. Find everything from electronics to fashion, home goods to specialty items."
              icon={<ShoppingBag className="h-6 w-6" />}
              href="/marketplace"
              features={[
                "Secure payments with M-Pesa & Cards",
                "Fast delivery & pickup options",
                "Verified sellers & products",
                "24/7 customer support"
              ]}
              gradient="from-primary to-primary/80"
            />

            <ServiceCard
              title="Food Delivery"
              description="Order from your favorite restaurants and local eateries. Fresh meals delivered hot to your doorstep in minutes."
              icon={<UtensilsCrossed className="h-6 w-6" />}
              href="/food"
              features={[
                "Real-time order tracking",
                "Wide restaurant selection",
                "Scheduled deliveries",
                "Group ordering options"
              ]}
              gradient="from-orange-500 to-orange-600"
            />

            <ServiceCard
              title="Taxi Services"
              description="Book reliable rides with professional drivers. Safe, affordable transportation whenever you need it."
              icon={<Car className="h-6 w-6" />}
              href="/taxi"
              features={[
                "Live GPS tracking",
                "Multiple vehicle types",
                "Upfront pricing",
                "Safety features included"
              ]}
              gradient="from-blue-500 to-blue-600"
            />

            <ServiceCard
              title="Properties & Land"
              description="Find your dream home, office space, or investment property. Browse verified listings with detailed information."
              icon={<Building className="h-6 w-6" />}
              href="/properties"
              features={[
                "Verified property listings",
                "Virtual tours available",
                "Direct seller contact",
                "Location-based search"
              ]}
              gradient="from-green-500 to-green-600"
            />

            <ServiceCard
              title="Errands & Delivery"
              description="Get your tasks done by trusted professionals. From document delivery to shopping assistance."
              icon={<Package className="h-6 w-6" />}
              href="/errands"
              features={[
                "Vetted service providers",
                "Real-time updates",
                "Insurance coverage",
                "Custom task requests"
              ]}
              gradient="from-purple-500 to-purple-600"
            />

            <ServiceCard
              title="Business Solutions"
              description="Join as a seller, restaurant, or driver. Grow your business with our platform and reach more customers."
              icon={<Zap className="h-6 w-6" />}
              href="/business"
              features={[
                "Easy onboarding process",
                "Analytics dashboard",
                "Marketing tools included",
                "Competitive commission rates"
              ]}
              gradient="from-secondary to-yellow-600"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Why Choose QUICKLINK?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built for the modern world with security, speed, and convenience at its core.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 card-brand">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Trusted</h3>
              <p className="text-muted-foreground">End-to-end encryption, verified users, and secure payment processing.</p>
            </div>

            <div className="text-center p-6 card-brand">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">Quick loading, instant notifications, and rapid service delivery.</p>
            </div>

            <div className="text-center p-6 card-brand">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Available</h3>
              <p className="text-muted-foreground">Round-the-clock support and services when you need them most.</p>
            </div>

            <div className="text-center p-6 card-brand">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className="text-muted-foreground">Rated services, verified providers, and quality guarantees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust QUICKLINK for all their service needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/auth/register">
              <Button size="lg" className="btn-brand text-lg px-8 py-6">
                Sign Up Now
              </Button>
            </a>
            <a href="/contact">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Contact Sales
              </Button>
            </a>
          </div>
        </div>
      </section>

      <SimpleFooter />
    </div>
  );
};

export default Index;
