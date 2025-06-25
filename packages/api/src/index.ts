import app from "@/api/app";
import {createChildLogger} from "@/api/common/hono/logger";
import type {ApiRoutes} from "@/api/app";
const startupLogger = createChildLogger("index");

const port = parseInt(process.env.PORT || "3000");
startupLogger.info(`API server attempting to listen on port ${port}`);

export default {
  fetch: app.fetch,
  port: port,
};

export type {ApiRoutes};
