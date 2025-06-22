import z from "zod/v4";
import {NonEmptyString} from "../../common/zod";
import {headerDataSchema} from "@/core/auth/auth.middleware";
import db, {Database} from "@/db/client";
import * as UserService from "@/core/user/user.service";
import * as SessionService from "@/core/session/session.service";
import {and, eq} from "drizzle-orm";
import {sessions, users} from "@/db/schemas";
import {hashString} from "@/lib/crypto";
import {BadRequestException} from "@/common/exceptions";

export const signUpSchema = z.object({
  username: NonEmptyString,
  password: NonEmptyString,
});

export async function signUp(
  json: z.infer<typeof signUpSchema>,
  headerData?: z.infer<typeof headerDataSchema>
) {
  return await Database.transaction(async (tx) => {
    const user = await UserService.createUser(json);
    const session = await SessionService.createSession(user.id, headerData);
    return {
      token: session.id,
      user,
    };
  });
}
export const signInSchema = z.object({
  username: NonEmptyString,
  password: NonEmptyString,
});
export async function signIn(
  json: z.infer<typeof signInSchema>,
  headerData?: z.infer<typeof headerDataSchema>
) {
  return await Database.transaction(async (tx) => {
    const userData = await tx.query.users.findFirst({
      where: and(
        eq(users.password, hashString(json.password)),
        eq(users.username, json.username)
      ),
      with: {
        sessions: true,
      },
    });

    if (!userData) {
      throw new BadRequestException(
        "Invalid user credentials, please try again"
      );
    }

    const newSession = await SessionService.createSession(
      userData.id,
      headerData
    );

    return {
      user: userData,
      token: newSession.id,
    };
  });
}

export async function signOut(userId: string, token: string) {
  return await Database.transaction(async (tx) => {
    await SessionService.deleteSession(token);

    return {success: true};
  });
}
