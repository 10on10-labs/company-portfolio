// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://d1ce0e46291ea76b07a32ee7d735854f@o4509150250598400.ingest.de.sentry.io/4509150252367952",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,
  enabled: process.env.NODE_ENV == "development",
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
