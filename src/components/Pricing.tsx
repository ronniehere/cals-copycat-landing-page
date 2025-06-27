
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Pricing = () => {
  const plans = [
    {
      name: "Monthly Plan",
      price: "$9.99",
      period: "per month",
      description: "Perfect for monthly commitment",
      features: [
        "Unlimited photo scans",
        "Advanced analytics & insights",
        "Custom meal plans",
        "Recipe recommendations",
        "Priority customer support"
      ],
      cta: "Start Monthly Plan",
      popular: false
    },
    {
      name: "Yearly Plan",
      price: "$29.99",
      period: "per year",
      description: "Includes a 3-day free trial",
      features: [
        "Unlimited photo scans",
        "Advanced analytics & insights",
        "Custom meal plans",
        "Recipe recommendations",
        "Priority customer support"
      ],
      cta: "Start Free Trial",
      popular: true,
      badge: "Save 75%"
    }
  ];

  return (
    <div id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-playfair">
            Choose Your Plan
          </h2>
          <p className="text-xl text-muted-foreground font-inter">
            Start with our flexible pricing options.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`relative rounded-2xl border p-8 h-full flex flex-col ${plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1 text-sm font-medium">
                    {plan.badge}
                  </Badge>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2 font-playfair">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <p className="text-muted-foreground font-inter">{plan.description}</p>
              </div>
              
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground font-inter">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className="w-full font-inter mt-auto" 
                variant={plan.popular ? "default" : "outline"}
                size="lg"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
