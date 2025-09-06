import { defineField, defineType } from "sanity";
import { createLanguageField } from "../../../lib/validation";

export const aboutStats = defineType({
  name: "aboutStats",
  title: "About Statistics",
  type: "document",
  fields: [
    createLanguageField(),
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      description: "Not displayed, used for admin identification",
      initialValue: "Company Statistics",
      validation: (Rule) => Rule.required(),
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
