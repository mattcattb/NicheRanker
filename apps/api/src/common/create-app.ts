import {createChildLogger, getPinoLogger} from "@/api/common/logger";
import type {AppEnv} from "@/api/common/types/hono-types";
import {AuthMiddleware} from "@/api/core";
import {Hono} from "hono";

export function createRouter() {
  return new Hono<AppEnv>({
    strict: true,
  });
}

export default function createApp() {
  const app = createRouter();

  app
    .use(getPinoLogger())
    .use(AuthMiddleware.header)
    .get("/health", (c) => {
      return c.text("Hello Hono!");
    });

  return app;
}
