import LineChart from './../graphs/lineChart';
import * as d3_time_format from 'd3-time-format';
import * as d3 from 'd3';

export default class LineChartDemo {

    constructor()
    {

        let props = {width: 750, height: 300}
        let hel = $('#lineChartMain');
        this.startDate = new Date("06/15/2011");
        this.dataArray = [];
        this.lchart = new LineChart(hel[0], props, "line1", []);

    }

    getData() {


        let parseDate = d3.timeParse("%Y-%m-%d");

        this.startDate.setDate(this.startDate.getDate() + 1);
        var d = d3_time_format.timeFormat("%Y-%m-%d")(this.startDate);
        //   console.log(formatTime)
        var t = this.rand(200)
        t = Math.abs(t)
        var item = {"date": parseDate(d), "data": t}
        this.dataArray.push(item);

    }

    rand(max) {
        return Math.floor(Math.random() * (max + 1))
    }

    startUpdate()
    {
       // console.log("hit")
        this.getData();
        if (this.dataArray.length > 51)
        {
            this.dataArray.shift();
        }
        this.lchart.updateData(this.dataArray);




    }

}