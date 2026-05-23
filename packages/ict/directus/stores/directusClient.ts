import { createDirectus, authentication, rest } from '@directus/sdk';

interface Rating {
    id: number;
    rating: number;
    page_id: string;
    pathname: string;
    client_id: string;
    created_at: string;
}
const client = createDirectus<{ ict_page_ratings: Rating[] }>('https://directus.gbsl.website').with(rest());

export default client;
