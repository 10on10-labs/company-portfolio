import { defineField, defineType } from "sanity";
import { createLanguageField } from "../../../lib/validation";

export const aboutCTA = defineType({
  name: "aboutCTA",
  title: "About Call to Action",
  type: "document",
  fields: [
    createLanguageField(),
    defineField({
      name: "title",
      title: "CTA Title",
      type: "string",
      description: "Main call-to-action heading",
      initialValue: "Ready to Start Your Project?",
      validation: (Rule) => Rule.required(),
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
