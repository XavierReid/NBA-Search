import React, { useState } from 'react';
import TeamInfo from './TeamInfo';
import Trends from '../Trends';
import QueryResult from '../QueryResult';
import useFetch from '../../resources/useFetch';
import { getStatus } from '../../resources/utils';
import './Team.css';
import StatsSummary from '../StatsSummary';

export default function Team({ team, addItem }) {
    const teamURL = `/api/teams/${team.id}`;
    const info = useFetch(teamURL);
    const [stats, setStats] = useState(null);

    if (getStatus(info)) {
        return getStatus(info);
    }

    const { adv_stats, record, basic_info, roster } = info.data;

    return (
        <div className="item team">
            <TeamInfo stats={adv_stats} record={record} info={basic_info} />
            <div className="roster">
                <h4>Roster</h4>
                <div>
                    {roster.map(player => (
                        <QueryResult
                            item={player}
                            key={player.id}
                            isQueried={true}
                            handleClick={addItem}
                            isPlayer={true}
                        />
                    ))}
                </div>
            </div>
            <StatsSummary
                forPlayer={false}
                id={team.id}
                seasons={basic_info.seasons}
                baseURL={teamURL}
                setStats={setStats}
            />
            {stats && stats.data.length > 1 && (
                <Trends data={stats.data} type={stats.type} handleDelete={setStats}/>
            )}
        </div>
    );
}
