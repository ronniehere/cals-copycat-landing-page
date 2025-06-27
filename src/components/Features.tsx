
import { Camera, Target, TrendingUp, Zap, Shield } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Camera,
      title: "AI Photo Recognition",
      description: "Simply take a photo of your meal and our AI instantly identifies ingredients and calculates calories with 95% accuracy."
    },
    {
      icon: Target,
      title: "Smart Goal Setting",
      description: "Set personalized calorie and macro goals based on your body type, activity level, and health objectives."
    },
    {
      icon: TrendingUp,
      title: "Progress Analytics",
      description: "Track your journey with detailed charts and insights that help you understand your eating patterns."
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data stays private and secure. We use end-to-end encryption and never share your personal information."
    }
  ];

  return (
    <div id="features" className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-playfair">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
            Cals combines cutting-edge AI technology with proven nutrition science to make calorie tracking simple, accurate, and sustainable.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group p-6 rounded-2xl bg-card border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2 font-inter">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed font-inter">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
