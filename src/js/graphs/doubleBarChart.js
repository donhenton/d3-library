/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * this.doublechart = new DoubleChart(hel[0], props, "doubleBar1", this.choices);
 */

import * as d3 from 'd3';
import * as d3_scale from 'd3-scale';
export default class DoubleBarChart {

    /**
     * el    -- element reference to the containing HTML element eg $('#myThing')[0]
     * props -- {width: 200, height: 400}
     * id    -- stting that will be assigned as an id to the svg element
     * data  --  
     * 
     sampleData = {colors: ['#dd0000','#00dd00'], data: [
            {"name": "United States of America", "percentages": [61.7,21.6]},
            {"name": "United Kingdom", "percentages": [49.0,45.21]},
            {"name": "Canada", "percentages": [34.2,63.0]},
            {"name": "Brazil", "percentages": [8,23.8]},
            {"name": "India", "percentages": [75.2,53.2]}, ]}
        
        the colors are arranged major index 0, minor index 1 in the arrays
     * 
     * 
     * 
     * 
     * 
     */

    constructor(el, props, id, data)
    {

        this.svg = null;
        this.element = el;
        this.props = props;
        this.context = id;
        this.intervals = [];
        this.majorColor = data.colors[0];
        this.minorColor = data.colors[1];
        this.dataCount = data.data.length;
        this.keyfunction = function (d) {
            return d.name
        };
        this.createChart(data);



    }

    createChart(data)
    {
        let me = this;

        this.svg = d3.select(me.element).append('svg')
                .attr('id', me.context)
                .attr('width', me.props.width + 10)
                .style('background-color', 'white')
                .style('border', 'thin solid black')
                .style('padding', '5px')
                .attr('height', me.props.height + 10);

        this.svg.append('defs')
                .append('pattern')
                .attr('id', 'diagonalStripes')
                .attr('patternUnits', 'userSpaceOnUse')
                .attr('width', 4)
                .attr('height', 4)
                .append('path')
                .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
                .attr('stroke', '#c7d2d8')
                .attr('stroke-width', 1);


        this.build(data);

    }

    build(data)
    {

        let self = this;

        this.xScale = d3_scale.scaleLinear()
                .domain([0, 100])
                .range([0, this.props.width]);

        let fullBarBlockDisp = this.props.height / self.dataCount;
        let barDisp = fullBarBlockDisp / 2;
        let barHeight = fullBarBlockDisp / 4; //3 sections text, major bar , minor bar


        self.groups  = d3.select('#' + self.context)
                .selectAll('g.group-content')
                .data(data.data, this.keyfunction);
        //enter statement
        self.groupsEnter = self.groups
                .enter()
                .append('g')
                .attr('class', 'group-block')
                .style('border', 'thin solid black')
                .attr(
                        'transform', function (d, i) {
                            return "translate(0," + i * fullBarBlockDisp + ")";

                        });


        //initial background bars / striped background
        self.groupsEnter
                .append('rect')
                .attr('class', 'background-bar')
                .attr('width', self.props.width)
                .attr('height', (barHeight * 2))
                .attr('transform', "translate(0," + (barDisp) + ")")
                .attr('fill', 'url(#diagonalStripes)')
                .style('opacity', 1);

        self.groupsEnter.append('rect')
                .attr('class', 'major-bar')
                .style('fill', function (d, i) {
                    return self.majorColor;
                })
                .style('opacity', 1)
                .attr('transform', function(d,i){
                    return 'translate(0,'+(0.5*fullBarBlockDisp)+')'
                })
                .attr('height', (barHeight))
                .attr('width', 0)
                .transition()
                .duration(500)
                .delay(100)
                .attr(
                        'width', function (d, i) {
                            return self.xScale(d.percentages[0]);
                        })

     
     self.groupsEnter.append('rect')
                .attr('class', 'minor-bar')
                .style('fill', function (d, i) {
                    return self.minorColor;
                })
                .style('opacity', 1)
                .attr('transform', function(d,i){
                    return 'translate(0,'+(0.75*fullBarBlockDisp)+')'
                })
                .attr('height', (barHeight))
                .attr('width', 0)
                .transition()
                .duration(500)
                .delay(100)
                .attr(
                        'width', function (d, i) {
                            return self.xScale(d.percentages[1]);
                        })

    }

}