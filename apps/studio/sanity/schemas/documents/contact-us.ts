import { defineField, defineType } from "sanity";

export const contactUs = defineType({
  name: "contactUs",
  title: "Contact Us",
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
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        defineField({
          name: "badge",
          title: "Badge Text",
          type: "string",
          description:
            'Text shown in the badge (e.g., "We\'re online and ready to help")',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "title",
          title: "Main Title",
          type: "string",
          description: "The main hero title",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "subtitle",
          title: "Subtitle",
          type: "text",
          description: "The hero subtitle/description",
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
                    "Internal link or anchor (e.g., #get-started, /services)",
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
          name: "stats",
          title: "Statistics",
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
                    "Icon name from Lucide React (e.g., Users, Zap, Star, Globe2)",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "value",
                  title: "Value",
                  type: "string",
                  description: 'Statistic value (e.g., "500+", "24 Hours")',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "label",
                  title: "Label",
                  type: "string",
                  description: 'Statistic label (e.g., "Happy Clients")',
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: "value",
                  subtitle: "label",
                },
              },
            },
          ],
          validation: (Rule) => Rule.min(1).max(6),
        }),
      ],
    }),
    defineField({
      name: "contactSection",
      title: "Contact Section",
      type: "object",
      fields: [
        defineField({
          name: "badge",
          title: "Section Badge",
          type: "string",
          description: 'Badge text (e.g., "Get Started")',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "title",
          title: "Section Title",
          type: "string",
          description: "Main title for contact section",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "subtitle",
          title: "Section Subtitle",
          type: "text",
          description: "Subtitle for contact section",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "benefits",
          title: "Benefits List",
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
                    "Lucide icon name (e.g., Clock, Shield, MessageSquare, Calendar)",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "text",
                  title: "Benefit Text",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: "text",
                  subtitle: "icon",
                },
              },
            },
          ],
          validation: (Rule) => Rule.min(1).max(6),
        }),
        defineField({
          name: "tabSchedule",
          title: "Schedule Tab Text",
          type: "string",
          description: "Text for schedule tab button",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "tabMessage",
          title: "Message Tab Text",
          type: "string",
          description: "Text for message tab button",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "alternativeCtaSchedule",
          title: "Alternative CTA for Schedule",
          type: "string",
          description:
            "Text shown when message tab is active to switch to schedule",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "alternativeCtaMessage",
          title: "Alternative CTA for Message",
          type: "string",
          description:
            "Text shown when schedule tab is active to switch to message",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "alternativeCtaScheduleLink",
          title: "Alternative CTA Schedule Link Text",
          type: "string",
          description: "Link text for switching to schedule tab",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "alternativeCtaMessageLink",
          title: "Alternative CTA Message Link Text",
          type: "string",
          description: "Link text for switching to message tab",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "contactInfo",
      title: "Contact Information",
      type: "object",
      fields: [
        defineField({
          name: "methods",
          title: "Contact Methods",
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
                    "Lucide icon name (e.g., Mail, Phone, MapPin, Clock)",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "title",
                  title: "Method Title",
                  type: "string",
                  description: 'Contact method title (e.g., "Email", "Phone")',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "primary",
                  title: "Primary Text",
                  type: "string",
                  description:
                    "Main contact information (e.g., email address, phone number)",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "secondary",
                  title: "Secondary Text",
                  type: "string",
                  description:
                    'Additional info (e.g., "We reply within 24 hours")',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "action",
                  title: "Action Link",
                  type: "string",
                  description: "mailto:, tel:, or # for no action",
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: "title",
                  subtitle: "primary",
                },
              },
            },
          ],
          validation: (Rule) => Rule.min(1).max(6),
        }),
      ],
    }),
    defineField({
      name: "faq",
      title: "FAQ Section",
      type: "object",
      fields: [
        defineField({
          name: "sectionTitle",
          title: "Section Title",
          type: "string",
          description: "Main title for the FAQ section",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "sectionSubtitle",
          title: "Section Subtitle",
          type: "string",
          description: "Subtitle for the FAQ section",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "questions",
          title: "FAQ Questions",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "question",
                  title: "Question",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "answer",
                  title: "Answer",
                  type: "text",
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: "question",
                  subtitle: "answer",
                },
                prepare(selection) {
                  const { title, subtitle } = selection;
                  return {
                    title: title || "Untitled Question",
                    subtitle: subtitle
                      ? `${subtitle.substring(0, 60)}...`
                      : "No answer",
                  };
                },
              },
            },
          ],
          validation: (Rule) => Rule.min(1),
        }),
        defineField({
          name: "ctaSection",
          title: "CTA Section",
          type: "object",
          description: "Call-to-action section at the bottom of FAQ",
          fields: [
            defineField({
              name: "title",
              title: "CTA Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "CTA Description",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "buttonText",
              title: "Button Text",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "buttonLink",
              title: "Button Link",
              type: "string",
              description: "Link for the CTA button",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "object",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          description: "Page title for SEO",
          validation: (Rule) => Rule.required().max(60),
        }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          description: "Page description for SEO",
          validation: (Rule) => Rule.required().max(160),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "hero.title",
      subtitle: "language",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || "Contact Us",
        subtitle: subtitle
          ? `Language: ${subtitle.toUpperCase()}`
          : "No language set",
      };
    },
  },
});
