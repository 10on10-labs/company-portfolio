import { defineField, defineType } from "sanity";
import {
  createLanguageField,
  createUniquePerLanguageField,
} from "../../lib/validation";

export const pricing = defineType({
  name: "pricing",
  title: "Pricing Page",
  type: "document",
  fields: [
    createLanguageField(),
    createUniquePerLanguageField("title", "Page Title", "string", "pricing"),

    // Hero Section
    defineField({
      name: "heroSection",
      title: "Hero Section",
      type: "object",
      fields: [
        defineField({
          name: "badge",
          title: "Badge Text",
          type: "string",
          initialValue: "Transparent Pricing",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "title",
          title: "Main Title",
          type: "string",
          initialValue: "Simple, Flat Monthly Pricing",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
          initialValue:
            "No hidden costs, no hourly billing, no surprises. Just pure value delivered monthly. Save thousands compared to traditional agencies or in-house teams.",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "primaryButtonText",
          title: "Primary Button Text",
          type: "string",
          initialValue: "View Plans",
        }),
        defineField({
          name: "secondaryButtonText",
          title: "Secondary Button Text",
          type: "string",
          initialValue: "Book a Call",
        }),
      ],
    }),

    // Value Props Section
    defineField({
      name: "valuePropsSection",
      title: "Value Props Section",
      type: "object",
      fields: [
        defineField({
          name: "valueProps",
          title: "Value Propositions",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  options: {
                    list: [
                      { title: "Zap", value: "zap" },
                      { title: "Shield", value: "shield" },
                      { title: "Users", value: "users" },
                      { title: "Heart Handshake", value: "heart-handshake" },
                      { title: "Target", value: "target" },
                      { title: "Rocket", value: "rocket" },
                      { title: "CheckCircle", value: "check-circle" },
                      { title: "Star", value: "star" },
                    ],
                  },
                  initialValue: "zap",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 2,
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: "title",
                  subtitle: "description",
                  icon: "icon",
                },
                prepare({ title, subtitle, icon }) {
                  return {
                    title: title || "Untitled Value Prop",
                    subtitle: `Icon: ${icon} • ${subtitle?.slice(0, 50)}...`,
                  };
                },
              },
            },
          ],
          validation: (Rule) => Rule.required().min(1).max(6),
        }),
      ],
    }),

    // Pricing Plans Section
    defineField({
      name: "pricingPlansSection",
      title: "Pricing Plans Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Section Title",
          type: "string",
          initialValue: "Choose Your Plan",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "description",
          title: "Section Description",
          type: "text",
          rows: 2,
          initialValue:
            "All plans include unlimited requests, unlimited revisions, and daily updates. Scale up or down as your needs change.",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "plans",
          title: "Pricing Plans",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "name",
                  title: "Plan Name",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "price",
                  title: "Price",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "period",
                  title: "Billing Period",
                  type: "string",
                  initialValue: "/month",
                }),
                defineField({
                  name: "description",
                  title: "Plan Description",
                  type: "text",
                  rows: 2,
                }),
                defineField({
                  name: "isPopular",
                  title: "Mark as Popular",
                  type: "boolean",
                  initialValue: false,
                }),
                defineField({
                  name: "features",
                  title: "Features",
                  type: "array",
                  of: [{ type: "string" }],
                  validation: (Rule) => Rule.required().min(1),
                }),
                defineField({
                  name: "buttonText",
                  title: "Button Text",
                  type: "string",
                  initialValue: "Get Started",
                }),
              ],
              preview: {
                select: {
                  title: "name",
                  subtitle: "price",
                  isPopular: "isPopular",
                },
                prepare({ title, subtitle, isPopular }) {
                  return {
                    title: `${title}${isPopular ? " (Popular)" : ""}`,
                    subtitle: subtitle,
                  };
                },
              },
            },
          ],
        }),
      ],
    }),

    // Comparison Section
    defineField({
      name: "comparisonSection",
      title: "Comparison Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Section Title",
          type: "string",
          initialValue: "Why Choose Our Model?",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "description",
          title: "Section Description",
          type: "string",
          initialValue: "See how we compare to traditional alternatives",
        }),
        defineField({
          name: "comparisons",
          title: "Comparisons",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "feature",
                  title: "Feature",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "us",
                  title: "Our Advantage",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "them",
                  title: "Alternative",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: "feature",
                  subtitle: "us",
                },
              },
            },
          ],
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
    }),

    // FAQs Section
    defineField({
      name: "faqsSection",
      title: "FAQs Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Section Title",
          type: "string",
          initialValue: "Frequently Asked Questions",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "faqs",
          title: "FAQs",
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
                  rows: 4,
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: "question",
                  subtitle: "answer",
                },
                prepare({ title, subtitle }) {
                  return {
                    title: title || "Untitled FAQ",
                    subtitle: subtitle?.slice(0, 80) + "...",
                  };
                },
              },
            },
          ],
          validation: (Rule) => Rule.required().min(1),
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
          name: "title",
          title: "CTA Title",
          type: "string",
          initialValue: "Ready to Get Started?",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "description",
          title: "CTA Description",
          type: "text",
          rows: 2,
          initialValue:
            "Join hundreds of companies that have simplified their design and development process",
        }),
        defineField({
          name: "primaryButtonText",
          title: "Primary Button Text",
          type: "string",
          initialValue: "Start Your 7-Day Trial",
        }),
        defineField({
          name: "secondaryButtonText",
          title: "Secondary Button Text",
          type: "string",
          initialValue: "View Case Studies",
        }),
        defineField({
          name: "disclaimer",
          title: "Disclaimer Text",
          type: "string",
          initialValue:
            "No credit card required • Cancel anytime • 7-day money-back guarantee",
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
        title: `${flag} ${title || "Pricing Page"}`,
        subtitle: `Singleton • ${langLabel}`,
      };
    },
  },
});
