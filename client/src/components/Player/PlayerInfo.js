import React from 'react';

export default function PlayerInfo({ data, team, addItem }) {
    const teamName = `${team.city} ${team.name}`;
    const teamData = {
        full_name: teamName,
        id: team.team_id,
        is_player: false
    };
    return (
        <div className="basic-info">
            <h4>
                {data.first_name} {data.last_name}
            </h4>
            <p>Postion: {team.pos}</p>
            <p>
                <em>
                    {data.height}, {data.weight} lbs
                </em>
            </p>
            <p>
                <strong>Team</strong>:{' '}
                <span className="team-link" onClick={() => addItem(teamData)}>
                    {teamName}
                </span>{' '}
                (# {team.jersey_num})
            </p>
            <p>
                <strong>Born</strong>: {data.birth_date.substr(0, 10)} out of{' '}
                {data.last_affiliation}
            </p>
            <p>
                <strong>Experience</strong>: {data.exp}{' '}
                {Number(data.exp) > 1 ? 'years' : 'year'}
            </p>
        </div>
    );
}
