import { type SchemaTypeDefinition } from 'sanity';

import { blockContent } from './block-content';
import { author, blog, blogCategory, page, project } from './documents';
import { service } from './documents/service';
import { testimonial } from './documents/testimonial';
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
    service,
    testimonial,
    duration,
    milestone,
    timeline,
    home,
    settings,
  ],
};
