import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "glow" | "gold";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dbh-cyan disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

    const variants = {
      default:
        "bg-dbh-cyan text-white shadow-[0_0_20px_rgba(0,164,239,0.35)] hover:bg-[#0093d6] hover:shadow-[0_0_30px_rgba(0,164,239,0.6)]",
      glow:
        "relative overflow-hidden bg-gradient-to-r from-dbh-cyan via-sky-400 to-indigo-500 text-white shadow-[0_0_25px_rgba(0,164,239,0.45)] hover:shadow-[0_0_35px_rgba(0,164,239,0.8)] border border-white/20",
      secondary:
        "bg-dbh-surface text-slate-200 border border-white/10 hover:bg-slate-800 hover:border-dbh-cyan/40",
      outline:
        "border border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/40",
      ghost:
        "text-slate-300 hover:text-white hover:bg-white/5",
      gold:
        "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-900/40 hover:from-amber-400 hover:to-amber-500"
    };

    const sizes = {
      default: "h-11 px-6 py-2",
      sm: "h-9 rounded-md px-3 text-xs",
      lg: "h-13 rounded-xl px-8 py-3 text-base",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
