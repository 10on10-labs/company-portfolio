import { StarRatingInput } from "../../components/star-rating-input";
import { defineField, defineType } from "sanity";
import { createLanguageField } from "../../lib/validation";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    createLanguageField(),
    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Client Role",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "testimonial",
      title: "Testimonial",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "clientImage",
      title: "Client Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "rating",
      type: "number",
      components: {
        input: StarRatingInput,
      },
      validation: (Rule) => Rule.min(1).max(5).integer().required(),
    }),
  ],
  preview: {
    select: {
      title: "clientName",
      subtitle: "role",
      language: "language",
      media: "clientImage",
    },
    prepare(selection) {
      const { language } = selection;
      return {
        ...selection,
        subtitle: `${language?.toUpperCase() || "EN"} - ${selection.subtitle}`,
      };
    },
  },
});
