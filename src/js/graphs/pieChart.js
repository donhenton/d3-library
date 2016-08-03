import * as d3 from 'd3';
        import * as d3_scale from 'd3-scale';
        export default class PieChart {

        constructor(el, props, id, data)
        {

        this.svg = null;
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
                .attr('height', this.props.height);
                this.keyfunction = function (d) {
                return d.color
                };
                this.build(data)
        }

        build(data)
        {
        this.arc = d3.arc()
                .outerRadius(this.radius - 5)
                .innerRadius(0);
                this.labelArc = d3.arc()
                .outerRadius(this.radius + 2)
                .innerRadius(this.radius + 2);
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


                this.groupsEnter.append("text")
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
                .attr('stroke','none')
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

}

