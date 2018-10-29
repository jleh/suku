import React, { Component } from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import { select } from 'd3-selection';
import { axisBottom } from 'd3-axis';

import createResidentList from './createResidentList';

import styles from './residentTimeline.css';

export default class ResidentsTimeline extends Component {
  componentDidMount() {
    const { placeEvents, personsById } = this.props;
    const residents = createResidentList(placeEvents, personsById);
    const filteredResidents = residents.filter(d => d.start !== undefined);

    if (filteredResidents.length === 0) {
      return;
    }

    const startYear = parseInt(filteredResidents[0].start.substring(0, 4), 10);
    const height = filteredResidents.length * 25;
    const width = 500;

    const getStart = d => (d.start ? d.start.substring(0, 4) : startYear);
    const getEnd = d => (d.end ? d.end.substring(0, 4) : 2000);

    const x = scaleLinear()
      .domain([startYear, 2000])
      .range([15, width]);

    const y1 = scaleBand()
      .domain(filteredResidents.map(r => r.person.name))
      .range([0, height]);

    const chart = select('#residents-timeline')
      .append('svg')
      .attr('width', width)
      .attr('height', filteredResidents.length * 25 + 30);

    chart.append('defs')
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', width)
      .attr('height', height);

    const main = chart.append('g')
      .attr('height', width)
      .attr('width', width)
      .attr('stroke', 'lightgray');

    main.append('g').selectAll('.dataLines')
      .data(filteredResidents)
      .enter()
      .append('line')
      .attr('x1', 15)
      .attr('x2', width)
      .attr('y1', d => y1(d.person.name))
      .attr('y2', d => y1(d.person.name));

    main.append('g').selectAll('.dataText')
      .data(filteredResidents)
      .enter()
      .append('text')
      .text(d => d.person.name)
      .attr('x', 20)
      .attr('y', d => y1(d.person.name) + 13)
      .attr('dy', '0.5ex')
      .attr('text-anchor', 'start')
      .attr('stroke', '#000')
      .attr('class', 'laneText');

    main.append('g').selectAll('.items')
      .data(filteredResidents)
      .enter()
      .append('rect')
      .attr('x', d => x(getStart(d)))
      .attr('y', d => y1(d.person.name))
      .attr('width', d => x(getEnd(d) - getStart(d) + startYear))
      .attr('height', 24)
      .attr('fill', '#25a7ff')
      .attr('fill-opacity', 0.5);

    chart.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(axisBottom(x).ticks(10, 'f'));

    chart.append('g')
      .attr('transform', `translate(0, ${height})`)
      .attr('class', styles.xAxis)
      .call(axisBottom(x).tickSize(-height).tickFormat(''));
  }

  render() {
    return (
      <div id="residents-timeline" />
    );
  }
}
