import {BASE_PATH} from "@/api/common/constants";
import createApp, {createRouter} from "@/api/common/create-app";
import {getPinoLogger} from "@/api/common/logger";
import type {AppEnv} from "@/api/common/types/hono-types";
import {AuthMiddleware} from "@/api/core";
import {authController} from "@/api/core/auth/auth.controller";
import {usersController} from "@/api/core/user/user.controller";
import {registerRoutes} from "@/api/routes";
import {Hono} from "hono";

const app = new Hono<AppEnv>().basePath(BASE_PATH); // e.g., basePath('/api')

app
  .use(getPinoLogger())
  .use(AuthMiddleware.header)
  .get("/health", (c) => {
    // This health check now correctly lives at /api/health
    return c.text("Hello Hono!");
  });

const routes = app
  .route("/auth", authController)
  .route("/users", usersController);

// 4. Export the final router instance for your server to run.
export const api = routes;

// const app = registerRoutes(createApp());
export default app;

export type ApiRoutes = typeof routes;
