import $ from 'jquery';
import HorizontalChart from './graphs/horizontalBarChart'
var hchart = null;

var data1 = [
        {"name": "United States of America", "percentage": 61, color: '#F79221'},
        {"name": "United Kingdom", "percentage": 9, color: '#00AEEF'},
        {"name": "Canada", "percentage": 23, color: '#1EAE5D'},
        {"name": "Brazil", "percentage": 3, color: '#FCBC19'},
        {"name": "India", "percentage": 3, color: '#A9CF38'}, ]

var data2 = data1.filter((row) => 
{  
    row.percentage = row.percentage + 20;
    return row;
})

data2 = data2.filter((row) => {
    return row.name.indexOf('United') > -1;
})

var choices = [data1,data2]

var flip = 0;

function setup()
{
//'#F79221', '#00AEEF', '#1EAE5D', '#FCBC19', '#A9CF38'
    var props = {width: 850, height: 200}
    var hel = $('#horizontalMain');
    
    hchart = new HorizontalChart(hel[0], props, "bar1", data1);
    // hchart.create({data: myData, length: myData.length})


}

function updateData()
{
    console.log("flip is "+flip)
   
    if (flip === 0)
    {
        flip = 1;
    }
    else
    {
        flip = 0;
    }
     hchart.build(choices[flip])
    
}



$(document).ready(
        function () {
            
            $('#updateButton').on('click',updateData)
            setup();
        });
