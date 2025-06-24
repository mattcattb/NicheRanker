import {SPOTIFY_CLIENT_ID} from "@/common/ENV";
import {ResourceCreationException} from "@/common/exceptions";
import {NonEmptyString} from "@/common/zod";
import db, {Database} from "@/db/client";
import {users} from "@/db/schemas";
import {hashString} from "@/lib/crypto";
import {Spotify} from "@/lib/spotify";
import {SpotifyApi} from "@spotify/web-api-ts-sdk";
import {eq} from "drizzle-orm";
import z from "zod/v4";

export async function getUser(accessToken: string) {
  const userSdk = SpotifyApi.withAccessToken(SPOTIFY_CLIENT_ID, {
    access_token: accessToken,
    expires_in: 0,
    refresh_token: "fdfd",
    token_type: `Bearer`,
  });

  const profile = await userSdk.currentUser.profile();
  return profile;
}

export async function getTopTracks(accessToken: string) {
  const userSdk = SpotifyApi.withAccessToken(SPOTIFY_CLIENT_ID, {
    access_token: accessToken,
    expires_in: 0,
    refresh_token: "fdfd",
    token_type: `Bearer`,
  });

  const topTracks = await userSdk.currentUser.topItems("tracks", "long_term");
  return topTracks;
}

export async function getTopArtists(accessToken: string) {
  const userSdk = SpotifyApi.withAccessToken(SPOTIFY_CLIENT_ID, {
    access_token: accessToken,
    expires_in: 0,
    refresh_token: "fdfd",
    token_type: `Bearer`,
  });

  const topArtists = await userSdk.currentUser.topItems("artists", "long_term");

  return topArtists;
}
