import { defineField, defineType } from "sanity";

export const aboutStats = defineType({
  name: "aboutStats",
  title: "About Statistics",
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
      title: "Section Title",
      type: "string",
      description: "Not displayed, used for admin identification",
      initialValue: "Company Statistics",
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

          const query = `!defined(*[_type == "aboutStats" && language == $language && !(_id in [$draft, $published])][0]._id)`;
          const isUnique = await client.fetch(query, params);

          return (
            isUnique ||
            `About statistics already exists for language: ${document.language}`
          );
        }),
    }),
    defineField({
      name: "stats",
      title: "Statistics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "number",
              title: "Statistic Number",
              type: "string",
              description: "e.g., '10+', '95%'",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Statistic Label",
              type: "string",
              description: "e.g., 'Years Experience', 'Client Satisfaction'",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Award", value: "award" },
                  { title: "Target", value: "target" },
                  { title: "Users", value: "users" },
                  { title: "Rocket", value: "rocket" },
                  { title: "CheckCircle", value: "check-circle" },
                  { title: "Star", value: "star" },
                  { title: "Trophy", value: "trophy" },
                  { title: "Heart", value: "heart" },
                ],
              },
              initialValue: "award",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              number: "number",
              label: "label",
              icon: "icon",
            },
            prepare({ number, label, icon }) {
              return {
                title: `${number} - ${label}`,
                subtitle: `Icon: ${icon}`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      language: "language",
      statsCount: "stats",
    },
    prepare({ title, language, statsCount }) {
      const flag = language === "en" ? "🇺🇸" : language === "ar" ? "🇸🇦" : "🌍";
      const langLabel =
        language === "en"
          ? "EN"
          : language === "ar"
            ? "AR"
            : language || "Unknown";
      const count = Array.isArray(statsCount) ? statsCount.length : 0;

      return {
        title: `${flag} ${title || "Statistics"}`,
        subtitle: `Singleton • ${langLabel} • ${count} stats`,
      };
    },
  },
});
