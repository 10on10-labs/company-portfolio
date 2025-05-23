'use client';

/**
 * This config is used to set up Sanity Studio that's mounted on the `app/studio/[[...index]]/page.tsx` route
 */
import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api';
import * as resolve from '@/sanity/plugins/resolve';
import { pageStructure, singletonPlugin } from '@/sanity/plugins/settings';
import { codeInput } from '@sanity/code-input';
import { colorInput } from '@sanity/color-input';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import { presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';

import { sanitySchema } from './sanity/schemas';
import { home, settings } from './sanity/schemas/singletons';

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Next.js Personal Website with Sanity.io';

export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || '',
  dataset: dataset || '',
  title,
  schema: sanitySchema,
  plugins: [
    colorInput(),
    codeInput(),
    structureTool({
      structure: pageStructure([home, settings]),
    }),
    presentationTool({
      resolve,
      previewUrl: { previewMode: { enable: '/api/draft-mode/enable' } },
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([home.name, settings.name]),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
