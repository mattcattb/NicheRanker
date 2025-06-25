import {createMiddleware} from "hono/factory";
import {sessions} from "../../db/schemas";
import * as SessionService from "@/api/core/session/session.service";
import {AppErrorCodes, UnauthorizedException} from "@/api/common/exceptions";
import z from "zod/v4";
import {getCookie} from "hono/cookie";
import {NonEmptyString} from "@/api/common/zod";

export const accessTokenMiddleware = createMiddleware<{
  Variables: {
    access_token: string;
  };
}>(async (c, next) => {
  const accessToken = getCookie(c, "spotify_access_token");

  if (!accessToken) {
    throw new UnauthorizedException(
      "No spotify access token in protected request"
    );
  }

  c.set("access_token", accessToken);

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
