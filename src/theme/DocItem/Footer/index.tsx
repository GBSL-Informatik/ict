import React, { type ReactNode } from 'react';
import Footer from '@theme-original/DocItem/Footer';
import type FooterType from '@theme-original/DocItem/Footer';
import type { WrapperProps } from '@docusaurus/types';
import styles from './style.module.scss';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import clsx from 'clsx';
import { mdiStar, mdiStarOutline } from '@mdi/js';
import client from '@tdev-components/directusClient';
import { aggregate, readItems, createItem } from '@directus/sdk';
import Button from '@tdev-components/shared/Button';
import { useLocation } from '@docusaurus/router';

type Props = WrapperProps<typeof FooterType>;
const CLIENT_ID = 'f149d3f7-1d34-42b7-ae77-2a14ae8a1905';

export default function FooterWrapper(props: Props): ReactNode {
    const { frontMatter } = useDoc();
    const { pathname } = useLocation();
    const [rating, setRating] = React.useState<{ rating: number; id: number } | null>(null);
    const [pageRatings, setPageRatings] = React.useState<{ rating: number; count: number }[]>([]);
    const { page_id } = frontMatter as {
        page_id: string;
    };
    React.useEffect(() => {
        const load = async () => {
            const ratings = client.request(
                aggregate('ict_page_ratings', {
                    aggregate: {
                        count: 'id'
                    },
                    query: {
                        filter: {
                            page_id: {
                                _eq: page_id
                            }
                        }
                    },
                    groupBy: ['rating']
                })
            );
            const myRating = client.request(
                readItems('ict_page_ratings', {
                    filter: {
                        page_id: {
                            _eq: page_id
                        },
                        client_id: {
                            _eq: CLIENT_ID
                        }
                    },
                    sort: ['-created_at']
                })
            );
            const [ratingsRes, myRatingRes] = await Promise.all([ratings, myRating]);
            return {
                ratings: ratingsRes,
                myRating: myRatingRes[0]
            };
        };
        load().then((ratings) => {
            setPageRatings(
                ratings.ratings.map((r) => ({ rating: r.rating, count: r.count ? Number(r.count) : 0 }))
            );
            setRating(ratings.myRating ? { rating: ratings.myRating.rating, id: ratings.myRating.id } : null);
        });
    }, [page_id]);
    return (
        <div className={styles.footer}>
            <hr />
            <div className={styles.ratingContainer}>
                Wie hilfreich war diese Seite?
                <div className={clsx(styles.rating)}>
                    {[1, 2, 3, 4, 5].map((i) => {
                        const isActive = i <= (rating?.rating ?? 0);
                        return (
                            <Button
                                icon={isActive ? mdiStar : mdiStarOutline}
                                color={isActive ? 'gold' : 'var(--ifm-color-secondary-darkest)'}
                                key={i}
                                onClick={() => {
                                    client
                                        .request(
                                            createItem('ict_page_ratings', {
                                                page_id,
                                                rating: i,
                                                pathname: pathname,
                                                client_id: CLIENT_ID
                                            })
                                        )
                                        .then((res) => {
                                            setRating({ rating: i, id: res.id });
                                        });
                                }}
                            />
                        );
                    })}
                </div>
            </div>
            <Footer {...props} />
        </div>
    );
}
