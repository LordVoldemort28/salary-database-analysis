import React, { Component } from 'react';
import * as d3 from 'd3'
import d3tip from 'd3-tip'

class ScatterPlot extends Component {

constructor(props) {
    super(props);

    this.state = {
        x: null,
        y: null,
        chat: null,
        allgroup: null,
        tooltip: null,
    };
    }

  componentDidMount() {
      this.createBarPlot()
  }

  setChart() {
    const margin = {top: 20, right: 20, bottom: 70, left: 140},
      width = 800 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
      var barHeight = 20;
      this.setState({margin, width, height, barHeight}) 
      
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var chart = d3.select(".chart_scatter")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)

    var allgroup = chart.append("g")
                      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");   

    var this1 = this;
    var tooltip = d3tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
      return "<span style='color:palevioletred'>" + d.name +": " + this1.numberWithCommas(d.salary) +  "</span>";
      })

      allgroup.call(tooltip);
    this.setState({x, y, chart, allgroup, tooltip}) 
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

  sortBar = () => {
      
        const this1 = this
        this1.state.chart.selectAll("rect")
            .sort(function(a, b) {
                return d3.ascending(a.salary, b.salary);
            })
            .transition()
            .delay(function (d, i) {
            return i * 20;
            })
            .duration(1000)
            .attr("x", function (d, i) {
            return this1.state.x(i);
            });
    }

  createBarPlot = async () => {
    await this.setChart()
    var this1 = this;
    
    this.state.x.domain([0, d3.max(this.props.tempData, function(d) { return d.ID; })]);
    this.state.y.domain([0, d3.max(this.props.tempData, function(d) { return d.salary; })]);
  
    this.state.chart.attr("height", this1.state.margin.top + this1.state.barHeight * this1.props.tempData.length);
      
   var circle = this.state.allgroup.selectAll("g")
			.data(this.props.tempData)
		.enter().append("g")

    circle.append("circle")
        .style("fill", "turquoise")
        .attr("cx", function(d) { return this1.state.x(d.ID); })
        .attr("r", 5)
        .attr("cy", function(d) { return this1.state.y(d.salary); })
        .on('mouseover', function(d){
            d3.select(this).attr("fill", "pink")
            this1.state.tooltip.show(d, this);
        })
        .on('mouseout', function(d){
            d3.select(this).attr("fill", "turquoise")
            this1.state.tooltip.hide(d, this);
        })

        var xAxis = d3.axisBottom(this1.state.x);
    
        this1.state.allgroup.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + this1.state.height + ")")
        .call(xAxis)
      .selectAll("text")
        .attr("y", 15)
        .attr("x", -20)
        .style("text-anchor", "start");
    
        var ticksX = d3.select("g.x").selectAll(".tick text");
        ticksX.attr("class", function(d,i){
            if(d == 0){return "zeroX"}    
        });
    
        var xLabel = d3.select("g.x").append("g")
                        .append("text").text("Department ID")
                        .attr("class", "xLabel")
                        .attr("transform", "translate(" + this1.state.width + ",-5)")
    
    
        var yAxis = d3.axisLeft(this1.state.y);
    
        this1.state.allgroup.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .selectAll("text")
        .attr("x", -55)
        .style("text-anchor", "start");
    
        var ticksY = d3.select("g.y").selectAll(".tick text");
        ticksY.attr("class", function(d,i){
            if(d == 0){return "zeroY"}
        })
    
    
        var YLabel = d3.select("g.y").append("g")
                        .append("text").text("salary")
                        .attr("class", "yLabel") 

  }

  render() {
    return (
      <div className="App">
        <svg className="chart_scatter"></svg>
      </div>
    );
  }
}

export default ScatterPlot;