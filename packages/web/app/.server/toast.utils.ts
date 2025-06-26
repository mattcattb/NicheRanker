import {getSessionFromContext} from "@/.server/session";
import type {Toast} from "@/lib/toast";
import type {unstable_RouterContextProvider} from "react-router";

export function flashToast(
  context: unstable_RouterContextProvider,
  toast: Toast
) {
  getSessionFromContext(context).flash("toast", toast);
}

export function flashSuccessToast(
  context: unstable_RouterContextProvider,
  message: string
) {
  flashToast(context, {
    type: "success",
    message,
  });
}

export function flashErrorToast(
  context: unstable_RouterContextProvider,
  error: unknown
) {
  console.error("flashing error toast");
  const message =
    error instanceof Error ? error.message : "An unknown error occurred";

  flashToast(context, {
    type: "error",
    message,
  });
}

export function flashInfoToast(
  context: unstable_RouterContextProvider,
  message: string
) {
  flashToast(context, {
    type: "info",
    message,
  });
}

export function getToastDataFromContext(
  context: unstable_RouterContextProvider
) {
  const session = getSessionFromContext(context);
  const toast = session.get("toast");
  if (!toast) return {toast: null};

  return {toast};
}
