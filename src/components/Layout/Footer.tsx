import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white border-t border-gray-800">
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
            <p className="text-gray-300 text-sm leading-relaxed">
              QUICKLINK SERVICES connects customers with local stores, restaurants, drivers and trusted service professionals — fast. Whether you need groceries, lunch, a ride, a delivery or property options, our platform brings it all into one secure app.
            </p>
            <div className="text-gray-300 text-sm space-y-1 mt-4">
              <p>📞 0111679286 / 0717562660</p>
              <p>📍 Everywhere - Currently in Kerugoya</p>
            </div>
            <div className="flex space-x-4">
              <Link to="#" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-gray-300 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/marketplace" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/food" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  Food Delivery
                </Link>
              </li>
              <li>
                <Link to="/taxi" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  Taxi Services
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  Properties & Land
                </Link>
              </li>
              <li>
                <Link to="/errands" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  Errands & Delivery
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  Safety
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm text-gray-300">0111679286 / 0717562660</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm text-gray-300">support@quicklink.co.ke</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm text-gray-300">Everywhere - Currently in Kerugoya</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-300">
            © 2024 QUICKLINK SERVICES. All rights reserved. Built for convenience, security and speed.
          </p>
        </div>
      </div>
    </footer>
  );
}