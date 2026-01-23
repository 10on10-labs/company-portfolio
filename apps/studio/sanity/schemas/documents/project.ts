import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import {
  createLanguageField,
  createUniqueSlugField,
} from "../../lib/validation";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: DocumentIcon,
  fields: [
    createLanguageField(),
    defineField({
      name: "priority",
      title: "Priority",
      type: "number",
      description: "Lower numbers appear first (e.g., 1 = highest priority)",
      validation: (rule) => rule.required().min(1),
      initialValue: 10,
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    createUniqueSlugField("name", "project"),
    defineField({
      name: "description",
      type: "text",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "technologies",
      title: "Technology Stack",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Technology Name",
              type: "string",
            }),
            defineField({
              name: "icon",
              title: "Icon/Emoji",
              type: "string",
              description: "Emoji or icon identifier (e.g., ⚛️ for React)",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "services",
      title: "Related Services",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "service" }],
        },
      ],
      description: "Services this project is related to",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL (optional)",
      type: "url",
    }),
    defineField({
      name: "projectDimensions",
      title: "Project Dimensions",
      type: "object",
      fields: [
        defineField({
          name: "timeline",
          title: "Timeline",
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Value",
              type: "number",
            }),
            defineField({
              name: "unit",
              title: "Unit",
              type: "string",
              options: {
                list: [
                  { title: "Week(s)", value: "Week(s)" },
                  { title: "Month(s)", value: "Month(s)" },
                  { title: "Year(s)", value: "Year(s)" },
                ],
                layout: "radio", // bullet/radio style
              },
            }),
          ],
        }),
        defineField({
          name: "teamSize",
          title: "Team Size",
          type: "number",
        }),
        defineField({
          name: "iterations",
          title: "Iterations",
          type: "number",
        }),
        defineField({
          name: "technologies",
          title: "Technologies",
          type: "number",
        }),
      ],
    }),
    defineField({
      name: "coverImages",
      title: "Cover Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
              validation: (rule) => rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: "projectSections",
      title: "Project Sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "id",
              type: "string",
              title: "ID",
              validation: (rule) => rule.required(),
            },
            {
              name: "name",
              type: "string",
              title: "Name",
              validation: (rule) => rule.required(),
            },
            {
              name: "description",
              type: "blockContent",
              title: "Description",
              validation: (rule) => rule.required(),
            },
            {
              name: "images",
              type: "array",
              title: "Images",
              of: [
                {
                  type: "image",
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    {
                      name: "alt",
                      type: "string",
                      title: "Alt Text",
                      validation: (rule) => rule.required(),
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "pageContent",
      title: "Page Content",
      type: "object",
      fields: [
        defineField({
          name: "keyFeatures",
          title: "Key Features Section",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Section Title",
              type: "string",
              description: "Title for the key features section",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "subtitle",
              title: "Section Subtitle",
              type: "text",
              description: "Subtitle for the key features section",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "features",
              title: "Features List",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "icon",
                      title: "Icon",
                      type: "string",
                      description:
                        "Lucide icon name (e.g., Code2, Palette, Zap, Users)",
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: "label",
                      title: "Feature Label",
                      type: "string",
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: "value",
                      title: "Feature Value",
                      type: "string",
                      validation: (rule) => rule.required(),
                    }),
                  ],
                  preview: {
                    select: {
                      title: "label",
                      subtitle: "value",
                    },
                  },
                },
              ],
              validation: (rule) => rule.min(1).max(6),
            }),
          ],
        }),
        defineField({
          name: "projectShowcase",
          title: "Project Showcase Section",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Section Title",
              type: "string",
              description: "Title for the project showcase section",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "subtitle",
              title: "Section Subtitle",
              type: "text",
              description: "Subtitle for the project showcase section",
              validation: (rule) => rule.required(),
            }),
          ],
        }),
        defineField({
          name: "callToAction",
          title: "Call to Action Section",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "CTA Title",
              type: "string",
              description: "Main title for the CTA section",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "subtitle",
              title: "CTA Subtitle",
              type: "text",
              description: "Subtitle for the CTA section",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "primaryButtonText",
              title: "Primary Button Text",
              type: "string",
              description: "Text for the primary button (Start Project)",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "secondaryButtonText",
              title: "Secondary Button Text",
              type: "string",
              description:
                "Text for the secondary button (View More Case Studies)",
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      priority: "priority",
      language: "language",
      media: "logo",
    },
    prepare(selection) {
      const { title, subtitle, priority, language, media } = selection;
      const flag = language === "en" ? "🇺🇸" : language === "ar" ? "🇸🇦" : "🌍";
      const langLabel =
        language === "en"
          ? "EN"
          : language === "ar"
            ? "AR"
            : language || "Unknown";

      return {
        title: `${flag} ${priority ? `[${priority}] ` : ""}${title}`,
        subtitle: `${subtitle} • ${langLabel}`,
        media,
      };
    },
  },
});
