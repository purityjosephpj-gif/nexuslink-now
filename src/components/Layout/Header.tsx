import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Search, ShoppingCart, User, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg gradient-brand flex items-center justify-center">
              <span className="text-white font-bold text-lg">Q</span>
            </div>
            <span className="font-bold text-xl text-foreground">
              QUICKLINK
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/marketplace" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/marketplace') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Marketplace
            </Link>
            <Link 
              to="/food" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/food') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Food Delivery
            </Link>
            <Link 
              to="/taxi" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/taxi') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Taxi Services
            </Link>
            <Link 
              to="/properties" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/properties') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Properties
            </Link>
            <Link 
              to="/errands" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/errands') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Errands
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="relative">
              <Search className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
                3
              </Badge>
            </Button>

            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
                2
              </Badge>
            </Button>

            <Link to="/auth/login">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>

            <Link to="/auth/register">
              <Button size="sm" className="hidden sm:flex btn-brand">
                Get Started
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in">
            <Link 
              to="/marketplace"
              className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Marketplace
            </Link>
            <Link 
              to="/food"
              className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Food Delivery
            </Link>
            <Link 
              to="/taxi"
              className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Taxi Services
            </Link>
            <Link 
              to="/properties"
              className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Properties
            </Link>
            <Link 
              to="/errands"
              className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Errands
            </Link>
            <div className="pt-2 space-y-2">
              <Link to="/auth/login" className="block">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth/register" className="block">
                <Button className="w-full btn-brand">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}