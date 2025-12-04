import React, { useEffect, useRef, useState } from "react";
import { Send, User, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/** ========= Types ========= */
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  cta?: { label: string; href: string }[];
}

const BotLogo = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="adithyaGold" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#D4AF37" />
        <stop offset="40%" stopColor="#FFD54F" />
        <stop offset="100%" stopColor="#B8860B" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" fill="none" stroke="url(#adithyaGold)" strokeWidth="2" />
    <path d="M7 17 L12 6.5 L17 17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.2 13.6 L14.8 13.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="12" cy="6" r="0.9" fill="currentColor" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="#FFD54F" />
  </svg>
);

/** ========= Construction Data (shared) ========= */
const CONSTRUCTION_DATA = {
  packages: [
    {
      name: "Standard Package",
      cost: 2100,
      cement: "Jsw, Kcp, or equivalent",
      steel: "Vela TMT or equivalent",
      brick: "Ordinary brick",
      flooring: "Tiles @₹50/sq.ft",
      doors: "Main door country teak/UPVC windows",
      electrical: "ISI Pipes, Anchor, Fybros",
      plumbing: "ISI Standard Pipe",
      fittings: "PLATO",
      innerPaint: "2 Coat putty, 1 coat primer (Tractor emulsion)",
      outerPaint: "Asian paints Ace Apex",
      elevation: "Basic elevation",
    },
    {
      name: "Premium Package",
      cost: 2300,
      cement: "Chettinadu, ultratech",
      steel: "Prime gold, Indrola TMT Bars",
      brick: "Wire cut brick",
      flooring: "Tiles @₹70/sq.ft",
      doors: "Main door Kerala teak/UPVC windows",
      electrical: "ISI Pipes, Havells, GM switches",
      plumbing: "Ashirvad, supreme",
      fittings: "JOHNSON, PARRYWARE",
      innerPaint: "2 Coat putty, 1 coat primer (Premium paint)",
      outerPaint: "Asian paints Ace Apex",
      elevation: "Engineer’s choice",
    },
    {
      name: "Luxury Package",
      cost: 2500,
      cement: "Ultratech, Ramco",
      steel: "TATA, JSW",
      brick: "Wire cut brick",
      flooring: "Tiles @₹90/sq.ft",
      doors: "Full teak wood",
      electrical: "ISI Pipes, Legrand",
      plumbing: "Ashirvad, Finolex",
      fittings: "PARRYWARE, JAQUAR",
      innerPaint: "3 Coat putty, 1 coat primer (Royale paint)",
      outerPaint: "Asian Paints Ace Ultima",
      elevation: "Client’s choice",
    },
  ],
  houseConfigurations: {
    "1BHK": {
      minArea: 450,
      idealArea: 600,
      rooms: "1 Bedroom, 1 Bathroom, Kitchen, Living area",
      suitableFor: "Bachelors, small families, rental income",
      estimatedCost: { min: 945000, max: 1500000 },
    },
    "2BHK": {
      minArea: 800,
      idealArea: 1000,
      rooms: "2 Bedrooms, 2 Bathrooms, Kitchen, Living, Dining",
      suitableFor: "Small to medium families, first-time home buyers",
      estimatedCost: { min: 1680000, max: 2500000 },
    },
    "3BHK": {
      minArea: 1200,
      idealArea: 1500,
      rooms: "3 Bedrooms, 2-3 Bathrooms, Kitchen, Living, Dining, Balcony",
      suitableFor: "Medium to large families, comfortable living",
      estimatedCost: { min: 2520000, max: 3750000 },
    },
    "4BHK": {
      minArea: 1800,
      idealArea: 2200,
      rooms: "4 Bedrooms, 3-4 Bathrooms, Kitchen, Living, Dining, 2 Balconies, Study",
      suitableFor: "Large families, luxury living, joint families",
      estimatedCost: { min: 3780000, max: 5500000 },
    },
    "5BHK": {
      minArea: 2500,
      idealArea: 3000,
      rooms: "5 Bedrooms, 4-5 Bathrooms, Kitchen, Living, Dining, Multiple Balconies, Study, Servant room",
      suitableFor: "Very large families, luxury villas, multi-generational",
      estimatedCost: { min: 5250000, max: 7500000 },
    },
  },
  plotSizes: {
    "20x30": { area: 600, suitable: "1BHK, 2BHK", groundCoverage: 360, floors: "G+1" },
    "30x40": { area: 1200, suitable: "2BHK, 3BHK", groundCoverage: 720, floors: "G+1/G+2" },
    "30x50": { area: 1500, suitable: "3BHK, 4BHK", groundCoverage: 900, floors: "G+1/G+2" },
    "40x60": { area: 2400, suitable: "4BHK, 5BHK", groundCoverage: 1440, floors: "G+2/G+3" },
    "50x80": { area: 4000, suitable: "5BHK Villa, Multiple units", groundCoverage: 2400, floors: "G+2/G+3" },
  },
  additionalCosts: {
    carParking: 1800,
    undergroundSump: 1800,
    wasteWaterTank: 150000,
    compoundWall: { perFoot: 1000, standardPlot: 140 },
    solarPower: { per2KW: 120000 },
  },
  constructionPhases: {
    planning: { duration: "2-4 weeks", description: "Site survey, soil test, plan approval" },
    foundation: { duration: "4-6 weeks", description: "Excavation, footing, plinth beam" },
    structure: { duration: "8-12 weeks", description: "Column, beam, slab work" },
    walling: { duration: "6-8 weeks", description: "Brick work, plastering" },
    roofing: { duration: "3-4 weeks", description: "Roof slab, waterproofing" },
    electrical: { duration: "3-4 weeks", description: "Conduit, wiring, fittings" },
    plumbing: { duration: "3-4 weeks", description: "Pipeline, sanitary fittings" },
    flooring: { duration: "4-5 weeks", description: "Tile laying, granite work" },
    carpentry: { duration: "4-6 weeks", description: "Doors, windows, kitchen cabinets" },
    painting: { duration: "3-4 weeks", description: "Putty, primer, final coats" },
    finishing: { duration: "2-3 weeks", description: "Fixtures, cleanup, handover" },
  },
  materials: {
    cement: {
      brands: {
        premium: ["Ultratech", "Ramco", "ACC", "Ambuja", "Dalmia"],
        standard: ["Jsw", "Kcp", "Penna", "Coromandel"],
      },
      types: ["OPC 43 Grade", "OPC 53 Grade", "PPC", "PSC"],
      consumption: "8 bags per 100 sq.ft built-up",
      storage: "Keep in dry place, use within 3 months",
    },
    steel: {
      brands: {
        premium: ["TATA", "JSW", "Vizag", "SAIL"],
        standard: ["Vela TMT", "Prime Gold", "Indrola", "Kamdhenu"],
      },
      grades: ["Fe 415", "Fe 500", "Fe 550"],
      consumption: "4 kg per sq.ft for normal construction",
      specifications: "TMT bars with corrosion resistance",
    },
    bricks: {
      types: {
        wireCut: "6x4x3 inches, high strength, uniform",
        ordinary: "Standard red bricks, cost-effective",
        flyAsh: "Eco-friendly, lightweight, good insulation",
        aac: "Autoclaved Aerated Concrete, premium option",
      },
      consumption: "55 bricks per sq.ft for 9-inch wall",
      cost: { wireCut: "₹8-12 per brick", ordinary: "₹5-7 per brick" },
    },
    sand: {
      types: ["M-Sand (manufactured)", "River sand", "P-Sand (plastering)"],
      consumption: "2.5 tons per 100 sq.ft",
      quality: "Silt-free, proper gradation essential",
    },
    aggregates: {
      sizes: ["20mm (concrete)", "10mm (concrete)", "6mm (plastering)"],
      consumption: "3 tons per 100 sq.ft",
      source: "Crushed stone, ISI marked",
    },
  },
  roomTypes: {
    bedroom: { minSize: "10x10 ft", ideal: "12x12 ft", flooring: "Vitrified tiles" },
    kitchen: { minSize: "8x10 ft", ideal: "10x12 ft", flooring: "Anti-skid tiles" },
    bathroom: { minSize: "5x7 ft", ideal: "6x8 ft", flooring: "Anti-skid ceramic" },
    livingRoom: { minSize: "12x14 ft", ideal: "14x16 ft", flooring: "Vitrified/Marble" },
    diningRoom: { minSize: "10x10 ft", ideal: "10x12 ft", flooring: "Vitrified tiles" },
    balcony: { minSize: "4x6 ft", ideal: "5x8 ft", flooring: "Anti-skid tiles" },
  },
  approvals: {
    required: ["Panchayat/Municipal approval", "Building plan sanction", "Fire NOC (if >15m height)", "Water/Sewage connection", "Electricity connection"],
    documents: ["Land documents", "Survey sketch", "Building plan", "Structural plan", "Owner ID proof"],
    timeline: "30-90 days depending on authority",
  },
  vastu: {
    mainDoor: "East or North facing preferred",
    kitchen: "South-East corner ideal",
    masterBedroom: "South-West corner",
    puja: "North-East corner",
    bathroom: "West or North-West",
    staircase: "South, West, or South-West",
  },
  smartHome: {
    basic: ["Smart switches", "Video doorbell", "Motion sensors"],
    advanced: ["Home automation system", "CCTV integration", "Voice control", "Climate control"],
    cost: "₹50,000 - ₹3,00,000 depending on features",
  },
  energyEfficiency: {
    solar: "2KW system costs ~₹1.2L, saves ₹2000/month",
    rainwater: "Harvesting system: ₹40,000-80,000",
    insulation: "Roof insulation reduces AC costs by 30%",
    windows: "Double-glazed windows improve temperature control",
  },
  warranty: {
    structure: "Lifetime structural warranty",
    waterproofing: "10 years for roof & bathroom",
    painting: "3 years for interior, 2 years for exterior",
    electrical: "2 years on installations",
    plumbing: "2 years on fittings, 10 years on pipes",
  },
  maintenance: {
    yearly: ["Roof inspection", "Painting touch-up", "Plumbing check", "Electrical safety"],
    fiveYear: ["Exterior repainting", "Waterproofing renewal", "Wood treatment"],
    tenYear: ["Major renovation assessment", "Structural inspection"],
  },
};

