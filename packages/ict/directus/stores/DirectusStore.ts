import { action, computed, observable, runInAction } from 'mobx';
import ViewStore from '@tdev-stores/ViewStores/index';
import client from './directusClient';
import { aggregate, createItem, readItems } from '@directus/sdk';
import { v4 as uuidv4 } from 'uuid';
import Storage from '@tdev-stores/utils/Storage';

const DEFAULT_CLIENT_ID = uuidv4();

export default class DirectusStore {
    readonly viewStore: ViewStore;
    readonly CLIENT_ID: string;

    pageRatings = observable.map<string, number>();
    pageSummary = observable.map<string, { count: number; avg: number }>();
    @observable accessor showSummary = false;

    constructor(viewStore: ViewStore) {
        this.viewStore = viewStore;
        const clientId = Storage.getUnsafe('DIRECTUS_CLIENT_ID', undefined, false);
        if (!clientId) {
            Storage.setUnsafe('DIRECTUS_CLIENT_ID', DEFAULT_CLIENT_ID, false);
        }
        this.CLIENT_ID = clientId || DEFAULT_CLIENT_ID;
    }

    @action
    setShowSummary(show: boolean) {
        this.showSummary = show;
    }

    @action
    async submitRating(pageId: string, pathname: string, rating: number) {
        if (rating < 1 || rating > 5) {
            return;
        }
        // first set the rating to a negative value to indicate that the rating is being submitted
        this.pageRatings.set(pageId, -rating);
        // then submit the rating to the server
        client
            .request(
                createItem('ict_page_ratings', {
                    page_id: pageId,
                    rating: rating,
                    pathname: pathname,
                    client_id: this.CLIENT_ID
                })
            )
            .then(
                action((res) => {
                    this.pageRatings.set(pageId, rating);
                })
            );
    }

    @action
    async fetchPageRatings(pageId: string) {
        if (!pageId || this.pageSummary.has(pageId)) {
            return;
        }
        try {
            const ratings = await client.request(
                aggregate('ict_page_ratings', {
                    aggregate: {
                        count: '*',
                        avg: 'rating'
                    },
                    query: {
                        filter: {
                            page_id: {
                                _eq: pageId
                            }
                        }
                    }
                })
            );
            console.log(ratings);
            if (ratings.length === 0 || !ratings[0].count) {
                return;
            }
            runInAction(() => {
                this.pageSummary.set(pageId, {
                    count: Number(ratings[0].count!),
                    avg: Number((ratings[0].avg as unknown as { rating: string }).rating)
                });
            });
        } catch (error) {
            return;
        }
    }

    @action
    async fetchPageRating(pageId: string) {
        try {
            const rating = await client.request(
                readItems('ict_page_ratings', {
                    filter: {
                        page_id: {
                            _eq: pageId
                        },
                        client_id: {
                            _eq: this.CLIENT_ID
                        }
                    },
                    sort: ['-created_at']
                })
            );
            if (rating.length > 0) {
                runInAction(() => {
                    this.pageRatings.set(pageId, rating[0].rating);
                });
            }
        } catch (error) {
            return;
        }
    }
}
