import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { useStore } from '@tdev-hooks/useStore';
import { observer } from 'mobx-react-lite';
import { mdiStar, mdiStarHalfFull, mdiStarOutline } from '@mdi/js';
import Badge from '@tdev-components/shared/Badge';
import Icon from '@mdi/react';
import Button from '@tdev-components/shared/Button';
import { useLocation } from '@docusaurus/router';

interface Props {
    pageId: string;
    label?: string;
}

const getIconPath = (avg?: number) => {
    if (!avg || avg < 2) {
        return mdiStarOutline;
    }
    if (avg > 3) {
        return mdiStar;
    }
    return mdiStarHalfFull;
};

const PageSummary = observer((props: Props) => {
    const { pageId } = props;
    const clientStore = useStore('viewStore');
    const { pathname } = useLocation();
    const directusStore = clientStore.useStore('directusStore');
    const rating = directusStore.pageRatings.get(pageId) ?? 0;
    React.useEffect(() => {
        if (!pageId) {
            return;
        }
        directusStore.fetchPageRating(pageId);
    }, [pageId, directusStore]);

    return (
        <div className={clsx(styles.pageSummary)}>
            {props.label || 'Wie hilfreich war diese Seite?'}
            <div className={clsx(styles.rating)}>
                {[1, 2, 3, 4, 5].map((i) => {
                    const isActive = i <= Math.abs(rating);
                    return (
                        <Button
                            icon={isActive ? mdiStar : mdiStarOutline}
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

export default PageSummary;
