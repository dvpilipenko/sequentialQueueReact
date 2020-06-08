import React, {useContext} from 'react';
import './Queue.css';
import {store} from "./Store";

export function Queue() {
    const {state} = useContext(store);
    return (
        <div className={'queue-container'}>
            <h3>sequential queue</h3>
            <div className={'queue-panel'}>
                {state.queue.map((item, index) =>
                    <div key={index} className={'queue-panel__item'}> {item} </div>)
                }
            </div>
    </div>);

}
