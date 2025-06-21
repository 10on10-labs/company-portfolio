import { sanityFetch } from '@/sanity/lib/live';
import { brandsQuery } from '@/sanity/lib/queries';

import HeroClient from './hero-client';

export default async function HeroSection() {
  const { data: brands } = await sanityFetch({ query: brandsQuery });
  return <HeroClient brands={brands} />;
}
