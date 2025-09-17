import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export function SimpleFooter() {
  console.log("SimpleFooter rendering (no router dependencies)");
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg gradient-brand flex items-center justify-center">
                <span className="text-white font-bold text-lg">Q</span>
              </div>
              <span className="font-bold text-xl">QUICKLINK</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              QUICKLINK SERVICES connects customers with local stores, restaurants, drivers and trusted service professionals — fast. Whether you need groceries, lunch, a ride, a delivery or property options, our platform brings it all into one secure app.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="/marketplace" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Marketplace
                </a>
              </li>
              <li>
                <a href="/food" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Food Delivery
                </a>
              </li>
              <li>
                <a href="/taxi" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Taxi Services
                </a>
              </li>
              <li>
                <a href="/properties" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Properties & Land
                </a>
              </li>
              <li>
                <a href="/errands" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Errands & Delivery
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="/help" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/safety" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Safety
                </a>
              </li>
              <li>
                <a href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">+254 700 000 000</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">support@quicklink.co.ke</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 QUICKLINK SERVICES. All rights reserved. Built for convenience, security and speed.
          </p>
        </div>
      </div>
    </footer>
  );
}