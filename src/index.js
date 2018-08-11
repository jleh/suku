import * as d3 from 'd3';

const createTree = (data) => {
  const nodes = d3.hierarchy(data, d => d.parents)

  const margin = {top: 0, right: 10, bottom: 0, left: 80};
  const width = 1500 - margin.left - margin.right;
  const height = 2000 - margin.top - margin.bottom;

  const tree = d3.tree()
    .size([height, width]);

  const svg = d3.select("body")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

  const g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const link = g.selectAll(".link")
      .data(tree(nodes).links())
      .enter().append("path")
        .attr("class", "link")
        .attr("d", d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x));

  const node = g.selectAll(".node")
    .data(nodes.descendants())
    .enter().append("g")
      .attr("class", d => "node" + (d.children ? " node--internal" : " node--leaf"))
      .attr("transform", d => `translate(${d.y},${d.x})`)

  node.append("circle")
    .attr("r", 2.5);

  node.append('text')
    .attr('dy', 3)
    .attr('x', d => d.children ? -8 : 8)
    .attr('text-anchor', d => d.children ? 'end' : 'start')
    .text(d => d.data.name);
}

fetch('family.json')
  .then(res => res.json())
  .then(createTree);
