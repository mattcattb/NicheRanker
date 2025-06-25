import {SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET} from "@/api/common/env";

import {SpotifyApi} from "@spotify/web-api-ts-sdk";

export const Spotify = SpotifyApi.withClientCredentials(
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET
);

export function SpotifySDK(accessToken: string) {
  return SpotifyApi.withAccessToken(SPOTIFY_CLIENT_ID, {
    access_token: accessToken,
    expires_in: 0,
    refresh_token: "fdfd",
    token_type: `Bearer`,
  });
}

export async function getUserProfile(accessToken: string) {
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
  const userSdk = SpotifySDK(accessToken);

  const topTracks = await userSdk.currentUser.topItems("tracks", "long_term");
  return topTracks;
}

export async function getTopArtists(accessToken: string) {
  const userSdk = SpotifySDK(accessToken);

  const topArtists = await userSdk.currentUser.topItems("artists", "long_term");

  return topArtists;
}

export async function getRecentlyPlayed(accessToken: string) {
  const userSdk = SpotifySDK(accessToken);
  const response = await userSdk.player.getRecentlyPlayedTracks(50);

  return response;
}

export async function getSavedTracks(accessToken: string) {
  const userSdk = SpotifySDK(accessToken);
  const response = await userSdk.currentUser.tracks.savedTracks();

  return response;
}

export async function getRecommendations(accessToken: string) {
  const userSdk = SpotifySDK(accessToken);
}
