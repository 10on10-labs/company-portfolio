import { defineField, defineType } from "sanity";
import {
  createLanguageField,
  createUniquePerLanguageField,
} from "../../../lib/validation";

export const aboutHero = defineType({
  name: "aboutHero",
  title: "About Hero Section",
  type: "document",
  fields: [
    createLanguageField(),
    createUniquePerLanguageField("tagline", "Tagline", "string", "aboutHero"),
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
