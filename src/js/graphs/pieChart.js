import * as d3 from 'd3';
import * as d3_scale from 'd3-scale';
export default class PieChart {

    constructor(el, props, id, data)
    {

        this.svgGroup = null;
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
                .attr('width', this.props.width + 300)
                .attr('height', this.props.height)
        this.svgGroup = this.svg
                //.attr("style", "display:block; margin: 0 auto;")
                .append("g")
                .attr("transform", "translate(" + (this.radius + 10) + "," + this.radius + ")");
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
        let pieWithData = this.svgGroup.selectAll('path').data(arcs, self.keyfunction);
        pieWithData.enter().append('path')
                .attr("d", self.arc)
                .each(function (d) {
                    this._current = d;
                })
                .attr("fill", function (d) {
                    return d.data.color
                })

        //////////// outer text labels /////////////////
        let textWithData = this.svgGroup.selectAll("text").data(arcs, self.keyfunction);
        textWithData.enter().append("text")
                .attr("transform", function (d) {
                    return "translate(" + self.labelArc.centroid(d) + ")";
                })
                .attr("text-anchor", "middle")
                .attr("font-weight", "bold")
                .attr("fill", "#ffffee")
                .attr("font-size", "10px")
                .text(function (d) {
                    return d.data.name ;
                });


        ////exit ////////////////////////////////////////////////
        textWithData.exit().remove();
        pieWithData.exit().remove();
        this.setTransitionsForSlices(pieWithData);
        this.setTransitionsForText(textWithData);
        this.createLegend(data);


    }

    createLegend(data)
    {
        data = data.sort(function(a,b){return a.percentage < b.percentage})
        let self = this;
        let legendGroup = this.svg.append('g').attr("class", 'legend-group')
        let textGroup = this.svg.selectAll("text.legend-text").data(data, self.keyfunction);
        let circleGroup = this.svg.selectAll(".legend-circle").data(data, self.keyfunction);
        legendGroup.append("text")
                .attr("text-anchor", "left")
                .attr("fill", "black")
                .attr("font-size", "18px")
                .attr("font-weight", "bold")
                .attr("transform", "translate(5,-5)")
                .text("Legend");

        legendGroup.append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("height", 1)
                .attr("width", 120)
                .style("stroke", 'black')
                .style("fill", "none")
                .style("stroke-width", 2);
        legendGroup.attr('transform', "translate(" + (this.props.width + 100) + ",40)")

        textGroup.enter()
                .append("text")
                .attr("class", 'legend-text')
                .attr("text-anchor", "left")
                .attr("fill-opacity",1)
                .attr("fill", "black")
                .attr("font-size", "15px")
                .attr('transform', function (d, i)
                {
                    return "translate( 420, " + (70 + (i * 30)) + ")"
                })
                .text(function (d) {
                    return d.name + " (" + d.percentage + "%)";
                });
                
        textGroup.transition().duration(200).attr("fill-opacity",.5)        
         .text(function (d) {
                    return d.name + " (" + d.percentage + "%)";
                }).attr("fill", "red") 
         .transition().duration(600).attr("fill-opacity",1).attr("fill", "black")           

        circleGroup.enter()
                .append('circle')
                .attr('class', 'legend-circle')
                .attr("r", 4)
                .attr(
                        'transform', function (d, i) {
                            return "translate( 400, " + (65 + (i * 30)) + ")"

                        })
                .attr('fill', function (d, i) {
                    return d.color;
                });


        textGroup.exit().remove();
        circleGroup.exit().remove();

    }

    setTransitionsForText(textWithData)
    {
        let self = this;
        textWithData
                .transition().duration(this.delay).attr("transform", function (d) {
            return "translate(" + self.labelArc.centroid(d) + ")";
        })
                .text(function (d) {
                    return d.data.name ;
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
 
}

