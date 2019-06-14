import React from 'react';

export default function PlayerInfo({ data, addItem }) {
    const { commonInfo, headlineStats } = data;
    const teamData = {
        full_name: commonInfo.teamName,
        id: commonInfo.teamId,
        is_player: false
    };

    const height = heightStr => {
        const [ft, inch] = heightStr.split('-');
        return (
            <span>
                {ft} ft {inch} in
            </span>
        );
    };
    return (
        <div className="basic-info">
            <h4>{headlineStats[1]}</h4>
            <h5>
                {headlineStats[3]} pts/ {headlineStats[5]} reb/{' '}
                {headlineStats[4]} ast ({headlineStats[2]})
            </h5>
            <hr />
            <p>Postion: {commonInfo.position}</p>
            <p>
                <em>
                    {height(commonInfo.height)} | {commonInfo.weight} lbs
                </em>
            </p>
            <p>
                <strong>Team</strong>:{' '}
                <span className="team-link" onClick={() => addItem(teamData)}>
                    {commonInfo.teamName}
                </span>{' '}
                (#{commonInfo.jerseyNum})
            </p>
            <p>
                <strong>Born</strong>: {commonInfo.birthDate.substr(0, 10)} out
                of {commonInfo.lastAffiliation}
            </p>
            <p>
                <strong>Experience</strong>: {commonInfo.exp}{' '}
                {Number(commonInfo.exp) > 1 ? 'years' : 'year'}
            </p>
        </div>
    );
}
