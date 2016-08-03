//import $ from 'jquery';
import HorizontalDemo from './demos/horizontalDemo'
var hDemo = null;


$(document).ready(
    function () {
        hDemo = new HorizontalDemo();
        var update = hDemo.updateData.bind(hDemo);
        $('#updateHorizontalData').on('click',update);
         
    });
