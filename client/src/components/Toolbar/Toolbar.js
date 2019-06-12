import React from 'react';
import './Toolbar.css';
export default function Toolbar(props) {
    const {
        seasons,
        cols,
        id,
        search,
        setCategory,
        setEnd,
        setStart,
        category
    } = props;

    return (
        <div className="options">
            {category === 'DATE' ||
            category === 'MATCHUP' ||
            category === 'WL' ? (
                <input
                    type="text"
                    placeholder="Search"
                    onChange={e => setStart(e.target.value)}
                />
            ) : (
                <React.Fragment>
                    <input
                        type="text"
                        placeholder="From"
                        onChange={e => setStart(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="To"
                        onChange={e => setEnd(e.target.value)}
                    />
                </React.Fragment>
            )}

            <select onChange={e => setCategory(e.target.value)}>
                <option value="">Filter by</option>
                {cols.map(col => (
                    <option key={`${id}-${col}`} value={col}>
                        {col}
                    </option>
                ))}
            </select>
            <select onChange={e => search('seasonType', e.target.value)}>
                <option value="">Select a Season Type</option>
                <option value="Regular Season">Regular Season</option>
                <option value="Playoffs">Playoffs</option>
            </select>
            <select onChange={e => search('season', e.target.value)}>
                <option value="">Select a Season</option>
                {seasons.map(season => (
                    <option key={`${id}-${season}`} value={season}>
                        {season}
                    </option>
                ))}
            </select>
        </div>
    );
}
