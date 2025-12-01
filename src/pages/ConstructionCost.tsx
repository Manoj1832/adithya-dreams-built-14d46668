import { useState, useMemo } from "react";
import { packages, addOns, formatCurrency, AddOn } from "@/data/pricing";
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
import { Calculator, ChevronDown, MessageCircle, Building2, Car, Droplets, Recycle, Fence, Sun, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const addOnIcons: Record<string, LucideIcon> = {
  carParking: Car,
  undergroundSump: Droplets,
  wasteWaterTank: Recycle,
  compoundWall: Fence,
  solarPower: Sun,
};

const useSlider: Record<string, boolean> = {
  carParking: false,
  undergroundSump: true,
  wasteWaterTank: true,
  compoundWall: false,
  solarPower: true,
};

const ConstructionCost = () => {
  const [constructionArea, setConstructionArea] = useState<number>(0);
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [addOnValues, setAddOnValues] = useState<Record<string, number>>(
    addOns.reduce((acc, addon) => ({ ...acc, [addon.id]: addon.defaultValue }), {})
  );
  const [summaryOpen, setSummaryOpen] = useState(true);

  const selectedPkg = packages.find(p => p.id === selectedPackage);

  const handleAddOnChange = (id: string, value: number, addon: AddOn) => {
    const clampedValue = Math.min(addon.max, Math.max(addon.min, value));
    setAddOnValues(prev => ({ ...prev, [id]: clampedValue }));
  };

  const handleAreaChange = (value: number) => {
    const clampedValue = Math.min(10000, Math.max(0, value));
    setConstructionArea(clampedValue);
  };

  const constructionCost = useMemo(() => {
    if (constructionArea > 0 && selectedPkg) {
      return constructionArea * selectedPkg.pricePerSqft;
    }
    return 0;
  }, [constructionArea, selectedPkg]);

  const addOnCosts = useMemo(() => {
    return addOns.map(addon => ({
      addon,
      value: addOnValues[addon.id] || 0,
      cost: (addOnValues[addon.id] || 0) * addon.pricePerUnit,
    }));
  }, [addOnValues]);

  const totalCost = useMemo(() => {
    const addOnTotal = addOnCosts.reduce((sum, item) => sum + item.cost, 0);
    return constructionCost + addOnTotal;
  }, [constructionCost, addOnCosts]);

  const handleWhatsAppClick = () => {
    const addOnDetails = addOnCosts
      .filter(item => item.value > 0)
      .map(item => `${item.addon.name}: ${item.value} ${item.addon.unit}`)
      .join('%0A');
    
    const message = `Hi, I'm interested in construction services.%0A%0A*My Requirements:*%0AConstruction Area: ${constructionArea} sq.ft%0APackage: ${selectedPkg?.name || 'Not selected'}%0A${addOnDetails ? addOnDetails + '%0A' : ''}%0A*Estimated Total: ${formatCurrency(totalCost)}*`;
    window.open(`https://wa.me/916374507535?text=${message}`, '_blank');
  };

  const renderAddOnInput = (addon: AddOn) => {
    const Icon = addOnIcons[addon.id] || Building2;
    const value = addOnValues[addon.id] || 0;
    const isSlider = useSlider[addon.id];

    return (
      <div key={addon.id} data-testid={`addon-section-${addon.id}`}>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-base font-semibold flex items-center gap-2">
            <Icon className="w-4 h-4 text-muted-foreground" />
            {addon.name} (optional)
          </Label>
          <Badge variant="outline" data-testid={`badge-value-${addon.id}`}>{value}</Badge>
        </div>
        
        {isSlider ? (
          <Slider
            value={[value]}
            onValueChange={(val) => handleAddOnChange(addon.id, val[0], addon)}
            min={addon.min}
            max={addon.max}
            step={addon.id === 'undergroundSump' ? 1000 : 1}
            className="mb-2"
            data-testid={`slider-${addon.id}`}
          />
        ) : (
          <>
            <Input
              type="number"
              value={value || ""}
              onChange={(e) => handleAddOnChange(addon.id, Number(e.target.value), addon)}
              placeholder="0"
              min={addon.min}
              max={addon.max}
              data-testid={`input-${addon.id}`}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Min: {addon.min} - Max: {addon.max}
            </p>
          </>
        )}
        
        <p className="text-xs text-muted-foreground mt-1">{addon.description}</p>
        {addon.id === 'carParking' && (
          <p className="text-xs text-green-600 mt-1">
            will be charged @{formatCurrency(addon.pricePerUnit)}/{addon.unit} approximately
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen py-8 px-4 md:px-8" data-testid="page-construction-cost">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4" data-testid="badge-free-tool">
            <Calculator className="w-3 h-3 mr-1" />
            Free Tool
          </Badge>
          <h1 className="text-3xl md:text-5xl heading-display mb-4" data-testid="heading-calculator">
            Construction Cost <span className="text-primary">Calculator</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-description">
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
            <Card className="shadow-premium" data-testid="card-calculator-form">
              <CardContent className="p-6 space-y-8">
                <div className="space-y-4">
                  <div data-testid="field-construction-area">
                    <Label htmlFor="constructionArea" className="text-base font-semibold mb-2 block">
                      Construction area in sq.ft
                    </Label>
                    <Input
                      id="constructionArea"
                      type="number"
                      value={constructionArea || ""}
                      onChange={(e) => handleAreaChange(Number(e.target.value))}
                      placeholder="0"
                      min={0}
                      max={10000}
                      className="text-lg"
                      data-testid="input-construction-area"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Min: 0 - Max: 10000</p>
                  </div>

                  <div data-testid="field-package-select">
                    <Label htmlFor="package" className="text-base font-semibold mb-2 block">
                      Select construction Package
                    </Label>
                    <Select value={selectedPackage} onValueChange={setSelectedPackage}>
                      <SelectTrigger id="package" data-testid="select-package">
                        <SelectValue placeholder="Select value" />
                      </SelectTrigger>
                      <SelectContent>
                        {packages.map((pkg) => (
                          <SelectItem 
                            key={pkg.id} 
                            value={pkg.id}
                            data-testid={`select-option-${pkg.id}`}
                          >
                            {pkg.name} - {formatCurrency(pkg.pricePerSqft)}/sq.ft
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-6 pt-4 border-t" data-testid="addons-section">
                  {addOns.map(renderAddOnInput)}
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
            <Card className="shadow-premium sticky top-24" data-testid="card-summary">
              <CardHeader className="pb-4">
                <Collapsible open={summaryOpen} onOpenChange={setSummaryOpen}>
                  <CollapsibleTrigger 
                    className="flex items-center justify-between w-full"
                    data-testid="button-toggle-summary"
                  >
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-primary" />
                      Total Summary
                    </CardTitle>
                    <ChevronDown className={`w-5 h-5 transition-transform ${summaryOpen ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="mt-4 border-t pt-4">
                      <table className="w-full" data-testid="table-cost-summary">
                        <thead>
                          <tr className="text-sm text-muted-foreground">
                            <th className="text-left font-medium pb-2">Name</th>
                            <th className="text-right font-medium pb-2">Total</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          <tr data-testid="row-construction-area">
                            <td className="py-2">Construction Area in Sq.Ft</td>
                            <td className="text-right" data-testid="value-construction-area">{constructionArea}</td>
                          </tr>
                          <tr data-testid="row-package">
                            <td className="py-2">Select Construction Package</td>
                            <td className="text-right" data-testid="value-package">{selectedPkg?.name || '-'}</td>
                          </tr>
                          {addOns.map((addon) => {
                            const value = addOnValues[addon.id] || 0;
                            return (
                              <tr key={addon.id} data-testid={`row-addon-${addon.id}`}>
                                <td className="py-2 text-muted-foreground">{addon.name} (Optional)</td>
                                <td className="text-right text-muted-foreground" data-testid={`value-addon-${addon.id}`}>
                                  {value > 0 ? `${value} x ${formatCurrency(addon.pricePerUnit)}` : '-'}
                                </td>
                              </tr>
                            );
                          })}
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
                    <span className="text-2xl font-bold text-primary" data-testid="text-total-cost">
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

                <p className="text-xs text-muted-foreground text-center mt-4" data-testid="text-disclaimer">
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
