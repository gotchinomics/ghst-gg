import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { DateTime, Duration } from 'luxon';

import useInterval from 'hooks/useInterval';

import { raffleDataStyles } from '../styles';

export default function RaffleDate({ start, end }) {
    const [type, setType] = useState(null);
    const [title, setTitle] = useState(null);
    const classes = raffleDataStyles();

    useEffect(() => {
        renderTitle();
    }, []);

    useInterval(() => {
        renderTitle();
    }, 1000);

    const renderTitle = () => {
        const local = DateTime.local();
        const diff = end - local;

        if (local > start && local < end) {
            setType('live');
            setTitle(`live for ${Duration.fromObject({ milliseconds: diff }).toFormat('hh:mm:ss')}`);
        } else if (local < start) {
            setType('upcoming');
            setTitle(start.toRelative());
        } else {
            setType('ended');
            setTitle(`ended ${end.toRelative()}`);
        }
    };

    if (!title) return null;

    return (
        <div className={classNames(classes.title, type)}>
            {title}
        </div>
    );
}
