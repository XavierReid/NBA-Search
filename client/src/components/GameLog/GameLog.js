import React, { useState, useEffect } from 'react';
import Toolbar from '../Toolbar';
import Table from '../Table';
import { getStatus } from '../../resources/utils';
// ADD GRAPHS BACK

function isValidDate(curr, start, end){
    const currDate = new Date(curr);
    if(start !== '' && currDate < new Date(start)){
        return false;
    }
    if(end !== '' && currDate > new Date(end)){
        return false;
    }
    return true;
}

export default function GameLog({
    fetchGames,
    reg,
    post,
    id,
    seasons,
    columns,
    setData
}) {
    const [season, setSeason] = useState('');
    const [seasonType, setSeasonType] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        if (season && seasonType) {
            const path = `/stats/${season}/${seasonType}`;
            fetchGames(season, seasonType, path);
        }
    }, [season, seasonType, fetchGames]);

    function setSeasonData(type, value) {
        if (type === 'season') {
            setSeason(value);
        } else {
            setSeasonType(value);
        }
    }

    function filterGames(games, type, start, end) {
        if (type === '') {
            return games;
        }
        let filtered;
        if (type === 'MATCHUP' || type === 'WL') {
            filtered = games.filter(game =>
                game[type].toLowerCase().includes(start.toLowerCase())
            );
        } else {
            filtered = games.filter(game => {
                if(type === 'DATE'){
                    return isValidDate(game[type], start, end);
                }
                const val = Number(game[type]);
                if (start !== '' && val < Number(start)) {
                    return false;
                }
                if (end !== '' && val > Number(end)) {
                    return false;
                }
                return true;
            });
        }
        return filtered;
    }

    function createGamesTable(games) {
        const categories = category;
        if (getStatus(games[season])) {
            return getStatus(games[season]);
        }
        return (
            <Table
                data={filterGames(games[season].data, categories, start, end)}
                columns={columns}
                id={id}
                type={'games'}
                setData={setData}
            />
        );
    }

    function display() {
        return seasonType === 'Regular Season'
            ? createGamesTable(reg)
            : createGamesTable(post);
    }
    return (
        <div className="log">
            <Toolbar
                seasons={seasons}
                cols={columns}
                id={id}
                category={category}
                search={setSeasonData}
                setCategory={setCategory}
                setStart={setStart}
                setEnd={setEnd}
            />
            {season && seasonType && display()}
        </div>
    );
}
