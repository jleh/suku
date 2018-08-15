import fetch from 'unfetch';
import * as d3 from 'd3';

import React from 'react';
import ReactDOM from 'react-dom';

import Popup from './popup';

const addTextRow = (node, text, rowNumber) => node.append('text')
  .attr('dy', 3 + rowNumber * 10)
  .attr('x', d => (d.children ? -8 : 8))
  .attr('text-anchor', d => (d.children ? 'end' : 'start'))
  .text(text);

const closePopup = () => {
  ReactDOM.render(null, document.getElementById('popup-container'));
};

const openPopup = (node) => {
  ReactDOM.render(
    <Popup person={node.data} closePopup={closePopup} />,
    document.getElementById('popup-container'),
  );
};

const createTree = (data) => {
  const nodes = d3.hierarchy(data, d => d.parents);

  const margin = {
    top: 0, right: 10, bottom: 0, left: 80,
  };
  const width = 1800 - margin.left - margin.right;
  const height = 3000 - margin.top - margin.bottom;

  const tree = d3.tree()
    .size([height, width]);

  const svg = d3.select('body')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  g.selectAll('.link')
    .data(tree(nodes).links())
    .enter().append('path')
    .attr('class', 'link')
    .attr('d', d3.linkHorizontal()
      .x(d => d.y)
      .y(d => d.x));

  const node = g.selectAll('.node')
    .data(nodes.descendants())
    .enter().append('g')
    .attr('class', d => `node ${(d.children ? ' node--internal' : ' node--leaf')}`)
    .attr('transform', d => `translate(${d.y},${d.x})`);

  node.append('circle')
    .attr('r', 2.5);

  addTextRow(node, d => d.data.name, 0);
  addTextRow(node, d => (d.data.events && d.data.events.birth ? `* ${d.data.events.birth}` : ''), 1);
  addTextRow(node, d => (d.data.events && d.data.events.death ? `† ${d.data.events.death}` : ''), 2);

  node.on('click', openPopup);
};

fetch('family.json')
  .then(res => res.json())
  .then(createTree);
