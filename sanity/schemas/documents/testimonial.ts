import { defineField, defineType } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'text',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'clientImage',
      title: 'Client Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
});
