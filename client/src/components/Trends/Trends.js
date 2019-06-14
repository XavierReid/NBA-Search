import React from 'react';
import {
    XAxis,
    YAxis,
    LineChart,
    Line,
    ResponsiveContainer,
    Tooltip
} from 'recharts';
import './Trends.css';
import { generateKey } from '../../resources/utils';
function CustomTooltip({ active, payload, label }) {
    if (active) {
        const data = payload[0].payload;
        return (
            <div className="tooltip">
                {Object.keys(data).map((key, i) => (
                    <p key={generateKey(`${key}_${i}`)}>
                        {key !== 'name' && `${key}:`} {data[key]}
                    </p>
                ))}
            </div>
        );
    }
    return null;
}
export default function Trends({ data, type, handleDelete }) {
    return (
        <div >
            <button className="exit" onClick={() => handleDelete(null)} />
            <h2>{type.toUpperCase()} Variance</h2>
            <ResponsiveContainer width="99%" aspect={3}>
                <LineChart data={data}>
                    <Tooltip content={<CustomTooltip />} />
                    <XAxis dataKey="name" />
                    <Line type="monotone" dataKey={type} stroke="#8884d8" />
                    <YAxis />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
