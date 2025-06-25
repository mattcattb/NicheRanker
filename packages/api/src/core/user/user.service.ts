import {SPOTIFY_CLIENT_ID} from "@/api/common/env";
import {SpotifyApi} from "@spotify/web-api-ts-sdk";

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
