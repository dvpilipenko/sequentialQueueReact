import React, {useContext} from 'react';
import {AddLogButton} from "./AddLogButton";
import {store} from "./Store";

export function PanelButtons(props) {
    const context = useContext(store)
    const resetOnclick = () => {
        context.dispatch({type: 'reset'})
    }
    return (<>
        <span>Add to queue: </span>
        {props.data.map((item, index) => {
            return <AddLogButton key={index} seconds={item.seconds}> {item.title} </AddLogButton>
        })}
        <button onClick={resetOnclick}>Reset to default</button>
    </>);
}
