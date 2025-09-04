import { defineField, defineType } from "sanity";

export const aboutHero = defineType({
  name: "aboutHero",
  title: "About Hero Section",
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
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "e.g., 'About Us'",
      validation: (Rule) =>
        Rule.required().custom(async (tagline, context) => {
          const { getClient, document } = context;
          if (!document?.language || !tagline) return true;

          const client = getClient({ apiVersion: "2023-04-24" });
          const id = document._id.replace("drafts.", "");

          const params = {
            draft: `drafts.${id}`,
            published: id,
            language: document.language,
          };

          const query = `!defined(*[_type == "aboutHero" && language == $language && !(_id in [$draft, $published])][0]._id)`;
          const isUnique = await client.fetch(query, params);

          return (
            isUnique ||
            `An about hero section already exists for language: ${document.language}`
          );
        }),
    }),
    defineField({
      name: "title",
      title: "Main Title",
      type: "string",
      description: "Main headline for the hero section",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Supporting text below the title",
      validation: (Rule) => Rule.required(),
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
        title: `${flag} ${title || "About Hero"}`,
        subtitle: `Singleton • ${langLabel}`,
      };
    },
  },
});
