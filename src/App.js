import React from 'react';
import GameField from "./components/Field";
import * as d3 from "d3";
import './App.css';
import {BASE_CELL_MARGIN, BASE_CELL_SIZE} from "./constants";
import Field from "./classes/Field";



export default class App extends React.Component {
    componentWillMount() {
        let width = 10 ,height = 10;
        const field = new Field(width, height);
        const svg = d3.select('#root')
            .append('svg')
            .attr('width', (BASE_CELL_SIZE + 2 * BASE_CELL_MARGIN) * width)
            .attr('height', (BASE_CELL_SIZE + 2 * BASE_CELL_MARGIN) * height)
            .attr('fill', d3.color('#dedede'))
            .append('g');

        function dragstarted(d) {
            d3.select(this).raise().attr("stroke", "black");
        }

        function dragged(d) {
            d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
        }

        function dragended(d) {
            d3.select(this).attr("stroke", null);
        }

        const dragListeners = d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);

        svg.selectAll("rect")
            .data(field.fieldMap)
            .enter()
            // .append('g')
            .selectAll("circle")
            .data((d,i) => {d.colNum = i; return d;})
            .enter()
            .append("circle")
            .attr('fill', d => d3.color(d.color.hex))
            .attr("r", BASE_CELL_SIZE / 2)
            .attr("cx", (d) => d.col * BASE_CELL_SIZE + BASE_CELL_SIZE / 2)
            .attr("cy", function(d, i) {
                return BASE_CELL_SIZE  / 2 + d.row * BASE_CELL_SIZE;
            });

        svg.selectAll('circle')
            .call(dragListeners);
    }

    render() {
        return (
            <div className="App">
                <h1>Scapes</h1>
                <GameField cols={10} rows={10} />
            </div>
        );
    }
};

