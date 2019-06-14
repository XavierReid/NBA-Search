import React from 'react';
import TeamInfo from './TeamInfo';
import QueryResult from '../QueryResult';
import useFetch from '../../resources/useFetch';
import { getStatus } from '../../resources/utils';
import './Team.css';
import StatsSummary from '../StatsSummary';

export default function Team({ team, addItem }) {
    const teamURL = `/api/teams/${team.id}`;
    const info = useFetch(teamURL);

    if (getStatus(info)) {
        return getStatus(info);
    }

    return (
        <div className="item team">
            <TeamInfo data={info.data} />
            <div className="roster">
                <h4>Roster</h4>
                <div>
                    {info.data.roster.map(player => {
                        const item = {
                            id: player[12],
                            full_name: player[3]
                        };
                        return (
                            <QueryResult
                                item={item}
                                key={player[12]}
                                isQueried={true}
                                handleClick={addItem}
                                isPlayer={true}
                            />
                        );
                    })}
                </div>
            </div>
            <StatsSummary
                isPlayer={false}
                id={team.id}
                seasons={info.data.availableSeasons}
                baseURL={teamURL}
            />
        </div>
    );
}
