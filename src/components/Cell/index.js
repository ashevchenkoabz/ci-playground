import React  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCannabis, faAppleAlt, faLemon, faBowlingBall, faCertificate } from '@fortawesome/free-solid-svg-icons'
import {FieldContext} from "../../contexts/FieldContext";
import classNames from 'classnames';

import './styles.scss';

const iconsMap = {
    1: faCannabis,
    2: faAppleAlt,
    3: faLemon,
    4: faCertificate,
    5: faBowlingBall,
};

export default class GameCell extends React.Component {
    static contextType = FieldContext;

    onDragStart(col, row) {
        return (e) => {
            e.dataTransfer.setData('text/plain', `${row}:${col}`);
            console.log(e);
        };
    }
    onDragEnd(col, row) {
        return (e) => {
            console.log('onDragEnd', col, row);
            e.stopPropagation();
        };
    }
    onDrop(col, row) {
        return (e) => {
            const dropTargetCode = e.dataTransfer.getData('text');
            const [fromRow, fromCol] = dropTargetCode.split(':');

            const { performMove } = this.context;
            performMove(parseInt(fromCol), parseInt(fromRow), col, row);
        };
    }
    onDragOver(col, row) {
        return (e) => {
            e.preventDefault();
        };
    }

    render() {
        const { cell, col, row } = this.props;
        return (
            <div className={classNames('Cell', {'to-remove': cell.insideMatchLine})}
                 id={`c-${col}-${row}`}
                 draggable={true}
                 onDragStart={this.onDragStart(col, row)}
                 onDragEnd={this.onDragEnd(col, row)}
                 onDrop={this.onDrop(col, row)}
                 onDragOver={this.onDragOver(col, row)}
            >
                <FontAwesomeIcon color={cell.color.hex} icon={iconsMap[cell.color.id]} />
            </div>
        );
    }
}
