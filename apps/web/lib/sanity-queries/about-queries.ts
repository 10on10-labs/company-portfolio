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

export const companyLeadershipQuery = defineQuery(`
 *[_type == "leadership"][0] {
   title,
   subTitle,
   members[] {
    name,
    designation,
    portfolioUrl,
    image
  }
 }
 `);
