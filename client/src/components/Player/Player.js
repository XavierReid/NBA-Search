import React, { useState } from 'react';
import PlayerInfo from './PlayerInfo';
import StatsSummary from '../StatsSummary';
import Trends from '../Trends';
import useFetch from '../../resources/useFetch';
import { getStatus } from '../../resources/utils';
import './Player.css';

export default function Player({ player, addItem }) {
    const playerURL = `/api/players/${player.id}`;
    const info = useFetch(playerURL);
    const [stats, setStats] = useState(null);

    if (getStatus(info)) {
        return getStatus(info);
    }
    return (
        <div className="item player">
            <PlayerInfo
                data={info.data}
                team={info.data.team}
                addItem={addItem}
            />
            <StatsSummary
                baseURL={playerURL}
                id={player.id}
                seasons={info.data.seasons}
                forPlayer={true}
                setStats={setStats}
            />
            {stats && stats.data.length > 1 && (
                <Trends data={stats.data} type={stats.type} handleDelete={setStats}/>
            )}
        </div>
    );
}
