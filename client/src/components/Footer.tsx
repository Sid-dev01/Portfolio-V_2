import { Code2, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 bg-zinc-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <Code2 className="w-6 h-6 text-primary" />
          <span className="font-display font-bold text-xl">SG.dev</span>
        </div>
        
        <p className="text-muted-foreground mb-8 text-sm">
          Building digital experiences that matter.
        </p>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground/60">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
          <span>using React & Tailwind</span>
        </div>
      </div>
    </footer>
  );
}
