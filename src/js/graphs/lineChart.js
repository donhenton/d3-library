import * as d3 from 'd3';
import * as d3_scale from 'd3-scale';
import * as d3_time from 'd3-time';
import * as d3_time_format from 'd3-time-format';


export default class LineChart {

    constructor(el, props, id, data)
    {

        this.svg = null;
        this.data = data;
        this.element = el;
        this.props = props;
        this.context = id;
        this.x = d3_scale.scaleTime().range([0, this.props.width * .85]);
        this.y = d3_scale.scaleLinear().range([this.props.height * .85, 0]);
        this.xAxis = null;
        this.yAxis = null;
        let self = this;
        this.formatTime = d3_time_format.timeFormat("%_m/%_d");
        this.dateFormatter = d3_time_format.timeFormat("%Y-%m-%d")
        this.parseDate = this.dateFormatter.parse;
        this.delay = 200;
        this.div = d3.select("body").append("div")	// declare the properties for the div used for the tooltips
                .attr("class", "tooltip")				// apply the 'tooltip' class
                .style("opacity", 0);

        this.greenColor = "#667467";
        this.redColor = "#963019";
        this.blueColor = "#16174f";

//        $blue-color: #16174f;
//$red-color: #963019;
//$white-color: #f6f1ed; //this will have black text all others white
//$green-color: #667467;
//        

        this.keyFunction = function (d) {

            return  d.date;

        };

        this.valueline = d3.line()
                .x(function (d) {
                    return self.x(d.date);
                })
                .y(function (d) {
                    return self.y(d.data);
                });

        /////////
        this.svg = d3.select(this.element).append('svg')
                .attr('id', id)
                .attr('width', this.props.width)
                .attr('height', this.props.height)
        this.svgGroup = this.svg

                .append("g")
                .attr("transform", "translate(50,15)")

        this.assembleAxes();
        this.initialDraw();

    }

    initialDraw()
    {


        this.svgGroup.append("path")
                .attr("class", "line")
                .attr("fill", "none")
                .attr("stroke", this.redColor)
                .attr("stroke-width", 2)
                .attr("shape-rendering", "crispEdges")
                .attr("d", this.valueline(this.data));

        this.doDots();

    }

    doDots()
    {
        let dots = this.svgGroup.selectAll(".dot").data(this.data, this.key);
        let self = this;
       // dots.attr("fill", this.blueColor); 
        dots.enter().append("circle")
                .attr("fill", this.greenColor)
                .attr("r", 5)
                .attr("class", "dot")
                .attr("cx", function (d) {
                    return self.x(d.date);
                })
                .attr("cy", function (d) {
                    return self.y(d.data);
                })
                // Tooltip stuff after this
                .on("mouseover", function (d) {
                    self.div.transition()
                            .duration(self.delay)
                            .style("opacity", .9);
                    self.div.html(self.formatTime(d.date) + "<br/>" + d.data)
                            .style("left", (d3.event.pageX) + "px")
                            .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function (d, x, y) {
                    self.div.transition()
                            .duration(self.delay)
                            .style("opacity", 0);                                                   // and go all the way to an opacity of nil
                    // console.log(d + " " + x + " " + y)

                });
        // delete
        dots.exit().transition().duration(self.delay).attr("fill", "red").remove();
        //update
        dots.transition().duration(self.delay)
                .attr("r", 5)
                .attr("cx", function (d) {
                    return self.x(d.date);
                })
                .attr("cy", function (d) {
                    return self.y(d.data);
                })
    }

    assembleAxes()
    {
        let self = this;

        this.x.domain(d3.extent(this.data, function (d) {

            return d.date;
        }));
        this.y.domain([0, d3.max(this.data, function (d) {
                return d.data;
            })]);

        this.xAxis =
                d3.axisBottom()
                .scale(this.x).tickPadding(15)
                .ticks(8)
                .tickFormat(function (d) {
                    //return d3.time.format("%Y-%m-%d")
                    return self.formatTime(d)
                })
                .tickSizeInner([4])
                .tickSizeOuter([20])
        //  .orient("bottom");

        this.yAxis = d3.axisLeft().scale(this.y)
                .ticks(8)


        this.svgGroup.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + (this.props.height - 45) + ")")
                .call(this.xAxis);

        // Add the Y Axis
        this.svgGroup.append("g")
                .attr("class", "y axis")
                // .attr("transform", "translate(0,15)")
                .call(this.yAxis);
    }
    
    
    updateData(data) {


    let self = this;
    this.data = data;
    
    this.x.domain(d3.extent(data, function (d) {
        return d.date;
    }));
    this.y.domain([0, d3.max(data, function (d) {
            return d.data;
        })]);

    let svg2 = this.svgGroup.transition();
    //console.log( svg2.select(".line").duration(750))

    svg2.select(".line")   // change the line
            .duration(this.delay)
            .attr("d", this.valueline(data));
    svg2.select(".x.axis") // change the x axis
            .duration(this.delay)
            .call(this.xAxis);
    svg2.select(".y.axis") // change the y axis
            .duration(this.delay)
            .call(this.yAxis);


    this.doDots();
}
    
    
    
    
    

}
