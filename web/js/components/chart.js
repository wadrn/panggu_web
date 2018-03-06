!function(w){
    function Chart(obj){
        this.domid =obj.domid ||'';

        // this.taskid  = urlfun.getquery('id') || 2;
        this.taskid = 1;

        this.epochurl = obj.epochurl || '';  //根据任务获取评测信息
        this.lineurl = obj.lineurl||'';      //折线图
        this.columnurl = obj.columnurl||'';  //柱状图
        this.binaryurl = obj.binaryurl||'';  //双坐标图
        this.totalurl = obj.totalurl || '';    //总图


        this.epochs =obj.epochs;           //轮数
        this.epoch_cur = obj.epoch_cur;   //当前轮数
        this.times = obj.times;          //次数
        this.judgeid = obj.judgeid; //当前次数可以用当前judgeid来表示
        this.data = obj.data;
        // this.init();
        this.cur_judge_img = obj.cur_judge_img || 0;
    }

    var evalevel = ['','RPN','CNN'];
    Chart.prototype.init=function(){
        var html ='';
        var _this = this
        html += '<div id="epochlist"></div>';
        html += '<div id="timelist"></div>';
        html += '<div style="height: 2px; width: 100%; background: #ccc;"></div>';
        html += '<div id="chartlist" style="margin-right: 500px;overflow: auto;height: 100%;"></div>';
        html += '<div id="paramlist">';
        html += '<div style="margin: 20px 0;">' +
            '<div><a href="javascript:;" class="v btn">评测参数配置</a>' +
            '<a href="javascript:;" class="v btn blue" id="new_evaluate_task" style="float: right;">新建评测任务</a>' +
            '</div><div id="evaluate_param_list" class="evaluate_config_list"></div></div>';
        html += '<div>' +
            '<div><a href="javascript:;" class="v btn">评测结果</a></div>' +
            '<div id="evaluate_result_list" class="evaluate_config_list"></div></div>'
        html += '<div style="margin: 20px 0;">'+
            '<div><a href="javascript:;" class="v btn">查看指定图片结果</a></div>'+
           '<div><input type="text" style="height: 25px;margin-right: 20px" name="pic_name"/>' +
            '<a class="v btn blue search_img">搜索</a></div>'+
            '</div></div>'

        document.getElementById(this.domid).innerHTML = html;

        this.ajaxctrlist(function(){
            var index = _this.epochs.map(function(item){
                return item.epoch
            }).indexOf(_this.epoch_cur);
            _this.times= _this.epochs[index].times;
            _this.judgeid = _this.epochs[index].times[0].judge;
            document.getElementById('timelist').innerHTML =_this.rendertimeList(_this.times);
            _this.initChart();
            _this.eventinit();
        });
    };

    Chart.prototype.timelist = function(){
        var index = this.epochs.map(function(item){
            return item.epoch
        }).indexOf(this.epoch_cur);
        this.times= this.epochs[index].times;
        this.judgeid = this.epochs[index].times[0].judge;
        document.getElementById('timelist').innerHTML =this.rendertimeList(this.times);
        this.initChart();
        // this.eventinit();

    };

    Chart.prototype.ajaxctrlist = function(cb){
        var html ='';
        var url = this.epochurl;
        var datastr = "id="+this.taskid;
        var _this = this;

        ajaxpost(url,datastr,function(data){
            if(data.error == 0){
                _this.alldata = data.data;
                _this.epochs = data.data;
                _this.epoch_cur = _this.epochs[0].epoch;
                html += _this.renderepochList(_this.epochs);
                document.getElementById('epochlist').innerHTML =html;
                cb();
            }
        })
    };

    Chart.prototype.initChart = function(){
        this.ajaxchart(1);
        this.renderConfigList();
        this.renderResultList();
        // this.eventinit();
    };

    Chart.prototype.ajaxchart = function(type){
        var html ='';
        var _this =this;
        var lineurl = this.lineurl;
        var columnurl = this.columnurl;
        var binaryurl = this.binaryurl;
        var totalurl = this.totalurl;
        var type = type || 1
        var datastr;
        if(type ==1){
            datastr = "id="+_this.judgeid;
            ajaxpost(lineurl,datastr,function(data1) {
                if (data1.error == 0) {
                    var dataarr1 = data1.data;
                    var count1 = dataarr1.length;
                    if(columnurl){
                        ajaxpost(columnurl,datastr,function(data2){
                            if(data2.error == 0){
                                var dataarr2 = data2.data;
                                var count2=0;
                                for(var index in dataarr2){
                                    count2++;
                                }
                                ajaxpost(binaryurl,datastr,function(data3){
                                    if(data3.error ==0){
                                        var dataarr3 = data3.data;
                                        // var count3 = dataarr3.length;
                                        var count3 =1;
                                        html += _this.renderChartList(count1+count2+count3);
                                        html += '<div id="evaluate_imgs"></div>';
                                        _this.judge_image_list();
                                        document.getElementById('chartlist').innerHTML = html;

                                        obj ={
                                            start:0,
                                            domid:'chart',
                                            dataid:urlfun.getquery('id'),
                                            data:dataarr1
                                        };
                                        diagram(obj);
                                        obj ={
                                            start:count1,
                                            domid:'chart',
                                            dataid:urlfun.getquery('id'),
                                            data:dataarr2
                                        }
                                        diagram(obj);
                                        obj ={
                                            start:count1+count2,
                                            domid:'chart',
                                            data:dataarr3
                                        }
                                        diagram(obj);
                                    }
                                })
                            }
                        })
                    }

                }
            })
        }else if(type == 2){
            datastr = "id="+this.taskid;
            ajaxpost(totalurl,datastr,function(data) {
                if (data.error == 0) {
                    var dataarr = data.data;
                    var count=0;
                    if(dataarr instanceof Array){
                        count = dataarr.length;
                    }else if(dataarr instanceof Object){
                        for(var key in dataarr){
                            count++;
                        }
                    }
                    html += _this.renderChartList(count);
                    document.getElementById('chartlist').innerHTML = html;
                    obj ={
                        start:0,
                        domid:'chart',
                        // dataid:urlfun.getquery('id'),
                        data:dataarr
                    };
                    diagram(obj);
                }
            })
        }
    };

    Chart.prototype.renderepochList=function(epochs){
        var html ='';
        html += '<ul class="oz mb10">';
        if(this.epoch_cur ==0){
            html += '<li style="float: left;padding: 2px; margin-right: 5px;"><a href="javascript:;" class="v btn blue" id="all">全部</a></li>'
        }else{
            html += '<li style="float: left;padding: 2px; margin-right: 5px;"><a href="javascript:;" class="v btn" id="all">全部</a></li>'
        }
        for(var i=0;i<epochs.length;i++){
            if(epochs[i]['epoch'] == this.epoch_cur){
                html += '<li style="float: left;padding: 2px; margin-right: 5px;"><a href="javascript:;" class="v btn blue epoch" id="'+epochs[i]['epoch']+'">'+evalevel[epochs[i].tag]+' '+epochs[i]['epoch']+'</a></li>'
            }else{
                html += '<li style="float: left;padding: 2px; margin-right: 5px;"><a href="javascript:;" class="v btn epoch" id="'+epochs[i]['epoch']+'">'+evalevel[epochs[i].tag]+' '+epochs[i]['epoch']+'</a></li>'
            }
        }
        html += '</ul>';
        return html;
    };

    Chart.prototype.judge_image_list = function(){
        var datastr = "id="+this.judgeid;
        var url = interface.train.judge_image_list;
        var _this = this;
        ajaxpost(url,datastr,function(data){
            var html = '<ul class="oz mb10">'
            if (data.error == 0) {
                var data = data.data;
                var dataArr = [];
                for(var i in data){
                    dataArr.push({
                        img_name:i,
                        url:data[i]
                    });
                }
                for(i=0;i<dataArr.length;i++){
                    if(_this.cur_judge_img == i){
                        html += '<li style="float: left;padding: 2px; margin-right: 5px;"><a href="javascript:;" class="v btn blue judge_img_list" id="judgeimg'+i+'">'+dataArr[i].img_name+'</a></li>'
                    }else{
                        html += '<li style="float: left;padding: 2px; margin-right: 5px;"><a href="javascript:;" class="v btn judge_img_list" id="judgeimg'+i+'">'+dataArr[i].img_name+'</a></li>'
                    }
                }
                html += '</ul>'
                for(i=0;i<dataArr.length;i++){
                    if(_this.cur_judge_img == i){
                        html += '<div><img src="'+dataArr[i].url+'" alt="" style="width: 100%; display: block;"></div>'
                    }
                    html += '<div><img src="'+dataArr[i].url+'" alt="" style="width: 100%; display: none;"></div>'
                }

                $('#evaluate_imgs').html(html)
            }
        })
    }

    Chart.prototype.rendertimeList=function(times){
        var html ='';
        html += '<ul class="oz mb10">';
        for(var i=0;i<times.length;i++){
            if(times[i]['judge'] == this.judgeid){
                html += '<li style="float: left;padding: 2px; margin-right: 5px;"><a href="javascript:;" class="v btn blue time" id="'+times[i]['judge']+'">'+times[i].time+'</a></li>'
            }else{
                html += '<li style="float: left;padding: 2px; margin-right: 5px;"><a href="javascript:;" class="v btn time" id="'+times[i]['judge']+'">'+times[i].time+'</a></li>'
            }
        }
        html += '</ul>'
        html += '<div style="position: absolute; right: 20px;top: 60px;"></div>';
        return html;
    };

    Chart.prototype.renderChartList = function(count){
        var html ='';
        html += '<div>'
            html += '<ul class="oz mb10">';
            for(var i=0;i<count;i++){
                html += '<li style="float: left;padding: 10px; margin-right: 15px;margin-bottom: 15px;"><div id="chart'+i+'" style="width: 330px;height: 330px;"></div></li>'
            }
            html += '</ul>'
         html += '</div>'
        return html;
    };

    Chart.prototype.renderConfigList = function(){
        var obj={
            domid:'evaluate_param_list',
            judgeid:this.judgeid,
            url:interface.train.judge_option,
        }
        this.evl_param = show_config(obj);
    };

    Chart.prototype.renderResultList = function(){
        var html ='';
        var url =interface.train.judge_result;
        var datastr = 'id='+this.judgeid;
        ajaxpost(url,datastr,function(data){
            if(data.error ==0){
                var data = data.data;
                for(var key in data){
                    html += '<div class="formcon-item" style="overflow: hidden; zoom: 1; margin: 10px 0px; line-height: 36px;position: relative;">' +
                        '<span style="margin-right:10px; display: inline-block; width: 20%;height:36px; overflow:hidden; float: left; padding-left: 10px;">'+key+'</span>' +
                        '<input class="config-input" style="height: 30px; padding: 0 5px; width:20%; float: left;"  name="'+key+'" value="'+data[key]+'" disabled></div>'
                }
                document.getElementById('evaluate_result_list').innerHTML = html;
            }
        })
    };

    Chart.prototype.eventinit = function(){
        var _dom = document.getElementById(this.domid);
        var _this = this;

        Event.on(_dom,'.epoch','click',function(e){
            _this.epoch_cur = parseInt(e.target.getAttribute('id'));
            var epochs = document.getElementsByClassName('epoch');
            Class.removeClass(document.getElementById('all'),'blue');
            for(var i=0;i<epochs.length;i++){
                Class.removeClass(epochs[i],'blue');
            }
            Class.addClass(e.target,'blue');
            _this.timelist();
            console.log("epoch:"+_this.epoch_cur);
            console.log("judge_id:"+_this.judgeid);
            _this.renderConfigList();
            _this.renderResultList();
        });

        Event.on(_dom,'.time','click',function(e){
            _this.judgeid = parseInt(e.target.id);
            var times = document.getElementsByClassName('time');
            for(var i=0;i<times.length;i++){
                Class.removeClass(times[i],'blue');
            }
            Class.addClass(e.target,'blue');

            console.log("epoch:"+_this.epoch_cur);
            console.log("judge_id:"+_this.judgeid);

            _this.ajaxchart(1);
            _this.renderConfigList();
            _this.renderResultList();
        });

        Event.on(_dom,'#all','click',function(e){
            _this.epoch_cur = 0;
            var epochs = document.getElementsByClassName('epoch');
            Class.removeClass(document.getElementById('all'),'blue');
            for(var i=0;i<epochs.length;i++){
                Class.removeClass(epochs[i],'blue');
            }
            Class.addClass(e.target,'blue');

            console.log("epoch:"+_this.epoch_cur);
            console.log("judge_id:"+_this.judgeid);

            _this.ajaxchart(2);
            _this.renderConfigList();
            _this.renderResultList();
        });

        Event.on(_dom,'#new_evaluate_task','click',function(e){
            succPrompt('评测参数已提交，正在生成评测结果');
           var param_data =  _this.evl_param.getData()[0].split('^_^')[1];
           var url = interface.train.judge_start;
           datastr ='id='+_this.judgeid+'&score='+param_data;
           ajaxpost(url,datastr,function(data){
               if(data.error ==0){
                   succPrompt('提交成功');
                   //刷新頁面
                   _this.ajaxchart(1);
                   _this.renderConfigList();
                   _this.renderResultList();
                   _this.eventinit();
               }else{
                   errorPrompt('提交失败');
               }
           });
        });

        Event.on(_dom,'.judge_img_list','click',function(e){
            var target = e.target;
            var id = target.id.substr(8);
            _this.cur_judge_img = id;
            _this.judge_image_list();
        });

        Event.on(_dom,'.search_img','click',function(e){
            var id = _this.judgeid;
            var pic_name = document.getElementsByName('pic_name')[0].value;
            if(pic_name && pic_name!==''){
                window.location.href='./searchPic.html?pic_name='+pic_name+'&id='+id;
            }else{
                alert('请输入图片名称');
            }
        })
    };

    w.chart=function(obj){
        return new Chart(obj);
    }
}(window)