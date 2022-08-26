import React, { useState } from 'react';
import Context from './Context';

export default function ContextWrapper(props) {
    const [rooms, setRooms] = useState([]);
    const [unfilteredRooms, setUnfilteredRooms] = useState([]);

    return (
        <Context.Provider
            value={{
                rooms,
                setRooms,
                unfilteredRooms,
                setUnfilteredRooms,
            }}
        >
            {props.children}
        </Context.Provider>
    );
}
