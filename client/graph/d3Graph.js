const d3Data = require('./d3Data');
const d3 = require('d3');

const width = 800, height = 600;


const svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height)

d3.json(d3Data, (error, graph) => {
  if (error) throw error;

  graph.links.forEach(link => {
    link.source = graph.nodes[link.source]
    link.target = graph.nodes[link.target]
  })

  const link = svg.append('g')
    .attr('class', 'link')
    .selectAll('line')
    .data(graph.links)
    .enter().append('line')
    .attr('x1', dot => dot.source.x)
    .attr('y1', dot => dot.source.y)
    .attr('x2', dot => dot.target.x)
    .attr('y2', dot => dot.target.y)
    .attr('stroke-width', dot => dot.weight)

  const node = svg.append("g")
    .attr("class", "node")
    .selectAll("circle")
    .data(graph.nodes)
    .enter().append("circle")
    .attr("r", 4)
    .attr("cx", function (d) { return d.x; })
    .attr("cy", function (d) { return d.y; });
    console.log(graph)
})

