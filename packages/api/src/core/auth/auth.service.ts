import z from "zod/v4";
import {NonEmptyString} from "../../common/zod";

export const signupData = z.object({
  userAgent: NonEmptyString,
  ip: NonEmptyString,
});

export async function signUp() {}

export async function signIn() {}

export async function signOut() {}
