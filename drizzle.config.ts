/// <reference types="node" />
/**
 * THIS FILE IS NO LONGER USED
 * 
 * The project has been migrated from PostgreSQL (Drizzle ORM) to MongoDB (Mongoose).
 * This file is kept for reference but is not required for the application to run.
 * 
 * For MongoDB configuration, see:
 * - server/db.ts (MongoDB connection)
 * - shared/schema.ts (Mongoose schemas)
 * - MONGODB_SETUP.md (Setup guide)
 * 
 * You can safely delete this file if desired.
 */

// Legacy Drizzle configuration (not used)
// import type { Config } from "drizzle-kit";
//
// if (!process.env.DATABASE_URL) {
//   throw new Error("DATABASE_URL, ensure the database is provisioned");
// }
//
// export default {
//   out: "./migrations",
//   schema: "./shared/schema.ts",
//   dialect: "postgresql",
//   dbCredentials: {
//     url: process.env.DATABASE_URL,
//   },
// } satisfies Config;
