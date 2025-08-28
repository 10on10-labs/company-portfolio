import { sanityClient } from '@company/sanity-shared/client';
import { token } from '@company/sanity-shared/token';
import { defineEnableDraftMode } from 'next-sanity/draft-mode';

export const { GET } = defineEnableDraftMode({
  client: sanityClient.withConfig({ token }),
});
