import {relations} from "drizzle-orm";
import {sessions, users} from "./schemas";

export const userRelations = relations(users, ({one, many}) => ({
  sessions: many(sessions),
}));

export const sessionsRelations = relations(sessions, ({one, many}) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));