type BHKType = keyof typeof CONSTRUCTION_DATA.houseConfigurations;
type PlotSizeKey = keyof typeof CONSTRUCTION_DATA.plotSizes;
type HouseConfig = (typeof CONSTRUCTION_DATA.houseConfigurations)[BHKType];
type PlotInfo = (typeof CONSTRUCTION_DATA.plotSizes)[PlotSizeKey];
type PhaseInfo = { duration: string; description: string };

/** ========= Helper: normalizeArea (supports English & Tamil patterns) ========= */
const normalizeArea = (text: string): number | null => {
  const patterns = [
    /(\d+(?:,\d{3})(?:\.\d+)?)\s(?:sq\.?\s*ft|square\s*feet?|sqft|sqrt\.?\s*ft|sq\s*feet?|square\s*foot)/i,
    /(\d+(?:,\d{3})(?:\.\d+)?)\s(?:ft²|sq\s*ft)/i,
    /(\d+(?:,\d{3})(?:\.\d+)?)\s(?:வர்க்க\s*அடி|சதுர\s*அடி)/i, // Tamil patterns
    /(\d+(?:,\d{3})(?:\.\d+)?)\s(?:sq\.?\s*m|square\s*meter|sqm)/i, // metric if provided (but return raw)
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      return parseInt(match[1].replace(/,/g, ""), 10);
    }
  }
  return null;
};

