import React from 'react';
import Field from  './../../classes/Field';
import { FieldContext } from "../../contexts/FieldContext";

import Column from "../Column";
import './styles.scss';
import {BASE_CELL_MARGIN, BASE_CELL_SIZE} from "../../constants";

export default class GameField extends React.Component {
    componentWillMount() {
        const { rows, cols } = this.props;

        this.setState({
            field: new Field(rows, cols),
            width: cols * BASE_CELL_SIZE + cols * BASE_CELL_MARGIN * 2,
            height: rows * BASE_CELL_SIZE + rows * BASE_CELL_MARGIN * 2,
        });
    }

    performMove(fromCol, fromRow, toCol, toRow) {
        const { field } = this.state;
        field.performMove(fromRow, fromCol, toRow, toCol);
        this.setState({ field });
    }

    render() {
        const { field, width, height } = this.state;
        return (
            <div className="Field" style={{width: `${width}px`, height: `${height}px`}}>
                <FieldContext.Provider value={{ field, performMove: this.performMove.bind(this) }}>
                    {field.fieldMap.map((col, i) =>  <Column key={i} col={col} colIndex={i}/>)}
                </FieldContext.Provider>
            </div>
        );
    }
}
