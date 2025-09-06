import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { createLanguageField } from "../../../lib/validation";

export const blog = defineType({
  name: "blog",
  title: "Blog",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    createLanguageField(),
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      validation: (rule) => rule.required(),
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "subTitle",
      type: "string",
    }),
    defineField({
      name: "author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "thumbnail",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
    defineField({
      name: "blogCategories",
      type: "array",
      of: [
        defineArrayMember({ type: "reference", to: { type: "blogCategory" } }),
      ],
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
    defineField({
      name: "body",
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      language: "language",
      media: "thumbnail",
    },
    prepare(selection) {
      const { author, language } = selection;
      return {
        ...selection,
        subtitle: `${language?.toUpperCase() || "EN"} - ${author ? `by ${author}` : "No author"}`,
      };
    },
  },
});
