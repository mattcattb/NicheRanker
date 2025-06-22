import {createChildLogger, getPinoLogger} from "@/common/logger";
import type {AppEnv} from "@/common/types/hono-types";
import {Hono} from "hono";

export function createRouter() {
  return new Hono<AppEnv>({
    strict: true,
  });
}

const logger = createChildLogger("app");

export default function createApp() {
  const app = createRouter();

  app.use(getPinoLogger());

  return app;
}
