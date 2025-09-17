import { ReactNode } from "react";
// Using regular anchor tags to avoid router context issues
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  features: string[];
  gradient?: string;
}

export function ServiceCard({ title, description, icon, href, features, gradient = "from-primary to-primary/80" }: ServiceCardProps) {
  return (
    <Card className="group service-card overflow-hidden">
      <div className={`h-2 bg-gradient-to-r ${gradient}`} />
      
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        </div>

        <p className="text-muted-foreground mb-4 leading-relaxed">
          {description}
        </p>

        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-muted-foreground">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
              {feature}
            </li>
          ))}
        </ul>

        <a href={href}>
          <Button 
            className="w-full group-hover:bg-primary/90 transition-all duration-300"
            variant="default"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </a>
      </div>
    </Card>
  );
}