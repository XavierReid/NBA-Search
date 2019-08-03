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

    const awards = data.awards.reduce((acc, curr) => {
        processAward(acc, curr);
        return acc;
    }, {});

    console.log(awards);
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
            <hr />
            {Object.keys(awards).map(award => (
                <p>
                    {awards[award].length > 1
                        ? `${awards[award].length}x ${award}`
                        : award}
                </p>
            ))}
            <hr/>
        </div>
    );
}

function processAward(acc, curr) {
    const desc = curr[4];
    const n = Number(curr[5]);
    const season = curr[6];
    const month = curr[7];
    const week = curr[8];
    if (!month && !week) {
        if (n) {
            const teamNum = n =>
                n === 1 ? '1st Team' : n === 2 ? '2nd Team' : '3rd Team';
            const award = `${desc} ${teamNum(n)}`;
            if (!acc[award]) {
                acc[award] = [];
            }
            acc[award].push(`${season.substr(0, 2)}${season.substr(5)}`);
        } else {
            if (!acc[desc]) {
                acc[desc] = [];
            }
            acc[desc].push(`${season.substr(0, 2)}${season.substr(5)}`);
        }
    }
}
