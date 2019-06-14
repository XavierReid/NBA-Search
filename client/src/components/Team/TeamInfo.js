import React from 'react';

export default function TeamInfo({ data }) {
    const { commonInfo, teamRanks } = data;
    return (
        <div className="basic-info">
            <h4>
                {/* One day make it possible to switch season */}
                {commonInfo.season} {commonInfo.city} {commonInfo.name} (
                {commonInfo.abbrv})
            </h4>
            <hr />
            <p>
                <strong>Record</strong>: {commonInfo.w}-{commonInfo.l} (
                {commonInfo.pct})
            </p>
            <p>
                #{commonInfo.cRank} in the {commonInfo.conference}
                ern Conference
            </p>
            <p>
                #{commonInfo.dRank} in the {commonInfo.division} Division
            </p>
            <div className="metrics">
                <p>
                    <strong>PTS/G</strong>: <em>{teamRanks.ptsPg}</em> (#
                    {teamRanks.ptsRank} of 30)
                </p>
                <p>
                    <strong>Opp PTS/G</strong>: <em>{teamRanks.oppPtsPg}</em> (#
                    {teamRanks.oppPtsRank} of 30)
                </p>
                <p>
                    <strong>AST/G</strong>: <em>{teamRanks.astPg}</em> (#
                    {teamRanks.astRank} of 30) <strong>REB/G</strong>:{' '}
                    <em>{teamRanks.rebPg}</em> (#{teamRanks.rebRank} of 30)
                </p>
            </div>
        </div>
    );
}
