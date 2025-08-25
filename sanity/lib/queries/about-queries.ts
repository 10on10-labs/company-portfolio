import { defineQuery } from 'next-sanity';

export const companyTimelineQuery = defineQuery(`
 *[_type == "companyTimeline"][0] {
   title,
   subTitle,
   items[] {
     year,
     title,
     description
   }
 }
`);
