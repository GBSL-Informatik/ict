import React from 'react';
import { translate } from '@docusaurus/Translate';

interface Props {
    /**
     * id is the translation key for the href and the link text.
     */
    id: string;
    children?: React.ReactNode;
    protocol?: 'mailto' | 'tel';
}

const TLink = (props: Props) => {
    const { id } = props;
    const value = translate({ id: id });
    if (!value) {
        return props.children || id;
    }
    let protocol = props.protocol;
    if (!protocol) {
        if (value.includes('@')) {
            protocol = 'mailto';
        } else if (value.replace(/\s/g, '').match(/^\+?\d+$/)) {
            protocol = 'tel';
        }
    }
    let sanitized = value.trim();
    if (protocol === 'tel') {
        sanitized = sanitized.replace(/\s/g, '');
        if (!sanitized.startsWith('+')) {
            sanitized = '+41' + sanitized.replace(/^0/, '');
        }
    }
    const href = `${protocol}:${sanitized}`;
    return <a href={href}>{props.children || value}</a>;
};

export default TLink;
