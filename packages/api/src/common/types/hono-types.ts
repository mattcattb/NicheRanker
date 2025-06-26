import type {BASE_PATH} from "@/api/common/constants";
import {headerDataSchema} from "@/api/core/auth/auth.middleware";
import {sessions} from "@/api/db/schemas";
import type {Hono} from "hono";
import z from "zod/v4";

export type AppEnv = {
  Variables: {
    session?: typeof sessions.$inferSelect;
    userId?: string;
    headerData?: z.infer<typeof headerDataSchema>;
  };
};

export type MyHonoApp = Hono<AppEnv, {}, typeof BASE_PATH>;
