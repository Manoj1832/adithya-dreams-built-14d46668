export interface PackageCategory {
  name: string;
  standard: string;
  premium: string;
  luxury: string;
}

export interface Package {
  id: string;
  name: string;
  pricePerSqft: number;
  description: string;
  highlighted?: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  pricePerUnit: number;
  unit: string;
  min: number;
  max: number;
  defaultValue: number;
  helpText?: string;
}

export interface PricingTier {
  id: string;
  name: string;
  pricePerSqft: number;
  originalPrice?: number;
  features: string[];
  design: string[];
  structure: string[];
  kitchen: string[];
  bathroom: string[];
  plumbing: string[];
  doorsWindows: string[];
  painting: string[];
  flooring: string[];
  electrical: string[];
  otherInclusives: string[];
  extraCharges: string[];
  highlighted?: boolean;
}

export const packages: Package[] = [
  {
    id: "standard",
    name: "Standard Package",
    pricePerSqft: 2100,
    description: "Quality construction with reliable materials"
  },
  {
    id: "premium",
    name: "Premium Package",
    pricePerSqft: 2300,
    description: "Enhanced materials and finishes",
    highlighted: true
  },
  {
    id: "luxury",
    name: "Luxury Package",
    pricePerSqft: 2500,
    description: "Top-tier materials and premium finishes"
  }
];

export const packageCategories: PackageCategory[] = [
  {
    name: "Cost of construction per sq.ft",
    standard: "Rs. 2,100.00",
    premium: "Rs. 2,300.00",
    luxury: "Rs. 2,500.00"
  },
  {
    name: "Types of construction",
    standard: "Framed structure (as per design)",
    premium: "Framed structure (as per design)",
    luxury: "Framed structure (as per design)"
  },
  {
    name: "Cement",
    standard: "JSW, KCP, Or equivalent",
    premium: "Chettinadu, Ultratech",
    luxury: "Ultratech, Ramco"
  },
  {
    name: "Steel",
    standard: "Vela TMT Or equivalent",
    premium: "Prime Gold, Indrola TMT Bars",
    luxury: "TATA, JSW"
  },
  {
    name: "Brick",
    standard: "Ordinary brick",
    premium: "Wire cut brick",
    luxury: "Wire cut brick"
  },
  {
    name: "Flooring",
    standard: "Tiles @Rs.50/- sq.ft",
    premium: "Tiles Rs.70/- sq.ft",
    luxury: "Tile 90Rs/sqft"
  },
  {
    name: "Doors and windows",
    standard: "Main door country teak/ UPVC windows",
    premium: "Main door Kerala teak/ UPVC windows",
    luxury: "Fully teak wood"
  },
  {
    name: "Electrical",
    standard: "ISI Pipes, Eylles, Fybros",
    premium: "ISI Pipes, Haveels, GM Switches",
    luxury: "ISI Pipes, Legrand"
  },
  {
    name: "Plumbing",
    standard: "ISI Standard Pipe",
    premium: "Ashirvad, Supreme",
    luxury: "Vajjeramplast, Finolex"
  },
  {
    name: "Fittings",
    standard: "PLATO",
    premium: "JOHNSON, PARRYWARE",
    luxury: "PARRYWARE, JAQUAR"
  },
  {
    name: "Inner Painting",
    standard: "2 Coat of putty, 1 coat primer (Tractor emulsion)",
    premium: "2 Coat of putty, 1 coat primer (Premium paint)",
    luxury: "3 Coat of putty, 1 coat primer (Royale paint)"
  },
  {
    name: "Outer Painting",
    standard: "Asian paints Ace Apex",
    premium: "Asian paints Ace Apex",
    luxury: "Asian paints Ace Ultima"
  },
  {
    name: "Elevation",
    standard: "Basic elevation",
    premium: "Engineer choice",
    luxury: "Client choice"
  }
];

