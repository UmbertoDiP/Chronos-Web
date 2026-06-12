import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.97]",
  {
    variants: {
      variant: {
        default: 
          "bg-primary text-primary-foreground relative overflow-hidden " +
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] " +
          "hover:before:translate-x-[200%] hover:before:transition-transform hover:before:duration-700 " +
          "hover:shadow-[0_8px_30px_-6px_hsl(var(--primary)/0.5)] hover:brightness-110 " +
          "dark:hover:shadow-[0_8px_40px_-6px_hsl(var(--neon-cyan)/0.4),0_0_20px_-5px_hsl(var(--neon-magenta)/0.3)] " +
          "active:shadow-md",
        destructive: 
          "bg-destructive text-destructive-foreground " +
          "hover:bg-destructive/90 hover:shadow-[0_8px_30px_-6px_hsl(var(--destructive)/0.5)] hover:brightness-110 " +
          "active:shadow-md",
        outline: 
          "border-2 border-primary/50 bg-background text-foreground " +
          "hover:border-primary hover:bg-primary/5 hover:text-primary " +
          "dark:border-primary/50 dark:hover:border-neon-cyan dark:hover:bg-neon-cyan/10 dark:hover:text-neon-cyan dark:hover:shadow-[0_0_15px_-3px_hsl(var(--neon-cyan)/0.3)]",
        secondary: 
          "bg-secondary text-secondary-foreground " +
          "hover:bg-secondary/70 hover:shadow-md",
        ghost: 
          "hover:bg-accent/80 hover:text-accent-foreground " +
          "dark:hover:bg-accent/20",
        link: 
          "text-primary underline-offset-4 hover:underline hover:text-primary/80",
        // New premium CTA variant
        cta:
          "bg-gradient-to-r from-primary to-accent text-white font-semibold relative overflow-hidden " +
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:translate-x-[-200%] " +
          "hover:before:translate-x-[200%] hover:before:transition-transform hover:before:duration-700 " +
          "hover:shadow-[0_10px_40px_-8px_hsl(var(--accent)/0.5)] hover:scale-[1.02] " +
          "dark:from-neon-cyan dark:to-neon-magenta dark:text-white " +
          "dark:hover:shadow-[0_10px_50px_-8px_hsl(var(--neon-cyan)/0.5),0_0_30px_-5px_hsl(var(--neon-magenta)/0.4)] " +
          "active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
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
