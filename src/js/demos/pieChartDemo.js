import PieChart from './../graphs/pieChart'

        export default class PieChartDemo {

    constructor()
    {


        this.data1 = [
            {"name": "US", "percentage": 61, color: '#F79221'},
            {"name": "UK", "percentage": 9, color: '#00AEEF'},
            {"name": "Can", "percentage": 20, color: '#1EAE5D'},
            {"name": "Br", "percentage": 5, color: '#d42222'},
            {"name": "Ind", "percentage": 5, color: '#A9CF38'}, ]



        this.data2 = this.data1.filter((row) => {
            return (row.name.indexOf('US') > -1 || row.name.indexOf('UK') > -1);
        })
         
        let temp = [];
        let vals = [80, 15];
        let self = this;
        this.data2.forEach((r, i) =>
        {
            let row = JSON.parse(JSON.stringify(r));
            row.percentage = vals[i];
             temp.push(row);
        })
        temp.push({"name": "Fr", "percentage": 5, color: '#ffaadd'})
        this.data2 = temp;



        this.choices = [this.data1, this.data2]

        let props = {width: 300, height: 300}
        let hel = $('#pieMain');

        this.pchart = new PieChart(hel[0], props, "pie1", this.data1);
        this.flip = 0;

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
        this.pchart.build(this.choices[this.flip])

    }

}