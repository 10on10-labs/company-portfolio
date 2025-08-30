import { sanityClient } from '@company/sanity-shared/client';
import { token } from '@company/sanity-shared/token';
import { defineLive } from 'next-sanity';

export const { SanityLive, sanityFetch } = defineLive({
  //@ts-ignore
  client: sanityClient,
  serverToken: token,
  browserToken: token,
});
