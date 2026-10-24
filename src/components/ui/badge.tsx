import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "cyan" | "gold" | "outline" | "success";
  dot?: boolean;
}

function Badge({ className, variant = "default", dot = false, children, ...props }: BadgeProps) {
  const variants = {
    default: "bg-slate-800/80 text-slate-300 border-white/10",
    cyan: "bg-dbh-cyan/15 text-dbh-cyan border-dbh-cyan/30 shadow-[0_0_15px_rgba(0,164,239,0.2)]",
    gold: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    outline: "border-white/20 text-slate-300 bg-transparent",
    success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors",
        variants[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
        </span>
      )}
      {children}
    </div>
  );
}

export { Badge };
