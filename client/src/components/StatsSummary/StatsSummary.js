import React, { useState, useEffect } from 'react';
import Toggle from '../Toggle';
import Table from '../Table';
import GameLog from '../GameLog';
import {
    doFetch,
    initialState,
    statsCols,
    teamStatsCol,
    gameCols,
    teamGameCols
} from '../../resources/utils';

export default function StatsSummary({
    baseURL,
    forPlayer,
    seasons,
    id,
    setStats
}) {
    const [regSeason, setRegSeason] = useState(initialState);
    const [postSeason, setPostSeason] = useState(initialState);
    const [regGames, setRegGames] = useState(null);
    const [postGames, setPostGames] = useState(null);

    useEffect(() => {
        const init = () =>
            seasons.reduce(
                (obj, season) => ({
                    ...obj,
                    [season]: initialState
                }),
                {}
            );
        setRegGames(init());
        setPostGames(init());
    }, [seasons]);

    function fetchGames(season, seasonType, path) {
        if (seasonType === 'Regular Season') {
            if (!regGames[season].data && !regGames[season].isLoading) {
                const setGames = data =>
                    setRegGames({ ...regGames, [season]: data });
                doFetch(`${baseURL}${path}`, setGames);
            }
        } else {
            if (!postGames[season].data && !postGames[season].isLoading) {
                const setGames = data => {
                    setPostGames({ ...postGames, [season]: data });
                };
                doFetch(`${baseURL}${path}`, setGames);
            }
        }
    }

    return (
        <div className="summary">
            <Toggle init={false}>
                {({ on, toggle }) => (
                    <div className="container">
                        <header
                            onClick={() => {
                                toggle();
                                if (!regSeason.data) {
                                    doFetch(
                                        `${baseURL}/stats/Regular Season`,
                                        setRegSeason
                                    );
                                }
                            }}>
                            {forPlayer
                                ? 'Regular Season Statistics'
                                : 'Team Season Statistics'}
                        </header>
                        {on && (
                            <Table
                                data={regSeason}
                                cols={forPlayer ? statsCols : teamStatsCol}
                                type={'reg'}
                                id={id}
                                setStats={setStats}
                            />
                        )}
                    </div>
                )}
            </Toggle>
            {forPlayer && (
                <Toggle init={false}>
                    {({ on, toggle }) => (
                        <div className="container">
                            <header
                                onClick={() => {
                                    toggle();
                                    if (!postSeason.data) {
                                        doFetch(
                                            `${baseURL}/stats/Playoffs`,
                                            setPostSeason
                                        );
                                    }
                                }}>
                                Playoff Statistics
                            </header>
                            {on && (
                                <Table
                                    data={postSeason}
                                    cols={statsCols}
                                    type={'post'}
                                    id={id}
                                    setStats={setStats}
                                />
                            )}
                        </div>
                    )}
                </Toggle>
            )}
            <Toggle init={false}>
                {({ on, toggle }) => (
                    <div className="container">
                        <header onClick={toggle}>Game Logs</header>
                        {on && (
                            <GameLog
                                seasons={seasons}
                                post={postGames}
                                reg={regGames}
                                id={id}
                                cols={forPlayer ? gameCols : teamGameCols}
                                fetchGames={fetchGames}
                                setStats={setStats}
                            />
                        )}
                    </div>
                )}
            </Toggle>
        </div>
    );
}
