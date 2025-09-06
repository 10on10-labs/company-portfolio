import { defineQuery } from 'next-sanity';

export const accelerateQuery = defineQuery(`
  *[_type == "accelerate" && language == $language][0] {
    _id,
    title,
    language,
    heading,
    services,
    buttonText
  }
`);
