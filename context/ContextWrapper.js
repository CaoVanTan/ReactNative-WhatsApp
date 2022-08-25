import React from 'react';
import Context from './Context';

export default function ContextWrapper(props) {
    return <Context.Provider value={{}}>{props.children}</Context.Provider>;
}
