!function(w){
    function Detail(obj){
        this.dataid=obj.dataid
        this.url =obj.url
        this.domid =obj.domid
        this.init();
    }
    Detail.prototype.init = function(){
        this.renderhtml();
    }
    Detail.prototype.renderhtml = function(){
        var datastr = "id="+this.dataid+'&pangu=1';
        var _this =this;
        ajaxget(this.url+datastr,function(data){
            if(data.error ==0){
                if(data.data.detail.length!==0){
                    var idata = _this.fordata(data.data.detail)
                    _this.renderchart(idata)
                }else{
                    document.getElementById(_this.domid).innerHTML = '<h1 style="text-align: center;color: #ddd; font-size: 24px;">没有数据</h1>';
                }

            }
        })
    }

    Detail.prototype.fordata = function (data){
        var obj = {}
        for(var i in data){
            var arr = i.split('^_^')
            if(obj[arr[0]+':'+arr[1]] == undefined){
                obj[arr[0]+':'+arr[1]] = []
            }
            obj[arr[0]+':'+arr[1]].push([arr[2],data[i]])
        }
        return obj
    }


    Detail.prototype.renderchart = function (data){
        var html = ''
        var num = 0
        for(var i in data){
            if(data[i].length >1){
                html += '<div id="' + this.domid + '_type_chart_' + num + '" style="width: 290px; height: 290px; display: inline-block; margin: 5px;"></div>'
                num++
            }
        }
        $('#'+this.domid).html(html)
        var cnum = 0
        for(var i in data){
            if(data[i].length >1){
                var chart = new Highcharts.Chart(this.domid+'_type_chart_'+cnum,{
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: '',
                        align:'left'
                    },
                    subtitle:{
                        text:'属性分布:'+i,
                        align:'left',
                        style:{
                            color:'#000',  fontSize:'16px'
                        }
                    },
                    tooltip: {
                        headerFormat: '{series.name}<br>',
                        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    series: [{
                        type: 'pie',
                        innerSize: '80%',
                        name: '',
                        data: data[i]
                    }]
                })
                cnum++
            }

        }

    }

    w.graph = function(obj){
        return new Detail(obj);
    }

}(window);