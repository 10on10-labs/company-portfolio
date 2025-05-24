import { defineQuery } from 'next-sanity';

export const homePageQuery = defineQuery(`
  *[_type == "home"][0]{
    _id,
    _type,
    overview,
    showcaseProjects[]{
      _key,
      ...@->{
        _id,
        _type,
        coverImage,
        overview,
        "slug": slug.current,
        tags,
        title,
      }
    },
    title,
  }
`);

export const pagesBySlugQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    _type,
    body,
    overview,
    title,
    "slug": slug.current,
  }
`);

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    name,
    category,
    description,
    logo,
    coverImages,
    projectSections,
  }
`);
export const allProjectsQuery = defineQuery(`
  *[_type == "project"] {
    _id,
    "slug": slug.current,
    name,
    category,
    description,
    logo,
    coverImages,
    projectSections,
  }
`);

export const settingsQuery = defineQuery(`
  *[_type == "settings"][0]{
    _id,
    _type,
    footer,
    menuItems[]{
      _key,
      ...@->{
        _type,
        "slug": slug.current,
        title
      }
    },
    ogImage,
  }
`);

export const slugsByTypeQuery = defineQuery(`
  *[_type == $type && defined(slug.current)]{"slug": slug.current}
`);
export const servicesQuery = defineQuery(`
  *[_type == "service"] {
    name,
    "id": id.current,
    description,
    categories
  }
`);

export const testimonialsQuery = defineQuery(`
  *[_type == "testimonial"] {
    _id,
    clientName,
    role,
    testimonial,
    rating,
    clientImage {
      asset->{
        url,
        metadata {
          dimensions
        }
      }
    }
  }
`);
