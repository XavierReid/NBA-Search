import React from 'react';
import './QueryResult.css';

export default function QueryResult({
    item,
    isQueried,
    handleClick,
    isPlayer
}) {
    const toSend = {
        full_name: item.full_name,
        id: item.id,
        is_player: isPlayer !== undefined || item.is_active !== undefined
    };
    return (
        <li
            className={isQueried ? 'queried' : 'result-item'}
            onClick={() => handleClick(toSend)}>
            {item.full_name}
        </li>
    );
}
