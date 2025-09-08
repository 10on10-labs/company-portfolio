import { defineField, defineType } from "sanity";
import { createLanguageField, createUniqueIdField } from "../../lib/validation";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    createLanguageField(),
    defineField({
      name: "name",
      title: "Service Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    createUniqueIdField("name", "service"),
    defineField({
      name: "shortDescription",
      title: "Short Description (for cards)",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(200),
      description: "Brief description shown on service cards",
    }),
    defineField({
      name: "description",
      title: "Full Description",
      type: "text",
      rows: 5,
      description: "Detailed description for the service page",
    }),
    defineField({
      name: "categories",
      title: "Service Categories/Technologies",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "Technologies or categories shown as bullet points",
    }),
    defineField({
      name: "icon",
      title: "Service Icon",
      type: "string",
      options: {
        list: [
          { title: "Monitor", value: "monitor" },
          { title: "Code", value: "code" },
          { title: "Mobile", value: "smartphone" },
          { title: "Database", value: "database" },
          { title: "Cloud", value: "cloud" },
          { title: "Shield", value: "shield" },
          { title: "Chart", value: "chart" },
          { title: "Palette", value: "palette" },
          { title: "Rocket", value: "rocket" },
          { title: "Settings", value: "settings" },
        ],
      },
      initialValue: "code",
    }),

    // Hero Section
    defineField({
      name: "heroSection",
      title: "Hero Section",
      type: "object",
      fields: [
        defineField({
          name: "tagline",
          title: "Tagline",
          type: "string",
          description: 'e.g., "Frontend Engineering Excellence"',
        }),
        defineField({
          name: "headline",
          title: "Headline",
          type: "string",
          description: "Main heading for the service page",
        }),
        defineField({
          name: "subheadline",
          title: "Subheadline",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "primaryButtonText",
          title: "Primary Button Text",
          type: "string",
          initialValue: "Start Your Project",
        }),
        defineField({
          name: "secondaryButtonText",
          title: "Secondary Button Text",
          type: "string",
          initialValue: "View Our Work",
        }),
      ],
    }),

    // Features Section Content
    defineField({
      name: "featuresSection",
      title: "Features Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Section Title",
          type: "string",
          initialValue: "Why Choose Our Service",
        }),
        defineField({
          name: "description",
          title: "Section Description",
          type: "text",
          rows: 2,
          initialValue:
            "We combine technical expertise with creative vision to deliver outstanding solutions",
        }),
      ],
    }),

    // Technologies Section Content
    defineField({
      name: "technologiesSection",
      title: "Technologies Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Section Title",
          type: "string",
          initialValue: "Technologies We Master",
        }),
        defineField({
          name: "description",
          title: "Section Description",
          type: "text",
          rows: 2,
          initialValue:
            "Leveraging cutting-edge technologies to build modern applications",
        }),
      ],
    }),

    // Process Section Content
    defineField({
      name: "processSection",
      title: "Process Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Section Title",
          type: "string",
          initialValue: "Our Development Process",
          description: "Main heading for the process section",
        }),
        defineField({
          name: "description",
          title: "Section Description",
          type: "text",
          rows: 2,
          initialValue:
            "A proven methodology that ensures project success from concept to deployment",
          description: "Description text below the title",
        }),
        defineField({
          name: "processSteps",
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
                  description: 'e.g., "01", "02"',
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
                  rows: 2,
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: "title",
                  subtitle: "number",
                },
                prepare({ title, subtitle }) {
                  return {
                    title: `${subtitle}. ${title}`,
                    subtitle: "Process Step",
                  };
                },
              },
            },
          ],
        }),
      ],
    }),

    // Features Section
    defineField({
      name: "features",
      title: "Service Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Feature Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Feature Description",
              type: "text",
              rows: 2,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Code", value: "code" },
                  { title: "Zap", value: "zap" },
                  { title: "Users", value: "users" },
                  { title: "Palette", value: "palette" },
                  { title: "Shield", value: "shield" },
                  { title: "Gauge", value: "gauge" },
                  { title: "GitBranch", value: "gitbranch" },
                  { title: "Globe", value: "globe" },
                  { title: "Smartphone", value: "smartphone" },
                  { title: "Rocket", value: "rocket" },
                ],
              },
              initialValue: "code",
            }),
          ],
        },
      ],
    }),

    // Technology Stack
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

    // Benefits List
    defineField({
      name: "benefits",
      title: "Service Benefits",
      type: "array",
      of: [{ type: "string" }],
      description: "List of benefits shown with checkmarks",
    }),

    // Why Choose Us Section
    defineField({
      name: "whyChooseUs",
      title: "Why Choose Us",
      type: "object",
      fields: [
        defineField({
          name: "headline",
          title: "Section Headline",
          type: "string",
          initialValue: "Why teams choose 10on10 Labs",
        }),
        defineField({
          name: "description",
          title: "Section Description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "reasons",
          title: "Reasons",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Reason Title",
                  type: "string",
                }),
                defineField({
                  name: "description",
                  title: "Reason Description",
                  type: "text",
                  rows: 2,
                }),
                defineField({
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  options: {
                    list: [
                      { title: "Users", value: "users" },
                      { title: "Zap", value: "zap" },
                      { title: "Shield", value: "shield" },
                      { title: "Code", value: "code" },
                      { title: "Rocket", value: "rocket" },
                    ],
                  },
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // CTA Section
    defineField({
      name: "ctaSection",
      title: "Call to Action Section",
      type: "object",
      fields: [
        defineField({
          name: "headline",
          title: "CTA Headline",
          type: "string",
          initialValue: "Ready to Build Something Amazing?",
        }),
        defineField({
          name: "description",
          title: "CTA Description",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "primaryButtonText",
          title: "Primary Button Text",
          type: "string",
          initialValue: "Get Started Today",
        }),
        defineField({
          name: "secondaryButtonText",
          title: "Secondary Button Text",
          type: "string",
          initialValue: "Explore All Services",
        }),
      ],
    }),

    // SEO
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "object",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
        }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 2,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "shortDescription",
    },
  },
});
