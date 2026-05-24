import type DirectusStore from './stores/DirectusStore';

declare module '@tdev-api/document' {
    export interface ViewStoreTypeMapping {
        ['directusStore']: DirectusStore;
    }
}
export interface DirectusConfig {
    /**
     * The name of the directus collection, e.g `page_ratings`. It must contain the following fields:
     * - `id` (number, primary key)
     * - `page_id` (string)
     * - `rating` (number)
     * - `pathname` (string)
     * - `client_id` (string)
     * - `created_at` (string, ISO date)
     */
    collection: string;
    /**
     * The URL of the Directus instance. For example, 'https://directus.foo.ch'.
     */
    url: string;
    /**
     * The key used to store the client ID in localStorage. If not provided, it defaults to 'DIRECTUS_CLIENT_ID'.
     * This client ID is used to identify unique users when they submit ratings.
     * @default 'DIRECTUS_CLIENT_ID'
     */
    localStorageKey?: string;
}