/** ========= Core Query Analyzer (merged logic) ========= */
const analyzeQuery = (query: string): string | { text: string; cta: { label: string; href: string }[] } => {
  const lowerQuery = query.toLowerCase();

  // BHK questions
  if (lowerQuery.match(/\d+\s*bhk|bhk|bedroom|how many rooms/i)) {
    const bhkMatch = lowerQuery.match(/(\d+)\s*bhk/i);
    if (bhkMatch) {
      const bhkType = `${bhkMatch[1]}BHK` as BHKType;
      if (bhkType in CONSTRUCTION_DATA.houseConfigurations) {
        return generateBHKInfo(bhkType);
      }
    }
    return generateAllBHKInfo();
  }

  // Plot / site detection (30x40 etc.)
  if (lowerQuery.match(/plot|site|land|30x40|40x60|20x30|30x50|50x80/i)) {
    const plotMatch = lowerQuery.match(/(\d+)\s*x\s*(\d+)/i);
    if (plotMatch) {
      return generatePlotInfo(`${plotMatch[1]}x${plotMatch[2]}`);
    }
    return generateAllPlotInfo();
  }

  // Cost estimates
  if (lowerQuery.match(/cost|price|calculate|how much|budget|estimate|rate|charges/i)) {
    const area = normalizeArea(query);
    if (area) {
      return generateCostEstimate(area);
    }

    const bhkMatch = lowerQuery.match(/(\d+)\s*bhk/i);
    if (bhkMatch) {
      const bhk = `${bhkMatch[1]}BHK` as BHKType;
      if (bhk in CONSTRUCTION_DATA.houseConfigurations) {
        return generateBHKCostEstimate(bhk);
      }
      return "Please specify a valid BHK type (1BHK, 2BHK, 3BHK, 4BHK, or 5BHK).";
    }

    return "I can help you calculate construction costs! Please provide:\n• Square footage (e.g., 'Calculate cost for 1500 sq.ft')\n• Or BHK type (e.g., 'Cost for 3BHK')\n• Or plot size (e.g., 'Cost for 30x40 plot')";
  }

  // Duplex/Villa
  if (lowerQuery.match(/duplex|villa|two story|double story|g\+1|g\+2|g\+3/i)) {
    return generateDuplexVillaInfo(lowerQuery);
  }

  // Interior / modular
  if (lowerQuery.match(/interior|modular kitchen|false ceiling|wardrobe|furniture/i)) {
    return generateInteriorInfo(lowerQuery);
  }

  // Loans
  if (lowerQuery.match(/loan|finance|emi|bank|home loan|housing loan/i)) {
    return generateLoanInfo();
  }

  // Compare / difference / packages
  if (lowerQuery.match(/compare|difference|vs|versus|better/i)) {
    if (lowerQuery.match(/\d+\s*bhk/gi)) {
      return generateBHKComparison(lowerQuery);
    }
    return generatePackageComparison();
  }

  // Packages
  if (lowerQuery.match(/package|option/)) {
    return generatePackageComparison();
  }

  // Vastu
  if (lowerQuery.match(/vastu|direction|facing|puja room|bedroom direction/)) {
    return generateVastuInfo(lowerQuery);
  }

  // Room sizes
  if (lowerQuery.match(/room size|bedroom size|kitchen size|bathroom size|dimensions|minimum size/)) {
    return generateRoomSizeInfo(lowerQuery);
  }

  // Approvals
  if (lowerQuery.match(/approval|permission|sanction|legal|document|noc|panchayat|municipal/)) {
    return generateApprovalInfo();
  }

  // Phases
  if (lowerQuery.match(/phase|stage|step|process|sequence|foundation|structure/)) {
    return generatePhaseInfo(lowerQuery);
  }

  // Material consumption
  if (lowerQuery.match(/how much|consumption|quantity|needed|require/)) {
    if (lowerQuery.match(/cement/)) return generateMaterialConsumption("cement");
    if (lowerQuery.match(/steel|rod|bar/)) return generateMaterialConsumption("steel");
    if (lowerQuery.match(/brick/)) return generateMaterialConsumption("brick");
    if (lowerQuery.match(/sand/)) return generateMaterialConsumption("sand");
  }

  // Sand / aggregates
  if (lowerQuery.match(/sand|m-sand|river sand|aggregate|stone/)) {
    return generateSandAggregateInfo();
  }

  // Material info
  if (lowerQuery.match(/material|cement|steel|brick|flooring|tiles/)) {
    return generateMaterialInfo(lowerQuery);
  }

  // Duration / timeline
  if (lowerQuery.match(/duration|time|how long|timeline|schedule|when complete|completion/)) {
    const area = normalizeArea(query);
    if (area) {
      return generateDurationEstimate(area);
    }
    const bhkMatch = lowerQuery.match(/(\d+)\s*bhk/i);
    if (bhkMatch) {
      const bhkType = `${bhkMatch[1]}BHK` as BHKType;
      const config = CONSTRUCTION_DATA.houseConfigurations[bhkType];
      if (config) return generateDurationEstimate(config.idealArea);
    }
    return "Construction duration depends on the plot size. Typically:\n• Up to 1000 sq.ft: 6-8 months\n• 1000-2000 sq.ft: 8-12 months\n• 2000-3000 sq.ft: 12-15 months\n\nWhat's your plot size or BHK requirement?";
  }

  // Smart Home
  if (lowerQuery.match(/smart home|automation|iot|smart switch|voice control|alexa|google home/)) {
    return generateSmartHomeInfo();
  }

  // Energy efficiency
  if (lowerQuery.match(/solar|energy|electricity saving|rainwater|green building|eco friendly/)) {
    return generateEnergyEfficiencyInfo();
  }

  // Warranty
  if (lowerQuery.match(/warranty|guarantee|after sale|service/)) {
    return generateWarrantyInfo();
  }

  // Maintenance
  if (lowerQuery.match(/maintenance|repair|upkeep|care|servicing/)) {
    return generateMaintenanceInfo();
  }

  // Brands
  if (lowerQuery.match(/brand|recommend|best|quality|which company/)) {
    return generateBrandRecommendations(lowerQuery);
  }

  // Electrical
  if (lowerQuery.match(/electrical|wiring|switch|board|mcb/)) {
    return generateElectricalInfo();
  }

  // Plumbing
  if (lowerQuery.match(/plumbing|water|pipe|tank|sanitary|bathroom fitting/)) {
    return generatePlumbingInfo();
  }

  // Paint
  if (lowerQuery.match(/paint|color|finish|putty|emulsion/)) {
    return generatePaintingInfo();
  }

  // Door/window
  if (lowerQuery.match(/door|window|teak|upvc|wooden/)) {
    return generateDoorWindowInfo();
  }

  // Floorings
  if (lowerQuery.match(/floor|tile|marble|granite|vitrified/)) {
    return generateFlooringInfo();
  }

  // Parking
  if (lowerQuery.match(/parking|car park|garage/)) {
    return generateParkingInfo();
  }

  // Stilt/Basement
  if (lowerQuery.match(/stilt|basement|underground|parking floor/)) {
    return generateStiltBasementInfo();
  }

  // Company info / contact
  if (lowerQuery.match(/who are you|about|company|contact|location|address|phone|mobile/)) {
    return generateCompanyInfo();
  }

  // greeting fallback
  if (lowerQuery.match(/^(hi|hello|hey|good morning|good afternoon|good evening|namaste)/)) {
    return "Hello! 👋 Welcome to Adithya Constructions. I'm here to help you build your dream home!\n\nI can assist you with:\n• 💰 Cost estimates (by area or BHK)\n• 🏠 BHK configurations (1BHK to 5BHK)\n• 📐 Plot size recommendations\n• 🏗 Construction timeline\n• 🎨 Materials & specifications\n• 📋 Documentation & approvals\n\nHow can I help you today?";
  }

  return generateContactFallback();
};

/** ========= All generator/helper functions (from old + merged fixes) ========= */

const generateCostEstimate = (sqft: number) => {
  const estimates = CONSTRUCTION_DATA.packages.map((pkg) => ({
    name: pkg.name,
    total: sqft * pkg.cost,
  }));

  return `📊 *Cost Estimate for ${sqft} sq.ft:*\n\n${estimates
    .map(
      (est) =>
        `**${est.name}**: ₹${est.total.toLocaleString("en-IN")}\n(₹${CONSTRUCTION_DATA.packages.find((p) => p.name === est.name)?.cost}/sq.ft)`,
    )
    .join("\n\n")}\n\n*Additional Options:*\n• Car Parking: ₹${(CONSTRUCTION_DATA.additionalCosts.carParking * sqft).toLocaleString(
    "en-IN",
  )}\n• Underground Sump: ~₹1,80,000 (for 10,000L)\n\n💡 These are base estimates. Would you like details about any specific package?`;
};

const generatePackageComparison = () => {
  const details = CONSTRUCTION_DATA.packages
    .map(
      (pkg, idx) =>
        `**${idx + 1}. ${pkg.name}** - ₹${pkg.cost}/sq.ft\n• Cement: ${pkg.cement}\n• Steel: ${pkg.steel}\n• Flooring: ${pkg.flooring}\n• Paint: ${pkg.innerPaint}`,
    )
    .join("\n\n");
  return `📦 **Package Comparison:**\n\n${details}\n\n💡 **Recommendation:** Premium package offers the best value for quality. Luxury package is ideal for high-end finishes.`;
};

