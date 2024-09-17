// utils/supabaseErrorHandler.js

import {
  NotFoundError,
  ValidationError,
  DatabaseError,
  ConflictError,
  AuthorizationError,
} from "./customErrors.js";

const errorCodeMap = {
  PGRST116: NotFoundError,
  PGRST201: ValidationError,
  PGRST204: ConflictError,
  23505: ConflictError, // Unique violation
  "42P01": DatabaseError, // Undefined table
  42703: DatabaseError, // Undefined column
  23503: ValidationError, // Foreign key violation
  42501: AuthorizationError, // Insufficient privilege
  // Add more mappings as needed
};

export function handleSupabaseError(error, resource = "Resource") {
  console.error("Handling Supabase error:", JSON.stringify(error, null, 2));

  if (
    !error.code &&
    error.message?.includes("Invalid input syntax for type uuid")
  ) {
    return new ValidationError(`Invalid ${resource.toLowerCase()} ID format`);
  }

  const ErrorType = errorCodeMap[error.code] || DatabaseError;

  let message;
  switch (ErrorType) {
    case NotFoundError:
      message = `${resource} not found`;
      break;
    case ConflictError:
      message = `${resource} already exists`;
      break;
    case ValidationError:
      message = `Invalid ${resource.toLowerCase()} data`;
      break;
    case AuthorizationError:
      message = "You do not have permission to perform this action";
      break;
    default:
      message = `An unexpected error occurred while processing ${resource.toLowerCase()}`;
  }

  return new ErrorType(message);
}

export default { handleSupabaseError };
