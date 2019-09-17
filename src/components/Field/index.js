import React from 'react';
import Field from  './../../classes/Field';

import Column from "../Column";
import './styles.scss';
import {BASE_CELL_MARGIN, BASE_CELL_SIZE} from "../../constants";

export default class GameField extends React.Component {
    constructor() {
        super();

        setTimeout(() => {
            const {field} = this.state;
            field.fieldMap[2].splice(2,1);
            this.setState({field: field})
        }, 5000)
    }

    componentWillMount() {
        const { rows, cols } = this.props;

        this.setState({
            field: new Field(rows, cols),
            width: cols * BASE_CELL_SIZE + cols * BASE_CELL_MARGIN * 2,
            height: rows * BASE_CELL_SIZE + rows * BASE_CELL_MARGIN * 2,
        });
    }

    render() {
        const { field, width, height } = this.state;
        return (
            <div className="Field" style={{width: `${width}px`, height: `${height}px`}}>
                {field.fieldMap.map((col, i) => <Column key={i} col={col} colIndex={i}/>)}
            </div>
        );
    }
}
