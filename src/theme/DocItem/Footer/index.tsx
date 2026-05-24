import React, { type ReactNode } from 'react';
import Footer from '@theme-original/DocItem/Footer';
import type FooterType from '@theme-original/DocItem/Footer';
import type { WrapperProps } from '@docusaurus/types';
import styles from './style.module.scss';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { observer } from 'mobx-react-lite';
import PageRating from '@ict/directus/components/PageRating';
import PageSummary from '@ict/directus/components/PageSummary';
import ErrorBoundary from '@docusaurus/ErrorBoundary';

type Props = WrapperProps<typeof FooterType>;

type ICTDocFrontMatter = {
    page_id: string;
    rating_label?: string;
    hide_rating?: boolean;
};

const FooterWrapper = (props: Props): ReactNode => {
    const { frontMatter } = useDoc();
    const {
        page_id: pageId,
        rating_label: ratingLabel,
        hide_rating: hideRating
    } = frontMatter as ICTDocFrontMatter;

    return (
        <div className={styles.footer}>
            <hr />
            {!hideRating && (
                <ErrorBoundary
                    fallback={({ error, tryAgain }) => (
                        <div>
                            <button onClick={tryAgain} className="button button--primary" type="button">
                                Erneut versuchen?
                            </button>
                            <div>Fehler: {error.message}.</div>
                        </div>
                    )}
                >
                    <div>
                        <PageRating pageId={pageId} label={ratingLabel} />
                        <PageSummary pageId={pageId} />
                    </div>
                </ErrorBoundary>
            )}
            <Footer {...props} />
        </div>
    );
};

export default FooterWrapper;