const generateMaterialInfo = (query: string) => {
  if (query.includes("cement")) {
    return `🏗 **Cement Options:**\n\n**Standard:** Jsw, Kcp - Reliable brands for basic construction\n**Premium:** Chettinadu, Ultratech - Better strength and durability\n**Luxury:** Ultratech, Ramco - Premium quality, faster setting\n\n💡 Tip: Premium cement reduces cracking and improves longevity.`;
  }
  if (query.includes("steel")) {
    return `⚙ **Steel Options:**\n\n**Standard:** Vela TMT - Good quality for budget builds\n**Premium:** Prime Gold, Indrola TMT - Better tensile strength\n**Luxury:** TATA, JSW - Top-tier quality, earthquake resistant\n\n💡 Tip: Never compromise on steel quality for structural safety.`;
  }
  if (query.includes("brick")) {
    return `🧱 **Brick Options:**\n\n**Standard:** Ordinary brick - Traditional, cost-effective\n**Premium & Luxury:** Wire cut brick - Better finish, uniform size, higher strength\n\n💡 Wire cut bricks reduce plastering thickness and improve aesthetics.`;
  }
  if (query.includes("floor") || query.includes("tile")) {
    return `🏠 **Flooring Options:**\n\n**Standard:** Tiles @₹50/sq.ft - Basic vitrified tiles\n**Premium:** Tiles @₹70/sq.ft - Better designs and durability\n**Luxury:** Tiles @₹90/sq.ft - Premium Italian/Spanish tiles\n\n💡 Tip: Invest in good flooring for high-traffic areas like living room.`;
  }
  return generatePackageComparison();
};

const generateDurationEstimate = (sqft: number) => {
  let months = 0;
  if (sqft <= 1000) months = 7;
  else if (sqft <= 1500) months = 9;
  else if (sqft <= 2000) months = 11;
  else if (sqft <= 2500) months = 13;
  else months = 15;

  return `⏱ **Estimated Timeline for ${sqft} sq.ft:**\n\n**Total Duration:** ${months} months\n\n**Phase Breakdown:**\n• Foundation & Plinth: ${Math.round(months * 0.2)} months\n• Structural Work: ${Math.round(months * 0.3)} months\n• Walling & Roofing: ${Math.round(months * 0.25)} months\n• Finishing & Interiors: ${Math.round(months * 0.25)} months\n\n💡 Timeline may vary based on weather, material availability, and design complexity.`;
};

const generateBrandRecommendations = (query: string) => {
  if (query.includes("electrical") || query.includes("switch")) {
    return generateElectricalInfo();
  }
  if (query.includes("plumb")) {
    return generatePlumbingInfo();
  }
  return `🌟 **Top Brand Recommendations:**\n\n**Cement:** Ultratech, Ramco, ACC\n**Steel:** TATA, JSW, Vizag\n**Tiles:** Kajaria, Somany, Nitco\n**Paint:** Asian Paints, Berger, Dulux\n**Sanitaryware:** Parryware, Jaquar, Hindware\n**Electrical:** Legrand, Havells, Anchor\n**Plumbing:** Ashirvad, Finolex, Supreme\n\n💡 We use only ISI/ISO certified materials across all packages.`;
};

const generateElectricalInfo = () => {
  return `⚡ **Electrical Specifications:**\n\n**Standard Package:**\n• ISI Pipes, Anchor, Fybros switches\n• Basic MCB & distribution board\n\n**Premium Package:**\n• ISI Pipes, Havells switches\n• GM modular switches\n• Better aesthetics\n\n**Luxury Package:**\n• ISI Pipes, Legrand switches\n• Premium modular range\n• Smart home ready wiring\n\n💡 All packages include proper earthing and safety measures as per IS standards.`;
};

const generatePlumbingInfo = () => {
  return `💧 **Plumbing Specifications:**\n\n**Standard Package:**\n• ISI Standard Pipes\n• Basic CPVC/PVC systems\n\n**Premium Package:**\n• Ashirvad, Supreme pipes\n• Better pressure resistance\n• 10-year warranty\n\n**Luxury Package:**\n• Vajjeramplast, Finolex\n• Premium quality, longest life\n• 15-year warranty\n\n**Optional Add-ons:**\n• Underground Sump: 10,000L capacity\n• Waste Water Recycling Tank\n\n💡 Proper plumbing prevents future leakage issues.`;
};

const generatePaintingInfo = () => {
  return `🎨 **Painting Specifications:**\n\n**Inner Painting:**\n• Standard: 2 coat putty + 1 primer + Tractor emulsion\n• Premium: 2 coat putty + 1 primer + Premium paint\n• Luxury: 3 coat putty + 1 primer + Royale paint\n\n**Outer Painting:**\n• Standard & Premium: Asian Paints Ace Apex\n• Luxury: Asian Paints Ace Ultima\n\n💡 Proper putty work ensures smooth finish and paint longevity. Premium paints offer better washability and color retention.`;
};

const generateVastuInfo = (_query: string) => {
  return `🧭 **Vastu Guidelines:**\n\n**Main Door:** ${CONSTRUCTION_DATA.vastu.mainDoor}\n**Kitchen:** ${CONSTRUCTION_DATA.vastu.kitchen}\n**Master Bedroom:** ${CONSTRUCTION_DATA.vastu.masterBedroom}\n**Puja Room:** ${CONSTRUCTION_DATA.vastu.puja}\n**Bathroom:** ${CONSTRUCTION_DATA.vastu.bathroom}\n**Staircase:** ${CONSTRUCTION_DATA.vastu.staircase}\n\n💡 Note: Vastu is a guideline. We can design plans that balance Vastu principles with practical functionality and modern architecture.`;
};

const generateRoomSizeInfo = (query: string) => {
  if (query.includes("bedroom")) {
    return `🛏 **Bedroom Dimensions:**\n\n**Minimum Size:** ${CONSTRUCTION_DATA.roomTypes.bedroom.minSize}\n**Ideal Size:** ${CONSTRUCTION_DATA.roomTypes.bedroom.ideal}\n**Flooring:** ${CONSTRUCTION_DATA.roomTypes.bedroom.flooring}\n\n💡 Master bedroom should be slightly larger (12x14 ft or more) for comfort.`;
  }
  if (query.includes("kitchen")) {
    return `🍳 **Kitchen Dimensions:**\n\n**Minimum Size:** ${CONSTRUCTION_DATA.roomTypes.kitchen.minSize}\n**Ideal Size:** ${CONSTRUCTION_DATA.roomTypes.kitchen.ideal}\n**Flooring:** ${CONSTRUCTION_DATA.roomTypes.kitchen.flooring}\n\n💡 L-shaped or U-shaped layouts work best. Include 2-3 ft clearance for movement.`;
  }
  if (query.includes("bathroom")) {
    return `🚿 **Bathroom Dimensions:**\n\n**Minimum Size:** ${CONSTRUCTION_DATA.roomTypes.bathroom.minSize}\n**Ideal Size:** ${CONSTRUCTION_DATA.roomTypes.bathroom.ideal}\n**Flooring:** ${CONSTRUCTION_DATA.roomTypes.bathroom.flooring}\n\n💡 Master bathroom can be 7x8 ft for added luxury. Ensure proper ventilation.`;
  }
  return `📐 **Standard Room Sizes:**\n\n**Bedroom:** ${CONSTRUCTION_DATA.roomTypes.bedroom.ideal}\n**Kitchen:** ${CONSTRUCTION_DATA.roomTypes.kitchen.ideal}\n**Bathroom:** ${CONSTRUCTION_DATA.roomTypes.bathroom.ideal}\n**Living Room:** ${CONSTRUCTION_DATA.roomTypes.livingRoom.ideal}\n**Dining Room:** ${CONSTRUCTION_DATA.roomTypes.diningRoom.ideal}\n**Balcony:** ${CONSTRUCTION_DATA.roomTypes.balcony.ideal}\n\n💡 These are ideal sizes. Minimum sizes available on request.`;
};

