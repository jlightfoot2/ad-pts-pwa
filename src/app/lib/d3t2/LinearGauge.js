var EventEmitter = require('events').EventEmitter;
var d3 = require('d3');


var ANIMATION_DURATION = 400;
var TOOLTIP_WIDTH = 30;
var TOOLTIP_HEIGHT = 30;

var ns = {};
ns.tickLine = null;
ns.tickCircle = null;
ns.tickPosition = 0.0;
ns.width = 500;
ns.chart_w = ns.width;

ns.create = function(el, props, state) {

	var LF = 30;

	var gauge_h = 60;


	var chart_y_pos = 0;

	var result = state.data;	// in a scale [0 1]
	console.log()
	var resultPos = this.chart_w * result;
    this.tickPosition = resultPos;
	var text_margins = {top: chart_y_pos + gauge_h + 35, right: 10, bottom: 0, left: 10};

	var svg = d3.select(el).append("svg")
	.attr("width", this.width)
	.attr("height", '100%');

	var gradient = svg.append("svg:defs")
	  .append("svg:linearGradient")
	    .attr("id", "gradient")
	    .attr("x1", "0%")
	    .attr("y1", "0%")
	    .attr("x2", "100%")
	    .attr("y2", "0%")
	    .attr("spreadMethod", "pad");

	gradient.append("svg:stop")
	    .attr("offset", "0%")
	    .attr("stop-color", "#0c0")
	    .attr("stop-opacity", 1);

	gradient.append("svg:stop")
	    .attr("offset", "50%")
	    .attr("stop-color", "yellow")
	    .attr("stop-opacity", 1);


	gradient.append("svg:stop")
	    .attr("offset", "100%")
	    .attr("stop-color", "#c00")
	    .attr("stop-opacity", 1);

	svg.append("g")
		.append("rect")
	  .attr("x", 0 )
	  .attr("y", chart_y_pos )
	  .attr("width", "100%" )
	  .attr("height", gauge_h )
	  .style("fill", "url(#gradient)");


	/****************************************
	* Text, titles
	*****************************************/
    /*
	// Left percentage indicator
	svg.append("g")
		.append("text")
	  .attr("x", 0)
	  .attr("y", text_margins.top )
	  .text( "0%" );

	svg.append("g")
		.append("text")
	  .attr("x", 0)
	  .attr("y", text_margins.top + LF )
	  .text( "Alarm" );

	// Right percentage indicator

	svg.append("g")
		.append("text")
		.classed("rightPrcnt", true )
	  .attr("x", chart_w )
	  .attr("y", text_margins.top )
		.attr("text-anchor", "end")
	  .text( "100%" );

	svg.append("g")
		.append("text")
		.classed("rightLabel", true )
	  .attr("x", chart_w )
	  .attr("y", text_margins.top + LF )
		.attr("text-anchor", "end")
	  .text( "width: " + chart_w );
		*/
	  

	/****************************************
	* Result
	*****************************************/


	var tickMark = svg.append("g");

	this.tickLine = tickMark.append("line")
			  
				.attr("y1", chart_y_pos )

				.attr("y2", gauge_h + chart_y_pos )
				.attr("stroke-width", 3)
				.attr("stroke", "black");

	this.tickCircle = tickMark.append("circle")
	  .attr("cy", (gauge_h + chart_y_pos) / 2 )
		.attr("r", 10);

	  var dispatcher = new EventEmitter();

	  this.update(el, state, dispatcher)
	  return dispatcher;
};

ns.update = function(el, state, dispatcher) {

  var scales = this._scales(el, state.domain);
  var prevScales = this._scales(el, state.prevDomain);
  var resultPos = this.chart_w * state.data;
  this.tickPosition = resultPos;
  this.tickLine.attr("x2", this.tickPosition);
  this.tickLine.attr("x1", this.tickPosition)
  this.tickCircle.attr("cx", this.tickPosition);
  this._draw(el, scales, state.data, prevScales, dispatcher);
  //this._drawTooltips(el, scales, state.tooltips, prevScales);
};

ns._scales = function(el, domain) {
  if (!domain) {
    return null;
  }

  var width = el.offsetWidth;
  var height = el.offsetHeight;

  var x = d3.scaleLinear()
    .range([0, width])
    .domain(domain.x);

  var y = d3.scaleLinear()
    .range([height, 0])
    .domain(domain.y);

  var z = d3.scaleLinear()
    .range([5, 20])
    .domain([1, 10]);

  return {x: x, y: y, z: z};
};

ns._draw = function(el, scales, data, prevScales, dispatcher) {


};


ns.destroy = function(el) {

};

export default ns;