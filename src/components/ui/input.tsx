import * as React from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  error?: boolean;
  success?: boolean;
  showIcon?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, success, showIcon = true, ...props }, ref) => {
    const hasStatus = error || success;
    
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md bg-background px-3 py-2 text-base",
            "ring-1 ring-inset ring-input",
            "transition-all duration-200",
            "placeholder:text-muted-foreground",
            "hover:ring-2 hover:ring-primary/30",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
            "md:text-sm",
            error && "ring-destructive hover:ring-destructive focus-visible:ring-destructive pr-10",
            success && "ring-green-500 hover:ring-green-500 focus-visible:ring-green-500 pr-10",
            hasStatus && showIcon && "pr-10",
            className,
          )}
          ref={ref}
          aria-invalid={error}
          {...props}
        />
        {showIcon && error && (
          <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-destructive animate-fade-in" />
        )}
        {showIcon && success && !error && (
          <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 animate-fade-in" />
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
