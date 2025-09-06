import { defineField, defineType } from "sanity";
import {
  createLanguageField,
  createUniquePerLanguageField,
} from "../../../lib/validation";

export const aboutMissionVision = defineType({
  name: "aboutMissionVision",
  title: "About Mission & Vision",
  type: "document",
  fields: [
    createLanguageField(),
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      description: "Not displayed, used for admin identification",
      initialValue: "Mission & Vision",
      validation: (Rule) => Rule.required(),
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
