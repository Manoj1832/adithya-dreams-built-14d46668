import { pricingTiers, formatCurrency } from "@/data/pricing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, Star } from "lucide-react";
import { Link } from "react-router-dom";

const PricingPackages = () => {
  const accordionSections = [
    { key: "design", label: "Design" },
    { key: "structure", label: "Structure" },
    { key: "kitchen", label: "Kitchen" },
    { key: "bathroom", label: "Bathroom" },
    { key: "plumbing", label: "Plumbing" },
    { key: "doorsWindows", label: "Doors & Windows" },
    { key: "painting", label: "Painting" },
    { key: "flooring", label: "Flooring" },
    { key: "electrical", label: "Electrical" },
    { key: "otherInclusives", label: "Other Inclusives" },
    { key: "extraCharges", label: "Extra Charges" },
  ] as const;

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Our Pricing Package</Badge>
          <h2 className="text-3xl md:text-4xl heading-display mb-4">
            Transparent <span className="text-primary">Pricing</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Price may vary depending on number of floors. Choose the package that suits your requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pricingTiers.map((tier) => (
            <Card 
              key={tier.id} 
              className={`relative overflow-hidden transition-all duration-300 hover-lift ${
                tier.highlighted 
                  ? 'border-primary shadow-gold-premium ring-2 ring-primary/20' 
                  : 'shadow-premium'
              }`}
              data-testid={`pricing-card-${tier.id}`}
            >
              {tier.highlighted && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary text-primary-foreground gap-1">
                    <Star className="w-3 h-3" />
                    Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className={`text-center pb-4 ${
                tier.id === 'basic' ? 'bg-gradient-to-br from-rose-150 to-rose-600' :
                tier.id === 'standard' ? 'bg-gradient-to-br from-rose-150 to-rose-600' :
                'bg-gradient-to-br from-rose-150 to-rose-600'
              } text-white`}>
                <CardTitle className="text-xl font-bold">{tier.name}</CardTitle>
                <p className="text-white/80 text-sm">price may vary depending on no.of floors</p>
              </CardHeader>

              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  {tier.originalPrice && (
                    <span className="text-muted-foreground line-through text-sm mr-2">
                      {formatCurrency(tier.originalPrice)}
                    </span>
                  )}
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold">{formatCurrency(tier.pricePerSqft)}</span>
                    <span className="text-muted-foreground">/sft</span>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-150 shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Accordion type="single" collapsible className="w-full" defaultValue="design">
                  {accordionSections.map((section) => {
                    const items = tier[section.key as keyof typeof tier] as string[];
                    if (!items || items.length === 0) return null;
                    
                    return (
                      <AccordionItem 
                        key={section.key} 
                        value={section.key}
                        data-testid={`accordion-${tier.id}-${section.key}`}
                      >
                        <AccordionTrigger className="text-sm py-2 hover:no-underline">
                          {section.label}
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-1 pl-2">
                            {items.map((item, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-primary">-</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>

                <div className="mt-6">
                  <Link to="/construction-cost">
                    <Button 
                      className="w-full gold-gradient text-foreground"
                      data-testid={`button-calculate-${tier.id}`}
                    >
                      Calculate Cost
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Looking for a house construction company in Coimbatore & Salem? You are at the right spot.
          </p>
          <Link to="/construction-cost">
            <Button size="lg" className="gold-gradient text-foreground" data-testid="button-cost-calculator">
              Try Our Construction Cost Calculator
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingPackages;
