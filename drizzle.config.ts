import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

// Load env vars so we can use the DATABASE_URL
dotenv.config();

export default defineConfig({
  schema: "./src/models", // Path to your schema file
  out: "./drizzle", // Where migration files will be saved
  dialect: "postgresql", // Database dialect
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  verbose: true, // Log all changes to console
  strict: true, // Prevent accidental data loss
});
