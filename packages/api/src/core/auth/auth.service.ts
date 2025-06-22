import z from "zod/v4";
import {NonEmptyString} from "../../common/zod";
import {headerDataSchema} from "@/core/auth/auth.middleware";
import {Database} from "@/db/client";
import * as UserService from "@/core/user/user.service";
import * as SessionService from "@/core/session/session.service";

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
  return await Database.transaction(async (tx) => {});
}

export async function signOut(token: string) {
  return await Database.transaction(async (tx) => {});
}
