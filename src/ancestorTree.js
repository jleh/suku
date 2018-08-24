import React, { Component } from 'react';

import { hierarchy, tree } from 'd3-hierarchy';
import { linkHorizontal } from 'd3-shape';
import { select } from 'd3-selection';

const d3 = Object.assign({}, {
  hierarchy,
  tree,
  linkHorizontal,
  select
});

const addTextRow = (node, text, rowNumber) => node.append('text')
  .attr('dy', 3 + rowNumber * 10)
  .attr('x', d => (d.children ? -8 : 8))
  .attr('text-anchor', d => (d.children ? 'end' : 'start'))
  .text(text);

export default class AncestorTree extends Component {
  componentDidMount() {
    const { data } = this.props;

    this.createTree(data);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.node.on('click', null);
  }

  createTree(data) {
    const { personSelected } = this.props;
    const nodes = d3.hierarchy(data, d => d.parents);

    const margin = {
      top: 0, right: 10, bottom: 0, left: 80
    };
    const width = 2200 - margin.left - margin.right;
    const height = 4000 - margin.top - margin.bottom;

    const ancestorTree = d3.tree()
      .size([height, width]);

    const svg = d3.select('#tree')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g.selectAll('.link')
      .data(ancestorTree(nodes).links())
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x));

    const getLeafClassName = d => (d.children ? ' node--internal' : ' node--leaf');
    const getDuplicateClassName = d => (d.data.duplicate ? 'node--duplicate' : '');

    const node = g.selectAll('.node')
      .data(nodes.descendants())
      .enter().append('g')
      .attr('class', d => `node ${getLeafClassName(d)} ${getDuplicateClassName(d)}`)
      .attr('transform', d => `translate(${d.y},${d.x})`);

    node.append('circle')
      .attr('r', 2.5);

    addTextRow(node, d => d.data.name, 0);
    addTextRow(node, d => (d.data.events && d.data.events.birth ? `* ${d.data.events.birth}` : ''), 1);
    addTextRow(node, d => (d.data.events && d.data.events.death ? `† ${d.data.events.death}` : ''), 2);

    node.on('click', n => personSelected(n.data));
    this.node = node;
  }

  render() {
    return <div id="tree" />;
  }
}
