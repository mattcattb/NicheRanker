import {createInsertSchema} from "drizzle-zod";
import {users} from "../../db/schemas";
import {z} from "zod";

export const insertUserSchema = createInsertSchema(users);

export function createUser(json: z.infer<typeof insertUserSchema>) {
  const {} = json;
}
