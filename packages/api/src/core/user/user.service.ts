import { SPOTIFY_CLIENT_ID } from "@/api/common/env";
import {
  getTopArtists,
  getTopTracks,
  getUserProfile,
  SpotifySDK,
} from "@/api/lib/spotify";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

export async function getUser(accessToken: string) {
  const [profile, topArtists, topTracks] = await Promise.all([
    getUserProfile(accessToken),
    getTopArtists(accessToken),
    getTopTracks(accessToken),
  ]);

  return {
    profile,
    topArtists,
    topTracks,
  };
}

export async function nicheAnalytics(accessToken: string) {
  // get users total nichness (look at other parts of them)
}
