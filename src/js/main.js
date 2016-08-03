//import $ from 'jquery';
import HorizontalDemo from './demos/horizontalDemo';
import PieChartDemo from './demos/pieChartDemo'
var hDemo = null;
var pDemo = null;


$(document).ready(
    function () {
        //hDemo = new HorizontalDemo();
        //var update = hDemo.updateData.bind(hDemo);
        //$('#updateHorizontalData').on('click',update);
        pDemo = new PieChartDemo();
         
    });
