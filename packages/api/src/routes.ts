import {BASE_PATH} from "@/api/common/constants";
import {createRouter} from "@/api/common/hono/create-app";
import type {MyHonoApp} from "@/api/common/types/hono-types";
import {authController} from "@/api/core/auth/auth.controller";
import {usersController} from "@/api/core/user/user.controller";

export function registerRoutes(app: MyHonoApp) {
  return app.route("/auth", authController).route("/users", usersController);
}

export const router = registerRoutes(createRouter().basePath(BASE_PATH));
export type router = typeof router;
