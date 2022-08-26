import React from 'react';

const Context = React.createContext({
    rooms: [],
    setRooms: () => {},
    unfilteredRooms: [],
    setUnfilteredRooms: () => {},
});

export default Context;
