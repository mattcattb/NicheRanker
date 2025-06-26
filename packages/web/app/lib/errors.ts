export type AppErrorCode = string;

export class RpcClientError extends Error {
  public status: number;
  public code?: AppErrorCode;

  constructor(message: string, status: number = 500, code?: AppErrorCode) {
    super(message);
    this.name = "RpcClientError";
    this.status = status;
    this.code = code;
  }
}

/** For validation errors (typically 422) */
export interface RpcValidationIssues {
  root?: string[];
  nested?: Record<string, string[]>;
}

export class RpcValidationError extends RpcClientError {
  public issues: RpcValidationIssues;

  constructor(
    message: string,
    issues: RpcValidationIssues,
    status: number = 422
  ) {
    super(message, status);
    this.name = "RpcValidationError";
    this.issues = issues;
  }

  getFieldErrors() {
    return this.issues.nested ?? {};
  }
}

/** Specific error for Not Found (404) */
export class RpcNotFoundError extends RpcClientError {
  constructor(message: string = "Resource not found", code?: AppErrorCode) {
    super(message, 404, code);
    this.name = "RpcNotFoundError";
  }
}

export class NetworkError extends RpcClientError {
  constructor(
    message: string = "A network error occurred. Please check your connection.",
    status: number = 0
  ) {
    super(message, status);
    this.name = "NetworkError";
  }
}

export class RpcConflictError extends RpcClientError {
  constructor(message: string = "Conflic Error", code?: AppErrorCode) {
    super(message, 409, code);
    this.name = "RpcConflictError";
  }
}

export class RPCBadRequestError extends RpcClientError {
  constructor(message: string = "Bad request", code?: AppErrorCode) {
    super(message, 400, code);
    this.name = "RpcBadRequestError";
  }
}

export class RpcForbiddenError extends RpcClientError {
  constructor(message: string = "Access denied", code?: AppErrorCode) {
    super(message, 403, code);
    this.name = "RpcForbiddenError";
  }
}

export class RpcServiceError extends RpcClientError {
  constructor(
    message: string = "Service failed",
    status: number = 500,
    code?: AppErrorCode
  ) {
    super(message, status, code);
    this.name = "RpcServiceError";
  }
}

export class RpcUnauthorizedError extends RpcClientError {
  constructor(
    message: string = "Authentication required",
    code?: AppErrorCode
  ) {
    super(message, 401);
    this.name = "RpcUnauthorizedError";
  }
}

export class NoDataError extends RpcClientError {
  constructor(
    message = "Expected data from API but received none (204 No Content)"
  ) {
    super(message, 204);
    this.name = "NoDataError";
  }
}
