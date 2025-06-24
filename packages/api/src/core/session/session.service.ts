import {SESSION_EXPIRATION_MIN} from "@/common/constants";
import {
  AppErrorCodes,
  NotFoundException,
  ResourceCreationException,
  UnauthorizedException,
} from "@/common/exceptions";
import {headerDataSchema} from "@/core/auth/auth.middleware";
import {Database} from "@/db/client";
import {sessions} from "@/db/schemas";
import {eq} from "drizzle-orm";
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

export async function getSession(token: string) {
  const tx = Database.getTxOrDb();
  const session =
    (await tx.query.sessions.findFirst({
      where: eq(sessions.id, token),
    })) || null;

  return session;
}

export async function validateSession(token: string) {
  return await Database.transaction(async (tx) => {
    const session = await getSession(token);

    if (!session) {
      throw new UnauthorizedException(
        "Invalid session token",
        AppErrorCodes.INVALID_SESSION
      );
    }

    if (session.expiresAt < new Date()) {
      throw new UnauthorizedException(
        "Session Expired",
        AppErrorCodes.SESSION_EXPIRED
      );
    }

    return {
      session,
      userId: session.userId,
    };
  });
}

export async function deleteSession(token: string) {
  const tx = Database.getTxOrDb();

  await tx.delete(sessions).where(eq(sessions.id, token));
}
