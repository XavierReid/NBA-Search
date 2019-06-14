import React, { useState, useEffect } from 'react';
import Toggle from '../Toggle';
import Table from '../Table';
import GameLog from '../GameLog';
import Trends from '../Trends';
import useFetch from '../../resources/useFetch';
import {
    doFetch,
    initialState,
    statsCols,
    teamStatsCol,
    gameCols,
    teamGameCols,
    getStatus
} from '../../resources/utils';

export default function StatsSummary({ baseURL, id, seasons, isPlayer }) {
    const stats = useFetch(baseURL + '/stats');
    const [regGames, setRegGames] = useState(null);
    const [postGames, setPostGames] = useState(null);
    const [graphData, setGraphData] = useState(null);

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

    if (getStatus(stats)) {
        return getStatus(stats);
    }
    const { regularSeason, postSeason } = stats.data;
    return (
        <div className="summary">
            <Toggle init={false}>
                {({ on, toggle }) => (
                    <div className="container">
                        <header onClick={toggle}>
                            {isPlayer
                                ? 'Regular Season Statistics'
                                : 'Team Season Statistics'}
                        </header>
                        {on && (
                            <React.Fragment>
                                <Table
                                    data={regularSeason[0]}
                                    id={id}
                                    type="reg"
                                    columns={
                                        isPlayer ? statsCols : teamStatsCol
                                    }
                                    setData={setGraphData}
                                />
                                {isPlayer && (
                                    <Table
                                        data={regularSeason[1]}
                                        id={id}
                                        type="reg"
                                        columns={statsCols}
                                        setData={setGraphData}
                                    />
                                )}
                            </React.Fragment>
                        )}
                    </div>
                )}
            </Toggle>
            {isPlayer && (
                <Toggle init={false}>
                    {({ on, toggle }) => (
                        <div className="container">
                            <header onClick={toggle}>Playoff Statistics</header>
                            {on && (
                                <React.Fragment>
                                    <Table
                                        data={postSeason[0]}
                                        id={id}
                                        type="post"
                                        columns={statsCols}
                                        setData={setGraphData}
                                    />
                                    <Table
                                        data={postSeason[1]}
                                        id={id}
                                        type="post"
                                        columns={statsCols}
                                        setData={setGraphData}
                                    />
                                </React.Fragment>
                            )}
                        </div>
                    )}
                </Toggle>
            )}
            <Toggle init={false}>
                {({ on, toggle }) => (
                    <div className="container">
                        <header onClick={toggle}>Game Log </header>
                        {on && (
                            <GameLog
                                seasons={seasons}
                                post={postGames}
                                reg={regGames}
                                id={id}
                                columns={isPlayer ? gameCols : teamGameCols}
                                fetchGames={fetchGames}
                                setData={setGraphData}
                            />
                        )}
                    </div>
                )}
            </Toggle>
            {graphData && graphData.data.length > 1 && (
                <div className="container trends">
                    <Trends
                        data={graphData.data}
                        type={graphData.type}
                        handleDelete={setGraphData}
                    />
                </div>
            )}
        </div>
    );
}
