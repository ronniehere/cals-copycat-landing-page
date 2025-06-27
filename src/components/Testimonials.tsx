
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Fitness Enthusiast",
      content: "Cals has revolutionized how I track my nutrition. The photo recognition is incredibly accurate, and I love how easy it is to stay on top of my goals.",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "Personal Trainer",
      content: "I recommend Cals to all my clients. The AI technology saves so much time, and the insights help them make better food choices consistently.",
      rating: 5
    },
    {
      name: "Emily Johnson",
      role: "Busy Professional",
      content: "Finally, a calorie tracking app that fits into my hectic schedule. Just snap and go - it's that simple. I've lost 15 pounds in 3 months!",
      rating: 5
    }
  ];

  return (
    <div id="testimonials" className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-playfair">
            Loved by Thousands
          </h2>
          <p className="text-xl text-muted-foreground font-inter">
            See what our users are saying about their success with Cals
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card border rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed font-inter">
                "{testimonial.content}"
              </p>
              <div>
                <div className="font-semibold text-foreground font-inter">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground font-inter">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
