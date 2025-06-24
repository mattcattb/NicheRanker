import createApp from "@/common/hono/create-app";
import {AuthMiddleware} from "@/core";
import {authController} from "@/core/auth/auth.controller";
import {usersController} from "@/core/user/user.controller";

export const app = createApp();

app.use(AuthMiddleware.header);

app.get("/health", (c) => {
  return c.text("Hello Hono!");
});

export const appRoutes = app
  .route("/api/auth", authController)
  .route("/api/users", usersController);

export type AppType = typeof appRoutes;
