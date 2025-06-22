import {HTTPException} from "hono/http-exception";
import {hc} from "hono/client";
import type {AppType} from "@matty-stack/api";
import {ENV} from "@/lib/ENV";
import {
  NetworkError,
  NoDataError,
  RPCBadRequestError,
  RpcClientError,
  RpcConflictError,
  RpcForbiddenError,
  RpcNotFoundError,
  RpcUnauthorizedError,
  RpcValidationError,
  type AppErrorCode,
  type RpcValidationIssues,
} from "@/lib/errors";

interface ApiClientConfig {
  token?: string | null;
}

export function apiClientRPC(config: {
  userAgent?: string;
  clientIp?: string;
  token?: string;
  init?: RequestInit;
}) {
  const {clientIp, token, userAgent, init} = config;
  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  if (userAgent) {
    headers["User-Agent"] = userAgent;
  }
  if (clientIp) {
    headers["X-Client-IP"] = clientIp;
  }
  return hc<AppType>(ENV.api_url, {
    headers,
    init,
  });
}

export async function tryRpcExpectingData<T>(
  apiCallPromise: Promise<{
    ok: boolean;
    status: number;
    json: () => Promise<T>;
    text: () => Promise<string>;
  }>
): Promise<[RpcClientError | null, T]> {
  const [error, result] = await tryRpc(apiCallPromise);

  if (error) {
    return [error, null as any];
  }

  if (result === null) {
    throw new NoDataError();
  }

  return [null, result];
}

export async function tryRpc<T>(
  apiCallPromise: Promise<{
    ok: boolean;
    status: number;
    json: () => Promise<T>;
    text: () => Promise<string>;
  }>
): Promise<[RpcClientError | null, T | null]> {
  try {
    const response = await apiCallPromise;

    if (response.status === 204) {
      return [null, null];
    }

    if (!response.ok) {
      console.warn(
        `tryRpc: hc promise resolved non-ok (${response.status}). Translating.`
      );
      const rpcError = await translateRpcErrorFromResponse(response);
      return [rpcError, null];
    }

    const data = await response.json();
    return [null, data];
  } catch (error) {
    console.error("tryRpc: Caught network error or unexpected issue:", error);
    const rpcClientError = await translateErrorInstance(error);
    return [rpcClientError, null];
  }
}

async function translateRpcErrorFromResponse(response: {
  status: number;
  json: () => Promise<any>;
  text: () => Promise<string>;
}): Promise<RpcClientError> {
  const status = response.status;
  let errorJson: {
    message?: string;
    cause?: AppErrorCode;
    issues?: RpcValidationIssues;
  } = {};

  let errorMessage = `API request failed with status ${status}`;

  try {
    errorJson = await response.json();

    errorMessage = errorJson?.message || errorMessage;
  } catch (jsonError) {
    try {
      const textBody = await response.text();
      errorMessage = textBody || errorMessage;
    } catch (textError) {}
  }

  console.log(
    `translateRpcErrorFromResponse: Status=${status}, Message=${errorMessage}`
  );
  const errorCode = errorJson?.cause;

  if (status === 422 && errorJson.issues)
    return new RpcValidationError(errorMessage, errorJson.issues, status);
  if (status === 404) return new RpcNotFoundError(errorMessage, errorCode);
  if (status === 403) return new RpcForbiddenError(errorMessage, errorCode);
  if (status === 401) return new RpcUnauthorizedError(errorMessage, errorCode);
  if (status === 400) return new RPCBadRequestError(errorMessage, errorCode);
  if (status === 409) return new RpcConflictError(errorMessage, errorCode);

  return new RpcClientError(errorMessage, status, errorCode);
}

async function translateErrorInstance(error: unknown): Promise<RpcClientError> {
  if (error instanceof TypeError && error.message === "fetch failed") {
    console.error("translateErrorInstance: Detected a network failure:", error);

    throw new NetworkError(
      "The API server is unreachable. Please check your connection and try again."
    );
  }

  if (error instanceof RpcClientError) {
    return error;
  } else if (error instanceof HTTPException) {
    console.error("translateErrorInstance: Caught HTTPException:", error);
    const status = error.status ?? 500;
    return new RpcClientError(
      error.message || `HTTP Client Exception (${status})`,
      status
    );
  } else if (error instanceof Error) {
    console.error("translateErrorInstance: Caught generic Error:", error);

    return new RpcClientError(
      error.message || "Network or application error",
      0
    );
  } else {
    console.error("translateErrorInstance: Caught unknown throwable:", error);
    return new RpcClientError("An unknown error occurred", 0);
  }
}
