import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { observer } from 'mobx-react-lite';
import Details from '@theme/Details';
import { MetaInit } from '@tdev-models/documents/Solution';
import Icon from '@mdi/react';
import { mdiCheckAll } from '@mdi/js';

interface Props extends MetaInit {
    standalone?: boolean;
    title?: string;
    open?: boolean;
    className?: string;
    children: React.ReactNode;
}

const Solution = observer((props: Props) => {
    return (
        <div className={clsx(styles.wrapper, props.standalone && styles.standalone)}>
            <Details
                summary={
                    <summary>
                        <div className={styles.summary}>
                            {props.title || 'Lösung'}
                            <div style={{ flex: '1 1 0' }} />
                            <Icon
                                path={mdiCheckAll}
                                className={styles.summaryIcon}
                                size={1}
                                color="var(--ifm-color-success)"
                            />
                        </div>
                    </summary>
                }
                className={clsx('alert alert--success', styles.solution)}
                open={props.open}
                key={`poly-${props.open}`}
            >
                <div className={clsx(props.className)}>{props.children}</div>
            </Details>
        </div>
    );
});

export default Solution;
