import {createMiddleware} from "hono/factory";
import {sessions} from "../../db/schemas";
import * as SessionService from "@/core/session/session.service";

export const authMiddleware = createMiddleware<{
  Variables: {
    userId: (str: string) => string;
  };
}>(async (c, next) => {});
export const sessionMiddleware = createMiddleware<{
  Variables: {
    userId: string;
    session: typeof sessions.$inferSelect;
  };
}>(async (c, next) => {
  const authorization = c.req.header("Authorization");
  if (!authorization) {
    throw new UnauthorizedException(
      "No authorization token in protected request"
    );
  }

  const [scheme, token] = authorization.split(" ");
  if (scheme != "Bearer") {
    throw new Exceptions.UnauthorizedException("invalid token scheme");
  }
  if (!token) {
    throw new Exceptions.UnauthorizedException("no token in request");
  }

  const {session, userId} = await SessionService.validateSession(token);

  c.set("session", session);
  c.set("userId", userId);

  await next();
});
