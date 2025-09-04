import { defineField, defineType } from "sanity";

export const aboutValues = defineType({
  name: "aboutValues",
  title: "About Core Values",
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
      name: "sectionTitle",
      title: "Section Title",
      type: "string",
      description: "Main section heading",
      initialValue: "Our Core Values",
      validation: (Rule) =>
        Rule.required().custom(async (sectionTitle, context) => {
          const { getClient, document } = context;
          if (!document?.language || !sectionTitle) return true;

          const client = getClient({ apiVersion: "2023-04-24" });
          const id = document._id.replace("drafts.", "");

          const params = {
            draft: `drafts.${id}`,
            published: id,
            language: document.language,
          };

          const query = `!defined(*[_type == "aboutValues" && language == $language && !(_id in [$draft, $published])][0]._id)`;
          const isUnique = await client.fetch(query, params);

          return (
            isUnique ||
            `About values already exists for language: ${document.language}`
          );
        }),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "Brief description under the main title",
      initialValue: "The principles that guide everything we do",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "values",
      title: "Core Values",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Value Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Value Description",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Award", value: "award" },
                  { title: "Users", value: "users" },
                  { title: "CheckCircle", value: "check-circle" },
                  { title: "Rocket", value: "rocket" },
                  { title: "Target", value: "target" },
                  { title: "Heart", value: "heart" },
                  { title: "Shield", value: "shield" },
                  { title: "Star", value: "star" },
                  { title: "Lightbulb", value: "lightbulb" },
                  { title: "Globe", value: "globe" },
                ],
              },
              initialValue: "award",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
              description: "description",
              icon: "icon",
            },
            prepare({ title, description, icon }) {
              return {
                title: title || "Untitled Value",
                subtitle: `Icon: ${icon} • ${description?.slice(0, 60)}...`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(6),
    }),
  ],
  preview: {
    select: {
      title: "sectionTitle",
      language: "language",
      valuesCount: "values",
    },
    prepare({ title, language, valuesCount }) {
      const flag = language === "en" ? "🇺🇸" : language === "ar" ? "🇸🇦" : "🌍";
      const langLabel =
        language === "en"
          ? "EN"
          : language === "ar"
            ? "AR"
            : language || "Unknown";
      const count = Array.isArray(valuesCount) ? valuesCount.length : 0;

      return {
        title: `${flag} ${title || "Core Values"}`,
        subtitle: `Singleton • ${langLabel} • ${count} values`,
      };
    },
  },
});
