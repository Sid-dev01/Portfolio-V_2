import { motion } from "framer-motion";
import { Info, Github, AlertCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGitHubContributions } from "@/hooks/use-portfolio";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function GitContributionGraph() {
  const { data, isLoading, error } = useGitHubContributions();

  const getColorClass = (count: number) => {
    if (count === 0) return "bg-zinc-900";
    if (count <= 2) return "bg-primary/25";
    if (count <= 5) return "bg-primary/50";
    if (count <= 10) return "bg-primary/75";
    return "bg-primary";
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
              <Github className="w-6 h-6" />
              GitHub Contributions
              {data?.error && (
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-5 h-5 text-yellow-500 hover:text-yellow-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{data.message}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </h2>
            {data?.contributions && (
              <div className="text-sm text-muted-foreground font-mono">
                {data.contributions.totalContributions.toLocaleString()} contributions
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to load GitHub contributions. Please check your connection.
              </AlertDescription>
            </Alert>
          ) : data?.error || !data?.contributions ? (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                {data?.message || "GitHub contributions data not available. Add GITHUB_TOKEN to your .env file."}
              </AlertDescription>
            </Alert>
          ) : (
            <div className="w-full overflow-x-auto pb-4">
              <div className="min-w-[800px] flex gap-1">
                {data.contributions.weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.contributionDays.map((day, dayIndex) => {
                      const date = new Date(day.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      });
                      return (
                        <motion.div
                          key={`${weekIndex}-${dayIndex}`}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: (weekIndex * 0.005) + (dayIndex * 0.005) }}
                          className={`w-3 h-3 rounded-sm ${getColorClass(day.contributionCount)} hover:ring-2 hover:ring-primary transition-all cursor-pointer`}
                          title={`${day.contributionCount} contributions on ${date}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}

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
