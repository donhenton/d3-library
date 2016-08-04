import * as d3 from 'd3';
import * as d3_scale from 'd3-scale';
export default class PieChart {

    constructor(el, props, id, data)
    {

        this.svg = null;
        this.delay = 250;
        this.element = el;
        this.props = props;
        this.context = id;
        this.legendHeight = 26;
        this.intervals = [];
        this.pieWidth = this.props.width;
        this.pieHeight = this.props.height;
        this.radius = Math.min(this.pieWidth, this.pieHeight) / 2;
        this.radius = 0.85 * this.radius;
        this.svg = d3.select(this.element).append('svg')
                .attr('id', id)
                .attr('width', this.props.width)
                .attr('height', this.props.height)
                //.attr("style", "display:block; margin: 0 auto;")
                .append("g")
                .attr("transform", "translate(" + this.radius + "," + this.radius + ")");
        this.arc = d3.arc()
                .outerRadius(this.radius - 5)
                .innerRadius(0);
        this.labelArc = d3.arc()
                .outerRadius((this.radius))
                .innerRadius(this.radius * 0.65);
        this.keyfunctionP = function (d) {
            if (d.color)
            {
                return d.color;
            } else
            {
                return d.data.color;
            }


        };

        this.keyfunction = this.keyfunctionP.bind(this)
        this.build(data)
    }

    /**
     * covers enter and exit for inner text and pie slices
     */
    build(data)
    {

        let self = this;
        let pie = d3.pie()
                .value(function (d) {
                    return d.percentage;
                })
                .sort(function (d1, d2) {
                    return d1.percentage > d2.percentage
                });
        let arcs = pie(data);
        let pieWithData = this.svg.selectAll('path').data(arcs, self.keyfunction);
        pieWithData.enter().append('path')
                .attr("d", self.arc)
                .each(function (d) {
                    this._current = d;
                })
                .attr("fill", function (d) {
                    return d.data.color
                })

        //////////// outer text labels /////////////////
        var textWithData = this.svg.selectAll("text").data(arcs, self.keyfunction);
        textWithData.enter().append("text")
                .attr("transform", function (d) {
                    // d.innerRadius = 0;
                    // d.outerRadius = self.radius*2;
                    return "translate(" + self.labelArc.centroid(d) + ")";
                })
                .attr("text-anchor", "middle")
                .attr("font-weight", "bold")
                .attr("fill", "black")
                .attr("font-size", "10px")
                .text(function (d) {
                    return d.data.name + "(" + d.data.percentage + ")";
                });


        ////exit ////////////////////////////////////////////////
        textWithData.exit().remove();
        pieWithData.exit().remove();
        this.setTransitionsForSlices(pieWithData);
        this.setTransitionsForText(textWithData);


    }

    setTransitionsForText(textWithData)
    {
        let self = this;
        textWithData
                .transition().duration(this.delay).attr("transform", function (d) {
            return "translate(" + self.labelArc.centroid(d) + ")";
        })
                .text(function (d) {
                    return d.data.name + "(" + d.data.percentage + ")";
                });

    }

    setTransitionsForSlices(pieWithData)
    {
        let self = this;
        function cv_arcTween(a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function (t) {
                return self.arc(i(t));
            };
        }

        pieWithData.transition().duration(this.delay).attrTween("d", cv_arcTween);


    }

    /*
     
     build(data)
     {
     
     
     
     this.arc = d3.arc()
     .outerRadius(this.radius - 5)
     .innerRadius(0);
     this.labelArc = d3.arc()
     .outerRadius((this.radius -5))
     .innerRadius(0);
     let self = this;
     //set pie function
     this.pie = d3.pie()
     .value(function (d) {
     return d.percentage;
     })
     .sort(function (d1, d2) {
     return d1.percentage > d2.percentage
     });
     let arcs = this.pie(data);
     let mainEntry = this.svg.append("g")
     .attr("transform", "translate(" + this.radius + "," + this.props.height / 2 + ")");
     this.groupsEnter = mainEntry
     .selectAll('.arc')
     .data(arcs).enter().append('g').attr("class", "arc");
     this.groupsEnter.append("path")
     .attr("d", self.arc)
     .attr("fill", function (d) {
     return d.data.color
     })
     
     
     //////////////////////////// inner labels ////////////////////////////////////////
     
     let textEntry = this.svg.selectAll("text").data(arcs,self.keyfunction);
     textEntry.enter().append("text")
     
     .attr("transform", function (d) {
     return "translate(" + self.labelArc.centroid(d) + ")";
     })
     // .attr("dy", ".35em")
     .style('font-family', "'graphikRegular', Helvetica, Arial, sans-serif")
     .style('fill', "#4d4e54")
     .style('font-size', '12px')
     .text(function (d) {
     return d.data.name;
     });
     ////////////////////////////  legend  ////////////////////////////////////////////
     
     let legendContainer = mainEntry.append("g").attr("class", 'legend-container')
     
     .attr('fill', 'none')
     .attr('stroke', '#646464')
     .attr('stroke-width', '1px')
     
     .attr('stroke-linejoin', 'round')
     
     var borderPath = mainEntry.append("rect")
     .attr("x", 0)
     .attr("y", 0)
     .attr("height", 130)
     .attr("width", 170)
     .style("stroke", 'black')
     .style("fill", "none")
     .style("stroke-width", 2);
     borderPath.attr('transform', "translate(" + (parseInt(this.props.width) - 310) + ",-45)")
     
     
     legendContainer.attr('transform', "translate(" + (parseInt(this.props.width) - 300) + ",-40)")
     self.legendGroups = legendContainer
     .selectAll('g.legend-content')
     .data(data.sort(function (d1, d2) {
     return d1.percentage < d2.percentage
     }))
     //enter statement for legend items
     self.legendGroupsEnter = self.legendGroups
     .enter()
     .append('g')
     .attr('class', 'legend-content')
     .attr('stroke', 'none')
     .attr(
     'transform', function (d, i) {
     return "translate(0, " + (10 + (i * self.legendHeight)) + ")";
     })
     
     self.legendGroupsEnter.append('circle')
     .attr('class', 'legend-circle')
     .attr("r", 4)
     //                .attr( 
     //                    'transform', function (d, i) {
     //                        return "translate(22, -4)";
     //                     
     //                })
     .attr('fill', function (d, i) {
     return d.color;
     });
     self.legendGroupsEnter
     
     .append("text")
     .attr('class', 'percent')
     
     .attr(
     'transform', function (d, i) {
     return "translate(31, 0)";
     })
     
     .style('font-family', "'graphikRegular', Helvetica, Arial, sans-serif")
     .style('fill', "#4d4e54")
     .style('font-size', '13px')
     
     
     .text(function (d) {
     return d.percentage + '% -- ' + d.name;
     });
     
     }
     */
}