const generateApprovalInfo = () => {
  const required = CONSTRUCTION_DATA.approvals.required.map((item) => `• ${item}`).join("\n");
  const docs = CONSTRUCTION_DATA.approvals.documents.map((item) => `• ${item}`).join("\n");
  return `📋 *Approvals & Documentation:*\n\n*Required Approvals:*\n${required}\n\n*Documents Needed:*\n${docs}\n\n*Timeline:* ${CONSTRUCTION_DATA.approvals.timeline}\n\n💡 We assist with entire approval process and liaise with authorities on your behalf.`;
};

const generatePhaseInfo = (query: string) => {
  if (query.includes("foundation")) {
    const phase = CONSTRUCTION_DATA.constructionPhases.foundation;
    return `🏗 **Foundation Phase:**\n\n**Duration:** ${phase.duration}\n**Work Included:** ${phase.description}\n\n**Key Activities:**\n• Soil testing & excavation\n• Footing with reinforcement\n• Plinth beam construction\n• Anti-termite treatment\n\n💡 Strong foundation is crucial. We ensure proper depth and quality materials.`;
  }
  const phases = (Object.entries(CONSTRUCTION_DATA.constructionPhases) as [string, PhaseInfo][])
    .map(([key, phase]) => `**${key.charAt(0).toUpperCase() + key.slice(1)}:** ${phase.duration}\n${phase.description}`)
    .join("\n\n");
  return `🏗 *Construction Phases:*\n\n${phases}\n\n💡 Total timeline: 8-15 months depending on plot size and complexity.`;
};

const generateMaterialConsumption = (material: string) => {
  if (material === "cement") {
    return `🏗 **Cement Consumption:**\n\n**Average:** ${CONSTRUCTION_DATA.materials.cement.consumption}\n**Types Available:** ${CONSTRUCTION_DATA.materials.cement.types.join(", ")}\n**Storage:** ${CONSTRUCTION_DATA.materials.cement.storage}\n\n**For 1000 sq.ft:**\n• Foundation: ~80 bags\n• Walls: ~120 bags\n• Plastering: ~60 bags\n• Flooring: ~40 bags\n**Total: ~300 bags**\n\n💡 Actual consumption varies based on design and structure.`;
  }
  if (material === "steel") {
    return `⚙ **Steel Consumption:**\n\n**Average:** ${CONSTRUCTION_DATA.materials.steel.consumption}\n**Grades:** ${CONSTRUCTION_DATA.materials.steel.grades.join(", ")}\n**Specification:** ${CONSTRUCTION_DATA.materials.steel.specifications}\n\n**For 1000 sq.ft:**\n• Foundation: ~800 kg\n• Columns: ~1200 kg\n• Beams & Slab: ~2000 kg\n**Total: ~4000 kg (4 tons)**\n\n💡 More for multi-story buildings. We use ISI certified TMT bars only.`;
  }
  if (material === "brick") {
    const types = Object.entries(CONSTRUCTION_DATA.materials.bricks.types)
      .map(([key, desc]) => `• ${key}: ${desc}`)
      .join("\n");
    const costs = Object.entries(CONSTRUCTION_DATA.materials.bricks.cost)
      .map(([key, price]) => `• ${key}: ${price}`)
      .join("\n");
    return `🧱 *Brick Consumption:*\n\n*Average:* ${CONSTRUCTION_DATA.materials.bricks.consumption}\n*Types Available:*\n${types}\n\n*Cost:*\n${costs}\n\n💡 Wire cut bricks recommended for better finish.`;
  }
  if (material === "sand") {
    return `🏖 **Sand Consumption:**\n\n**Average:** ${CONSTRUCTION_DATA.materials.sand.consumption}\n**Types:** ${CONSTRUCTION_DATA.materials.sand.types.join(", ")}\n**Quality Check:** ${CONSTRUCTION_DATA.materials.sand.quality}\n\n**For 1000 sq.ft:**\n• Total sand needed: ~2.5 tons\n• M-Sand for concrete\n• P-Sand for plastering\n\n💡 We use M-Sand (manufactured sand) for consistency and strength.`;
  }
  return "Please specify which material's consumption you'd like to know about: cement, steel, brick, or sand.";
};

const generateSandAggregateInfo = () => {
  const sandTypes = CONSTRUCTION_DATA.materials.sand.types.map((type) => `• ${type}`).join("\n");
  return `🏖 *Sand & Aggregates:*\n\n*Sand Types:*\n${sandTypes}\n*Consumption:* ${CONSTRUCTION_DATA.materials.sand.consumption}\n\n*Aggregates:*\n*Sizes:* ${CONSTRUCTION_DATA.materials.aggregates.sizes.join(", ")}\n*Consumption:* ${CONSTRUCTION_DATA.materials.aggregates.consumption}\n*Source:* ${CONSTRUCTION_DATA.materials.aggregates.source}\n\n💡 Quality of sand & aggregates directly affects concrete strength.`;
};

const generateSmartHomeInfo = () => {
  const basic = CONSTRUCTION_DATA.smartHome.basic.map((item) => `• ${item}`).join("\n");
  const adv = CONSTRUCTION_DATA.smartHome.advanced.map((item) => `• ${item}`).join("\n");
  return `🏠 *Smart Home Integration:*\n\n*Basic Package:*\n${basic}\n\n*Advanced Package:*\n${adv}\n\n*Investment:* ${CONSTRUCTION_DATA.smartHome.cost}\n\n💡 We can pre-wire your home for smart features. Best to plan during construction phase.`;
};

const generateEnergyEfficiencyInfo = () => {
  return `⚡ **Energy Efficiency Options:**\n\n**Solar Power:** ${CONSTRUCTION_DATA.energyEfficiency.solar}\n**Rainwater Harvesting:** ${CONSTRUCTION_DATA.energyEfficiency.rainwater}\n**Roof Insulation:** ${CONSTRUCTION_DATA.energyEfficiency.insulation}\n**Windows:** ${CONSTRUCTION_DATA.energyEfficiency.windows}\n\n💡 These investments pay back within 5-7 years through reduced electricity bills and water savings.`;
};

const generateWarrantyInfo = () => {
  return `🛡 **Warranty Coverage:**\n\n**Structure:** ${CONSTRUCTION_DATA.warranty.structure}\n**Waterproofing:** ${CONSTRUCTION_DATA.warranty.waterproofing}\n**Painting:** ${CONSTRUCTION_DATA.warranty.painting}\n**Electrical:** ${CONSTRUCTION_DATA.warranty.electrical}\n**Plumbing:** ${CONSTRUCTION_DATA.warranty.plumbing}\n\n💡 We stand behind our work with comprehensive warranties. Free service visits during warranty period.`;
};

const generateMaintenanceInfo = () => {
  const yearly = CONSTRUCTION_DATA.maintenance.yearly.map((item) => `• ${item}`).join("\n");
  const five = CONSTRUCTION_DATA.maintenance.fiveYear.map((item) => `• ${item}`).join("\n");
  const ten = CONSTRUCTION_DATA.maintenance.tenYear.map((item) => `• ${item}`).join("\n");
  return `🔧 *Maintenance Guidelines:*\n\n*Yearly Maintenance:*\n${yearly}\n\n*5-Year Maintenance:*\n${five}\n\n*10-Year Maintenance:*\n${ten}\n\n💡 Regular maintenance extends life of your home and prevents major repairs.`;
};

