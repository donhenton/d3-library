import $ from 'jquery';
import HorizontalChart from './graphs/horizontalBarChart'
var hchart = null;

        function setup()
        {
//'#F79221', '#00AEEF', '#1EAE5D', '#FCBC19', '#A9CF38'
            var props = {width: 850, height: 200}
            var hel = $('#horizontalMain');
            var myData = [
                {"name": "United States of America", "percentage": 61,color: '#F79221'}, 
                {"name": "United Kingdom", "percentage": 9,color: '#00AEEF'},  
                {"name": "Canada", "percentage": 23,color: '#1EAE5D'},  
                {"name": "Brazil", "percentage": 3,color: '#FCBC19'},  
                {"name": "India", "percentage": 3,color: '#A9CF38'}, ]
            hchart = new HorizontalChart(hel[0], props, "bar1", myData);
            // hchart.create({data: myData, length: myData.length})


        }

$(document).ready(
        function () {

            setup();
        });
