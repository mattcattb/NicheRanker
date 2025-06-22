import {ResourceCreationException} from "@/common/exceptions";
import {NonEmptyString} from "@/common/zod";
import db, {Database} from "@/db/client";
import {users} from "@/db/schemas";
import {hashString} from "@/lib/crypto";
import {eq} from "drizzle-orm";
import z from "zod/v4";

const createUserSchema = z.object({
  username: NonEmptyString,
  password: NonEmptyString,
});

export async function createUser(data: z.infer<typeof createUserSchema>) {
  const tx = Database.getTxOrDb();

  const [createdUser] = await tx
    .insert(users)
    .values({
      username: data.username,
      password: hashString(data.password),
    })
    .returning();

  if (!createdUser) {
    throw new ResourceCreationException("Failed to create user!");
  }

  return createdUser;
}

export async function getUser(userId: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) {
    return null;
  }

  return user;
}