const generateDoorWindowInfo = () => {
  return `🚪 **Doors & Windows:**\n\n**Standard Package:**\n• Main door: Country teak\n• Windows: UPVC\n• Cost-effective & durable\n\n**Premium Package:**\n• Main door: Kerala teak\n• Windows: UPVC branded\n• Better finish & security\n\n**Luxury Package:**\n• Fully teak wood doors\n• Premium hardware\n• Custom designs available\n\n💡 UPVC windows offer better insulation and are termite-proof. Teak doors add elegance and security.`;
};

const generateFlooringInfo = () => {
  return `🏠 **Flooring Options:**\n\n**Standard Package:**\n• Tiles @₹50/sq.ft\n• Basic vitrified tiles\n• Good for all areas\n\n**Premium Package:**\n• Tiles @₹70/sq.ft\n• Designer vitrified tiles\n• Better patterns & durability\n\n**Luxury Package:**\n• Tiles @₹90/sq.ft\n• Premium Italian/Spanish tiles\n• High-end finish\n\n**Additional Options:**\n• Granite: ₹100-150/sq.ft\n• Marble: ₹150-300/sq.ft\n• Wooden flooring: ₹200-400/sq.ft\n\n💡 Vitrified tiles are low maintenance. Granite/Marble recommended for living areas.`;
};

const generateCompanyInfo = () => {
  return `🏢 **Adithya Constructions & Architects**\n\n**Contact:**\n📱 Mobile: 63745 07535\n👤 Er. V. Boobalan, B.E\n\n**Address:**\n2F Gujjans Arudra, Perur Main Road\nTelugupalayam, CBE 641 010\n\n**Services:**\n• Complete construction (planning to handover)\n• Architectural design\n• A-Z guidance\n• Total contract basis\n• All packages include materials & labor\n\n**Why Choose Us:**\n✓ Experienced engineers\n✓ Quality materials\n✓ Timely completion\n✓ Transparent pricing\n✓ Comprehensive warranty\n\n💡 We handle everything from approvals to final handover!`;
};

const generateBHKInfo = (bhkType: BHKType) => {
  const config: HouseConfig = CONSTRUCTION_DATA.houseConfigurations[bhkType];
  if (!config) {
    return generateAllBHKInfo();
  }

  return `🏠 *${bhkType} House Configuration:*\n\n*Area:*\n• Minimum: ${config.minArea} sq.ft\n• Ideal: ${config.idealArea} sq.ft\n\n*Rooms Included:*\n${config.rooms}\n\n*Suitable For:*\n${config.suitableFor}\n\n*Estimated Cost:*\n• Standard Package: ₹${config.estimatedCost.min.toLocaleString("en-IN")} - ₹${config.estimatedCost.max.toLocaleString("en-IN")}\n• Premium Package: ₹${Math.round(config.estimatedCost.min * 1.095).toLocaleString("en-IN")} - ₹${Math.round(
    config.estimatedCost.max * 1.095
  ).toLocaleString("en-IN")}\n• Luxury Package: ₹${Math.round(config.estimatedCost.min * 1.19).toLocaleString("en-IN")} - ₹${Math.round(
    config.estimatedCost.max * 1.19
  ).toLocaleString("en-IN")}\n\n💡 Final cost depends on plot size, customizations, and package selected.`;
};

const generateAllBHKInfo = () => {
  const list = (Object.entries(CONSTRUCTION_DATA.houseConfigurations) as [BHKType, HouseConfig][])
    .map(
      ([type, config]) =>
        `**${type}:**\n• Area: ${config.minArea}-${config.idealArea} sq.ft\n• ${config.rooms}\n• Starting from ₹${config.estimatedCost.min.toLocaleString("en-IN")}`,
    )
    .join("\n\n");
  return `🏠 *House Configurations Available:*\n\n${list}\n\n💡 Which configuration interests you? I can provide detailed cost breakdown.`;
};

const generateBHKCostEstimate = (bhkType: BHKType) => {
  const config: HouseConfig = CONSTRUCTION_DATA.houseConfigurations[bhkType];
  if (!config) {
    return "Please specify a valid BHK type (1BHK, 2BHK, 3BHK, 4BHK, or 5BHK).";
  }

  const idealArea = config.idealArea;
  return `💰 **${bhkType} Cost Estimate (${idealArea} sq.ft):**\n\n**Package-wise Costs:**\n\n**Standard Package** (₹${CONSTRUCTION_DATA.packages[0].cost}/sq.ft):\n₹${(idealArea * CONSTRUCTION_DATA.packages[0].cost).toLocaleString("en-IN")}\n\n**Premium Package** (₹${CONSTRUCTION_DATA.packages[1].cost}/sq.ft):\n₹${(idealArea * CONSTRUCTION_DATA.packages[1].cost).toLocaleString("en-IN")}\n\n**Luxury Package** (₹${CONSTRUCTION_DATA.packages[2].cost}/sq.ft):\n₹${(idealArea * CONSTRUCTION_DATA.packages[2].cost).toLocaleString("en-IN")}\n\n**Additional Options:**\n• Car Parking: ₹${(CONSTRUCTION_DATA.additionalCosts.carParking * idealArea).toLocaleString("en-IN")}\n• Underground Sump: ₹1,80,000\n• Compound Wall: ₹${(CONSTRUCTION_DATA.additionalCosts.compoundWall.perFoot * CONSTRUCTION_DATA.additionalCosts.compoundWall.standardPlot).toLocaleString("en-IN")}\n\n💡 Includes: ${config.rooms}`;
};

const generateBHKComparison = (query: string) => {
  const bhks = query.match(/\d+\s*bhk/gi);
  if (bhks && bhks.length >= 2) {
    const types = bhks.map((b) => b.replace(/\s+/g, "").toUpperCase() as BHKType);
    const comp = types
      .map((type) => {
        const config: HouseConfig | undefined = CONSTRUCTION_DATA.houseConfigurations[type];
        if (!config) return `${type}: Not available`;
        return `**${type}:**\n• Area: ${config.idealArea} sq.ft\n• Rooms: ${config.rooms}\n• Cost: ₹${config.estimatedCost.min.toLocaleString("en-IN")} - ₹${config.estimatedCost.max.toLocaleString("en-IN")}\n• Best for: ${config.suitableFor}`;
      })
      .join("\n\n");
    return `📊 *Comparing ${types.join(" vs ")}:*\n\n${comp}\n\n💡 Need help choosing? Consider family size, future needs, and budget.`;
  }
  return generateAllBHKInfo();
};

const generatePlotInfo = (plotSize: string) => {
  const normalized = plotSize.replace(/\s+/g, "");
  const plot: PlotInfo | undefined = CONSTRUCTION_DATA.plotSizes[normalized as PlotSizeKey];

  if (!plot) {
    return generateAllPlotInfo();
  }

  return `📐 **${plotSize} Plot Details:**\n\n**Total Area:** ${plot.area} sq.ft\n**Buildable Area:** ~${plot.groundCoverage} sq.ft (60% coverage)\n**Suitable For:** ${plot.suitable}\n**Recommended Floors:** ${plot.floors}\n\n**Estimated Construction:**\n• Standard Package: ₹${(plot.groundCoverage * CONSTRUCTION_DATA.packages[0].cost).toLocaleString("en-IN")}\n• Premium Package: ₹${(plot.groundCoverage * CONSTRUCTION_DATA.packages[1].cost).toLocaleString("en-IN")}\n• Luxury Package: ₹${(plot.groundCoverage * CONSTRUCTION_DATA.packages[2].cost).toLocaleString("en-IN")}\n\n💡 With G+1, you can build double the ground coverage area!`;
};

