import { defineType, defineField } from "sanity";

export const process = defineType({
  name: "process",
  title: "Process",
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
      name: "badge",
      title: "Badge Text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Main Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "steps",
      title: "Process Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "number",
              title: "Step Number",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              title: "Step Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Step Description",
              type: "text",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "tag",
              title: "Step Tag",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "number",
              description: "tag",
            },
            prepare({ title, subtitle, description }) {
              return {
                title: `${subtitle}: ${title}`,
                subtitle: description,
              };
            },
          },
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "progressLabel",
      title: "Progress Label Template",
      type: "string",
      description: "Use {current} and {total} as placeholders",
      initialValue: "Step {current} of {total}",
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
