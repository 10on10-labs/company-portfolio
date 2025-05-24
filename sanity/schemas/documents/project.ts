import { DocumentIcon, ImageIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'slug',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'logoUrl',
      title: 'Logo URL',
      type: 'url',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'coverImages',
      title: 'Cover Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'string', title: 'ID' },
            { name: 'src', type: 'url', title: 'Image URL' },
            { name: 'alt', type: 'string', title: 'Alt Text' },
          ],
        },
      ],
    }),
    defineField({
      name: 'projectSections',
      title: 'Project Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'string', title: 'ID' },
            { name: 'name', type: 'string', title: 'Name' },
            { name: 'description', type: 'text', title: 'Description' },
            {
              name: 'images',
              type: 'array',
              title: 'Images',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'id', type: 'string', title: 'ID' },
                    { name: 'src', type: 'url', title: 'Image URL' },
                    { name: 'alt', type: 'string', title: 'Alt Text' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
});
