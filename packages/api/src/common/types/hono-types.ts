import {sessions} from "@/db/schemas";

export type AppEnv = {
  Variables: {
    session?: typeof sessions.$inferSelect;
    userId?: string;
    headerData?: {
      ip?: string;
      userAgent?: string;
    };
  };
};
