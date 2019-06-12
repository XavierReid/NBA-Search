import React from 'react';

export default function TeamInfo({ stats, record, info }) {
    return (
        <div className="basic-info">
            <h4>
                {/* One day make it possible to switch season */}
                {info.season} {info.city} {info.name} ({info.abbr})
            </h4>
            <p>
                <strong>Record</strong>: {record.w}-{record.l} ({record.pct})
            </p>
            <p>
                #{record.c_rank} in the {info.conference}
                ern Conference
            </p>
            <p>
                #{record.d_rank} in the {info.division} Division
            </p>
            <div className="metrics">
                <p>
                    <strong>PTS/G</strong>: <em>{stats.pts_pg}</em> (#
                    {stats.pts_rank} of 30)
                </p>
                <p>
                    <strong>Opp PTS/G</strong>: <em>{stats.opp_pts_pg}</em> (#
                    {stats.opp_pts_rank} of 30)
                </p>
                <p>
                    <strong>AST/G</strong>: <em>{stats.ast_pg}</em> (#
                    {stats.ast_rank} of 30) <strong>REB/G</strong>:{' '}
                    <em>{stats.reb_pg}</em> (#
                    {stats.reb_rank} of 30)
                </p>
            </div>
        </div>
    );
}
