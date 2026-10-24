import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  badge?: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div
      className={cn(
        "inline-flex p-1.5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200 select-none z-10 flex items-center gap-2",
              isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-dbh-cyan to-sky-600 shadow-[0_0_20px_rgba(0,164,239,0.4)]"
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
            {tab.badge && (
              <span
                className={cn(
                  "relative z-10 text-[10px] px-1.5 py-0.5 rounded-full font-mono uppercase tracking-wider",
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-slate-800 text-slate-400"
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
