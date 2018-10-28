import React, { Component } from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import { select } from 'd3-selection';

export default class ResidentsTimeline extends Component {
  componentDidMount() {
    const { residents } = this.props;
    let lane = 0;
    const filteredResidents = residents
      .filter(d => d.start !== undefined)
      .map(r => Object.assign(r, { lane: lane++ })); // eslint-disable-line

    const startYear = 1818;
    const height = filteredResidents.length * 25;

    const x = scaleLinear()
      .domain([startYear, 2000])
      .range([15, 500]);

    const y1 = scaleBand()
      .domain(filteredResidents.map(r => r.person.name))
      .range([0, height]);

    const chart = select('#residents-timeline')
      .append('svg')
      .attr('width', 500)
      .attr('height', filteredResidents.length * 50);

    chart.append('defs')
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', 450)
      .attr('height', 450);

    const main = chart.append('g')
      .attr('height', 500)
      .attr('width', 500)
      .attr('stroke', 'lightgray');

    main.append('g').selectAll('.dataLines')
      .data(filteredResidents)
      .enter()
      .append('line')
      .attr('x1', 15)
      .attr('x2', 500)
      .attr('y1', d => y1(d.person.name))
      .attr('y2', d => y1(d.person.name));

    main.append('g').selectAll('.dataText')
      .data(filteredResidents)
      .enter()
      .append('text')
      .text(d => d.person.name)
      .attr('x', 15)
      .attr('y', d => y1(d.person.name) + 13)
      .attr('dy', '0.5ex')
      .attr('text-anchor', 'start')
      .attr('stroke', '#000')
      .attr('class', 'laneText');

    const getStart = d => (d.start ? d.start.substring(0, 4) : startYear);
    const getEnd = d => (d.end ? d.end.substring(0, 4) : 2000);

    main.append('g').selectAll('.items')
      .data(filteredResidents)
      .enter()
      .append('rect')
      .attr('x', d => x(getStart(d)))
      .attr('y', d => y1(d.person.name))
      .attr('width', d => x(getEnd(d) - getStart(d) + startYear))
      .attr('height', 24)
      .attr('fill', '#24ad39')
      .attr('fill-opacity', 0.5);
  }

  render() {
    return (
      <div id="residents-timeline" />
    );
  }
}
