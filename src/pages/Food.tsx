import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UtensilsCrossed, Clock, Star, MapPin, ShoppingCart } from "lucide-react";

const mockRestaurants = [
  {
    id: 1,
    name: "Mama's Kitchen",
    cuisine: "Kenyan",
    rating: 4.8,
    deliveryTime: "25-35 min",
    deliveryFee: "KES 100",
    image: "/api/placeholder/300/200",
    featured: true
  },
  {
    id: 2,
    name: "Pizza Palace",
    cuisine: "Italian",
    rating: 4.6,
    deliveryTime: "30-40 min", 
    deliveryFee: "KES 150",
    image: "/api/placeholder/300/200",
    featured: false
  },
  {
    id: 3,
    name: "Spice Garden",
    cuisine: "Indian",
    rating: 4.7,
    deliveryTime: "20-30 min",
    deliveryFee: "KES 120",
    image: "/api/placeholder/300/200",
    featured: true
  }
];

export default function Food() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Food Delivery
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Order from your favorite restaurants and local eateries. Fresh meals delivered hot to your doorstep in minutes.
          </p>
          <Badge className="bg-primary/10 text-primary border-primary/20">
            🍽️ 200+ Restaurants Available
          </Badge>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRestaurants.map((restaurant) => (
            <Card key={restaurant.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {restaurant.featured && (
                  <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground">
                    Featured
                  </Badge>
                )}
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{restaurant.name}</h3>
                <p className="text-muted-foreground text-sm mb-3">{restaurant.cuisine} Cuisine</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{restaurant.rating}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{restaurant.deliveryTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Delivery: {restaurant.deliveryFee}</span>
                  <Button size="sm" className="btn-brand">
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Order Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Coming Soon!</h2>
          <p className="text-muted-foreground mb-6">
            Full food delivery features will be available after connecting to Supabase.
          </p>
          <Button size="lg" className="btn-brand">
            Join Waitlist
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
}