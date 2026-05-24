import { createDirectus, authentication, rest } from '@directus/sdk';
import siteConfig from '@generated/docusaurus.config';
import { type DirectusConfig } from '..';
const {
    tdevConfig: { directus: Config }
} = siteConfig.customFields as { tdevConfig: { directus: DirectusConfig } };

interface Rating {
    id: number;
    rating: number;
    page_id: string;
    pathname: string;
    client_id: string;
    created_at: string;
}
const client = createDirectus<{ [Config?.collection]: Rating[] }>(Config?.url ?? 'http://directus').with(
    rest()
);

export default client;
