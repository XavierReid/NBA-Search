import React from 'react';
import PlayerInfo from './PlayerInfo';
import StatsSummary from '../StatsSummary';
import useFetch from '../../resources/useFetch';
import { getStatus } from '../../resources/utils';
import './Player.css';

export default function Player({ player, addItem }) {
    const playerURL = `/api/players/${player.id}`;
    const info = useFetch(playerURL);

    if (getStatus(info)) {
        return getStatus(info);
    }
    console.log(info.data);
    return (
        <div className="item player">
            <PlayerInfo data={info.data} addItem={addItem} />
            <StatsSummary
                baseURL={playerURL}
                id={player.id}
                seasons={info.data.availableSeasons}
                isPlayer={true}
            />
        </div>
    );
}
