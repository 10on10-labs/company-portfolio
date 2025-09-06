import { defineQuery } from 'next-sanity';

export const processQuery = defineQuery(`
  *[_type == "process" && language == $language][0] {
    _id,
    title,
    language,
    badge,
    heading,
    steps[] {
      number,
      title,
      description,
      tag
    },
    progressLabel
  }
`);
