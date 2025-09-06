import { defineField } from "sanity";

/**
 * Common validation utilities for internationalization
 */

/**
 * Creates a language field with proper validation for internationalized documents
 */
export const createLanguageField = () =>
  defineField({
    name: "language",
    type: "string",
    readOnly: true,
    hidden: true,
    validation: (Rule) => Rule.required(),
  });

/**
 * Creates a slug field with language-specific uniqueness validation
 * @param sourceField - The field to use as the source for the slug (default: "name")
 * @param documentType - The document type name for validation queries
 */
export const createUniqueSlugField = (
  sourceField: string = "name",
  documentType: string,
) =>
  defineField({
    name: "slug",
    title: "URL Slug",
    type: "slug",
    options: {
      source: sourceField,
      maxLength: 96,
      isUnique: async (value, context) => {
        const { getClient, document } = context;
        if (!document?.language) {
          return true;
        }
        const client = getClient({ apiVersion: "2023-04-24" });
        const id = document._id.replace("drafts.", "");
        const params = {
          draft: `drafts.${id}`,
          published: id,
          language: document.language,
          slug: value,
        };
        const query = `!defined(*[_type == "${documentType}" && language == $language && slug.current == $slug && !(_id in [$draft, $published])][0]._id)`;
        const isUnique = await client.fetch(query, params);
        return isUnique;
      },
    },
    validation: (Rule) => Rule.required(),
  });

/**
 * Creates an id field (for services) with language-specific uniqueness validation
 * @param sourceField - The field to use as the source for the id (default: "name")
 * @param documentType - The document type name for validation queries
 */
export const createUniqueIdField = (
  sourceField: string = "name",
  documentType: string,
) =>
  defineField({
    name: "id",
    title: "URL Slug",
    type: "slug",
    options: {
      source: sourceField,
      maxLength: 96,
      isUnique: async (value, context) => {
        const { getClient, document } = context;
        if (!document?.language) {
          return true;
        }
        const client = getClient({ apiVersion: "2023-04-24" });
        const id = document._id.replace("drafts.", "");
        const params = {
          draft: `drafts.${id}`,
          published: id,
          language: document.language,
          slug: value,
        };
        const query = `!defined(*[_type == "${documentType}" && language == $language && id.current == $slug && !(_id in [$draft, $published])][0]._id)`;
        const isUnique = await client.fetch(query, params);
        return isUnique;
      },
    },
    validation: (Rule) => Rule.required(),
  });

/**
 * Creates a field with custom validation to prevent duplicates per language
 * @param fieldName - The field name
 * @param fieldTitle - The field title
 * @param fieldType - The field type
 * @param documentType - The document type name for validation queries
 */
export const createUniquePerLanguageField = (
  fieldName: string,
  fieldTitle: string,
  fieldType: string,
  documentType: string,
) =>
  defineField({
    name: fieldName,
    title: fieldTitle,
    type: fieldType,
    validation: (Rule) =>
      Rule.required().custom(async (fieldValue, context) => {
        const { getClient, document } = context;
        if (!document?.language || !fieldValue) {
          return true;
        }
        const client = getClient({ apiVersion: "2023-04-24" });
        const id = document._id.replace("drafts.", "");
        const params = {
          draft: `drafts.${id}`,
          published: id,
          language: document.language,
          fieldValue,
        };
        const query = `!defined(*[_type == "${documentType}" && language == $language && ${fieldName} == $fieldValue && !(_id in [$draft, $published])][0]._id)`;
        const result = await client.fetch(query, params);
        return result
          ? true
          : `A ${fieldTitle.toLowerCase()} with this value already exists for this language`;
      }),
  });
