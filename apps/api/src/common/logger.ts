import pino from "pino";
import {pinoLogger, PinoLogger} from "hono-pino";
import PinoPretty from "pino-pretty";

const pinoInstance = pino(
  {
    level: process.env.LOG_LEVEL || "info",
    serializers: {
      err: pino.stdSerializers.err,
      error: pino.stdSerializers.err,
    },
  },
  process.env.NODE_ENV !== "production"
    ? PinoPretty({colorize: true})
    : undefined
);

export function getPinoLogger() {
  return pinoLogger({
    pino: pinoInstance,
  });
}

export const logger = pinoInstance;

export function createChildLogger(child: string) {
  return logger.child({child});
}
