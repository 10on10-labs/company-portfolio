import { defineField, defineType } from "sanity";

export const aboutMissionVision = defineType({
  name: "aboutMissionVision",
  title: "About Mission & Vision",
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
      initialValue: "Mission & Vision",
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

          const query = `!defined(*[_type == "aboutMissionVision" && language == $language && !(_id in [$draft, $published])][0]._id)`;
          const isUnique = await client.fetch(query, params);

          return (
            isUnique ||
            `An about mission & vision already exists for language: ${document.language}`
          );
        }),
    }),
    defineField({
      name: "mission",
      title: "Mission",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Mission Title",
          type: "string",
          initialValue: "Our Mission",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "description",
          title: "Mission Description",
          type: "text",
          rows: 4,
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "vision",
      title: "Vision",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Vision Title",
          type: "string",
          initialValue: "Our Vision",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "description",
          title: "Vision Description",
          type: "text",
          rows: 4,
          validation: (Rule) => Rule.required(),
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
        title: `${flag} ${title || "Mission & Vision"}`,
        subtitle: `Singleton • ${langLabel}`,
      };
    },
  },
});
