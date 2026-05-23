import React, { type ReactNode } from 'react';
import Footer from '@theme-original/DocItem/Footer';
import type FooterType from '@theme-original/DocItem/Footer';
import type { WrapperProps } from '@docusaurus/types';
import styles from './style.module.scss';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import clsx from 'clsx';
import Icon from '@mdi/react';
import { mdiOpenInNew } from '@mdi/js';
import client from '@tdev-components/directusClient';
import { aggregate, readItems } from '@directus/sdk';

type Props = WrapperProps<typeof FooterType>;
const CLIENT_ID = 'f149d3f7-1d34-42b7-ae77-2a14ae8a1905';

export default function FooterWrapper(props: Props): ReactNode {
    const { frontMatter } = useDoc();
    const { page_id } = frontMatter as {
        page_id: string;
    };
    React.useEffect(() => {
        const load = async () => {
            const ratings = await client.request(
                aggregate('ict_page_ratings', {
                    aggregate: {
                        count: '*'
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
            return ratings;
        };
        load().then((ratings) => {
            console.log(ratings);
        });
    }, []);
    return (
        <div className={styles.footer}>
            <div className={styles.sources}></div>
            <Footer {...props} />
        </div>
    );
}
