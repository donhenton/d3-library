//import $ from 'jquery';
import HorizontalDemo from './demos/horizontalDemo';
import PieChartDemo from './demos/pieChartDemo'
import LineChartDemo from './demos/lineChartDemo'
var hDemo = null;
var pDemo = null;
var lDemo = null;


$(document).ready(
    function () {
        let hDemo = new HorizontalDemo();
        let updateH = hDemo.updateData.bind(hDemo);
        $('#updateHorizontalData').on('click',updateH);
        let pDemo = new PieChartDemo();
        let updateP = pDemo.updateData.bind(pDemo);
        $('#updatePieData').on('click',updateP);
        let lDemo = new LineChartDemo();
        let updateL = lDemo.updateData.bind(lDemo);
        $('#updateLineData').on('click',updateL);
         
    });
// http://jsfiddle.net/vfkSs/1/
// http://jsfiddle.net/vfkSs/2/
// http://stackoverflow.com/questions/17222711/d3-js-updating-a-pie-with-lables