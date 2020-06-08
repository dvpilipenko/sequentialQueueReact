import React, {useContext} from 'react';
import {store} from './Store';

export function AddLogButton(props) {
    const context = useContext(store);
    const onClick = () => {
        context.dispatch({type: 'addToQueue', value: props.seconds})
    }
    return (
        <button onClick={onClick}>
            {props.children}
        </button>
    );
};

