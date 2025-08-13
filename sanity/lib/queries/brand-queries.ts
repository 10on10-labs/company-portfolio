import { defineQuery } from 'next-sanity';

export const brandsQuery = defineQuery(`
  *[_type == "brand"] | order(order asc, _createdAt desc) {
    _id,
    name,
    "logoUrl": logo.asset->url,
    "logoAlt": logo.alt,
    link
  }
`);
