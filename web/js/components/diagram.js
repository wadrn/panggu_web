!function(w){
    function Diagram(obj){
        this.data = obj.data;
        this.domid = obj.domid;
        this.start = obj.start;
        this.init();
    }
    Diagram.prototype.init = function(){
        this.renderdata();
    }
    Diagram.prototype.renderdata = function(){
        var data = this.data;

        if(data instanceof Array && data.length !== 1){

            for(var i=0;i<data.length;i++){
                if(data[i].type ==''){
                    data[i].series = this.operate(data[i]);   //对折线图进行坐标处理
                }
                this.drawone(data[i],this.domid+this.start,data[i].type);
                this.start++;

                // if(data[i].type ==''){
                //     data[i].series = this.operate__new_line(data[i]);   //对折线图进行坐标处理
                //     this.drawone(data[i],this.domid+this.start,data[i].type);
                //     this.start++;
                // }
            }
        }else if(data instanceof Object && data.series && data.xAxis){
            this.drawone(data,this.domid+this.start,'double');
            this.start++;
        }else{
            for(var key in data){
                data[key].title = key;
                data[key].series = this.operate_column(data[key]);  //对柱状图进行处理
                this.drawone(data[key],this.domid+this.start,data[key].type);
                this.start++;
            }
        }
    }
    Diagram.prototype.operate_column =function(data){
        var series =[];
        for(var v in data.series){
            var item ={};
            item.name =v;
            item.data = data.series[v]
            series.push(item);
        }
        return series;
    };
    Diagram.prototype.operate = function(data){
        var series =[];
        for(var i=0;i<data.series.x.length;i++){
            series[i]={};
            series[i].data =[];
            if(data.series.line_name){
                series[i].name =data.series.line_name[i];
            }
            if(data.series.x[i]){
                for(var j=0;j<data.series.x[i].length;j++){
                    series[i].data[j]=[];
                    series[i].data[j].push(data.series.x[i][j]);
                    series[i].data[j].push(data.series.y[i][j]);
                }
            }
        }
        return series;
    }
    Diagram.prototype.operate__new_line = function(data){
        var series=[];
        series[0]={};
        series[0].name = data.series.line_name;
        series[0].data=[];
        for(var i=0;i<data.series.x.length;i++){
            series[0].data[i] =[];
            series[0].data[i].push(data.series.x[i]);
            series[0].data[i].push(data.series.y[i]);
        }
        return series;
    };

    Diagram.prototype.drawone = function(data,dom,type){
        var series = data.series;
        var xAxis = data.xAxis;
        var yAxis = data.yAxis;
        switch (type){
            case '':
                var chart = new Highcharts.Chart(dom, {
                    credits: {
                        enabled: false
                    },
                    chart: {
                        type: data.type
                    },
                    title: {
                        text: data.title,
                    },
                    legend:{
                        enabled:false
                    },
                    xAxis: {
                        min:parseFloat(xAxis.min),
                        max:parseFloat(xAxis.max),
                        title: {
                            text: xAxis.name
                        },
                        gridLineColor: '#E0E0E0',
                        gridLineWidth: 1,
                        minorGridLineColor: '#E0E0E0',
                        minorGridLineWidth: 1,
                        minorTickLength: 0,
                        minorTickInterval: 0.1,
                        tickInterval:0.2,
                    },
                    yAxis: {
                        min:parseFloat(yAxis.min),
                        max:parseFloat(yAxis.max),
                        title: {
                            text: yAxis.name
                        },
                        gridLineColor: '#E0E0E0',
                        gridLineWidth: 1,
                        minorGridLineColor: '#E0E0E0',
                        minorGridLineWidth: 1,
                        minorTickLength: 0,
                        minorTickInterval: 0.1,
                        tickInterval:0.2,
                    },
                    series: series
                });
                break;            //折线图
            case 'column':
                chart = new Highcharts.Chart(dom, {
                    credits: {
                        enabled: false
                    },
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: data.title
                    },
                    xAxis: {
                        categories: xAxis,
                        gridLineWidth: 1,
                    },
                    yAxis: {
                        min: parseFloat(yAxis.min),
                        title: {
                            text: yAxis.title
                        }
                    },
                    legend: {
                    },
                    plotOptions: {
                        series: {
                            stacking: data.column_type
                        }
                    },
                    series: series
                });
                break;      //柱状图
            case 'double':
                chart = new Highcharts.Chart(dom,{
                    credits: {
                        enabled: false
                    },
                    chart: {
                        zoomType: 'xy'
                    },
                    title: {
                        text: "Iou_tp_fp_miss_distributiondouble"
                    },
                    xAxis:[{
                        categories: xAxis.series,
                        gridLineWidth: 1,
                    }],
                    yAxis: [
                        { // Primary yAxis
                        title: {
                            text: 'num',
                        }
                    }, { // Secondary yAxis
                        title: {
                            text: 'ap',
                        },
                            opposite:true
                    },],
                   series:series
                })      //双坐标图
        }
    };
    function strToint(series){
        var result=[];
        for(var i=0;i<series.length;i++){
            for(var j=0;j<series[i].data.length;j++){
                if(series[i].data[j] instanceof Array){
                    series[i].data[j][0] = parseFloat(series[i].data[j][0]);
                    series[i].data[j][1] = parseFloat(series[i].data[j][1]);
                }else{
                    result.push(parseFloat(series[i].data[j]));
                    series[i].data = result;
                }

            }

        }
        return series;
    }
    w.diagram = function(obj){
        return new Diagram(obj);
    }
}(window)