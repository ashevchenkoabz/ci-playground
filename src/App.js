import React from 'react';
import GameField from "./components/Field";

import './App.css';

export default class App extends React.Component {
    render() {
        return (
            <div className="App">
              <GameField cols={10} rows={10} />
            </div>
        );
    }
};

