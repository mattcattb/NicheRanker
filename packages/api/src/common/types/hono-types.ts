import {headerDataSchema} from "@/core/auth/auth.middleware";
import {sessions} from "@/db/schemas";
import z from "zod/v4";

export type AppEnv = {
  Variables: {
    access_token?: string;
    headerData?: z.infer<typeof headerDataSchema>;
  };
};
