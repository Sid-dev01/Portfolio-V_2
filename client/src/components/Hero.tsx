import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { Link } from "react-scroll";

export function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-mono mb-6">
            Hello, World! I'm
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 tracking-tight">
            Siddhartha <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Gautam</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Full Stack Developer Intern & Data Science Enthusiast building modern, scalable web applications.
          </p>

          <div className="flex items-center justify-center gap-4 mb-12">
            <SocialButton href="https://github.com" icon={<Github className="w-5 h-5" />} label="GitHub" />
            <SocialButton href="https://linkedin.com" icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" />
            <SocialButton href="mailto:contact@example.com" icon={<Mail className="w-5 h-5" />} label="Email" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="projects"
              smooth={true}
              duration={500}
              className="cursor-pointer px-8 py-3 rounded-full bg-primary text-background font-bold hover:bg-primary/90 transition-all hover:scale-105"
            >
              View My Work
            </Link>
            <Link
              to="contact"
              smooth={true}
              duration={500}
              className="cursor-pointer px-8 py-3 rounded-full bg-white/5 border border-white/10 text-foreground font-semibold hover:bg-white/10 transition-all"
            >
              Download Resume
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <Link to="experience" smooth={true} duration={500} className="cursor-pointer text-muted-foreground hover:text-primary">
          <ArrowDown className="w-6 h-6" />
        </Link>
      </motion.div>
    </section>
  );
}

function SocialButton({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-full bg-white/5 border border-white/10 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group relative"
      aria-label={label}
    >
      {icon}
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-background border border-border rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {label}
      </span>
    </a>
  );
}
