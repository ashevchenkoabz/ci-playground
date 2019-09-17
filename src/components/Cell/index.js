import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCannabis, faAppleAlt, faLemon, faBowlingBall, faCertificate } from '@fortawesome/free-solid-svg-icons'

import './styles.scss';

const iconsMap = {
    1: faCannabis,
    2: faAppleAlt,
    3: faLemon,
    4: faCertificate,
    5: faBowlingBall,
};

export default class GameCell extends React.Component {
    onDragStart(col, row) {
        return () => console.log('onDragStart', col, row);
    }
    onDragEnd(col, row) {
        return () => console.log('onDragEnd', col, row);
    }
    onDrop(col, row) {
        return () => console.log('onDrop', col, row);
    }

    render() {
        const { cell, col, row } = this.props;
        return (
            <div className="Cell" id={`c-${col}-${row}`} draggable={true}
                 onDragStart={this.onDragStart(col, row)}
                 onDragEnd={this.onDragEnd(col, row)}
                 onDrop={this.onDrop(col, row)}

            >
                <FontAwesomeIcon color={cell.color.hex} icon={iconsMap[cell.color.id]} />
            </div>
        );
    }
}
