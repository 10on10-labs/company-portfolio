import { type SchemaTypeDefinition } from "sanity";
import { StructureResolver } from "sanity/structure";

import { blockContent } from "./block-content";
import {
  author,
  blog,
  blogCategory,
  brand,
  project,
  process,
  accelerate,
  homepageHero,
} from "./documents";
import { service } from "./documents/service";
import { testimonial } from "./documents/testimonial";
import { pricing } from "./documents/pricing";
import { duration } from "./objects";
import {
  companyTimeline,
  leadership,
  aboutHero,
  aboutMissionVision,
  aboutStats,
  aboutStory,
  aboutValues,
  aboutCTA,
} from "./objects/about";

export const sanitySchema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContent,
    companyTimeline,
    leadership,
    aboutHero,
    aboutMissionVision,
    aboutStats,
    aboutStory,
    aboutValues,
    aboutCTA,
    blog,
    blogCategory,
    author,
    project,
    brand,
    service,
    testimonial,
    pricing,
    process,
    accelerate,
    homepageHero,
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
              S.listItem()
                .title("Hero Section")
                .schemaType("aboutHero")
                .child(
                  S.documentTypeList("aboutHero").title("About Hero Section"),
                ),
              S.listItem()
                .title("Mission & Vision")
                .schemaType("aboutMissionVision")
                .child(
                  S.documentTypeList("aboutMissionVision").title(
                    "Mission & Vision",
                  ),
                ),
              S.listItem()
                .title("Statistics")
                .schemaType("aboutStats")
                .child(
                  S.documentTypeList("aboutStats").title("Company Statistics"),
                ),
              S.listItem()
                .title("Our Story")
                .schemaType("aboutStory")
                .child(S.documentTypeList("aboutStory").title("Company Story")),
              S.listItem()
                .title("Company Timeline")
                .schemaType("companyTimeline")
                .child(
                  S.documentTypeList("companyTimeline").title(
                    "Company Timeline",
                  ),
                ),
              S.listItem()
                .title("Leadership")
                .schemaType("leadership")
                .child(
                  S.documentTypeList("leadership").title("Leadership Team"),
                ),
              S.listItem()
                .title("Core Values")
                .schemaType("aboutValues")
                .child(
                  S.documentTypeList("aboutValues").title("Company Values"),
                ),
              S.listItem()
                .title("Call to Action")
                .schemaType("aboutCTA")
                .child(
                  S.documentTypeList("aboutCTA").title("About CTA Section"),
                ),
            ]),
        ),

      S.divider(),
      S.listItem()
        .title("Pricing")
        .schemaType("pricing")
        .child(S.documentTypeList("pricing").title("Pricing Page")),

      S.divider(),
      S.listItem()
        .title("Process")
        .schemaType("process")
        .child(S.documentTypeList("process").title("Process Section")),

      S.divider(),
      S.listItem()
        .title("Accelerate Section")
        .schemaType("accelerate")
        .child(S.documentTypeList("accelerate").title("Accelerate Section")),

      S.divider(),
      S.listItem()
        .title("Homepage Hero")
        .schemaType("homepageHero")
        .child(S.documentTypeList("homepageHero").title("Homepage Hero Content")),

      // Include the rest of the document types automatically
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            "blog",
            "blogCategory",
            "author",
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
          ].includes(listItem.getId() ?? ""),
      ),
    ]);
