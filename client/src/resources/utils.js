import React from 'react';

export const statsCols = [
    'SEASON',
    'TEAM',
    'AGE',
    'GP',
    'GS',
    'MPG',
    'FG_PCT',
    'FG3_PCT',
    'FT_PCT',
    'REB',
    'AST',
    'STL',
    'BLK',
    'TOV',
    'PF',
    'PTS'
];

export const teamStatsCol = [
    'YEAR',
    'W',
    'L',
    'W_PCT',
    'FGM',
    'FGA',
    'FG_PCT',
    'FG3M',
    'FG3A',
    'FG3_PCT',
    'FTM',
    'FTA',
    'FT_PCT',
    'OREB',
    'REB',
    'AST',
    'STL',
    'BLK',
    'TOV',
    'PF',
    'PTS'
];

export const gameCols = [
    'DATE',
    'MATCHUP',
    'WL',
    'MINS',
    'PTS',
    'REB',
    'AST',
    'FGM',
    'FGA',
    'FG3M',
    'FG3A',
    'FTM',
    'FTA',
    'BLK',
    'STL',
    'TOV',
    'PF',
    '+/-'
];
export const teamGameCols = [
    'DATE',
    'MATCHUP',
    'W',
    'L',
    'WL',
    'PTS',
    'REB',
    'AST',
    'FGM',
    'FGA',
    'FG_PCT',
    'FG3M',
    'FG3A',
    'FG3_PCT',
    'FTM',
    'FTA',
    'FT_PCT',
    'BLK',
    'STL',
    'TOV',
    'PF'
];

export const initialState = {
    data: null,
    isLoading: false,
    isError: false
};

export const messages = {
    errorMessage: <div style={{ color: 'red' }}>Something went wrong</div>,
    loadingMessage: <div style={{ color: 'white' }}>Loading...</div>
};

export function getStatus(statusObj) {
    if (statusObj.isError) {
        return messages.errorMessage;
    }
    if (statusObj.isLoading) {
        return messages.loadingMessage;
    }
    if (!statusObj.data) {
        return <React.Fragment />;
    }
    return null;
}

export async function doFetch(url, setData) {
    try {
        setData({ data: null, isError: false, isLoading: true });
        const res = await fetch(url);
        const data = await res.json();
        setData({ data: data, isError: false, isLoading: false });
    } catch (error) {
        console.log(error);
        setData({ data: null, isError: true, isLoading: false });
    }
}

export function generateKey(pre) {
    return `${pre}_${new Date().getTime()}_${Math.random() * 100}`;
}
