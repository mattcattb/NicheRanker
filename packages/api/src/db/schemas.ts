import * as t from "drizzle-orm/pg-core";
import {pgTable} from "drizzle-orm/pg-core";
import {createInsertSchema} from "drizzle-zod";

// example informatin
export const sessions = pgTable(
  "sessions",
  {
    id: t.uuid("id").defaultRandom().primaryKey(),
    userId: t
      .uuid("user_id")
      .notNull()
      .references(() => users.id),
    expiresAt: t.timestamp("expires_at").notNull(),
    lastActive: t.timestamp("last_active").defaultNow().notNull(),
    createdAt: t.timestamp("create_at").defaultNow().notNull(),
    userAgent: t.text("userAgent"),
    ipAddress: t.text("ip_address"),
  },
  (table) => [t.index("sessions_user_id_idx").on(table.userId)]
);

export const insertSessionSchema = createInsertSchema(sessions);

export const users = pgTable("users", {
  id: t.uuid().primaryKey(),
  name: t.text().notNull(),
  password: t.text().notNull(),
});
