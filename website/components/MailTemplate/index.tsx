import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { observer } from 'mobx-react-lite';
import { useStore } from '@tdev-hooks/useStore';
import Button from '@tdev-components/shared/Button';
import Page from '@tdev-models/Page';
import { mdiSend } from '@mdi/js';
import Alert from '@tdev-components/shared/Alert';
import SolutionStyles from '@tdev-components/documents/Solution/styles.module.scss';

interface Props {
    to: string;
    subject?: string | ((page: Page) => string);
    text?: string;
    icon?: string;
    color?: string;
    body: string | ((page: Page) => string);
    validate?: (page: Page) => () => { valid: true } | { valid: false; message: string };
}

export const alignLeft = (text: string) =>
    text
        .split('\n')
        .map((line) => line.trimStart())
        .join('\n');

const MailTemplate = observer((props: Props) => {
    const pageStore = useStore('pageStore');
    const { current } = pageStore;
    const validate = props.validate ? props.validate(current!) : () => ({ valid: true });
    const validation = validate() as { valid: boolean; message?: string };
    if (!current) {
        return null;
    }

    return (
        <div className={clsx(styles.mailTemplate, SolutionStyles.wrapper, SolutionStyles.standalone)}>
            <Button
                text={props.text || 'E-Mail senden'}
                onClick={() => {
                    const subject =
                        typeof props.subject === 'function' ? props.subject(current) : props.subject;
                    const body = typeof props.body === 'function' ? props.body(current) : props.body;
                    const mailtoLink = `mailto:${props.to}?subject=${encodeURIComponent(subject ?? '')}&body=${encodeURIComponent(body ?? '')}`;
                    // simulate click on a link to open the default mail client
                    const link = document.createElement('a');
                    link.href = mailtoLink;
                    link.click();
                    // clean up the link element
                    link.remove();
                }}
                icon={props.icon ?? mdiSend}
                iconSide="left"
                color={props.color ?? 'blue'}
                disabled={!validation.valid}
            />
            {!validation.valid && (
                <Alert type="danger" className={clsx(styles.alert)}>
                    {validation.message || 'Die Vorlage ist ungültig.'}
                </Alert>
            )}
        </div>
    );
});

export default MailTemplate;
