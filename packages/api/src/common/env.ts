interface Env {
  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_CLIENT_SECRET: string;
  SPOTIFY_REDIRECT_URI: string;
}

const env = process.env as unknown as Env;

if (!env.SPOTIFY_CLIENT_ID)
  throw new Error("Missing SPOTIFY_CLIENT_ID environment variable.");
if (!env.SPOTIFY_CLIENT_SECRET)
  throw new Error("Missing SPOTIFY_CLIENT_SECRET environment variable.");
if (!env.SPOTIFY_REDIRECT_URI)
  throw new Error("Missing SPOTIFY_REDIRECT_URI environment variable.");

export const {SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI} =
  env;
