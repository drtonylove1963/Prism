import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is not set. Please create a .env.local file with DATABASE_URL. See .env.example for reference."
  );
}

// Use postgres-js for local development, or Neon for production
const sql = postgres(databaseUrl);
export const db = drizzle(sql);
