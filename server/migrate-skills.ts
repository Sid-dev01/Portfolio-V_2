import "dotenv/config";
import mongoose from "mongoose";
import { SkillModel } from "@shared/schema";
import { connectToDatabase } from "./db";

const newSkills = [
  { category: "Languages", items: ["JavaScript ES6+", "TypeScript", "Python", "HTML5", "CSS3", "SQL"] },
  { category: "Frontend", items: ["React.js", "React Native", "Redux", "Bootstrap", "Tailwind CSS", "Vite"] },
  { category: "Backend", items: ["Node.js", "Express.js", "FastAPI", "Django", "RESTful APIs", "JWT Auth", "Microservices", "Redis", "Zod"] },
  { category: "Database", items: ["MongoDB", "MySQL", "PostgreSQL"] },
  { category: "Data Science", items: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Scikit-learn", "PyTorch", "YOLO", "OpenCV"] },
  { category: "Tools", items: ["Git", "GitHub", "VS Code", "Postman", "npm", "Agile"] }
];

async function migrateSkills() {
  try {
    console.log("🔄 Starting skills migration...");
    await connectToDatabase();

    // Delete all existing skills
    const deleteResult = await SkillModel.deleteMany({});
    console.log(`🗑️  Deleted ${deleteResult.deletedCount} existing skill categories`);

    // Insert new skills
    const insertResult = await SkillModel.insertMany(newSkills);
    console.log(`✅ Inserted ${insertResult.length} skill categories`);

    // Display updated skills
    console.log("\n📊 Updated Skills:");
    insertResult.forEach((skill) => {
      console.log(`   ${skill.category}: ${skill.items.join(", ")}`);
    });

    console.log("\n✨ Migration completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

migrateSkills();
