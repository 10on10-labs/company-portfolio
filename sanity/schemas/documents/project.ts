import { DocumentIcon } from '@sanity/icons';
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
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'coverImages',
      title: 'Cover Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              validation: rule => rule.required(),
            },
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
            {
              name: 'id',
              type: 'string',
              title: 'ID',
              validation: rule => rule.required(),
            },
            {
              name: 'name',
              type: 'string',
              title: 'Name',
              validation: rule => rule.required(),
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
              validation: rule => rule.required(),
            },
            {
              name: 'images',
              type: 'array',
              title: 'Images',
              of: [
                {
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    {
                      name: 'alt',
                      type: 'string',
                      title: 'Alt Text',
                      validation: rule => rule.required(),
                    },
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
