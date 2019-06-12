import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Player from './components/Player';
import Team from './components/Team';
import './App.css';
import useFetch from './resources/useFetch';
import { getStatus } from './resources/utils';
export default function App() {
    const [items, setItems] = useState([]);
    const players = useFetch('/api/players'); // ?active_only=True
    const teams = useFetch('/api/teams');
    const pStatus = getStatus(players);
    const tStatus = getStatus(teams);

    function addItem(toAdd) {
        setItems(prevState =>
            prevState.find(item => item.id === toAdd.id)
                ? prevState
                : prevState.concat([toAdd])
        );
    }

    function removeItem(toRemove) {
        setItems(prevState =>
            prevState.filter(item => item.id !== toRemove.id)
        );
    }

    if (pStatus || tStatus) {
        return pStatus || tStatus;
    }

    const searchableItems = players.data.concat(teams.data);
    return (
        <div>
            <Navbar
                addItem={addItem}
                removeItem={removeItem}
                searchable={searchableItems}
                queried={items}
            />
            <div className="content">
                {items.map(item => {
                    if (item.is_player) {
                        return (
                            <Player
                                key={item.id}
                                player={item}
                                addItem={addItem}
                            />
                        );
                    }
                    return <Team key={item.id} team={item} addItem={addItem} />;
                })}
            </div>
        </div>
    );
}
