import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface Props {
    to: string;
}

const Redirect = (props: Props) => {
    React.useEffect(() => {
        window.location.href = props.to;
        console.log(`Redirecting to ${props.to}`);
    }, [props.to]);
    return <small>Redirect to {props.to}</small>;
};

export default Redirect;