const generateAllPlotInfo = () => {
  const list = (Object.entries(CONSTRUCTION_DATA.plotSizes) as [PlotSizeKey, PlotInfo][])
    .map(([size, info]) => `**${size} (${info.area} sq.ft):**\n• Suitable for: ${info.suitable}\n• Buildable: ~${info.groundCoverage} sq.ft\n• Floors: ${info.floors}`)
    .join("\n\n");
  return `📐 *Common Plot Sizes:*\n\n${list}\n\n💡 Plot size determines buildable area and BHK options. What's your plot size?`;
};

const generateDuplexVillaInfo = (_query: string) => {
  return `🏘 **Duplex/Villa Construction:**\n\n**Duplex (G+1):**\n• Double the living space on same plot\n• Ideal for 3BHK and above\n• Better ventilation & natural light\n• Separate floors for privacy\n• Cost: ~₹2100-2500/sq.ft per floor\n\n**Villa (G+2/G+3):**\n• Maximum utilization of plot\n• 4BHK, 5BHK configurations\n• Premium living experience\n• Requires larger plot (1500+ sq.ft)\n• Cost includes elevator option\n\n**Floor Options:**\n• G+1: Ground + 1st floor\n• G+2: Ground + 2 floors\n• G+3: Ground + 3 floors\n\n**Additional Features:**\n• Stilt parking (counts as G floor)\n• Terrace garden\n• Elevator installation: ₹8-12 lakhs\n\n💡 Multi-story construction requires structural design approval. We handle all permits!`;
};

const generateInteriorInfo = (query: string) => {
  if (query.includes("modular kitchen")) {
    return `🍳 **Modular Kitchen:**\n\n**Basic Package:** ₹80,000 - ₹1,50,000\n• Standard laminate finish\n• Basic hardware\n• 8-10 ft length\n\n**Premium Package:** ₹1,50,000 - ₹3,00,000\n• High-gloss finish\n• Soft-close hinges\n• Granite/Quartz countertop\n• Chimney & hob included\n\n**Luxury Package:** ₹3,00,000+\n• Imported finishes\n• Premium appliances\n• Full kitchen automation\n• Designer hardware\n\n**Includes:**\n• Wall & base cabinets\n• Drawers & pull-outs\n• Countertop\n• Sink & accessories\n\n💡 Price varies based on kitchen size and material choice.`;
  }
  return `🎨 **Interior Works (Not included in base package):**\n\n**False Ceiling:**\n• Gypsum: ₹90-150/sq.ft\n• POP: ₹80-120/sq.ft\n• Grid ceiling: ₹60-90/sq.ft\n\n**Modular Kitchen:**\n• Basic: ₹80,000 - ₹1,50,000\n• Premium: ₹1,50,000 - ₹3,00,000\n\n**Wardrobes:**\n• Per bedroom: ₹40,000 - ₹1,20,000\n• Sliding vs hinged doors\n• Loft options available\n\n**TV Unit & Furniture:**\n• TV unit: ₹25,000 - ₹80,000\n• Crockery unit: ₹40,000 - ₹1,00,000\n\n**Complete Interior Package:**\n• 2BHK: ₹4-8 lakhs\n• 3BHK: ₹6-12 lakhs\n• 4BHK: ₹8-15 lakhs\n\n💡 Interior work best done during finishing phase. We can coordinate!`;
};

const generateLoanInfo = () => {
  return `💳 **Home Loan Assistance:**\n\n**We Help With:**\n• Documentation preparation\n• Bank liaison\n• Loan application process\n• Property valuation coordination\n\n**Loan Eligibility:**\n• Typically 80-90% of property value\n• Depends on income & credit score\n• Construction loans released in stages\n\n**Popular Banks:**\n• SBI, HDFC, ICICI\n• Canara, Indian Bank\n• LIC Housing Finance\n\n**Current Rates:** ~8.5-9.5% p.a.\n\n**Documents Required:**\n• Income proof (salary slips/ITR)\n• Property documents\n• ID & address proof\n• Bank statements (6 months)\n• Building plan approval\n\n**EMI Example (₹30 lakhs, 20 years):**\n• @8.5%: ~₹26,000/month\n• @9.0%: ~₹27,000/month\n\n💡 We work with loan consultants for faster processing!`;
};

const generateParkingInfo = () => {
  return `🚗 **Parking Options:**\n\n**Open Parking:**\n• Included in plot planning\n• Ground level space\n• For 1-2 cars depending on plot\n\n**Covered Parking:**\n• Car porch with shade\n• Cost: ₹1,80,000 - ₹2,50,000\n• Protects from weather\n\n**Stilt Parking:**\n• Separate parking floor\n• Living space on upper floors\n• Cost: ₹1800/sq.ft\n• Ideal for G+1, G+2 buildings\n\n**Underground Parking:**\n• Premium option for villas\n• Requires waterproofing\n• Cost: ₹2200-2500/sq.ft\n• Maximizes ground usage\n\n💡 Most 30x40 plots accommodate 1-2 car parking. Larger plots can fit more vehicles.`;
};

const generateStiltBasementInfo = () => {
  return `🏗 **Stilt/Basement Construction:**\n\n**Stilt Floor (Ground Parking):**\n• Entire ground as parking\n• Living space starts from 1st floor\n• Cost: ₹1800/sq.ft\n• Popular for urban homes\n• Saves land, maximizes usage\n\n**Basement:**\n• Underground construction\n• Requires dewatering\n• Extra waterproofing essential\n• Cost: ₹2200-2800/sq.ft\n• Uses: Parking, storage, gym\n\n**Specifications:**\n• Proper ventilation mandatory\n• Drainage system required\n• Fire safety compliance\n• Separate electrical board\n\n**Approvals:**\n• Building plan must show basement/stilt\n• Structural stability certificate\n• Fire NOC for basement\n\n💡 Basement construction is 30-40% more expensive but adds significant utility space!`;
};

