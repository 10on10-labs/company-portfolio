import { type SchemaTypeDefinition } from "sanity";
import { StructureResolver } from "sanity/structure";

import { blockContent } from "./block-content";
import { author, blog, blogCategory, brand, project } from "./documents";
import { service } from "./documents/service";
import { testimonial } from "./documents/testimonial";
import { duration } from "./objects";
import { companyTimeline, leadership } from "./objects/about";

export const sanitySchema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContent,
    companyTimeline,
    leadership,
    blog,
    blogCategory,
    author,
    project,
    brand,
    service,
    testimonial,
    duration,
  ],
};

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Blogs Directory
      S.listItem()
        .title("Blogs")
        .child(
          S.list()
            .title("Blogs")
            .items([
              S.listItem()
                .title("Blog Posts")
                .schemaType("blog")
                .child(S.documentTypeList("blog").title("All Blog Posts")),

              S.listItem()
                .title("Categories")
                .schemaType("blogCategory")
                .child(
                  S.documentTypeList("blogCategory").title("Blog Categories"),
                ),

              S.listItem()
                .title("Authors")
                .schemaType("author")
                .child(S.documentTypeList("author").title("Authors")),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("About")
        .child(
          S.list()
            .title("About Section")
            .items([
              S.listItem().title("Company Timeline").child(
                S.editor()
                  .id("companyTimeline")
                  .schemaType("companyTimeline")
                  .documentId("companyTimeline"), // singleton ID
              ),
              S.listItem().title("Founding Members").child(
                S.editor()
                  .id("leadership")
                  .schemaType("leadership")
                  .documentId("leadership"), // singleton ID
              ),
            ]),
        ),

      // Include the rest of the document types automatically
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            "blog",
            "blogCategory",
            "author",
            "companyTimeline",
            "leadership",
          ].includes(listItem.getId() ?? ""),
      ),
    ]);
