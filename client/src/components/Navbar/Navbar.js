import React, { useEffect } from 'react';
import SearchBar from '../SearchBar';
import QueryResult from '../QueryResult';
import './Navbar.css';

export default function Navbar({ searchable, queried, addItem, removeItem }) {
    function offsetNav() {
        const nav = document.querySelector('.nav');
        document.body.style.paddingTop = `${nav.offsetHeight}px`;
    }
    useEffect(() => {
        window.addEventListener('resize', offsetNav);
    }, []);
    useEffect(offsetNav);
    return (
        <nav className={'nav'}>
            <SearchBar
                searchableItems={searchable}
                addItem={addItem}
                placeholder={'Search for a Player or Team e.g. Stephen Curry'}
            />
            <div className="nav-items">
                {/* <form className="nav-form">
                    <input type="text" placeholder="Enter a GAMEID" />
                    <button>Search</button>
                </form> */}

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
            </div>
        </nav>
    );
}
