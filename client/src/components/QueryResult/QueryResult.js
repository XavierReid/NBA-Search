import React from 'react';
import './QueryResult.css';

export default function QueryResult({
    item,
    isQueried,
    handleClick,
    isPlayer
}) {
    const { full_name, id } = item;
    const toSend = {
        full_name,
        id,
        is_player: isPlayer !== undefined || item.is_active !== undefined
    };

    return (
        <li
            className={isQueried ? 'queried' : 'result-item'}
            onClick={() => handleClick(toSend)}>
            {full_name}
        </li>
    );
}
