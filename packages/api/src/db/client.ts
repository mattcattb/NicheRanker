import {drizzle} from "drizzle-orm/postgres-js";

export * as Database from "./database";

const DATABASE_URL = process.env.DATABASE_URL!;

if (!DATABASE_URL) throw new Error("DATABASE_URL is not set");

const db = drizzle(process.env.DATABASE_URL!);

console.log(`database url is ${DATABASE_URL}`);

export type db = typeof db;

export default db;
