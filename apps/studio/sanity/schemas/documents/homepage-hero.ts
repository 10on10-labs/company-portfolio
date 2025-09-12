import { defineField, defineType } from "sanity";

export const homepageHero = defineType({
  name: "homepageHero",
  title: "Homepage Hero",
  type: "document",
  fields: [
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Main Title",
      type: "string",
      description:
        'The main hero title (e.g., "UI/UX & Frontend Development as a Service")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: 'The hero subtitle (e.g., "The 10/10 Digital Product.")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "The hero description paragraph",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaButtons",
      title: "CTA Buttons",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "text",
              title: "Button Text",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "link",
              title: "Button Link",
              type: "string",
              description:
                "Internal link (e.g., /services, /pricing, /contact-us)",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "variant",
              title: "Button Variant",
              type: "string",
              options: {
                list: [
                  { title: "Primary", value: "primary" },
                  { title: "Secondary", value: "secondary" },
                  { title: "Outline", value: "outline" },
                ],
              },
              initialValue: "primary",
            }),
          ],
          preview: {
            select: {
              title: "text",
              subtitle: "link",
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(3),
    }),
    defineField({
      name: "expertiseSection",
      title: "Expertise Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Section Title",
          type: "string",
          initialValue: "Our Expertise",
        }),
        defineField({
          name: "subtitle",
          title: "Section Subtitle",
          type: "string",
          initialValue: "Building digital excellence with proven expertise",
        }),
      ],
    }),
    defineField({
      name: "trustedByText",
      title: "Trusted By Text",
      type: "string",
      description: "Text shown above the brands carousel",
      initialValue: "Trusted by forward-thinking brands:",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "language",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || "Homepage Hero",
        subtitle: subtitle
          ? `Language: ${subtitle.toUpperCase()}`
          : "No language set",
      };
    },
  },
});
