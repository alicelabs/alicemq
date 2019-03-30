// unfinished/src/components/axis.jsx
import React from 'react';
import * as d3    from 'd3';

export default class Axis extends React.Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    var node  = this.refs.axis;

    // D3 Version 4+, still doesn't work right
    var xAxis = d3.axisBottom(this.props.xScale).ticks(5);
    var yAxis = d3.axisLeft(this.props.yScale);
    d3.select(node).call(xAxis);
    d3.select(node).call(yAxis);

    // Version 3, D3 version and functional
    // var axis = d3.svg.axis().orient(this.props.orient).ticks(5).scale(this.props.scale);
    // d3.select(node).call(axis);
  }

  render() {
    return <g className="axis" ref="axis" transform={this.props.translate}></g>
  }
}