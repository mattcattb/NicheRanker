import {createMiddleware} from "hono/factory";
import {sessions} from "../../db/schemas";
import * as SessionService from "@/core/session/session.service";
import {AppErrorCodes, UnauthorizedException} from "@/common/exceptions";
import z from "zod/v4";
import {NonEmptyString} from "@/common/zod";

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
    throw new UnauthorizedException("invalid token scheme");
  }
  if (!token) {
    throw new UnauthorizedException("no token in request");
  }

  const {session, userId} = await SessionService.validateSession(token);

  c.set("session", session);
  c.set("userId", userId);

  await next();
});

export const headerDataSchema = z.object({
  userAgent: NonEmptyString,
  ip: NonEmptyString,
});

export const header = createMiddleware(async (c, next) => {
  const forwardedFor = c.req.header("x-forwarded-for")?.split(",")[0]?.trim();
  const clientIp = c.req.header("x-client-ip");
  const ip = clientIp || forwardedFor;
  const ua = c.req.header("user-agent")?.slice(0, 255);

  const info = {
    ipAddress: ip,
    userAgent: ua,
  };

  c.set("headers", info);

  await next();
});
