import {HTTPException} from "hono/http-exception";
import type {ContentfulStatusCode} from "hono/utils/http-status";

export function createErrorResponse(httpException: HTTPException) {
  return new Response(httpException.message, {
    status: httpException.status,
  });
}

export class NotFoundException extends HTTPException {
  constructor(message = "Resource not found", code?: AppErrorCode) {
    super(404, {message, cause: code});
  }
}

export class ForbiddenException extends HTTPException {
  constructor(
    message = "You dont have permission to access this resource.",
    code?: AppErrorCode
  ) {
    super(403, {message, cause: code});
  }
}

export class ServiceException extends HTTPException {
  constructor(
    message = "Service failed",
    status = 500,
    code: AppErrorCode = AppErrorCodes.SERVICE_FAILURE
  ) {
    super(status as ContentfulStatusCode, {message, cause: code});
    this.name = "ServiceError";
  }
}

export class BadRequestException extends HTTPException {
  constructor(message = "Bad request", code?: AppErrorCode) {
    super(400, {message, cause: code});
  }
}

export class UnauthorizedException extends HTTPException {
  constructor(
    message = "Unauthorized access",
    code: AppErrorCode = AppErrorCodes.ACTION_NOT_AUTHORIZED
  ) {
    super(401, {message, cause: code});
  }
}

export class InvalidSessionException extends UnauthorizedException {
  constructor(
    message = "Invalid session",
    code: AppErrorCode = AppErrorCodes.INVALID_SESSION
  ) {
    super(message, code);
    this.name = "InvalidSessionException";
  }
}

export class ResourceCreationException extends HTTPException {
  constructor(message = "Failed to create resource", code?: AppErrorCode) {
    super(500, {message, cause: code});
    this.name = "ResourceCreationError";
  }
}

export class UnknownClientMessageTypeError extends Error {
  public readonly receivedType?: string;

  constructor(receivedType?: string) {
    const message = receivedType
      ? `Unknown or unsupported message type received: ${receivedType}`
      : "Unknown or unsupported message type received.";
    super(message);
    this.name = "UnknownClientMessageTypeError";
    this.receivedType = receivedType;
  }
}

export class ConflictException extends HTTPException {
  constructor(message = "Conflict Occured", code?: AppErrorCode) {
    super(409, {message, cause: code});
    this.name = "ConfictException";
  }
}

export class TooManyRequestsException extends HTTPException {
  constructor(message = "Too many requests", code?: AppErrorCode) {
    super(429, {message, cause: code});
    this.name = "TooManyRequestsException";
  }
}

export const AppErrorCodes = {
  // --- General Application Codes ---
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  SERVICE_FAILURE: "SERVICE_FAILURE",
  INVALID_INPUT: "INVALID_INPUT",
  ACTION_NOT_AUTHORIZED: "ACTION_NOT_AUTHORIZED",
  RESOURCE_NOT_FOUND: "RESOURCE_NOT_FOUND",
  RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",

  BAD_REQUEST: "BAD_REQUEST",

  // --- Auth
  INVALID_SESSION: "INVALID_SESSION",
  SESSION_EXPIRED: "SESSION_EXPIRED",
  USER_BANNED: "USER_BANNED",
  SESSION_NOT_FOUND: "SESSION_NOT_FOUND",

  INSUFFICIENT_FUNDS: "INSUFFICIENT_FUNDS",
} as const;

export type AppErrorCode = (typeof AppErrorCodes)[keyof typeof AppErrorCodes];
