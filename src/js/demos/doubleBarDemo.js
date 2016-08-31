import DoubleChart from './../graphs/doubleBarChart'

export default class DoubleBarDemo {

    constructor()
    {

 

        this.data1 = {colors: ['#dd0000','#00dd00'], data: [
            {"name": "United States of America", "percentages": [61.7,21.6]},
            {"name": "United Kingdom", "percentages": [49.0,45.21]},
            {"name": "Canada", "percentages": [34.2,63.0]},
            {"name": "Brazil", "percentages": [8,23.8]},
            {"name": "India", "percentages": [75.2,53.2]}, ]}
    
 

        let props = {width: 200, height: 250}
        let hel = $('#doubleBarMain');
        this.doublechart = new DoubleChart(hel[0], props, "doubleBar1", this.data1);
        

    }

     

}