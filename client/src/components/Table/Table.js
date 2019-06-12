import React from 'react';
import { getStatus, generateKey } from '../../resources/utils';
import Toggle from '../Toggle';
import './Table.css';

export default function Table({ data, cols, id, type, setStats }) {
    function handleClick(e, callback) {
        if (e.shiftKey) {
            callback();
            return;
        }
        getStats(e);
    }
    function getStats(e) {
        const statType = e.target.innerText.toLowerCase();
        const stats = Array.isArray(data.data) ? data.data : data.data.seasons;
        const filtered = stats.map(stat => ({
            name: stat.season || stat.date || stat.year,
            [statType]: stat[statType]
        }));
        if (stats.length > 1 && (stats[0].date || stats[0].year)) {
            filtered.reverse();
        }
        console.log(filtered);
        setStats({ data: filtered, type: statType });
    }
    function buildTable(tableData, i) {
        return (
            <Toggle init={true} key={generateKey(`${id}_${i}}`)}>
                {({ on, toggle }) => (
                    <table className="stats-table">
                        <thead onClick={e => handleClick(e, toggle)}>
                            <tr>
                                {cols.map(col => {
                                    return (
                                        <th
                                            className={type}
                                            key={generateKey(`${id}_${col}`)}>
                                            {col}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        {on && (
                            <tbody>
                                {!Array.isArray(tableData)
                                    ? createRow(tableData, 'Career')
                                    : tableData.map(row =>
                                          createRow(
                                              row,
                                              row.season || row.date || row.year
                                          )
                                      )}
                            </tbody>
                        )}
                    </table>
                )}
            </Toggle>
        );
    }

    function createRow(row, timeFrame) {
        const pre = `${id}_${timeFrame}_${type}`;
        return (
            <tr key={generateKey(pre)}>
                {timeFrame === 'Career' && (
                    <td colSpan={3} style={{ textAlign: 'center' }}>
                        Career
                    </td>
                )}
                {cols.map(col => {
                    const colName = col.toLowerCase();
                    const val = row[colName];
                    const pre = `${id}_${colName}_${timeFrame}_${type}-${val}`;
                    return (
                        val !== undefined && (
                            <td key={generateKey(pre)}>{val}</td>
                        )
                    );
                })}
            </tr>
        );
    }

    function displayTables() {
        return (
            <React.Fragment>
                {Array.isArray(data.data)
                    ? chunkedTables(data.data, 10)
                    : Object.keys(data.data)
                          .sort((a, b) => (a < b ? 1 : -1))
                          .map(key => buildTable(data.data[key], key))}
            </React.Fragment>
        );
    }

    function chunkedTables(arr, chunkSize) {
        const chunks = (a, n, balanced) => {
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
        };
        const sortBy = (a, b) => {
            if (a.year && b.year) {
                return a.year < b.year ? 1 : -1;
            }
        };
        const sorted = arr.sort((a, b) => sortBy(a, b));
        const n = Math.ceil(sorted.length / chunkSize);
        const tableChunks = chunks(sorted, n, true);
        return (
            <React.Fragment>
                {tableChunks.length > 1 && Array.isArray(tableChunks[0])
                    ? tableChunks.map((chunk, i) => buildTable(chunk, i))
                    : buildTable(tableChunks, 0)}
            </React.Fragment>
        );
    }
    const status = getStatus(data);
    if (status) {
        return status;
    }
    return displayTables();
}
