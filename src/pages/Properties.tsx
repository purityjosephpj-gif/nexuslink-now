import { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Bed, Bath, Square, Phone, Mail, Heart, Filter, Search } from "lucide-react";

const propertyTypes = ["All Types", "Apartment", "House", "Commercial", "Land", "Office"];
const locations = ["All Locations", "Nairobi CBD", "Westlands", "Karen", "Kilimani", "Lavington", "Runda"];
const priceRanges = ["Any Price", "Under 50K", "50K - 100K", "100K - 200K", "200K - 500K", "500K+"];

const mockProperties = [
  {
    id: 1,
    title: "Modern 3-Bedroom Apartment in Kilimani",
    type: "Apartment",
    location: "Kilimani, Nairobi",
    price: "KES 85,000/month",
    bedrooms: 3,
    bathrooms: 2,
    area: "120 sqm",
    image: "/api/placeholder/400/300",
    features: ["Parking", "Security", "Gym", "Swimming Pool"],
    contact: {
      phone: "+254 700 123 456",
      email: "agent@example.com",
      whatsapp: "+254700123456"
    },
    description: "Beautiful modern apartment with stunning city views, located in the heart of Kilimani.",
    featured: true
  },
  {
    id: 2,
    title: "4-Bedroom House in Karen",
    type: "House",
    location: "Karen, Nairobi",
    price: "KES 150,000/month",
    bedrooms: 4,
    bathrooms: 3,
    area: "300 sqm",
    image: "/api/placeholder/400/300",
    features: ["Garden", "Parking", "Security", "Servant Quarter"],
    contact: {
      phone: "+254 700 987 654",
      email: "karen@properties.com",
      whatsapp: "+254700987654"
    },
    description: "Spacious family home in exclusive Karen neighborhood with large garden.",
    featured: false
  },
  {
    id: 3,
    title: "Commercial Office Space - Westlands",
    type: "Office",
    location: "Westlands, Nairobi",
    price: "KES 120,000/month",
    bedrooms: 0,
    bathrooms: 2,
    area: "200 sqm",
    image: "/api/placeholder/400/300",
    features: ["Elevator", "Parking", "Security", "Air Conditioning"],
    contact: {
      phone: "+254 700 555 123",
      email: "westlands@commercial.com",
      whatsapp: "+254700555123"
    },
    description: "Prime office space in Westlands commercial district, perfect for businesses.",
    featured: false
  },
  {
    id: 4,
    title: "1-Acre Plot in Kiambu",
    type: "Land",
    location: "Kiambu County",
    price: "KES 8,500,000",
    bedrooms: 0,
    bathrooms: 0,
    area: "1 acre",
    image: "/api/placeholder/400/300",
    features: ["Title Deed", "Water", "Electricity", "Access Road"],
    contact: {
      phone: "+254 700 777 888",
      email: "land@plots.com",
      whatsapp: "+254700777888"
    },
    description: "Prime residential plot with all amenities, ready for development.",
    featured: true
  }
];

export default function Properties() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedPrice, setSelectedPrice] = useState("Any Price");
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (propertyId: number) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleContact = (type: 'phone' | 'email' | 'whatsapp', contact: any) => {
    if (type === 'phone') {
      window.open(`tel:${contact.phone}`);
    } else if (type === 'email') {
      window.open(`mailto:${contact.email}`);
    } else if (type === 'whatsapp') {
      window.open(`https://wa.me/${contact.whatsapp.replace('+', '')}`);
    }
  };

  const filteredProperties = mockProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All Types" || property.type === selectedType;
    const matchesLocation = selectedLocation === "All Locations" || 
                           property.location.includes(selectedLocation);
    
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Properties & Land
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Find your dream home, office space, or investment property. Browse verified listings with detailed information and direct seller contact.
          </p>
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-8">
            🏠 {mockProperties.length}+ Verified Properties Available
          </Badge>
        </section>

        {/* Search and Filters */}
        <section className="mb-8">
          <Card className="card-brand">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="mr-2 h-5 w-5" />
                Find Your Perfect Property
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search properties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                  <SelectTrigger>
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map((range) => (
                      <SelectItem key={range} value={range}>{range}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline" className="w-full md:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Advanced Filters
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Properties Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {selectedType === "All Types" ? "All Properties" : selectedType} 
              {selectedLocation !== "All Locations" && ` in ${selectedLocation}`}
            </h2>
            <span className="text-muted-foreground">
              {filteredProperties.length} properties found
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <Card key={property.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {property.featured && (
                    <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground">
                      Featured
                    </Badge>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={() => toggleFavorite(property.id)}
                  >
                    <Heart 
                      className={`h-4 w-4 ${
                        favorites.includes(property.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-muted-foreground'
                      }`} 
                    />
                  </Button>
                </div>

                <CardContent className="p-4">
                  <div className="mb-2">
                    <Badge variant="outline" className="text-xs">
                      {property.type}
                    </Badge>
                  </div>

                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {property.title}
                  </h3>

                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {property.description}
                  </p>

                  {/* Property Details */}
                  <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                    {property.bedrooms > 0 && (
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        {property.bedrooms}
                      </div>
                    )}
                    {property.bathrooms > 0 && (
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" />
                        {property.bathrooms}
                      </div>
                    )}
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-1" />
                      {property.area}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {property.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {property.features.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{property.features.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-primary">
                      {property.price}
                    </span>
                  </div>

                  {/* Contact Buttons */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleContact('phone', property.contact)}
                    >
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleContact('email', property.contact)}
                    >
                      <Mail className="h-3 w-3 mr-1" />
                      Email
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => handleContact('whatsapp', property.contact)}
                    >
                      WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No properties found matching your criteria.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedType("All Types");
                  setSelectedLocation("All Locations");
                  setSelectedPrice("Any Price");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </section>

        {/* Call to Action */}
        <section className="mt-16 text-center">
          <Card className="card-brand">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">List Your Property</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Have a property to sell or rent? Join thousands of property owners who trust QUICKLINK to connect with serious buyers and tenants.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-brand">
                  List Property Free
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}