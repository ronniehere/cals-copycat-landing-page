
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is Cals?",
      answer: "Cals is an AI-powered nutrition app that lets you track your meals by snapping a photo, scanning a barcode, or typing it in. It instantly estimates calories and macros to help you reach your fitness goals."
    },
    {
      question: "How do I log my meals?",
      answer: "Use the camera to snap a meal photo, scan a barcode, or describe the food. You can review and adjust the calories and macros before saving."
    },
    {
      question: "Can I change my diet plan?",
      answer: "Yes, but only after 1/4 of your goal period is complete. For example, if your plan is 4 weeks, you can change it after 1 week."
    },
    {
      question: "Is Cals free to use?",
      answer: "Cals offers a 3-day free trial on the yearly subscription plan. After that, premium features like photo-based tracking require a paid subscription."
    },
    {
      question: "How accurate is the AI scan?",
      answer: "The AI is highly accurate for most common meals, but you can always review and edit the result before logging."
    },
    {
      question: "Is my data safe?",
      answer: "Yes. Your data is encrypted and never sold. You can delete your data and account anytime from the settings."
    }
  ];

  return (
    <div id="faq" className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-playfair">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-inter">
            Got questions? We've got answers. Find everything you need to know about Cals.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left font-inter font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-inter leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
