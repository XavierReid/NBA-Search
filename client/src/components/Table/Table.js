import React from 'react';
import Toggle from '../Toggle';
import { generateKey } from '../../resources/utils';
import './Table.css';

export default function Table({ data, columns, id, type, setData }) {
    function handleClick(e, callback) {
        if (e.shiftKey) {
            getDataTrends(e);
            return;
        }
        callback();
    }
    function getDataTrends(e) {
        const dataType = e.target.innerText;
        const filtered = data.map(stat => ({
            name: stat.SEASON || stat.DATE || stat.YEAR,
            [dataType]: stat[dataType]
        }));
        if (data.length > 1 && (data[0].DATE || data[0].YEAR)) {
            filtered.reverse();
        }
        setData({ data: filtered, type: dataType });
    }
    function getRow(rowData, index) {
        const pre = `${id}_${index}_${type}`;
        return (
            <tr key={generateKey(pre)}>
                {index === 'Career' && (
                    <td colSpan={3} style={{ textAlign: 'center' }}>
                        Career
                    </td>
                )}
                {columns.map(col => {
                    const val = rowData[col];
                    const pre = `${id}_${col}_${index}_${type}-${val}`;
                    return (
                        val !== undefined && (
                            <td key={generateKey(pre)}>{val}</td>
                        )
                    );
                })}
            </tr>
        );
    }
    function getTable(tableData, index) {
        return (
            <Toggle init={true} key={generateKey(`${id}_${index}}`)}>
                {({ on, toggle }) => (
                    <table className="stats-table">
                        <thead onClick={e => handleClick(e, toggle)}>
                            <tr>
                                {columns.map(col => (
                                    <th
                                        className={type}
                                        key={generateKey(`${id}_${col}`)}>
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        {on && (
                            <tbody>
                                {tableData.map(row => {
                                    const index =
                                        row.SEASON || row.DATE || row.YEAR;
                                    return index
                                        ? getRow(row, index)
                                        : getRow(row, 'Career');
                                })}
                            </tbody>
                        )}
                    </table>
                )}
            </Toggle>
        );
    }
    function display(tableData, chunkSize) {
        const n = Math.ceil(tableData.length / chunkSize);
        const tableChunks = getChunks(tableData, n, true);
        return (
            <React.Fragment>
                {tableChunks.length > 1 && Array.isArray(tableChunks[0])
                    ? tableChunks.map((chunk, i) => getTable(chunk, i))
                    : getTable(tableChunks, 0)}
            </React.Fragment>
        );
    }
    return <React.Fragment>{display(data, 10)}</React.Fragment>;
}

function getChunks(a, n, balanced) {
    if (n === 1) {
        return a;
    }
    const len = a.length;
    const out = [];
    let i = 0;
    let size;
    if (len % n === 0) {
        size = Math.floor(len / n);
        while (i < len) {
            out.push(a.slice(i, (i += size)));
        }
    } else if (balanced) {
        while (i < len) {
            size = Math.ceil((len - i) / n--);
            out.push(a.slice(i, (i += size)));
        }
    } else {
        n--;
        size = Math.floor(len / n);
        if (len % size === 0) size--;
        while (i < size * n) {
            out.push(a.slice(i, (i += size)));
        }
        out.push(a.slice(size * n));
    }
    return out;
}
