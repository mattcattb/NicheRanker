import z from "zod/v4";
import {NonEmptyString} from "../../common/zod";
import {headerDataSchema} from "@/api/core/auth/auth.middleware";
import db, {Database} from "@/api/db/client";
import * as UserService from "@/api/core/user/user.service";
import * as SessionService from "@/api/core/session/session.service";
import {and, eq} from "drizzle-orm";
import {sessions, users} from "@/api/db/schemas";
import {generateSecureString, hashString} from "@/api/lib/crypto";
import {BadRequestException, ServiceException} from "@/api/common/exceptions";
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URI,
} from "@/api/common/env";
import {createChildLogger} from "@/api/common/hono/logger";

const logger = createChildLogger("auth-service");

export async function getSpotifyAuthURL() {
  const scope = "user-read-private user-read-email playlist-read-private"; // Add necessary scopes
  const state = generateSecureString(10);
  const queryParams = new URLSearchParams({
    response_type: "code",
    client_id: SPOTIFY_CLIENT_ID,
    scope: scope,
    redirect_uri: SPOTIFY_REDIRECT_URI,
    state: state,
  }).toString();

  return {authUrl: `https://accounts.spotify.com/authorize?${queryParams}`};
}

export async function signOut(userId: string, token: string) {
  return await Database.transaction(async (tx) => {
    await SessionService.deleteSession(token);

    return {success: true};
  });
}

export const exchangeCodeForTokensSchema = z.object({
  code: z.string(),
});

export async function exchangeCodeForTokens(
  query: z.infer<typeof exchangeCodeForTokensSchema>
) {
  const {code} = query;
  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + btoa(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: SPOTIFY_REDIRECT_URI,
    }),
  });

  logger.info({tokenResponse}, `spotify token response to code ${code}`);
  const tokenData = await tokenResponse.json();
  if (tokenData.error) {
    logger.error("Spotify Token Exchange Error:");
    throw new ServiceException(
      tokenData.error_description || "Failed to fetch access token."
    );
  }
  return tokenData as {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  };
}
