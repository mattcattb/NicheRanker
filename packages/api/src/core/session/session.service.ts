import {SESSION_EXPIRATION_MIN} from "@/common/config";
import {ResourceCreationException} from "@/common/exceptions";
import {headerDataSchema} from "@/core/auth/auth.middleware";
import {Database} from "@/db/client";
import {sessions} from "@/db/schemas";
import {z} from "zod/v4";

export async function createSession(
  userId: string,
  headerData?: z.infer<typeof headerDataSchema>
) {
  const tx = Database.getTxOrDb();
  const currentDate = new Date();
  const expirationDate = new Date();
  expirationDate.setHours(currentDate.getHours() + SESSION_EXPIRATION_MIN);
  const [createdSession] = await tx
    .insert(sessions)
    .values({
      userId: userId,
      createdAt: currentDate,
      expiresAt: expirationDate,
      ipAddress: headerData?.ip,
      userAgent: headerData?.userAgent,
      lastActive: currentDate,
    })
    .returning();

  if (!createSession) {
    throw new ResourceCreationException(
      `Failed to create session for user ${userId}`
    );
  }

  return createdSession;
}

export async function validateSession(token: string) {
  return await Database.transaction(async (tx) => {
    return {
      session: undefined,
      user: undefined,
    };
  });
}

export async function removeSession(token: string) {}
