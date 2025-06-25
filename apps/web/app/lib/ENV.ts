const API_URL = process.env.API_URL;
if (!API_URL) {
  throw new Error("Missing environment variable: VITE_API_URL is not defined.");
}
const NODE_ENV = process.env.NODE_ENV ?? "development";
const SESSION_SECRET = process.env.SESSION_SECRET;

if (NODE_ENV !== "development" && !SESSION_SECRET) {
  throw new Error("Missing env variable: SESSION_SECRET is not defined");
}

export const ENV = {
  node_env: NODE_ENV,
  api_url: API_URL,
  session_secret: SESSION_SECRET ?? "dev_secret",
};
