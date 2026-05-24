import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { useStore } from '@tdev-hooks/useStore';
import { observer } from 'mobx-react-lite';
import { mdiStar, mdiStarOutline, mdiLoading } from '@mdi/js';
import Button from '@tdev-components/shared/Button';
import { useLocation } from '@docusaurus/router';

interface Props {
    pageId: string;
    label?: string;
}

const getIconPath = (starNr: number, rating?: number) => {
    if (!rating) {
        return mdiStarOutline;
    }
    if (rating < 0 && starNr === Math.abs(rating)) {
        return mdiLoading;
    }
    if (starNr <= Math.abs(rating)) {
        return mdiStar;
    }
    return mdiStarOutline;
};

const PageRating = observer((props: Props) => {
    const { pageId } = props;
    const clientStore = useStore('viewStore');
    const { pathname } = useLocation();
    const directusStore = clientStore.useStore('directusStore');
    const rating = directusStore.pageRatings.get(pageId) ?? 0;
    const [clickedAt, setClickedAt] = React.useState<number[]>([]);
    React.useEffect(() => {
        if (!pageId) {
            return;
        }
        directusStore.fetchPageRating(pageId);
    }, [pageId, directusStore]);

    React.useEffect(() => {
        const now = Date.now();
        const withinLastSecond = clickedAt.filter((time) => now - time < 1000);
        if (withinLastSecond.length < 5) {
            return;
        }
        directusStore.setShowSummary(true);
        setClickedAt([]);
    }, [clickedAt]);

    return (
        <div className={clsx(styles.pageSummary)}>
            <span
                onClick={() => setClickedAt((prev) => [...prev, Date.now()])}
                className={clsx(styles.label)}
            >
                {props.label || 'Wie hilfreich war diese Seite?'}
            </span>
            <div className={clsx(styles.rating)}>
                {[1, 2, 3, 4, 5].map((i) => {
                    const isActive = i <= Math.abs(rating);
                    return (
                        <Button
                            icon={getIconPath(i, rating)}
                            color={isActive ? 'gold' : 'var(--ifm-color-secondary-darkest)'}
                            key={i}
                            spin={rating === -i}
                            onClick={() => {
                                directusStore.submitRating(pageId, pathname, i);
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
});

export default PageRating;
