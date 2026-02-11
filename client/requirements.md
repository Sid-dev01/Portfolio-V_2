## Packages
framer-motion | Smooth scroll animations and entry effects
react-scroll | Smooth scrolling for navbar links
lucide-react | Beautiful icons (already in base, but emphasizing usage)
clsx | Utility for conditional classes (often needed for complex UIs)
tailwind-merge | Utility for merging tailwind classes

## Notes
Tailwind Config - extend fontFamily:
fontFamily: {
  sans: ["Inter", "sans-serif"],
  mono: ["JetBrains Mono", "monospace"],
  display: ["Space Grotesk", "sans-serif"],
}
API Endpoints:
GET /api/jobs -> Returns experience timeline
GET /api/projects -> Returns project cards
GET /api/skills -> Returns skill categories
