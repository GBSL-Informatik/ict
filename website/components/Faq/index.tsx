import React, { ComponentProps } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import solutionStyles from '../documents/Solution/styles.module.scss';
import Alert from '@tdev-components/shared/Alert';
import Icon from '@mdi/react';
import { mdiChatQuestionOutline } from '@mdi/js';
import { SIZE_M } from '@tdev-components/shared/iconSizes';

const Faq = (props: ComponentProps<typeof Alert>) => {
    const { type, className, children, ...rest } = props;
    return (
        <div className={clsx(styles.faqWrapper, solutionStyles.standalone, solutionStyles.wrapper)}>
            <Alert type={type ?? 'info'} className={clsx(styles.faq, 'faq')} {...rest}>
                <Icon
                    path={mdiChatQuestionOutline}
                    size={SIZE_M}
                    color="var(--ifm-alert-border-color)"
                    className={clsx(styles.icon)}
                />
                {props.children}
            </Alert>
        </div>
    );
};

export default Faq;
