import React from 'react';

const Context = React.createContext({
    rooms: [],
    setRooms: () => {},
});

export default Context;
