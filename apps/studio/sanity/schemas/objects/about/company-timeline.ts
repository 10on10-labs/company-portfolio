// ./documents/timeline.ts
import { defineField, defineType } from "sanity";

export const companyTimeline = defineType({
  name: "companyTimeline",
  title: "Timeline",
  type: "document",
  fields: [
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Timeline Title",
      type: "string",
      description: "E.g. Our Journey or Milestones",
      validation: (Rule) =>
        Rule.required().custom(async (title, context) => {
          const { getClient, document } = context;
          if (!document?.language || !title) return true;

          const client = getClient({ apiVersion: "2023-04-24" });
          const id = document._id.replace("drafts.", "");

          const params = {
            draft: `drafts.${id}`,
            published: id,
            language: document.language,
          };

          const query = `!defined(*[_type == "companyTimeline" && language == $language && !(_id in [$draft, $published])][0]._id)`;
          const isUnique = await client.fetch(query, params);

          return (
            isUnique ||
            `A company timeline already exists for language: ${document.language}`
          );
        }),
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
      language: "language",
    },
    prepare({ title, language }) {
      const flag = language === "en" ? "🇺🇸" : language === "ar" ? "🇸🇦" : "🌍";
      const langLabel =
        language === "en"
          ? "EN"
          : language === "ar"
            ? "AR"
            : language || "Unknown";

      return {
        title: `${flag} ${title || "Timeline"}`,
        subtitle: `Singleton • ${langLabel}`,
      };
    },
  },
});
