import React from 'react';
import styles from './styles.module.scss';
import { useCurrentSidebarCategory, useDocsSidebar } from '@docusaurus/plugin-content-docs/client';
import { useLocation } from '@docusaurus/router';
// https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-theme-common/src/contexts/docsSidebar.tsx
import type { PropSidebar, PropSidebarItem } from '@docusaurus/plugin-content-docs';
import Feature from '..';
export type ContextValue = { name: string; items: PropSidebar };

function MyFeature(): React.ReactElement {
    const sidebar = useCurrentSidebarCategory();
    return (
        <div className={styles.features}>
            {sidebar.items.map((item, idx) => {
                if (item.customProps?.hidden) {
                    return null;
                }
                if (item.type === 'link' || item.type === 'category') {
                    return (
                        <Feature
                            icon={item.customProps?.icon as string}
                            name={item.label}
                            route={item.href!}
                            description={item.description}
                            pages={item.type === 'category' ? item.items.length : 1}
                            key={idx}
                        />
                    );
                } else {
                    return null;
                }
            })}
        </div>
    );
}

const getCurrent = (sidebarItems: PropSidebar | undefined, pathname: string): PropSidebarItem | undefined => {
    if (!sidebarItems) {
        return undefined;
    }
    for (const item of sidebarItems) {
        if (item.type !== 'html' && item.href === pathname) {
            return item;
        }
        if (item.type === 'category') {
            const current = getCurrent(item.items, pathname);
            if (current) {
                return current;
            }
        }
    }
    return undefined;
};

const FeatureList = (): React.ReactElement => {
    const docsSidebar = useDocsSidebar();
    const { pathname } = useLocation();
    const current = getCurrent(docsSidebar?.items, pathname);
    if (!current || current.type !== 'category') {
        return (
            <div className={styles.features}>
                <Feature
                    icon="mdi-heart-broken"
                    name="Keine Unterseite Gefunden 😢"
                    route={
                        (docsSidebar?.items.find((it) => it.type !== 'html') as { href: string })?.href || '/'
                    }
                />
            </div>
        );
    }
    return <MyFeature />;
};
export default FeatureList;
