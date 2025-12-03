import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-soft hover:shadow-medium hover:bg-primary-dark hover:scale-105 active:scale-95",
        destructive: "bg-destructive text-destructive-foreground shadow-soft hover:shadow-medium hover:bg-destructive/90",
        outline: "border-2 border-input bg-background text-foreground hover:bg-muted hover:border-border shadow-soft hover:shadow-medium",
        secondary: "bg-secondary text-secondary-foreground shadow-soft hover:shadow-medium hover:bg-secondary-light",
        ghost: "hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-dark",
        gold: "gold-gradient text-foreground shadow-gold hover:shadow-gold-hover hover:scale-105 active:scale-95 font-bold tracking-wide",
        "outline-gold": "border-2 border-primary text-foreground bg-transparent hover:gold-gradient hover:text-foreground hover:border-transparent shadow-soft hover:shadow-gold hover:scale-105 active:scale-95 font-semibold",
      },
      size: {
        default: "h-11 px-5 py-2.5 text-sm",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
