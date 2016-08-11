import React,{Component} from 'react';
import { connect } from 'react-redux';


import d3Chart from './lib/d3t2/LinearGauge.js';
var sampleData = [

];

var Gauge = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    domain: React.PropTypes.object
  },
  
  componentDidMount: function() {

    var el = this.refs.assessmentGauge;
    d3Chart.create(el, {
      width: '100%',
      height: '300px'
    }, this.getChartState());
  },

  componentDidUpdate: function() {
    var el = this.refs.assessmentGauge;
    d3Chart.update(el, this.getChartState());
  },

  getChartState: function() {
    return {
      data: this.props.result,
      domain: {x: [0, 30], y: [0, 100]}
    };
  },

  
  componentWillUnmount: function() {
    var el = this.refs.assessmentGauge;
    d3Chart.destroy(el);
  },

  render: function() {
    return (
      <div ref="assessmentGauge"></div>
    );
  }
});



export default Gauge