import { defineLive } from 'next-sanity';

import { sanityClient } from './client';
import { token } from './token';

export const { SanityLive, sanityFetch } = defineLive({
  //@ts-ignore
  client: sanityClient,
  serverToken: token,
  browserToken: token,
});
