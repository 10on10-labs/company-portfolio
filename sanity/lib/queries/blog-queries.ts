import { defineQuery } from 'next-sanity';

export const blogBySlugQuery = defineQuery(`
    *[_type == "blog" && slug.current == $slug][0] {
        title,
        subTitle,
        "modifiedAt": _updatedAt,
        author->,
        thumbnail,
        body,
        blogCategories[]->{
            title,
            "chipColor": chipColor.hex,
            "slug": slug.current, 
        },
    }
`);

export const blogsSlugQuery = defineQuery(`
    *[_type == "blog"] {
        "slug": slug.current
    }
`);

export const blogCategoriesQuery = defineQuery(`
  *[_type == "blogCategory"] {
  title,
  "slug": slug.current
}
`);

export const blogsByCategoryQuery = defineQuery(`
   *[_type == "blog" && 
    ($categorySlugs == null || references(*[_type == "blogCategory" && slug.current in $categorySlugs]._id))
  ] {
    _id,
    title,
    subTitle,
    // assumes 5 characters as mean word length
    // https://ux.stackexchange.com/questions/22520/how-long-does-it-take-to-read-x-number-of-characters
    "readingTimeInMins": round(length(pt::text(body)) / 5 / 180 ),
    author->{
     name,
     image
    },
    blogCategories[]->{
      title,
      "chipColor": chipColor.hex
    },
    "slug": slug.current,
    thumbnail,
    publishedAt
  }
`);

export const blogsQuery = defineQuery(`
  *[_type == "blog"] | order(publishedAt desc) [0...10] {
    _id,
    title,
    "excerpt": subTitle,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
    "slug": slug.current,
    "image": thumbnail,
    publishedAt,
    author->{
      name,
      "picture": image
    },
    "category": blogCategories[0]->{
      title,
      "color": chipColor
    }
  }
`);
