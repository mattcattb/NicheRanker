import {drizzle} from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schemas";
export * as Database from "./database";

const DATABASE_URL = process.env.DATABASE_URL!;

if (!DATABASE_URL) throw new Error("DATABASE_URL is not set");

const queryClient = postgres(DATABASE_URL);
const db = drizzle(queryClient, {schema});

console.log(`database url is ${DATABASE_URL}`);

export type db = typeof db;

export default db;
