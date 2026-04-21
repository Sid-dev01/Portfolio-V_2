# Siddhartha Gautam - Portfolio

A modern, full-stack portfolio website showcasing my skills, projects, and professional experience. Built with React, TypeScript, Express.js, and MongoDB.

## 🌟 Features

- **Responsive Design** - Works seamlessly on all devices
- **Dark Mode Support** - Theme switching with `next-themes`
- **Smooth Animations** - Using Framer Motion for engaging UI transitions
- **Progress Bar** - Visual scroll progress indicator
- **Git Contributions Graph** - Real-time GitHub activity visualization
- **Form Validation** - Client-side and server-side validation using Zod
- **RESTful API** - Express.js backend with proper error handling
- **Database Integration** - MongoDB with Mongoose ODM
- **Production Ready** - Full CI/CD with GitHub Actions

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible components
- **Framer Motion** - Animations
- **React Hook Form** - Form management
- **TanStack React Query** - Data fetching
- **Wouter** - Client-side routing

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Zod** - Schema validation
- **Passport.js** - Authentication
- **Express Session** - Session management

### Database
- **MongoDB** - NoSQL database
- **Mongoose** - ODM (Object Data Modeling)

### Tools & DevOps
- **Git** - Version control
- **GitHub Actions** - CI/CD
- **npm** - Package manager
- **VS Code** - Development environment
- **Postman** - API testing

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- MongoDB local instance or MongoDB Atlas connection string
- Git

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=5000
HOST=0.0.0.0
NODE_ENV=development
```

4. **Start development server**
```bash
npm run dev
```

This will start both the client (Vite on port 5173) and server (Express on port 5000) concurrently.

## 🚀 Available Scripts

```bash
# Development
npm run dev              # Start both client and server
npm run dev:client      # Start Vite client only
npm run dev:server      # Start Express server with hot reload

# Production
npm run build           # Build the project
npm run start           # Start production server
npm run check           # Type check with TypeScript

# Database
npm run migrate:skills  # Migrate skills to database
```

## 📁 Project Structure

```
.
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   └── assets/      # Images and static files
│   └── vite.config.ts
├── server/              # Express backend
│   ├── routes.ts        # API routes
│   ├── db.ts            # Database connection
│   ├── storage.ts       # Data seeding
│   └── index.ts         # Server entry point
├── shared/              # Shared code
│   ├── schema.ts        # Zod schemas
│   └── routes.ts        # Route definitions
├── script/              # Build scripts
└── package.json
```

## 🎨 Key Sections

### Hero Section
Introduction and headline with call-to-action buttons

### Experience Section
Professional work history and roles

### Projects Section
Showcase of key projects with descriptions and links

### Skills Section
Organized by categories:
- Languages: JavaScript, TypeScript, Python, HTML5, CSS3, SQL
- Frontend: React, React Native, Redux, Bootstrap, Tailwind CSS, Vite
- Backend: Node.js, Express.js, FastAPI, Django, RESTful APIs, JWT Auth, Microservices, Redis, Zod
- Database: MongoDB, MySQL, PostgreSQL
- Data Science: NumPy, Pandas, Matplotlib, Seaborn, Scikit-learn, PyTorch, YOLO, OpenCV
- Tools: Git, GitHub, VS Code, Postman, npm, Agile

### Git Contributions Graph
Live GitHub contribution visualization

## 🔧 Configuration

### Database Seeding
Skills and other data are automatically seeded on first run. To migrate skills:
```bash
npm run migrate:skills
```

### Build Configuration
- **Client**: Configured in `vite.config.ts`
- **Server**: Configured in `tsconfig.json`
- **Styling**: Configured in `tailwind.config.ts`

## 📝 API Endpoints

See `server/routes.ts` and `shared/routes.ts` for available endpoints.

## 🔐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | Required |
| `PORT` | Server port | 5000 |
| `HOST` | Server host | 0.0.0.0 |
| `NODE_ENV` | Environment (development/production) | development |

## 🚢 Deployment

The project includes GitHub Actions CI/CD configuration. Push to `main` branch to trigger automated tests and deployment.

## 📞 Contact

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 📄 License

MIT License - feel free to use this project as a template for your own portfolio!

---

**Built with ❤️ using React, Express, and TypeScript**
