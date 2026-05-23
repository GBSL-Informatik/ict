import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { useStore } from '@tdev-hooks/useStore';
import { observer } from 'mobx-react-lite';
import { mdiStar, mdiStarHalfFull, mdiStarOutline } from '@mdi/js';
import Badge from '@tdev-components/shared/Badge';
import Icon from '@mdi/react';

interface Props {
    pageId: string;
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
    const directusStore = clientStore.useStore('directusStore');
    React.useEffect(() => {
        if (!pageId || !directusStore.showSummary) {
            return;
        }
        directusStore.fetchPageRatings(pageId);
    }, [pageId, directusStore.showSummary]);

    if (!directusStore.showSummary) {
        return null;
    }

    const summary = directusStore.pageSummary.get(pageId);

    return (
        <div className={clsx(styles.pageSummary)}>
            Zusammenfassung{' '}
            {directusStore.showSummary && (
                <Badge
                    title={`${summary?.count ?? 0} Bewertungen, durchschnittlich ${summary?.avg?.toFixed(1) ?? 'null'} Sterne`}
                >
                    {summary?.avg?.toFixed(1) ?? 'null'}{' '}
                    <Icon path={getIconPath(summary?.avg)} size={0.8} color="gold" /> {summary?.count ?? 0}
                </Badge>
            )}
        </div>
    );
});

export default PageSummary;
