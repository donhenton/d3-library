import HorizontalChart from './../graphs/horizontalBarChart'
import * as d3 from 'd3'; 
export default class HorizontalDemo {

    constructor()
    {
        this.dim = {width: 800, height: 200};

        this.data1 = [
            {"name": "United States of America", "percentage": 25, color: '#F79221'},
            {"name": "United Kingdom", "percentage": 33, color: '#00AEEF'},
            {"name": "Canada", "percentage": 50, color: '#1EAE5D'},
            {"name": "Brazil", "percentage": 75, color: '#FCBC19'},
            {"name": "India", "percentage": 99, color: '#A9CF38'}, ]

        this.data2 = this.data1.map((r) =>
        {
            let row = JSON.parse(JSON.stringify(r));
            row.percentage = row.percentage + 20;
            return row;
        })

        this.data2 = this.data2.filter((row) => {
            return row.name.indexOf('United') > -1;
        })

        this.data2.push({"name": "Xanadu", "percentage": 95, color: '#ffaadd'})

        this.choices = [this.data1, this.data2]

        this.props = {width: this.getWidth.bind(this), height: this.getHeight.bind(this)}
        let hel = $('#horizontalMain');

        this.hchart = new HorizontalChart(hel[0], this.props, "bar1", this.data1);
        this.flip = 0;
        this.resize();
        d3.select(window).on('resize', this.resize.bind(this));

    }
    getWidth()
    {
        
        return this.dim.width;
    }

    getHeight()
    {
        return this.dim.height;
    }

    updateData()
    {


        if (this.flip === 0)
        {
            this.flip = 1;
        } else
        {
            this.flip = 0;
        }
        this.hchart.build(this.choices[this.flip])
        this.resize();

    }

    resize()
    {
      var width = parseInt(d3.select("#bar1").style("width")) ;
      var leftOffset = $("#bar1").offset().left
      var paneSize = (width+leftOffset) *1.1
      
      
      //var drop = window.innerWidth/paneSize;
      
      if (window.innerWidth < (paneSize))
      {
          console.log("should shrink")
          this.dim.width =  (window.innerWidth - leftOffset)*.9;
          
      }
      else
      {
          this.dim.width = width;
      }
      this.hchart.resize()
      console.log("pane "+ paneSize+" window inner " +window.innerWidth+" widht "+this.dim.width);
 

    }


}