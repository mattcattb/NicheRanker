import {SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET} from "@/api/common/env";
import {PaginationQuery} from "@/api/common/zod";
import type {z} from "zod/v4";

import {SpotifyApi} from "@spotify/web-api-ts-sdk";

export const Spotify = SpotifyApi.withClientCredentials(
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET
);

export async function getFavoriteArtists(
  bearer: string,
  query: z.infer<typeof PaginationQuery>
) {}

export async function getFavoriteTracks(
  bearer: string,
  query: z.infer<typeof PaginationQuery>
) {
  const {limit, offset} = query;
}
