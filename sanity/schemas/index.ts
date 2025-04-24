import { type SchemaTypeDefinition } from 'sanity';

import { blockContent } from './block-content';
import { author, blog, blogCategory, page, project } from './documents';
import { duration, milestone, timeline } from './objects';
import { home, settings } from './singletons';

export const sanitySchema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContent,
    blog,
    blogCategory,
    author,
    page,
    project,
    duration,
    milestone,
    timeline,
    home,
    settings,
  ],
};
