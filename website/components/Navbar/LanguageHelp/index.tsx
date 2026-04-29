import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { PopupActions } from 'reactjs-popup/dist/types';
import Popup from 'reactjs-popup';
import { mdiClose, mdiCloseBoxOutline, mdiFileReplace, mdiTranslate } from '@mdi/js';
import Button from '@tdev-components/shared/Button';
import { observer } from 'mobx-react-lite';
import Card from '@tdev-components/shared/Card';
import Help from '@site/docs/03-support/10-language/_help.mdx';
import MDXContent from '@theme/MDXContent';

interface Props {
    className?: string;
}

const LanguageHelp = observer((props: Props) => {
    const ref = React.useRef<PopupActions>(null);
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Popup
            trigger={
                <div className={clsx(props.className)}>
                    <Button icon={mdiTranslate} active={isOpen} title="Sprachhilfe" color="primary" />
                </div>
            }
            ref={ref}
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            closeOnDocumentClick
            modal
            on="click"
            overlayStyle={{ background: 'rgba(0,0,0,0.5)' }}
            nested
            lockScroll
        >
            <Card
                header={
                    <div className={clsx(styles.cardHeader)}>
                        <h3>Soutien linguistique</h3>
                        <Button icon={mdiClose} onClick={() => ref.current?.close()} />
                    </div>
                }
                classNames={{ body: clsx(styles.content), card: clsx(styles.card) }}
            >
                <MDXContent>
                    <Help />
                </MDXContent>
            </Card>
        </Popup>
    );
});

export default LanguageHelp;
