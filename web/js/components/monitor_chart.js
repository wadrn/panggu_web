!function(w){
    function Monitor_chart(obj){
        var obj  = obj || {}
        this.domid = obj.domid;
        this.url = obj.url;
        this.data = obj.data;
        this.istype = obj.istype || 0
        this.init();
    }
    Monitor_chart.prototype.init = function(){
        this.renderdata();
    }
    Monitor_chart.prototype.renderdata = function(){
        var url = this.url;
        var datastr ='';
        var html ='';
        var _this = this;
        if(url){
            ajaxget(url,function(data){
                if(data.error ==0){
                    html += '<ul>'
                    for(var i=0;i<data.data.length;i++){   //遍历每个图表
                        html += '<li style="float: left;padding: 10px; margin-right: 15px;margin-bottom: 15px;border: 1px solid #ccc;"><div id="chart'+i+'" style="width: 330px;height: 330px;"></div></li>'
                    }
                    html += '</ul>'
                    document.getElementById(_this.domid).innerHTML =html;
                    for(var i=0;i<data.data.length;i++){   //遍历多个图
                        var data = data.data[i];           //每个图的数据
                        var series;
                        if(_this.istype == 0){
                            series = _this.format(data);                 //数据格式化
                            _this.draw(series,'chart'+i);
                        }else if(_this.istype ==1){
                            data.series = _this.format1(data);
                            _this.draw1(data,'chart'+i);
                        }

                    }
                }else{
                    errorPrompt(data['msg']);
                }
            })
        }else{
            html += '<ul>'

            for(var i=0;i<this.data.length;i++){   //遍历每个图表
                html += '<li style="float: left;padding: 10px; margin-right: 15px;margin-bottom: 15px;border: 1px solid #ccc;"><div id="chart'+i+'" style="width: 350px;height: 350px;"></div></li>'
            }
            html += '</ul>'
            document.getElementById(this.domid).innerHTML =html;

            for(var i=0;i<this.data.length;i++){   //遍历多个图
                var data = this.data[i];           //每个图的数据
                var series;
                if(this.istype == 0){
                    series = this.format(data);                 //数据格式化
                    this.draw(series,'chart'+i);
                }else if(this.istype ==1){
                    data.series = this.format1(data);
                    this.draw1(data,'chart'+i);
                }

            }
        }
    }
    Monitor_chart.prototype.draw = function(series,dom){
        var chart = new Highcharts.Chart(dom, {
            credits: {
                enabled: false
            },
            series: series
        });
    }
    Monitor_chart.prototype.draw1 = function(data,dom){
        var xAxis = data.xAxis;
        var yAxis = data.yAxis;
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
                verticalAlign:'top',
                y:20
            },
            xAxis: {
                min:parseFloat(xAxis.min),
                max:parseFloat(xAxis.max),
                title: {
                    text: xAxis.name
                },
                gridLineColor: '#808080',
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
                gridLineColor: '#808080',
                gridLineWidth: 1,
                minorGridLineColor: '#E0E0E0',
                minorGridLineWidth: 1,
                minorTickLength: 0,
                minorTickInterval: 0.1,
                tickInterval:0.2,
            },
            series: data.series
        });
    }
    Monitor_chart.prototype.format = function(data){
        var series =[];
        series[0]={};
        series[0].data=[];
        for(var i=0;i<data.length;i++){
            series[0].data[i]=[];
            series[0].data[i].push(data[i][1]);
            series[0].data[i].push(data[i][2]);
        }
        return series;
    }

    Monitor_chart.prototype.format1 = function(data){
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

    w.monitor_chart = function(obj){
        return new Monitor_chart(obj);
    }
}(window)