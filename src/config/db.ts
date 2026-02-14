import { drizzle } from "drizzle-orm/node-postgres"; // Import drizzle-orm for nodejs PostgreSQL
import { Pool } from "pg"; // Import Pool from pg for connection pooling drivers
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);
