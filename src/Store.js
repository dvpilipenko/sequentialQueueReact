import React, {createContext, useEffect, useMemo, useReducer} from 'react';
import {Observable, Subject, timer} from "rxjs";
import {concatAll} from "rxjs/operators";

//Create subject and we can config operation for the entire queue, for sequential queue we use concatAll
const queueSubject = new Subject().pipe(concatAll());

//Create stream for element of queue
const createStream = (seconds, clickDate) => {
    return new Observable(observer => {
        timer(seconds * 1000).subscribe(() => {
            observer.next({seconds, clickDate, endDate: new Date()});
            observer.complete();
        })
    });
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'addToQueue':
            queueSubject.next(createStream(action.value, new Date()))
            return {
                ...state,
                queue: [...state.queue, action.value]
            };
        case 'removeFromQueue':
            state.queue.shift();
            return {
                ...state,
                logs: [...state.logs, {...action.value}],
            };
        case 'reset':
            return {
                ...state,
                logs: [],
                queue: [],
                isResetting: true
            };
        case 'recreateSubscribe':
            return {
                ...state,
                switchSubscribe: !state.switchSubscribe,
                isResetting: false
            }
        default:
            return state;
    }
    ;
}

const initialState = {
    logs: [],
    queue: []
};

export const store = createContext();

export const StateProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const subscribe = useMemo(
        () => queueSubject.subscribe(value => {
            dispatch({type: 'removeFromQueue', value});
        }), [state.switchSubscribe]);

    useEffect(() => {
        if (state.isResetting) {
            subscribe.unsubscribe();
            dispatch({type: 'recreateSubscribe'});
        }
    }, [state.isResetting]);

    return <store.Provider value={{state, dispatch}}>{children}</store.Provider>;
};
