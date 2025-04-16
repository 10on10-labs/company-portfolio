import { sanityFetch } from '@/sanity/lib/live';
import { homePageQuery } from '@/sanity/lib/queries';

import { HomePage } from '@/components/HomePage';

export default async function IndexRoute() {
  const { data } = await sanityFetch({ query: homePageQuery });

  if (!data) {
    return (
      <div className="text-center text-primary">
       <p className="text-primary">TEST color</p>
      </div>
    );
  }

  return <HomePage data={data} />;
}
