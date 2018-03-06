!function(w){
    function Diagram(){
        this.data = obj.data;
        this.domid = obj.domid;
        this.url = obj.url;
    }
    Diagram.prototype.init = function(){
        this.drawone(this.data);
    }
    Diagram.prototype.ajaxdata = function(){
        var url = this.url;
        var datastr = '';
        ajaxpost(url,datastr,function(data){

        })
    }
    Diagram.prototype.drawone = function(data){
        var series = data.series;
        var xAxis = data.xAxis;
        var yAxis = data.yAxis;
        var legend = data.legend;
        var chart = new Highcharts.Chart(this.domid, {
            title: {
                text: data.nametext,
            },
            legend:{
            },
            xAxis: {
                min:xAxis.min,
                max:xAxis.max,
                title: {
                    text: xAxis.name
                },
                gridLineColor: '#808080',
                gridLineWidth: 1,
                minorGridLineColor: '#E0E0E0',
                minorGridLineWidth: 1,
                minorTickLength: 0,
                minorTickInterval: 'auto',
                tickInterval:0.1,
            },
            yAxis: {
                max:yAxis.max,
                min:yAxis.min,
                title: {
                    text: yAxis.name
                },
                minorGridLineColor: '#E0E0E0',
                minorGridLineWidth: 1,
                minorTickLength: 0,
                minorTickInterval: 'auto',
            },
            series: series
        })
    }
    w.diagram = function(obj){
        return new Diagram(obj);
    }
}(window)