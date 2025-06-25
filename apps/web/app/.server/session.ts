import {CONFIG} from "@/api/lib/config";
import {ENV} from "@/api/lib/ENV";
import type {Toast} from "@/api/lib/toast";
import {getHeaders, type HeaderData} from "@/api/lib/utils/connection";
import {createCookieSessionStorage} from "react-router";
import {
  unstable_RouterContextProvider,
  type unstable_MiddlewareFunction,
} from "react-router";

import {unstable_createContext} from "react-router";

export interface Data {
  token?: string;
  userId?: string;
}

export interface FlashData {
  toast?: Toast | null;
}

export const sessionStorage = createCookieSessionStorage<Data, FlashData>({
  cookie: {
    name: "Reroll-Session",
    secure: true,
    httpOnly: true,
    maxAge: CONFIG.SESSION_EXPIRATION,
    secrets: [ENV.session_secret],
  },
});

export type AppSession = Awaited<ReturnType<typeof sessionStorage.getSession>>;

export function getSession(request: Request): Promise<AppSession> {
  return sessionStorage.getSession(request.headers.get("Cookie"));
}

export function commitSession(session: AppSession): Promise<string> {
  return sessionStorage.commitSession(session);
}

export function destroySession(session: AppSession) {
  return sessionStorage.destroySession(session);
}

export const sessionContext = unstable_createContext<AppSession | undefined>(
  undefined
);

export const sessionMiddleware: unstable_MiddlewareFunction = async (
  {request, context},
  next
) => {
  const session = await getSession(request);
  context.set(sessionContext, session);

  const headers = getHeaders(request);
  context.set(headerContext, headers);

  const responseFromNext = (await next()) as Response | undefined;

  const setCookieHeader = await commitSession(session);

  if (responseFromNext) {
    if (setCookieHeader) {
      console.log(
        "Committing session changes with Set-Cookie header to existing Response."
      );

      responseFromNext.headers.append("Set-Cookie", setCookieHeader);
    }
    return responseFromNext;
  } else if (setCookieHeader) {
    const headers = new Headers();
    headers.append("Set-Cookie", setCookieHeader);

    return new Response(null, {status: 204, headers});
  }

  return undefined;
};

export function getSessionFromContext(
  context: unstable_RouterContextProvider
): AppSession {
  const session = context.get(sessionContext);
  if (!session) {
    console.error("No session found from context!");
    throw Error("No session found from context!");
  }
  return session;
}
export const headerContext = unstable_createContext<HeaderData | undefined>(
  undefined
);

export function getHeadersFromContext(
  context: unstable_RouterContextProvider
): HeaderData {
  const headers = context.get(headerContext);
  if (!headers) {
    // This should not happen if middleware is set up correctly
    console.error("No header data found in context!");
    return {clientIp: undefined, userAgent: undefined};
  }
  return headers;
}
