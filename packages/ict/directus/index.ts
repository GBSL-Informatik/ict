import type DirectusStore from './stores/DirectusStore';

declare module '@tdev-api/document' {
    export interface ViewStoreTypeMapping {
        ['directusStore']: DirectusStore;
    }
}
