import React, {useContext, useEffect, useRef, useState} from "react";
import {store} from "./Store";
import './Logs.css'

export function Logs() {
    const {state} = useContext(store);
    const [logState, setLogState] = useState('');
    const textAreaElement = useRef(null)

    useEffect(() => {
        let result = '';
        state.logs.forEach(item => {
            result +=
                `Completion date: ${item.endDate.toLocaleTimeString()} | Execution time:${item.seconds} | Time of adding: ${item.clickDate.toLocaleTimeString()} \n`;
        });
        setLogState(result);
        textAreaElement.current.scrollTop = textAreaElement.current.scrollHeight;
    }, [state.logs])

    return (<>
        <h3>Logs</h3>
        <textarea readOnly ref={textAreaElement} className={'log-textarea'} value={logState}></textarea>
    </>);
}
