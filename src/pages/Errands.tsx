import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Clock, MapPin, Truck } from "lucide-react";

const errandTypes = [
  {
    id: 1,
    title: "Document Delivery",
    description: "Fast and secure document pickup and delivery",
    icon: <Package className="h-8 w-8" />,
    price: "From KES 200",
    time: "Same day"
  },
  {
    id: 2,
    title: "Shopping Assistance", 
    description: "Personal shopping for groceries and essentials",
    icon: <Truck className="h-8 w-8" />,
    price: "From KES 300",
    time: "1-2 hours"
  },
  {
    id: 3,
    title: "Package Pickup",
    description: "Collect and deliver packages from any location",
    icon: <MapPin className="h-8 w-8" />,
    price: "From KES 250",
    time: "Within 3 hours"
  }
];

export default function Errands() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Errands & Delivery
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Get your tasks done by trusted professionals. From document delivery to shopping assistance, we've got you covered.
          </p>
          <Badge className="bg-primary/10 text-primary border-primary/20">
            📦 Professional Errand Services
          </Badge>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {errandTypes.map((errand) => (
            <Card key={errand.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  {errand.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{errand.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{errand.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-primary font-medium">{errand.price}</span>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{errand.time}</span>
                  </div>
                </div>

                <Button className="w-full btn-brand">
                  Request Service
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Need Something Else?</h2>
          <p className="text-muted-foreground mb-6">
            Custom errand services available. Just tell us what you need done!
          </p>
          <Button size="lg" className="btn-brand">
            Custom Request
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
}