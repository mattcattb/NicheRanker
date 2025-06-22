const apiUrl = process.env.API_URL;
if (apiUrl === undefined) {
  throw new Error("Missing environment variable: VITE_API_URL is not defined.");
}

export const ENV = {
  api_url: apiUrl,
};
