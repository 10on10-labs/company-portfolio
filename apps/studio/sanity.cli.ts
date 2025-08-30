import { defineCliConfig } from "sanity/cli";

// Since this is a standalone studio app, we need to use the SANITY_STUDIO_ env vars
// or hardcode the values directly
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "yxvq3m09";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineCliConfig({ 
  api: { projectId, dataset }
  // studioHost is only needed for custom domains
});
