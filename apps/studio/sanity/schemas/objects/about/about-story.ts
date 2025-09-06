import { defineField, defineType } from "sanity";
import { createLanguageField } from "../../../lib/validation";

export const aboutStory = defineType({
  name: "aboutStory",
  title: "About Our Story",
  type: "document",
  fields: [
    createLanguageField(),
    defineField({
      name: "sectionTitle",
      title: "Section Title",
      type: "string",
      description: "Main section heading",
      initialValue: "Our Story",
      validation: (Rule) => Rule.required(),
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
