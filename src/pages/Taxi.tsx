import { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Car, Users, DollarSign, Star } from "lucide-react";

const vehicleTypes = [
  {
    id: 1,
    name: "Economy",
    description: "Affordable rides for everyday travel",
    icon: <Car className="h-6 w-6" />,
    capacity: "1-4 passengers",
    estimatedPrice: "KES 150-300",
    eta: "3-5 min",
    features: ["Standard car", "AC available", "Safe & reliable"]
  },
  {
    id: 2,
    name: "Comfort",
    description: "More space and premium vehicles",
    icon: <Car className="h-6 w-6" />,
    capacity: "1-4 passengers", 
    estimatedPrice: "KES 250-450",
    eta: "3-7 min",
    features: ["Premium vehicles", "Extra legroom", "Professional drivers"]
  },
  {
    id: 3,
    name: "SUV",
    description: "Larger vehicles for groups",
    icon: <Users className="h-6 w-6" />,
    capacity: "1-6 passengers",
    estimatedPrice: "KES 350-600",
    eta: "5-10 min",
    features: ["Spacious interior", "Group travel", "Luggage space"]
  }
];

export default function Taxi() {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicleTypes[0]);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  const handleBookRide = () => {
    setIsBooking(true);
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false);
      alert("Please connect to Supabase to enable real-time taxi booking features!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Reliable Taxi Services
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Safe, affordable rides with professional drivers. Book your ride in seconds and track in real-time.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                <Clock className="mr-2 h-4 w-4" />
                24/7 Available
              </Badge>
              <Badge className="bg-success/10 text-success border-success/20">
                <Star className="mr-2 h-4 w-4" />
                5-Star Drivers
              </Badge>
              <Badge className="bg-secondary/10 text-secondary-foreground border-secondary/20">
                <DollarSign className="mr-2 h-4 w-4" />
                Upfront Pricing
              </Badge>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <div className="space-y-6">
            <Card className="card-brand">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-primary" />
                  Book Your Ride
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Pickup Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter pickup address..."
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Destination</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Where are you going?"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Vehicle Type</label>
                  <div className="grid gap-2">
                    {vehicleTypes.map((vehicle) => (
                      <Card
                        key={vehicle.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedVehicle.id === vehicle.id
                            ? 'ring-2 ring-primary bg-primary/5'
                            : 'hover:bg-accent/50'
                        }`}
                        onClick={() => setSelectedVehicle(vehicle)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="text-primary">
                                {vehicle.icon}
                              </div>
                              <div>
                                <h3 className="font-semibold">{vehicle.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {vehicle.capacity}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-primary">
                                {vehicle.estimatedPrice}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                ETA: {vehicle.eta}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full btn-brand text-lg py-6"
                  onClick={handleBookRide}
                  disabled={!pickup || !destination || isBooking}
                >
                  {isBooking ? "Finding Driver..." : "Book Ride Now"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Vehicle Details & Features */}
          <div className="space-y-6">
            <Card className="card-brand">
              <CardHeader>
                <CardTitle className="flex items-center">
                  {selectedVehicle.icon}
                  <span className="ml-2">{selectedVehicle.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {selectedVehicle.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Capacity:</span>
                    <span className="text-sm text-muted-foreground">
                      {selectedVehicle.capacity}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Estimated Price:</span>
                    <span className="text-sm font-semibold text-primary">
                      {selectedVehicle.estimatedPrice}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">ETA:</span>
                    <span className="text-sm text-muted-foreground">
                      {selectedVehicle.eta}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Features:</h4>
                  <ul className="space-y-1">
                    {selectedVehicle.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Safety Features */}
            <Card className="card-brand">
              <CardHeader>
                <CardTitle>Safety First</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                      <Star className="h-4 w-4 text-success" />
                    </div>
                    <div>
                      <h4 className="font-medium">Verified Drivers</h4>
                      <p className="text-xs text-muted-foreground">Background checked & licensed</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Live Tracking</h4>
                      <p className="text-xs text-muted-foreground">Real-time GPS monitoring</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Clock className="h-4 w-4 text-secondary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium">24/7 Support</h4>
                      <p className="text-xs text-muted-foreground">Always here to help</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How It Works */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Set Your Destination</h3>
              <p className="text-muted-foreground">Enter your pickup and drop-off locations with our easy address finder.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Choose Your Ride</h3>
              <p className="text-muted-foreground">Select from our range of vehicles based on your needs and budget.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Track & Ride</h3>
              <p className="text-muted-foreground">Watch your driver arrive in real-time and enjoy your safe journey.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}