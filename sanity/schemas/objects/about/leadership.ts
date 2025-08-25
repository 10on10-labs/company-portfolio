// ./documents/leadership.ts
import { defineField, defineType } from 'sanity';

export const leadership = defineType({
  name: 'leadership',
  title: 'Leadership',
  type: 'document',
  // removes "create" & "delete" in Studio (singleton)
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'members',
      title: 'Leadership Members',
      type: 'array',
      of: [
        defineField({
          name: 'leader',
          title: 'Leader',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'designation',
              title: 'Designation',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'designation',
              media: 'image',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Leadership',
        subtitle: 'Singleton',
      };
    },
  },
});
