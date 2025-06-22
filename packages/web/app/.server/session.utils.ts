import {apiClientRPC, tryRpcExpectingData} from "@/.server/api-rpc";
import {getHeadersFromContext, getSessionFromContext} from "@/.server/session";
import {flashErrorToast} from "@/.server/toast.utils";
import {RpcForbiddenError, RpcUnauthorizedError} from "@/lib/errors";
import {redirect, type unstable_RouterContextProvider} from "react-router";

const defaultUser = {
  isAuthenticated: false,
  isAdmin: false,
  userData: null,
};

export async function clearSessionFromContext(
  context: unstable_RouterContextProvider
) {
  const session = getSessionFromContext(context);
  session.unset("token");
  session.unset("userId");
}

export async function setSessionFromContext(
  context: unstable_RouterContextProvider,
  data: {token: string; userId: string; isAdmin: boolean; isSignup?: boolean}
) {
  const session = getSessionFromContext(context);
  session.set("token", data.token);
  session.set("userId", data.userId);
}

export function requireUserLogin(context: unstable_RouterContextProvider) {
  const session = getSessionFromContext(context);
  if (!session) {
    console.warn(`no session was found it require token context`);
    throw redirect("/signup");
  }

  const token = session.get("token");
  if (!token) {
    console.warn("no token found in require user token context");
    flashErrorToast(context, {
      message: "must be logged in to view this page!",
    });
    throw redirect("/signup");
  }

  return token;
}

export function isAdmin(context: unstable_RouterContextProvider) {
  return getAuthStatusContext(context).isAdmin;
}

export function isLoggedIn(context: unstable_RouterContextProvider) {
  const token = getSessionFromContext(context).get("token");

  if (token) {
    return true;
  } else {
    return false;
  }
}

export function apiRPCWithToken(context: unstable_RouterContextProvider) {
  const token = requireUserLogin(context);
  const {clientIp, userAgent} = getHeadersFromContext(context);

  return apiClientRPC({clientIp, token, userAgent});
}

export function apiRPCOptionalToken(context: unstable_RouterContextProvider) {
  // can do rpc without needing token!
  const session = getSessionFromContext(context);
  const {clientIp, userAgent} = getHeadersFromContext(context);
  const token = session.get("token");
  return apiClientRPC({clientIp, token, userAgent});
}

interface AuthStatus {
  isAuthenticated: boolean;
  userId?: string;
  isAdmin?: boolean;
  token?: string;
}

export function getAuthStatusContext(
  context: unstable_RouterContextProvider
): AuthStatus {
  const session = getSessionFromContext(context);
  const token = session.get("token");
  const userId = session.get("userId");

  return {
    isAuthenticated: !!token && !!userId, // Valid if both token and userId are set
    userId,
    token,
  };
}
export function requireToken(context: unstable_RouterContextProvider): {
  token: string;
} {
  const session = getSessionFromContext(context);
  const token = session.get("token");

  if (!token) {
    flashErrorToast(context, "You must be logged in.");
    throw redirect("/signup");
  }

  return {token};
}

export async function fetchAuthDataFromContext(
  context: unstable_RouterContextProvider
) {
  // returns user auth data, or default data
  const session = getSessionFromContext(context);
  const token = session.get("token");
  if (!token) {
    clearSessionFromContext(context);
    return defaultUser;
  }
  const client = apiRPCOptionalToken(context);
  if (error) {
    console.error("error fetching user auth data", JSON.stringify(error));

    if (error instanceof RpcUnauthorizedError) {
      console.log(`unauthorized error...`);
      clearSessionFromContext(context);
      flashErrorToast(context, error);

      throw redirect("/login");
    } else if (error instanceof RpcForbiddenError) {
      clearSessionFromContext(context);
      flashErrorToast(context, error);
    } else {
      console.error("An unexpected error occurred:", error);
      flashErrorToast(context, error);
      throw error;
    }

    return defaultUser;
  }

  session.set("isAdmin", isAdmin);
  session.set("userId", userData.userId);
  return {
    isAuthenticated: true,
    isAdmin,
    settings,
    userData,
  };
}
