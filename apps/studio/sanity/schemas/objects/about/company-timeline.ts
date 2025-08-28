// ./documents/timeline.ts
import { defineField, defineType } from "sanity";

export const companyTimeline = defineType({
  name: "companyTimeline",
  title: "Timeline",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Timeline Title",
      type: "string",
      description: "E.g. Our Journey or Milestones",
    }),
    defineField({
      name: "subTitle",
      title: "Sub Title",
      type: "string",
      description: "E.g. Key milestones that shaped who we are today",
    }),
    defineField({
      name: "items",
      title: "Timeline Items",
      type: "array",
      of: [
        defineField({
          name: "timelineItem",
          title: "Timeline Item",
          type: "object",
          fields: [
            defineField({
              name: "year",
              title: "Year / Quarter",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "year",
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Timeline",
        subtitle: "Company Milestones",
      };
    },
  },
});
