import { ShoppingBag, Home, UtensilsCrossed, Car, Building, Package, Smartphone, Laptop, Pizza, Apple, Coffee, Camera } from "lucide-react";

const AnimatedBackground = () => {
  const floatingItems = [
    // Products
    { icon: <Smartphone className="h-6 w-6" />, position: "top-10 left-10", delay: "0s", type: "product" },
    { icon: <Laptop className="h-8 w-8" />, position: "top-20 right-20", delay: "1s", type: "product" },
    { icon: <Camera className="h-7 w-7" />, position: "top-32 left-1/4", delay: "2s", type: "product" },
    { icon: <ShoppingBag className="h-6 w-6" />, position: "top-16 right-1/3", delay: "3s", type: "product" },
    
    // Fast Food
    { icon: <Pizza className="h-8 w-8" />, position: "top-40 right-16", delay: "0.5s", type: "food" },
    { icon: <Apple className="h-6 w-6" />, position: "top-24 left-1/3", delay: "1.5s", type: "food" },
    { icon: <Coffee className="h-7 w-7" />, position: "top-36 right-1/4", delay: "2.5s", type: "food" },
    { icon: <UtensilsCrossed className="h-6 w-6" />, position: "top-12 left-1/2", delay: "3.5s", type: "food" },
    
    // Properties
    { icon: <Building className="h-8 w-8" />, position: "top-28 left-16", delay: "1s", type: "property" },
    { icon: <Home className="h-7 w-7" />, position: "top-44 right-1/3", delay: "2s", type: "property" },
    { icon: <Car className="h-6 w-6" />, position: "top-8 right-1/2", delay: "3s", type: "property" },
    { icon: <Package className="h-7 w-7" />, position: "top-52 left-1/4", delay: "4s", type: "property" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {floatingItems.map((item, index) => (
        <div
          key={index}
          className={`absolute ${item.position} animate-float opacity-20 hover:opacity-40 transition-opacity duration-300`}
          style={{
            animationDelay: item.delay,
            animationDuration: `${4 + (index % 3)}s`,
          }}
        >
          <div className={`
            p-3 rounded-full backdrop-blur-sm border border-white/20
            ${item.type === 'product' ? 'bg-primary/10 text-primary' : ''}
            ${item.type === 'food' ? 'bg-orange-500/10 text-orange-400' : ''}
            ${item.type === 'property' ? 'bg-green-500/10 text-green-400' : ''}
          `}>
            {item.icon}
          </div>
        </div>
      ))}
      
      {/* Additional floating particles */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-60 right-40 w-3 h-3 bg-secondary/40 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-40 left-60 w-1 h-1 bg-primary/50 rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
      <div className="absolute top-80 right-20 w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '4s' }} />
      <div className="absolute top-10 left-80 w-3 h-3 bg-orange-400/30 rounded-full animate-pulse" style={{ animationDelay: '5s' }} />
    </div>
  );
};

export default AnimatedBackground;