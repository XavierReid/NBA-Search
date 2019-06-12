import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar';
import QueryResult from '../QueryResult';
import './Navbar.css';

export default function Navbar({ searchable, queried, addItem, removeItem }) {
    const [navHeight, setHeight] = useState(0);

    useEffect(() => {
        const nav = document.querySelector('.nav');
        setHeight(nav.offsetHeight);
        document.body.style.paddingTop = `${navHeight}px`;
    }, [navHeight]);

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
