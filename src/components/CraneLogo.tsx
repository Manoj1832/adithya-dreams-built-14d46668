import { motion } from "framer-motion";

interface CraneLogoProps {
  className?: string;
}

const CraneLogo = ({ className = "" }: CraneLogoProps) => {
  return (
    <div className={`relative ${className}`} data-testid="crane-logo">
      <svg
        viewBox="0 0 200 180"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="craneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A853" />
            <stop offset="100%" stopColor="#B8943E" />
          </linearGradient>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A853" />
            <stop offset="50%" stopColor="#C9A04A" />
            <stop offset="100%" stopColor="#B8943E" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Crane Base */}
        <rect x="10" y="20" width="8" height="100" fill="url(#craneGradient)" rx="2" />
        
        {/* Crane Arm */}
        <rect x="10" y="18" width="120" height="8" fill="url(#craneGradient)" rx="2" />
        
        {/* Crane Top Detail */}
        <rect x="6" y="14" width="16" height="6" fill="url(#craneGradient)" rx="1" />
        
        {/* Crane Cabin */}
        <rect x="6" y="100" width="16" height="20" fill="url(#craneGradient)" rx="2" />
        <rect x="8" y="104" width="5" height="6" fill="#1a1a1a" rx="1" opacity="0.6" />
        
        {/* Support Beam */}
        <line x1="18" y1="26" x2="60" y2="18" stroke="url(#craneGradient)" strokeWidth="3" />
        <line x1="18" y1="26" x2="90" y2="18" stroke="url(#craneGradient)" strokeWidth="2" />

        {/* Pulley */}
        <circle cx="120" cy="22" r="6" fill="url(#craneGradient)" />
        <circle cx="120" cy="22" r="3" fill="#1a1a1a" opacity="0.3" />

        {/* Animated Cable and Logo Group */}
        <motion.g
          animate={{
            rotate: [0, 2, 0, -2, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "120px 22px" }}
        >
          {/* Cable */}
          <line
            x1="120"
            y1="28"
            x2="120"
            y2="85"
            stroke="#555"
            strokeWidth="2"
            strokeDasharray="4 2"
          />

          {/* Hook */}
          <path
            d="M115 83 L120 88 L125 83"
            fill="none"
            stroke="url(#craneGradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Logo Container - The "A" box */}
          <g filter="url(#shadow)">
            {/* Logo Background */}
            <rect
              x="100"
              y="95"
              width="40"
              height="40"
              rx="8"
              fill="url(#logoGradient)"
            />
            
            {/* Letter A */}
            <text
              x="120"
              y="125"
              textAnchor="middle"
              fill="white"
              fontSize="24"
              fontWeight="bold"
              fontFamily="serif"
            >
              A
            </text>
          </g>
        </motion.g>

        {/* Ground/Base Platform */}
        <rect x="0" y="118" width="28" height="4" fill="url(#craneGradient)" rx="1" />
        <polygon points="0,122 28,122 24,130 4,130" fill="url(#craneGradient)" />
      </svg>
    </div>
  );
};

export default CraneLogo;
