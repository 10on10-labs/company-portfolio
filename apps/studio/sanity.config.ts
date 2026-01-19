"use client";

/**
 * This config is used to set up Sanity Studio that's mounted on the `app/studio/[[...index]]/page.tsx` route
 */
import { apiVersion, dataset, projectId } from "@company/sanity-shared/api";
import * as resolve from "./sanity/plugins/resolve";
import { codeInput } from "@sanity/code-input";
import { colorInput } from "@sanity/color-input";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { documentInternationalization } from "@sanity/document-internationalization";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import LogoIcon from "./logo-icon";
import { sanitySchema, structure } from "./sanity/schemas";

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || "10on10 Labs";

export default defineConfig({
  basePath: "/", // Studio is standalone now, not under /studio
  projectId: projectId || "",
  dataset: dataset || "",
  icon: LogoIcon,
  title,
  schema: sanitySchema,
  plugins: [
    colorInput(),
    codeInput(),
    documentInternationalization({
      supportedLanguages: [
        { id: "en", title: "English" },
        { id: "ar", title: "العربية (Arabic)" },
      ],
      schemaTypes: [
        "service",
        "blog",
        "project",
        "testimonial",
        "companyTimeline",
        "leadership",
        "aboutHero",
        "aboutMissionVision",
        "aboutStats",
        "aboutStory",
        "aboutValues",
        "aboutCTA",
        "pricing",
        "process",
        "accelerate",
        "homepageHero",
      ],
    }),
    structureTool({ structure }),
    presentationTool({
      resolve,
      previewUrl: {
        origin:
          process.env.NODE_ENV === "production"
            ? "https://www.10on10labs.com"
            : "http://localhost:3000", // Web app URL
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
