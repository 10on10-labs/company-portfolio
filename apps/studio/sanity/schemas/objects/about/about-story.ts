import { defineField, defineType } from "sanity";

export const aboutStory = defineType({
  name: "aboutStory",
  title: "About Our Story",
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
      initialValue: "Our Story",
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

          const query = `!defined(*[_type == "aboutStory" && language == $language && !(_id in [$draft, $published])][0]._id)`;
          const isUnique = await client.fetch(query, params);

          return (
            isUnique ||
            `About story already exists for language: ${document.language}`
          );
        }),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "Brief description under the main title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "paragraphs",
      title: "Story Paragraphs",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      description: "Multiple paragraphs telling your company story",
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: "image",
      title: "Story Image",
      type: "image",
      options: { hotspot: true },
      description: "Optional image to accompany the story",
    }),
  ],
  preview: {
    select: {
      title: "sectionTitle",
      language: "language",
      subtitle: "subtitle",
    },
    prepare({ title, language, subtitle }) {
      const flag = language === "en" ? "🇺🇸" : language === "ar" ? "🇸🇦" : "🌍";
      const langLabel =
        language === "en"
          ? "EN"
          : language === "ar"
            ? "AR"
            : language || "Unknown";

      return {
        title: `${flag} ${title || "Our Story"}`,
        subtitle: `Singleton • ${langLabel}`,
      };
    },
  },
});
