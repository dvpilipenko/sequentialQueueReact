import React from 'react';
import './App.css';
import {PanelButtons} from "./PanelButtons";
import {Logs} from "./Logs";
import {Queue} from "./Queue";

function App() {
    const data = [
        {title: "1 sec", seconds: 1},
        {title: "2 sec", seconds: 2},
        {title: "3 sec", seconds: 3}
    ];
    return (
        <div className="App">
            <span>this application demonstrates how we can use React + RxJS to organize a sequential queue of actions from asynchronous operations</span>
            <Queue></Queue>
            <PanelButtons data={data}></PanelButtons>
            <Logs></Logs>
        </div>
    );
}

export default App;
