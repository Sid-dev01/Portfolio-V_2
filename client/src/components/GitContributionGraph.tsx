import { motion } from "framer-motion";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function GitContributionGraph() {
  // Generate a mock contribution calendar (7 rows x ~52 columns)
  // This is a visual approximation since we don't have the real API yet
  const weeks = 40;
  const days = 7;
  
  const getIntensity = () => {
    // Random intensity: 0 (empty), 1 (light), 2 (medium), 3 (high), 4 (intense)
    const rand = Math.random();
    if (rand > 0.9) return 4;
    if (rand > 0.7) return 3;
    if (rand > 0.5) return 2;
    if (rand > 0.3) return 1;
    return 0;
  };

  const getColor = (intensity: number) => {
    switch(intensity) {
      case 0: return "bg-zinc-900";
      case 1: return "bg-primary/20";
      case 2: return "bg-primary/40";
      case 3: return "bg-primary/70";
      case 4: return "bg-primary";
      default: return "bg-zinc-900";
    }
  };

  return (
    <section id="git-stats" className="py-24 bg-zinc-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-2xl p-8 overflow-hidden"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold font-display flex items-center gap-3">
              Contribution Activity
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-5 h-5 text-muted-foreground hover:text-primary cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Live data integration pending</p>
                </TooltipContent>
              </Tooltip>
            </h2>
            <div className="text-sm text-muted-foreground font-mono">
              Last Year
            </div>
          </div>

          <div className="w-full overflow-x-auto pb-4">
            <div className="min-w-[800px] flex gap-1">
              {Array.from({ length: weeks }).map((_, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {Array.from({ length: days }).map((_, dayIndex) => {
                    const intensity = getIntensity();
                    return (
                      <motion.div
                        key={`${weekIndex}-${dayIndex}`}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: (weekIndex * 0.01) + (dayIndex * 0.01) }}
                        className={`w-3 h-3 rounded-sm ${getColor(intensity)} hover:ring-2 hover:ring-white/20 transition-all`}
                        title={`${["Low", "Medium", "High", "Very High"][intensity - 1] || "No"} activity`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground justify-end">
            <span>Less</span>
            <div className="w-3 h-3 rounded-sm bg-zinc-900" />
            <div className="w-3 h-3 rounded-sm bg-primary/20" />
            <div className="w-3 h-3 rounded-sm bg-primary/40" />
            <div className="w-3 h-3 rounded-sm bg-primary/70" />
            <div className="w-3 h-3 rounded-sm bg-primary" />
            <span>More</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
