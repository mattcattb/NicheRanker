import {createRouter} from "@/common/hono/create-app";
import * as AuthMiddleware from "@/core/auth/auth.middleware";
import * as UserService from "./user.service";
import {NotFoundException} from "@/common/exceptions";
import {getCookie} from "hono/cookie";

export const usersController = createRouter()
  .use(AuthMiddleware.accessTokenMiddleware)
  .get("/", async (c) => {
    const accessToken = c.get("access_token");

    const userProfileResponse = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userProfile = await userProfileResponse.json();

    return c.json(userProfile, 200);
  })
  .get("/top-tracks", async (c) => {
    
  })
  .get("/top-artists", async (c) => {

  });
