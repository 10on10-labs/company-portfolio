import { defineType, defineField } from "sanity";

export const accelerate = defineType({
  name: "accelerate",
  title: "Accelerate Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Arabic", value: "ar" },
        ],
        layout: "radio",
      },
      initialValue: "en",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Main Heading",
      type: "string",
      description:
        'The static text that appears before the rotating services (e.g., "Let us accelerate your")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "services",
      title: "Services List",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
      description: "List of services that will rotate in the animation",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "language",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: `Language: ${subtitle?.toUpperCase()}`,
      };
    },
  },
});
