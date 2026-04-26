import React from 'react';

interface Props {
    to: string;
}

const Redirect = (props: Props) => {
    React.useEffect(() => {
        const newTab = window.open(props.to, '_blank');
        newTab?.focus();
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.close();
        }
    }, [props.to]);
    return <small>Redirect to {props.to}</small>;
};

export default Redirect;
