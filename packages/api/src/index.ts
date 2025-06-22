import {createChildLogger} from "@/common/logger";
import {app, appRoutes} from "./app";
const startupLogger = createChildLogger("index");

const port = parseInt(process.env.PORT || "3000");
startupLogger.info(`API server attempting to listen on port ${port}`);

export default {
  fetch: app.fetch,
  port: port,
};

export type AppRoutes = typeof appRoutes;
