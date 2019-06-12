import React, { useState, useEffect } from 'react';
import Toolbar from '../Toolbar';
import Table from '../Table';
import { getStatus } from '../../resources/utils';

export default function GameLog({
    fetchGames,
    reg,
    post,
    id,
    seasons,
    cols,
    setStats
}) {
    const [season, setSeason] = useState('');
    const [seasonType, setSeasonType] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        if (season && seasonType) {
            const path = `/stats/${seasonType}/${season}`;
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

    function filterGames(data, type, start, end) {
        if (getStatus(data) || type === '') {
            return data;
        }
        const games = data.data;
        let filtered;
        if (type === 'date' || type === 'matchup' || type === 'wl') {
            filtered = games.filter(game =>
                game[type].toLowerCase().includes(start.toLowerCase())
            );
        } else {
            filtered = games.filter(game => {
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
        const copy = { ...data };
        copy.data = filtered;
        return copy;
    }

    function createGamesTable(games) {
        const categories = category.toLowerCase();
        return (
            <Table
                data={filterGames(games[season], categories, start, end)}
                cols={cols}
                id={id}
                type={'games'}
                setStats={setStats}
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
                cols={cols}
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
