import { useState, useMemo } from "react";
import { packages, addOns, formatCurrency } from "@/data/pricing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Calculator, ChevronDown, MessageCircle, Building2, Car, Droplets, Recycle, Fence, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface CostBreakdown {
  name: string;
  amount: number;
  calculation?: string;
}

const ConstructionCost = () => {
  const [constructionArea, setConstructionArea] = useState<number>(0);
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [carParking, setCarParking] = useState<number>(0);
  const [undergroundSump, setUndergroundSump] = useState<number>(0);
  const [wasteWaterTank, setWasteWaterTank] = useState<number>(0);
  const [compoundWall, setCompoundWall] = useState<number>(0);
  const [solarPower, setSolarPower] = useState<number>(0);
  const [summaryOpen, setSummaryOpen] = useState(true);

  const selectedPkg = packages.find(p => p.id === selectedPackage);

  const costBreakdown = useMemo<CostBreakdown[]>(() => {
    const breakdown: CostBreakdown[] = [];
    
    if (constructionArea > 0 && selectedPkg) {
      breakdown.push({
        name: "Construction Area in Sq.Ft",
        amount: constructionArea * selectedPkg.pricePerSqft,
        calculation: `${constructionArea} sq.ft x ${formatCurrency(selectedPkg.pricePerSqft)}`
      });
    }

    if (selectedPackage) {
      breakdown.push({
        name: "Select Construction Package",
        amount: 0,
        calculation: selectedPkg?.name || ""
      });
    }

    if (carParking > 0) {
      breakdown.push({
        name: "Car Parking Area in Square Feet (Optional)",
        amount: carParking * 1800,
        calculation: `${carParking} sq.ft x ${formatCurrency(1800)}`
      });
    }

    if (undergroundSump > 0) {
      breakdown.push({
        name: "How Many Litres Of Underground Sump Required? (Optional)",
        amount: undergroundSump * 25,
        calculation: `${undergroundSump} litres x ${formatCurrency(25)}`
      });
    }

    if (wasteWaterTank > 0) {
      breakdown.push({
        name: "How Many Person Waste Water Recycling Tank Required? (Optional)",
        amount: wasteWaterTank * 30000,
        calculation: `${wasteWaterTank} unit x ${formatCurrency(30000)}`
      });
    }

    if (compoundWall > 0) {
      breakdown.push({
        name: "How Much Feet Length Compound Wall Do You Require? (Optional)",
        amount: compoundWall * 2000,
        calculation: `${compoundWall} feet x ${formatCurrency(2000)}`
      });
    }

    if (solarPower > 0) {
      breakdown.push({
        name: "How Much Solar Power Do You Require? (Optional)",
        amount: solarPower * 75000,
        calculation: `${solarPower} KW x ${formatCurrency(75000)}`
      });
    }

    return breakdown;
  }, [constructionArea, selectedPackage, selectedPkg, carParking, undergroundSump, wasteWaterTank, compoundWall, solarPower]);

  const totalCost = useMemo(() => {
    return costBreakdown.reduce((sum, item) => sum + item.amount, 0);
  }, [costBreakdown]);

  const getAddOnIcon = (id: string) => {
    switch (id) {
      case "carParking": return Car;
      case "undergroundSump": return Droplets;
      case "wasteWaterTank": return Recycle;
      case "compoundWall": return Fence;
      case "solarPower": return Sun;
      default: return Building2;
    }
  };

  const handleWhatsAppClick = () => {
    const message = `Hi, I'm interested in construction services.%0A%0A*My Requirements:*%0AConstruction Area: ${constructionArea} sq.ft%0APackage: ${selectedPkg?.name || 'Not selected'}%0A${carParking > 0 ? `Car Parking: ${carParking} sq.ft%0A` : ''}${undergroundSump > 0 ? `Underground Sump: ${undergroundSump} litres%0A` : ''}${wasteWaterTank > 0 ? `Waste Water Tank: ${wasteWaterTank} units%0A` : ''}${compoundWall > 0 ? `Compound Wall: ${compoundWall} feet%0A` : ''}${solarPower > 0 ? `Solar Power: ${solarPower} KW%0A` : ''}%0A*Estimated Total: ${formatCurrency(totalCost)}*`;
    window.open(`https://wa.me/916374507535?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4">
            <Calculator className="w-3 h-3 mr-1" />
            Free Tool
          </Badge>
          <h1 className="text-3xl md:text-5xl heading-display mb-4">
            Construction Cost <span className="text-primary">Calculator</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get an instant estimate for your construction project. Choose the package, type in the construction area and few other basic info to get the construction cost.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <Card className="shadow-premium">
              <CardContent className="p-6 space-y-8">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="constructionArea" className="text-base font-semibold mb-2 block">
                      Construction area in sq.ft
                    </Label>
                    <Input
                      id="constructionArea"
                      type="number"
                      value={constructionArea || ""}
                      onChange={(e) => setConstructionArea(Math.min(10000, Math.max(0, Number(e.target.value))))}
                      placeholder="0"
                      className="text-lg"
                      data-testid="input-construction-area"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Min: 0 - Max: 10000</p>
                  </div>

                  <div>
                    <Label htmlFor="package" className="text-base font-semibold mb-2 block">
                      Select construction Package
                    </Label>
                    <Select value={selectedPackage} onValueChange={setSelectedPackage}>
                      <SelectTrigger id="package" data-testid="select-package">
                        <SelectValue placeholder="Select value" />
                      </SelectTrigger>
                      <SelectContent>
                        {packages.map((pkg) => (
                          <SelectItem key={pkg.id} value={pkg.id}>
                            {pkg.name} - {formatCurrency(pkg.pricePerSqft)}/sq.ft
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-6 pt-4 border-t">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-base font-semibold flex items-center gap-2">
                        <Car className="w-4 h-4 text-muted-foreground" />
                        Car Parking area in square feet (optional)
                      </Label>
                      <Badge variant="outline">{carParking}</Badge>
                    </div>
                    <Input
                      type="number"
                      value={carParking || ""}
                      onChange={(e) => setCarParking(Math.min(10000, Math.max(0, Number(e.target.value))))}
                      placeholder="0"
                      data-testid="input-car-parking"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Min: 0 - Max: 10000</p>
                    <p className="text-xs text-green-600 mt-1">car parking will be charged @Rs.1800/sft approximately</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-base font-semibold flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-muted-foreground" />
                        How many litres of underground sump required? (optional)
                      </Label>
                      <Badge variant="outline">{undergroundSump}</Badge>
                    </div>
                    <Slider
                      value={[undergroundSump]}
                      onValueChange={(value) => setUndergroundSump(value[0])}
                      max={20000}
                      step={1000}
                      className="mb-2"
                      data-testid="slider-underground-sump"
                    />
                    <p className="text-xs text-muted-foreground">An average family of 4 will require minimum of 10,000 litres</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-base font-semibold flex items-center gap-2">
                        <Recycle className="w-4 h-4 text-muted-foreground" />
                        How many person waste water recycling tank required? (optional)
                      </Label>
                      <Badge variant="outline">{wasteWaterTank}</Badge>
                    </div>
                    <Slider
                      value={[wasteWaterTank]}
                      onValueChange={(value) => setWasteWaterTank(value[0])}
                      max={10}
                      step={1}
                      className="mb-2"
                      data-testid="slider-waste-water-tank"
                    />
                    <p className="text-xs text-muted-foreground">Waste water recycling tank is an alternative to septic tank. It recycles the waste water & recharges underground water table. It's not required if you have a drainage connection</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-base font-semibold flex items-center gap-2">
                        <Fence className="w-4 h-4 text-muted-foreground" />
                        How much feet length compound wall do you require? (optional)
                      </Label>
                      <Badge variant="outline">{compoundWall}</Badge>
                    </div>
                    <Input
                      type="number"
                      value={compoundWall || ""}
                      onChange={(e) => setCompoundWall(Math.min(1000, Math.max(0, Number(e.target.value))))}
                      placeholder="0"
                      data-testid="input-compound-wall"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Min: 0 - Max: 1000</p>
                    <p className="text-xs text-muted-foreground">If plot size is 40x30, compound wall length will be 40+40+30+30=140 feet</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-base font-semibold flex items-center gap-2">
                        <Sun className="w-4 h-4 text-muted-foreground" />
                        How much solar power do you require? (optional)
                      </Label>
                      <Badge variant="outline">{solarPower}</Badge>
                    </div>
                    <Slider
                      value={[solarPower]}
                      onValueChange={(value) => setSolarPower(value[0])}
                      max={10}
                      step={1}
                      className="mb-2"
                      data-testid="slider-solar-power"
                    />
                    <p className="text-xs text-muted-foreground">A 3BHK home will require 2KW solar power to run fans, lights and television during the daytime</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-premium sticky top-24">
              <CardHeader className="pb-4">
                <Collapsible open={summaryOpen} onOpenChange={setSummaryOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-primary" />
                      Total Summary
                    </CardTitle>
                    <ChevronDown className={`w-5 h-5 transition-transform ${summaryOpen ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="mt-4 border-t pt-4">
                      <table className="w-full" data-testid="cost-summary-table">
                        <thead>
                          <tr className="text-sm text-muted-foreground">
                            <th className="text-left font-medium pb-2">Name</th>
                            <th className="text-right font-medium pb-2">Total</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          <tr>
                            <td className="py-2">Construction Area in Sq.Ft</td>
                            <td className="text-right">{constructionArea}</td>
                          </tr>
                          <tr>
                            <td className="py-2">Select Construction Package</td>
                            <td className="text-right">{selectedPkg?.name || '-'}</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-muted-foreground">Car Parking Area In Square Feet (Optional)</td>
                            <td className="text-right text-muted-foreground">{carParking > 0 ? `${carParking} x ${formatCurrency(1800)}` : '-'}</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-muted-foreground">How Many Litres Of Underground Sump Required? (Optional)</td>
                            <td className="text-right text-muted-foreground">{undergroundSump > 0 ? `${undergroundSump} x ${formatCurrency(25)}` : '-'}</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-muted-foreground">How Many Person Waste Water Recycling Tank Required? (Optional)</td>
                            <td className="text-right text-muted-foreground">{wasteWaterTank > 0 ? `${wasteWaterTank} x ${formatCurrency(30000)}` : '-'}</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-muted-foreground">How Much Feet Length Compound Wall Do You Require? (Optional)</td>
                            <td className="text-right text-muted-foreground">{compoundWall > 0 ? `${compoundWall} x ${formatCurrency(2000)}` : '-'}</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-muted-foreground">How Much Solar Power Do You Require? (Optional)</td>
                            <td className="text-right text-muted-foreground">{solarPower > 0 ? `${solarPower} x ${formatCurrency(75000)}` : '-'}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-semibold">Estimated Total</span>
                    <span className="text-2xl font-bold text-primary" data-testid="total-cost">
                      {formatCurrency(totalCost)}
                    </span>
                  </div>
                  
                  <Button 
                    className="w-full bg-green-500 hover:bg-green-600 text-white gap-2"
                    onClick={handleWhatsAppClick}
                    data-testid="button-submit-whatsapp"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Submit via WhatsApp
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  This is an estimated cost. Actual cost may vary based on site conditions and requirements.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Want to see detailed package specifications?
          </p>
          <Link to="/packages">
            <Button variant="outline" size="lg" data-testid="button-view-packages">
              View All Packages
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ConstructionCost;
