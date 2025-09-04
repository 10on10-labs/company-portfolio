import { defineField, defineType } from "sanity";

export const aboutCTA = defineType({
  name: "aboutCTA",
  title: "About Call to Action",
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
      title: "CTA Title",
      type: "string",
      description: "Main call-to-action heading",
      initialValue: "Ready to Start Your Project?",
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

          const query = `!defined(*[_type == "aboutCTA" && language == $language && !(_id in [$draft, $published])][0]._id)`;
          const isUnique = await client.fetch(query, params);

          return (
            isUnique ||
            `About CTA already exists for language: ${document.language}`
          );
        }),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      description: "Supporting text for the CTA",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      initialValue: "Get in Touch",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      language: "language",
      buttonText: "buttonText",
    },
    prepare({ title, language, buttonText }) {
      const flag = language === "en" ? "🇺🇸" : language === "ar" ? "🇸🇦" : "🌍";
      const langLabel =
        language === "en"
          ? "EN"
          : language === "ar"
            ? "AR"
            : language || "Unknown";

      return {
        title: `${flag} ${title || "CTA Section"}`,
        subtitle: `Singleton • ${langLabel} • Button: "${buttonText}"`,
      };
    },
  },
});
