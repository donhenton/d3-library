import PieChart from './../graphs/pieChart'

export default class PieChartDemo {

    constructor()
    {


        this.data1 = [
            {"name": "US", "percentage": 61, color: '#F79221'},
            {"name": "UK", "percentage": 9, color: '#00AEEF'},
            {"name": "Can", "percentage": 34, color: '#1EAE5D'},
            {"name": "Br", "percentage": 3, color: '#FCBC19'},
            {"name": "Ind", "percentage": 3, color: '#A9CF38'}, ]

        this.data2 = this.data1.map((r) =>
        {
            let row = JSON.parse(JSON.stringify(r));
            row.percentage = row.percentage + 20;
            return row;
        })

        this.data2 = this.data2.filter((row) => {
            return (row.name.indexOf('US') > -1 || row.name.indexOf('UK') > -1);
        })

        this.data2.push({"name": "Fr", "percentage": 95, color: '#ffaadd'})

        this.choices = [this.data1, this.data2]

        let props = {width: 440, height: 200}
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