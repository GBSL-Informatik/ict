import { createDirectus, authentication, rest } from '@directus/sdk';

const client = createDirectus('https://directus.gbsl.website').with(rest());

export default client;
