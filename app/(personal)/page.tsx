import Link from 'next/link';
import { studioUrl } from '@/sanity/lib/api';
import { sanityFetch } from '@/sanity/lib/live';
import { homePageQuery } from '@/sanity/lib/queries';

import { HomePage } from '@/components/HomePage';

export default async function IndexRoute() {
  const { data } = await sanityFetch({ query: homePageQuery });

  if (!data) {
    return (
      <div className="text-center">
        You don&rsquo;t have a homepage yet,{' '}
        <Link href={`${studioUrl}/structure/home`} className="underline">
          create one now
        </Link>
        !
      </div>
    );
  }

  return <HomePage data={data} />;
}