/** ========= React Component: Popup Chat UI (old style) ========= */
const ConstructionChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your Adithya Construction Assistant. I can help you with:\n\n• Cost calculations for different packages\n• Material recommendations and specifications\n• Construction duration estimates\n• Quality and brand suggestions\n• Project planning advice\n\nHow can I assist you today?",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to bottom
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (open && !minimized) scrollToBottom();
  }, [messages, open, minimized]);

  // Send handler
  const handleSend = async (fromQuick?: string) => {
    const text = fromQuick ?? input;
    if (!text || !text.trim()) return;
    const trimmed = text.trim();

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    // update local UI first
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setOpen(true);
    setMinimized(false);

    // Simulate processing delay then analyze
    setTimeout(() => {
      const result = analyzeQuery(trimmed);
      const assistantMessage: Message =
        typeof result === "string"
          ? {
              id: (Date.now() + 1).toString(),
              role: "assistant",
              content: result,
              timestamp: new Date(),
            }
          : {
              id: (Date.now() + 1).toString(),
              role: "assistant",
              content: result.text,
              timestamp: new Date(),
              cta: result.cta,
            };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
      // scrollToBottom after message added
      setTimeout(() => scrollToBottom(), 100);
    }, 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // QuickAction button
  const QuickAction = ({ label, onClick, icon }: { label: string; onClick: () => void; icon?: React.ReactNode }) => (
    <button
      onClick={onClick}
      className="px-3 py-2 glass-card rounded-md flex items-center gap-2 text-sm hover:shadow-medium transition"
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <>
      {/* Floating trigger button */}
      <div className="fixed bottom-24 sm:bottom-6 right-4 z-50">
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="w-14 h-14 rounded-full gold-gradient shadow-gold flex items-center justify-center text-foreground border border-primary/30"
            aria-label="Open chat"
          >
            <BotLogo size={22} />
          </motion.button>
        )}
      </div>

      {/* Chat popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-popup"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="fixed right-4 bottom-24 sm:bottom-6 z-50 w-[90vw] sm:w-[360px] md:w-[420px] max-w-[420px] glass-card bg-card rounded-2xl shadow-large border-2 border-primary/20 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-primary/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-foreground shadow-gold">
                  <BotLogo size={18} />
                </div>
                <div>
                  <div className="text-sm font-heading font-bold text-foreground">Adithya Construction Assistant</div>
                  <div className="text-xs text-muted-foreground">Ask about costs, materials, timelines…</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMinimized((s) => !s)}
                  className="p-1 rounded-md hover:bg-muted"
                  title={minimized ? "Maximize" : "Minimize"}
                >
                  {/* simple minimize glyph */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-600">
                    <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    setOpen(false);
                    setMinimized(false);
                  }}
                  className="p-1 rounded-md hover:bg-muted"
                  title="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className={`flex flex-col ${minimized ? "h-12" : "h-[420px] sm:h-[480px] max-h-[75vh]"} transition-all`}>
              {!minimized ? (
                <>
                  {/* Quick action row */}
                  <div className="px-3 py-3 border-b border-primary/10 flex gap-2">
                    <QuickAction
                      label="Calculate 1500 sq.ft"
                      onClick={() => handleSend("Calculate cost for 1500 sq.ft")}
                      icon={<svg width="16" height="16" viewBox="0 0 24 24" className="text-gray-700"><path d="M3 3h18v18H3V3z" stroke="none" fill="currentColor"/></svg>}
                    />
                    <QuickAction
                      label="Compare Packages"
                      onClick={() => handleSend("Compare all packages")}
                      icon={<svg width="16" height="16" viewBox="0 0 24 24" className="text-gray-700"><path d="M3 3h18v18H3V3z" stroke="none" fill="currentColor"/></svg>}
                    />
                  </div>

                  {/* Messages container */}
                  <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.role === "user" ? "bg-primary" : "gold-gradient"
                          } ${message.role === "user" ? "text-primary-foreground" : "text-foreground"} shadow-medium`}
                        >
                          {message.role === "user" ? <User size={14} /> : <BotLogo size={14} />}
                        </div>
                        <div className={`flex-1 ${message.role === "user" ? "flex justify-end" : ""}`}>
                          <div
                            className={`inline-block max-w-[76%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                              message.role === "user"
                                ? "bg-primary text-primary-foreground border border-primary/50"
                                : "bg-card text-foreground border border-primary/30 shadow-medium"
                            }`}
                          >
                          <div className="whitespace-pre-wrap">{formatMessage(message.content)}</div>
                          {message.cta && message.cta.length > 0 && (
                            <div className="flex gap-2 mt-2">
                              {message.cta.map((a) => (
                                <a
                                  key={a.href}
                                  href={a.href}
                                  target={a.href.startsWith("http") ? "_blank" : undefined}
                                  rel={a.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                  className="px-2 py-1 rounded-md text-xs border border-primary/30 hover:bg-primary/10"
                                >
                                  {a.label}
                                </a>
                              ))}
                            </div>
                          )}
                            <div className="text-[10px] text-muted-foreground mt-1 text-right">
                              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Typing indicator */}
                    {isLoading && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-foreground shadow-medium">
                          <BotLogo size={14} />
                        </div>
                        <div className="glass-card border border-primary/10 px-4 py-2 rounded-2xl">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input area */}
                  <div className="px-3 py-3 border-t border-primary/10">
                    <div className="flex items-center gap-2">
                      <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask about costs, materials, timelines or type '3BHK'..."
                        className="flex-1 px-3 py-2 rounded-lg border border-primary/20 focus:outline-none"
                        disabled={isLoading}
                      />
                      <button
                        onClick={() => handleSend()}
                        disabled={!input.trim() || isLoading}
                        className="flex items-center gap-2 gold-gradient text-foreground border border-transparent shadow-gold px-3 py-2 rounded-lg disabled:opacity-50"
                      >
                        <Send size={16} />
                        <span className="text-sm">Send</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                // minimized view content
                <div className="px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-foreground shadow-medium">
                      <BotLogo size={14} />
                    </div>
                    <div>
                      <div className="text-sm font-heading font-semibold text-foreground">Adithya Construction Assistant</div>
                      <div className="text-xs text-muted-foreground">Click to expand</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setMinimized(false);
                        setTimeout(() => scrollToBottom(), 120);
                      }}
                      className="px-2 py-1 glass-card rounded-md text-sm"
                    >
                      Open
                    </button>
                    <button
                      onClick={() => {
                        setOpen(false);
                        setMinimized(false);
                      }}
                      className="p-1 rounded-md hover:bg-muted"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ConstructionChatbot;
const generateContactFallback = (): { text: string; cta: { label: string; href: string }[] } => {
  const whatsapp = "https://wa.me/916374507535?text=" + encodeURIComponent("Hi! I have a question about construction.");
  return {
    text:
      "I don't have that information in my dataset. Please reach out on WhatsApp for a precise answer.",
    cta: [{ label: "WhatsApp Owner", href: whatsapp }],
  };
};
const emphasizeNumbers = (text: string): (string | JSX.Element)[] => {
  const parts = text.split(/(₹\s?\d[\d,]*(?:\.\d+)?|\b\d[\d,]*(?:\.\d+)?\b)/g);
  return parts.map((part, i) =>
    part.match(/^(₹\s?\d[\d,]*(?:\.\d+)?|\b\d[\d,]*(?:\.\d+)?\b)$/)
      ? (
          <span key={`n-${i}`} className="font-semibold">
            {part}
          </span>
        )
      : part,
  );
};

const formatBold = (text: string): (string | JSX.Element)[] => {
  const segments = text.split(/(\*\*.+?\*\*)/g);
  const mapped = segments.map((seg, idx) => {
    if (seg.startsWith("**") && seg.endsWith("**")) {
      return (
        <span key={`b-${idx}`} className="font-semibold">
          {seg.slice(2, -2)}
        </span>
      );
    }
    return emphasizeNumbers(seg);
  });
  return mapped.flat();
};

const formatMessage = (content: string): JSX.Element => {
  const lines = content.split("\n");
  return (
    <div className="space-y-1">
      {lines.map((line, i) => (
        <div key={i}>{formatBold(line)}</div>
      ))}
    </div>
  );
};
