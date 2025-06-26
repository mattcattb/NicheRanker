import { createRouter } from "@/api/common/hono/create-app";
import * as AuthMiddleware from "./auth.middleware";
import * as AuthService from "./auth.service";
import { zValidator } from "@hono/zod-validator";
import { setCookie } from "hono/cookie";

const FRONTEND_CALLBACK_URL = "http://localhost:5173/";

export const authController = createRouter()
  .post("/sign-in", async (c) => {
    const { authUrl } = await AuthService.getSpotifyAuthURL();

    return c.redirect(authUrl);
  })
  .post(
    "/callback",
    zValidator("query", AuthService.exchangeCodeForTokensSchema),
    async (c) => {
      const query = c.req.valid("query");

      const response = await AuthService.exchangeCodeForTokens(query);

      setCookie(c, "spotify_access_token", response.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: response.expires_in,
        path: "/",
      });

      return c.redirect(FRONTEND_CALLBACK_URL);
    }
  )

  .use(AuthMiddleware.accessTokenMiddleware)
  .delete("/sign-out", async (c) => {
    return c.json({ message: "in progress" }, 200);
  });
