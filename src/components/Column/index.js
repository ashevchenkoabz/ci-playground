import React from 'react';
import GameCell from "../Cell";

import './styles.scss';
import {BASE_CELL_MARGIN, BASE_CELL_SIZE} from "../../constants";

export default class Column extends React.Component {
    render() {
        const { col, colIndex } = this.props;
        const colWidth = BASE_CELL_SIZE + 2 * BASE_CELL_MARGIN;
        return (
            <div className="Column" style={{width: `${colWidth}px`}}>
                {col.map((cell, i) => <GameCell key={i} cell={cell} row={i} col={colIndex}  />)}
            </div>
        );
    }
}