export const addOns: AddOn[] = [
  {
    id: "carParking",
    name: "Car Parking Area",
    description: "Car parking will be charged @Rs.1800/sft approximately",
    pricePerUnit: 1800,
    unit: "sq.ft",
    min: 0,
    max: 10000,
    defaultValue: 0,
    helpText: "Optional parking area in square feet"
  },
  {
    id: "undergroundSump",
    name: "Underground Sump",
    description: "An average family of 4 will require minimum of 10,000 litres",
    pricePerUnit: 25,
    unit: "litres",
    min: 0,
    max: 20000,
    defaultValue: 0,
    helpText: "Recommended: 10,000 litres for a family of 4"
  },
  {
    id: "wasteWaterTank",
    name: "Waste Water Recycling Tank",
    description: "Waste water recycling tank is an alternative to septic tank. It recycles the waste water & recharges underground water table. It's not required if you have a drainage connection",
    pricePerUnit: 30000,
    unit: "unit",
    min: 0,
    max: 10,
    defaultValue: 0,
    helpText: "Alternative to septic tank, not required if drainage is available"
  },
  {
    id: "compoundWall",
    name: "Compound Wall",
    description: "If plot size is 40x30, compound wall length will be 40+40+30+30=140 feet",
    pricePerUnit: 2000,
    unit: "feet",
    min: 0,
    max: 1000,
    defaultValue: 0,
    helpText: "Calculate: sum of all sides of your plot"
  },
  {
    id: "solarPower",
    name: "Solar Power",
    description: "A 3BHK home will require 2KW solar power to run fans, lights and television during the daytime",
    pricePerUnit: 75000,
    unit: "KW",
    min: 0,
    max: 10,
    defaultValue: 0,
    helpText: "Recommended: 2KW for a 3BHK home"
  }
];

export const pricingTiers: PricingTier[] = [
  {
    id: "basic",
    name: "Basic",
    pricePerSqft: 1899,
    originalPrice: 1999,
    features: [
      "RCC framed structure",
      "Basic materials",
      "RCC foundation & roof"
    ],
    design: ["2D Floor Plan"],
    structure: ["RCC framed structure", "Basic foundation"],
    kitchen: ["Granite platform", "Steel sink", "Basic tiles"],
    bathroom: ["Basic sanitary fittings", "Standard tiles"],
    plumbing: ["ISI standard pipes", "Basic fittings"],
    doorsWindows: ["Country teak main door", "UPVC windows"],
    painting: ["2 coat putty", "1 coat primer", "Tractor emulsion"],
    flooring: ["Tiles @Rs.50/sq.ft"],
    electrical: ["ISI pipes", "Basic switches", "Standard wiring"],
    otherInclusives: ["Basic elevation", "Water proofing"],
    extraCharges: ["Government fees extra", "Bore/CMWSSB extra"]
  },
  {
    id: "standard",
    name: "Standard",
    pricePerSqft: 2099,
    originalPrice: 2299,
    features: [
      "All features in basic package",
      "Free Smart Home Automation",
      "Free Organic Terrace Gardening"
    ],
    design: ["2D Floor Plan", "3D Elevation Design"],
    structure: ["RCC framed structure", "Enhanced foundation"],
    kitchen: ["Granite platform", "Stainless sink", "Designer tiles"],
    bathroom: ["Johnson/Parryware fittings", "Premium tiles"],
    plumbing: ["Ashirvad/Supreme pipes", "Premium fittings"],
    doorsWindows: ["Kerala teak main door", "UPVC windows"],
    painting: ["2 coat putty", "1 coat primer", "Premium paint"],
    flooring: ["Tiles @Rs.70/sq.ft"],
    electrical: ["ISI pipes", "Haveels/GM switches", "Concealed wiring"],
    otherInclusives: ["Engineer choice elevation", "Water proofing", "Smart home ready"],
    extraCharges: ["Government fees extra", "Bore/CMWSSB extra"],
    highlighted: true
  },
  {
    id: "premium",
    name: "Premium",
    pricePerSqft: 2449,
    originalPrice: 2599,
    features: [
      "All features in standard package",
      "Granite flooring",
      "Premium quality materials"
    ],
    design: ["2D Floor Plan", "Structural Designing", "3D Elevation Design"],
    structure: ["RCC framed structure", "Premium foundation"],
    kitchen: ["Granite platform", "Premium sink", "Imported tiles"],
    bathroom: ["Jaquar fittings", "Imported tiles"],
    plumbing: ["Finolex/Vajjeramplast pipes", "Jaquar fittings"],
    doorsWindows: ["Fully teak wood doors", "Premium UPVC windows"],
    painting: ["3 coat putty", "1 coat primer", "Royale paint"],
    flooring: ["Tiles @Rs.90/sq.ft or Granite"],
    electrical: ["ISI pipes", "Legrand switches", "Premium concealed wiring"],
    otherInclusives: ["Client choice elevation", "Premium water proofing", "Smart home included"],
    extraCharges: ["Government fees extra", "Bore/CMWSSB extra"]
  }
];

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};
