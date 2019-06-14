import React, { useEffect } from 'react';
import SearchBar from '../SearchBar';
import QueryResult from '../QueryResult';
import './Navbar.css';

export default function Navbar({ searchable, queried, addItem, removeItem }) {
    useEffect(() => {
        const nav = document.querySelector('.nav');
        document.body.style.paddingTop = `${nav.offsetHeight - 50}px`;
    });

    return (
        <nav className={'nav'}>
            <SearchBar
                searchableItems={searchable}
                addItem={addItem}
                placeholder={'Search for a Player or Team e.g. Stephen Curry'}
            />

            <ul className="queried-items">
                {queried.map(item => (
                    <QueryResult
                        isQueried={true}
                        item={item}
                        key={item.id}
                        handleClick={removeItem}
                    />
                ))}
            </ul>
        </nav>
    );
}
