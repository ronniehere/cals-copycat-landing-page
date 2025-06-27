
import { Camera, Scan, Target } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Camera,
      title: "Snap a Photo",
      description: "Take a picture of your meal with your smartphone camera. Our AI works with any angle or lighting."
    },
    {
      icon: Scan,
      title: "AI Analysis",
      description: "Our advanced AI instantly recognizes ingredients, portion sizes, and calculates precise nutritional information."
    },
    {
      icon: Target,
      title: "Track Progress",
      description: "View your daily intake, track towards your goals, and get personalized insights to optimize your nutrition."
    }
  ];

  return (
    <div id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-playfair">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-inter">
            Get started in three simple steps. No complex setups or lengthy onboarding required.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Steps on the left */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-6 group">
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2 font-inter">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-inter">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Image on the right */}
          <div className="lg:pl-8">
            <div className="relative">
              <img 
                src="/lovable-uploads/8f1912d2-8c02-4f08-8a62-67df6a2e0693.png" 
                alt="Cals App Screenshots" 
                // className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
