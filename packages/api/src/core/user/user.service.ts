import {ResourceCreationException} from "@/common/exceptions";
import {NonEmptyString} from "@/common/zod";
import {Database} from "@/db/client";
import {users} from "@/db/schemas";
import {password} from "bun";
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
      password: data.password,
    })
    .returning();

  if (!createdUser) {
    throw new ResourceCreationException("Failed to create user!");
  }

  return createdUser;
}
