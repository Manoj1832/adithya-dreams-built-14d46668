# Adithya Constructions & Architects

## Overview

Adithya Constructions & Architects is a premium construction company website built with React, TypeScript, and modern web technologies. The application serves as a digital presence for a construction and architectural services company based in Coimbatore and Salem, India. It offers comprehensive information about construction services, pricing packages, project portfolios, and interactive tools like an EMI calculator and construction cost estimator.

The website is designed to attract potential clients, showcase the company's expertise, provide transparent pricing information, and facilitate easy communication through appointment booking and WhatsApp integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool**
- **React 18.3.1** with TypeScript for type-safe component development
- **Vite** as the build tool and development server, configured for fast HMR and optimized production builds
- **React Router DOM** for client-side routing with multiple pages (Index, About, Services, Projects, Packages, etc.)

**UI Component Library**
- **shadcn/ui** components built on Radix UI primitives for accessible, customizable UI elements
- **Tailwind CSS** for utility-first styling with custom design tokens
- **Framer Motion** for animations and interactive elements
- Custom component architecture with reusable UI components in `src/components/ui/`

**Styling Approach**
- Tailwind CSS with custom configuration for brand-specific colors (gold/primary theme)
- CSS custom properties (CSS variables) for theming support
- Premium design system with sophisticated color palette and shadow utilities
- Responsive design with mobile-first approach

**State Management**
- React hooks (useState, useEffect, useContext) for local state
- **TanStack Query (React Query)** for server state management and data fetching
- Form state managed through react-hook-form with zod resolvers for validation

### Design Patterns

**Component Structure**
- Page components in `src/pages/` handle routing and layout
- Reusable UI components in `src/components/ui/` following composition pattern
- Layout components (Navbar, Footer, WhatsAppButton) for consistent site structure
- Feature-specific components organized by domain (e.g., `packages/` for pricing components)

**Routing Strategy**
- Client-side routing with React Router
- Named routes for all major sections (/, /about, /services, /projects, /packages, etc.)
- 404 error handling with custom NotFound page
- Hash-based navigation for service sections within single page

**Animation Strategy**
- Framer Motion for entrance animations, hover effects, and transitions
- Scroll-based animations using `whileInView` for progressive disclosure
- Performance-optimized animations with GPU acceleration

**Form Handling**
- Controlled components with react-hook-form
- Client-side validation using zod schemas (via @hookform/resolvers)
- Toast notifications for user feedback using custom toast hook

### Data Architecture

**Pricing Data Model**
- Centralized pricing data in `src/data/pricing.ts`
- TypeScript interfaces for Package, AddOn, and PricingTier
- Structured data for three-tier pricing system (Standard, Premium, Luxury)
- Detailed package category specifications with feature comparisons

**Component Data Flow**
- Props-based data passing for component composition
- Shared data through TypeScript interfaces and type exports
- Calculator components use local state for user inputs and derived calculations

### Key Architectural Decisions

**TypeScript Configuration**
- Strict mode disabled for faster development iteration
- Path aliases configured (@/* for src/*) for cleaner imports
- Separate tsconfig for app and node environments

**Build & Development**
- Vite configured for optimal development experience with HMR
- Component tagging plugin (lovable-tagger) for development mode
- Separate build modes (development and production)

**Code Quality**
- ESLint with TypeScript support
- React hooks linting rules
- Unused variables/parameters checks disabled for flexibility

**Accessibility Considerations**
- Radix UI primitives ensure ARIA compliance
- Semantic HTML structure
- Keyboard navigation support through Radix components
- Screen reader friendly with proper labels and roles

### Feature Highlights

**Interactive Calculators**
- EMI Calculator with real-time calculations
- Construction Cost Calculator with package selection and add-ons
- Dynamic pricing based on user inputs (area, package tier, add-ons)

**WhatsApp Integration**
- Floating WhatsApp button component
- Pre-filled messages with context (calculator results, inquiries)
- Direct communication channel with phone number: 916374507535

**Package Comparison**
- Detailed package comparison tables
- Accordion-based feature lists for each tier
- Visual highlighting of recommended packages

**SEO Optimization**
- Meta tags for social sharing (Open Graph, Twitter Cards)
- Semantic HTML structure
- Canonical URLs
- robots.txt for search engine crawling

## External Dependencies

### UI & Component Libraries
- **@radix-ui/react-*** - Accessible component primitives (accordion, dialog, dropdown, select, tabs, toast, etc.)
- **shadcn/ui** - Pre-built component system based on Radix UI
- **lucide-react** - Icon library for consistent iconography
- **framer-motion** - Animation library for interactive UI elements
- **embla-carousel-react** - Carousel/slider functionality
- **next-themes** - Theme management (light/dark mode support)

### Form & Validation
- **react-hook-form** - Form state management
- **@hookform/resolvers** - Integration with validation libraries
- **zod** - TypeScript-first schema validation

### Data Fetching & State
- **@tanstack/react-query** - Server state management and caching
- **react-router-dom** - Client-side routing

### Styling & Utilities
- **tailwindcss** - Utility-first CSS framework
- **class-variance-authority** - Variant-based component styling
- **clsx** & **tailwind-merge** - Utility for conditional CSS classes
- **date-fns** - Date manipulation and formatting

### Development Tools
- **@vitejs/plugin-react-swc** - Fast React refresh with SWC compiler
- **lovable-tagger** - Component tagging for development mode
- **TypeScript** - Static type checking
- **ESLint** - Code linting and quality enforcement

### Fonts
- **Google Fonts** - Playfair Display (headings) and Inter (body text)

### Third-Party Services
- **WhatsApp Business API** - Direct messaging integration via wa.me links
- **Unsplash** - Stock photography for project images (referenced in code)

### Hosting & Deployment
- Configured for **Lovable.dev** platform deployment
- Static site generation compatible
- No backend/database dependencies in current implementation