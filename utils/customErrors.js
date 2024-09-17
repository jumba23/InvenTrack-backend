// utils/customErrors.js

export class NotFoundError extends Error {
  constructor(message = "Resource not found") {
    super(message);
    this.name = "NotFoundError";
    this.status = 404;
  }
}

export class ValidationError extends Error {
  constructor(message = "Invalid input data") {
    super(message);
    this.name = "ValidationError";
    this.status = 400;
  }
}

export class DatabaseError extends Error {
  constructor(message = "A database error occurred") {
    super(message);
    this.name = "DatabaseError";
    this.status = 500;
  }
}

export class ConflictError extends Error {
  constructor(message = "Resource already exists") {
    super(message);
    this.name = "ConflictError";
    this.status = 409;
  }
}

export class AuthorizationError extends Error {
  constructor(message = "Not authorized") {
    super(message);
    this.name = "AuthorizationError";
    this.status = 403;
  }
}
