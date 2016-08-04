import LineChart from './../graphs/lineChart';
import * as d3_time_format from 'd3-time-format';
import * as d3 from 'd3';

        export default class LineChartDemo {

    constructor()
    {

        let props = {width: 750, height: 300}
        let hel = $('#lineChartMain');
        this.data1 = this.getData();

        this.lchart = new LineChart(hel[0], props, "line1", this.data1);

    }

    getData() {
        let arr = [];
        //let dateFormatter = d3_time_format.timeFormat("%Y-%m-%d")
        let parseDate = d3.timeParse("%Y-%m-%d");
        let myDate = new Date("06/15/2014");
        myDate.setDate(myDate.getDate() + this.rand(20));
        for (var x = 0; x < 15; x++) {
            myDate.setDate(myDate.getDate() + 1);
            var d = d3_time_format.timeFormat("%Y-%m-%d")(myDate);
            //   console.log(formatTime)
            var t = this.rand(200)
            t = Math.abs(t)
            var item = {"date": parseDate(d), "data": t}
            arr.push(item);
        }
        return arr;
    }

    rand(max) {
        return Math.floor(Math.random() * (max + 1))
    }

}