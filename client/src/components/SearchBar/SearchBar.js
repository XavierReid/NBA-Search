import React, { useState } from 'react';
import QueryResult from '../QueryResult';
import './SearchBar.css';

export default function SearchBar({ searchableItems, addItem, placeholder }) {
    const [query, setQuery] = useState('');

    function showResults() {
        return searchableItems.filter(item => {
            const regex = new RegExp(query, 'gi');
            return item.full_name.match(regex);
        });
    }

    function handleClick(item) {
        document.querySelector('form').reset();
        setQuery('');
        addItem(item);
    }

    return (
        <form className="search" onSubmit={e => e.preventDefault()}>
            <input
                type="text"
                className="search-bar"
                onChange={e => setQuery(e.target.value)}
                autoComplete="off"
                placeholder={placeholder}
                style={
                    query.length >= 2
                        ? {
                              borderBottomLeftRadius: 0,
                              borderBottomRightRadius: 0
                          }
                        : null
                }
            />
            {query.length < 2 ? null : (
                <ul id="results-list">
                    {showResults().map(item => (
                        <QueryResult
                            key={item.id}
                            item={item}
                            isQueried={false}
                            handleClick={handleClick}
                        />
                    ))}
                </ul>
            )}
        </form>
    );
}
