import React, { type ReactNode } from 'react';
import Footer from '@theme-original/DocItem/Footer';
import type FooterType from '@theme-original/DocItem/Footer';
import type { WrapperProps } from '@docusaurus/types';
import styles from './style.module.scss';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { observer } from 'mobx-react-lite';
import PageRating from '@ict/directus/components/PageRating';
import PageSummary from '@ict/directus/components/PageSummary';

type Props = WrapperProps<typeof FooterType>;

const FooterWrapper = observer((props: Props): ReactNode => {
    const { frontMatter } = useDoc();
    const { page_id } = frontMatter as {
        page_id: string;
    };

    return (
        <div className={styles.footer}>
            <hr />
            <PageRating pageId={page_id} />
            <PageSummary pageId={page_id} />
            <Footer {...props} />
        </div>
    );
});

export default FooterWrapper;
