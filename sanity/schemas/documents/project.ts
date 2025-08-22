import { DocumentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      validation: rule => rule.required(),
      options: {
        source: 'name',
      },
    }),
    defineField({
      name: 'description',
      type: 'text',
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
      name: 'url',
      title: 'URL (optional)',
      type: 'url',
    }),
    defineField({
      name: 'projectDimensions',
      title: 'Project Dimensions',
      type: 'object',
      fields: [
        defineField({
          name: 'timeline',
          title: 'Timeline',
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'number',
            }),
            defineField({
              name: 'unit',
              title: 'Unit',
              type: 'string',
              options: {
                list: [
                  { title: 'Week(s)', value: 'Week(s)' },
                  { title: 'Month(s)', value: 'Month(s)' },
                  { title: 'Year(s)', value: 'Year(s)' },
                ],
                layout: 'radio', // bullet/radio style
              },
            }),
          ],
        }),
        defineField({
          name: 'teamSize',
          title: 'Team Size',
          type: 'number',
        }),
        defineField({
          name: 'iterations',
          title: 'Iterations',
          type: 'number',
        }),
        defineField({
          name: 'technologies',
          title: 'Technologies',
          type: 'number',
        }),
      ],
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
