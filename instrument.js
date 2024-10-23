// instrument.js
import * as Sentry from "@sentry/node";
/**
 * Sentry initialization
 *
 * This initializes the Sentry SDK with your DSN and enables the ProfilingIntegration.
 * The tracesSampleRate and profilesSampleRate are set to 1.0 to capture all traces and profiles.
 *
 */

// Ensure to call this before importing any other modules!
Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Add Tracing by setting tracesSampleRate
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});
