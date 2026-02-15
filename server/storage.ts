import { JobModel, ProjectModel, SkillModel, type Job, type Project, type Skill, type InsertJob, type InsertProject, type InsertSkill } from "@shared/schema";
import { connectToDatabase } from "./db";

export interface IStorage {
  getJobs(): Promise<Job[]>;
  getProjects(): Promise<Project[]>;
  getSkills(): Promise<Skill[]>;
  seedData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getJobs(): Promise<Job[]> {
    await connectToDatabase();
    const jobs = await JobModel.find().lean();
    return jobs.map((job: any) => ({
      ...job,
      id: job._id.toString(),
      _id: job._id.toString(),
    }));
  }

  async getProjects(): Promise<Project[]> {
    await connectToDatabase();
    const projects = await ProjectModel.find().lean();
    return projects.map((project: any) => ({
      ...project,
      id: project._id.toString(),
      _id: project._id.toString(),
    }));
  }

  async getSkills(): Promise<Skill[]> {
    await connectToDatabase();
    const skills = await SkillModel.find().lean();
    return skills.map((skill: any) => ({
      ...skill,
      id: skill._id.toString(),
      _id: skill._id.toString(),
    }));
  }

  async seedData(): Promise<void> {
    await connectToDatabase();
    
    const existingJobs = await JobModel.countDocuments();
    if (existingJobs === 0) {
      await JobModel.insertMany([
        {
          company: "MCC Pvt Ltd",
          role: "Full Stack Developer Intern",
          period: "Present",
          description: "Developing full-stack applications using MERN stack with TypeScript, React Native, and Vite frameworks. Building responsive interfaces and implementing RESTful APIs with Node.js, Express.js, and MySQL. Optimizing application performance and collaborating with teams using Git and agile development practices.",
        },
        {
          company: "Edureka",
          role: "Full Stack Developer Intern",
          period: "Dec 2023 – May 2024",
          description: "Developed Zomato clone using MERN stack with authentication, search, and order management features. Architected RESTful APIs handling 1000+ concurrent requests with JWT authentication and database optimization. Built video streaming platform and weather application demonstrating end-to-end development capabilities.",
        }
      ]);
    }

    const existingProjects = await ProjectModel.countDocuments();
    if (existingProjects === 0) {
      await ProjectModel.insertMany([
        {
          title: "Classroom Monitoring System",
          description: "Engineered AI-powered system using YOLO and PyTorch for real-time student attendance and behavior analysis with 78% accuracy. Processed video data using OpenCV, NumPy, and Pandas reducing manual attendance tracking time by 85%.",
          techStack: ["Python", "OpenCV", "YOLO", "PyTorch", "Deep Learning"],
        },
        {
          title: "Full-Stack Zomato Clone",
          description: "Developed comprehensive food delivery platform with restaurant listings, filtering, cart functionality, and JWT authentication. Optimized database queries and implemented caching resulting in 40% faster page load times. Integrated third-party APIs for location services and payment gateway.",
          techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "TypeScript"],
        }
      ]);
    }

    const existingSkills = await SkillModel.countDocuments();
    if (existingSkills === 0) {
      await SkillModel.insertMany([
        { category: "Languages", items: ["JavaScript ES6+", "TypeScript", "Python", "HTML5", "CSS3", "SQL"] },
        { category: "Frontend", items: ["React.js", "React Native", "Redux", "Bootstrap", "Tailwind CSS", "Vite"] },
        { category: "Backend", items: ["Node.js", "Express.js", "RESTful APIs", "JWT Auth", "Microservices"] },
        { category: "Data Science", items: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Scikit-learn", "PyTorch", "YOLO", "OpenCV"] },
        { category: "Tools", items: ["Git", "GitHub", "VS Code", "Postman", "npm", "Agile"] }
      ]);
    }
  }
}

export const storage = new DatabaseStorage();
