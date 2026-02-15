import mongoose, { Schema, Document } from "mongoose";
import { z } from "zod";

// MongoDB Document Interfaces
export interface IJob extends Document {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface IProject extends Document {
  title: string;
  description: string;
  techStack: string[];
  link?: string;
}

export interface ISkill extends Document {
  category: string;
  items: string[];
}

// Mongoose Schemas
const jobSchema = new Schema<IJob>(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    period: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: { type: [String], required: true },
    link: { type: String, required: false },
  },
  { timestamps: true }
);

const skillSchema = new Schema<ISkill>(
  {
    category: { type: String, required: true },
    items: { type: [String], required: true },
  },
  { timestamps: true }
);

// Mongoose Models
export const JobModel = mongoose.models.Job || mongoose.model<IJob>("Job", jobSchema);
export const ProjectModel = mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);
export const SkillModel = mongoose.models.Skill || mongoose.model<ISkill>("Skill", skillSchema);

// Zod Validation Schemas
export const insertJobSchema = z.object({
  company: z.string(),
  role: z.string(),
  period: z.string(),
  description: z.string(),
});

export const insertProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  techStack: z.array(z.string()),
  link: z.string().optional(),
});

export const insertSkillSchema = z.object({
  category: z.string(),
  items: z.array(z.string()),
});

// Types
export type Job = {
  _id?: string;
  id?: string;
  company: string;
  role: string;
  period: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Project = {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Skill = {
  _id?: string;
  id?: string;
  category: string;
  items: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type InsertJob = z.infer<typeof insertJobSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertSkill = z.infer<typeof insertSkillSchema>;
