import { defineQuery } from 'next-sanity';

// Get about hero section for specific language
export const aboutHeroQuery = defineQuery(`
 *[_type == "aboutHero" && language == $language][0] {
   _id,
   language,
   tagline,
   title,
   description
 }
`);

// Get about mission & vision for specific language
export const aboutMissionVisionQuery = defineQuery(`
 *[_type == "aboutMissionVision" && language == $language][0] {
   _id,
   language,
   mission {
     title,
     description
   },
   vision {
     title,
     description
   }
 }
`);

// Get about statistics for specific language
export const aboutStatsQuery = defineQuery(`
 *[_type == "aboutStats" && language == $language][0] {
   _id,
   language,
   stats[] {
     number,
     label,
     icon
   }
 }
`);

// Get about story for specific language
export const aboutStoryQuery = defineQuery(`
 *[_type == "aboutStory" && language == $language][0] {
   _id,
   language,
   sectionTitle,
   subtitle,
   paragraphs,
   image
 }
`);

// Get about values for specific language
export const aboutValuesQuery = defineQuery(`
 *[_type == "aboutValues" && language == $language][0] {
   _id,
   language,
   sectionTitle,
   subtitle,
   values[] {
     title,
     description,
     icon
   }
 }
`);

// Get about CTA for specific language
export const aboutCTAQuery = defineQuery(`
 *[_type == "aboutCTA" && language == $language][0] {
   _id,
   language,
   title,
   description,
   buttonText
 }
`);

// Get company timeline for specific language
export const companyTimelineQuery = defineQuery(`
 *[_type == "companyTimeline" && language == $language][0] {
   _id,
   language,
   title,
   subTitle,
   items[] {
     year,
     title,
     description
   }
 }
`);

// Get leadership for specific language
export const companyLeadershipQuery = defineQuery(`
 *[_type == "leadership" && language == $language][0] {
   _id,
   language,
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
