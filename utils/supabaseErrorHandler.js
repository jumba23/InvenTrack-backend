import ApiError from "./apiError.js";

export function handleSupabaseError(error, resource = "Resource") {
  console.error("Handling Supabase error:", JSON.stringify(error, null, 2));

  let statusCode = 500;
  let message = `An unexpected error occurred while processing ${resource.toLowerCase()}`;

  // Map Supabase error codes to appropriate status codes and messages
  if (error.code === "PGRST116") {
    statusCode = 404;
    message = `${resource} not found`;
  } else if (error.code === "PGRST201" || error.code === "23503") {
    statusCode = 400;
    message = `Invalid ${resource.toLowerCase()} data`;
  } else if (error.code === "PGRST204" || error.code === "23505") {
    statusCode = 409;
    message = `${resource} already exists`;
  } else if (error.code === "42501") {
    statusCode = 403;
    message = "You do not have permission to perform this action";
  }

  return new ApiError(statusCode, message);
}
