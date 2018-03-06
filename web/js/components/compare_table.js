!function(w){
    function Compare_table(obj){

        this.compare_item = obj.compare_item || [];    //需要对比的条目内容
        this.url = obj.url|| interface.train.search;     //请求数据url
        this.ids =  obj.ids || [];    //对比任务id
        this.domid = obj.domid;

        this.comparedata = obj.comparedata || [];    //对比数据
        this.cur_epoch  = obj.cur_epoch || new Array(2)     //当前选中的epoch 数组
        this.times = obj.times || []  //长度为2 的数组
        this.judge_id = obj.judge_id || [] //长度为2 的数组
        this.epoch_info = obj.epoch_info || [];

        this.tag = obj.tag || [];
        this.idx = obj.idx || []; //评测指标

        this.data_config = obj.data_config || [];
        this.model_config = obj.model_config || [];

        this.init();
    }

    Compare_table.prototype = {
        init:function(){
            var _this = this;
            this.renderhtml();
            this.ajaxdata(function(){
                _this.getidx(function(){
                    _this.get_config_data();
                    _this.rendertable();
                    _this.renderchart();
                    _this.render_select();
                    _this.eventinit();
                })
                // _this.render_right_compare();
            });
        },
        renderhtml:function(){
            var html ='';
            html += '<div id="right_select"></div>'
            html += '<div id="left_table"></div>'
            html += '<div id="right_container">'

            // html += '<div id="right_compare"></div>'
            html += '</div>'
            document.getElementById(this.domid).innerHTML = html;
        },
        ajaxdata:function(callback){    //如果url存在请求，并更新comparedata 渲染对比列表
            var _this = this;
            if(this.url){
                var datastr = 'list=0&task_type=0&task_status=3';
                ajaxpost_noloading(this.url,datastr,function(data){
                    var detail = data.data.detail;
                    for(var i=0;i<detail.length;i++){
                        if(_this.ids.indexOf(detail[i].id)!=-1){
                            _this.comparedata.push(detail[i]);
                            if(_this.comparedata.length >=2){   //对比数据已经生成
                                break;
                            }
                        }
                    }
                    /*设置当前的epoch tag times 和 judge_id     默认都选择第一个*/

                    _this.ids.forEach(function(item,index){
                        var judge_url = interface.train.epoch_info;
                        var datastr = 'id='+item;
                        ajaxpost_noloading(judge_url,datastr,function(data){

                            _this.epoch_info[index] = data.data;
                            _this.cur_epoch[index] = _this.epoch_info[index][0].epoch;
                            _this.tag[index] = _this.epoch_info[index][0].tag;
                            _this.times[index] = _this.epoch_info[index][0].times;
                            _this.judge_id[index] = _this.times[index][0].judge;


                            if(typeof _this.cur_epoch[0] == 'number' && typeof _this.cur_epoch[1] == 'number'){    //两个对比的任务信息都配置完执行回调函数
                                callback();
                            }
                        })
                    })
                })
            }else{
                alert('未获取到数据')
            }
        },
        rendertable:function(){
            var html = '<table style="table-layout: fixed;"><tbody>'
            html += '<tr><th class="column_title"></th>';
            for(var i=0;i<this.ids.length;i++){
                html += '<th class="head" style="width: 50%;">'+this.comparedata[i].task_name+'</th>'    //表头  任务名称
            }
            html += '</tr>';

            for(i=0;i<this.compare_item.length;i++){
                html += '<tr><td class="column_title">'+this.compare_item[i].name+'</td>'
                for(var j=0;j<this.comparedata.length;j++){
                    if(i==2){      //创建时间
                        html += '<td>'+this.comparedata[j][this.compare_item[i].type].start+'</td>'
                    }else if(i == 5){       //pr曲线
                        html += '<td><div id="chart'+j+'0"></div></td>'
                    }else if(i == 6){      //fppi曲线
                        html += '<td><div id="chart'+j+'1"></div></td>'
                    }else if(i == 7){      //训练数据
                        html += '<td style="word-wrap:break-word">'+this.comparedata[j][this.compare_item[i].type].train_data+'</td>'
                    }else if(i == 8){      //训练总时长
                        html += '<td>'+stringtime2(this.comparedata[j][this.compare_item[i].type].cost)+'</td>'
                    }else if(i == 3){     //ap值
                        html += '<td>'+this.idx[j].ap+'</td>'
                    }else if(i == 4){     //top1值
                        html += '<td>'+this.idx[j].top1_error+'</td>'
                    }else if(i == 9){
                        if(j == 0){
                            html += '<td colspan="2" style="text-align: center;"><a class="data_config">查看</a></td>'
                        }
                    }else if(i == 10){
                        if(j == 0){
                            html += '<td colspan="2" style="text-align: center;"><a class="model_config">查看</a></td>'
                        }
                    }
                    else{
                        html += '<td>'+this.comparedata[j][this.compare_item[i].type]+'</td>'
                    }
                }
                html += '</tr>'
            }
            html += '</tbody></table>'
            document.getElementById('left_table').innerHTML = html;
        },
        renderchart:function(){
            var self = this;
            for(var i=0;i<self.judge_id.length;i++){
                (function(i){
                    var line_url = interface.train.judge_curve_line;
                    var datastr = 'id='+self.judge_id[i];
                    ajaxpost_noloading(line_url,datastr,function(data){
                        if(data.error ==0){
                            obj ={
                                start:0,
                                domid:'chart'+i,
                                data:data.data
                            };
                            diagram(obj);
                        }
                    })
                })(i)
            }
        },
        getidx:function(callback){
            var _this = this;
            var url = interface.train.judge_result;
            _this.idx = [];
            for(var i=0;i<this.judge_id.length;i++){
                (function(i){
                    var datastr = 'id='+_this.judge_id[i];
                    ajaxpost_noloading(url,datastr,function(data){
                        _this.idx[i] = {
                            ap: data.data.ap,
                            top1_error:data.data.top1_error
                        }
                        if(typeof _this.idx[0] == 'object' && typeof _this.idx[1] == 'object'){
                            console.log(_this.idx);
                            callback();
                        }
                    })
                })(i)
            }
        },
        render_select:function(){     //渲染右侧配置表单
            var html = ''
            var _this = this;
            for(var i=0;i<this.ids.length;i++){
                html += '<div>'
                html += '<span class="task_name" style="display:inline-block;width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-left:0;color:#008cd6;" title="'+this.comparedata[i].task_name+'">'+this.comparedata[i].task_name+'</span>'

                html += '<div class="contrast_option">'
                /*选择epoch*/
                html += '<span> epoch:</span>'
                html += '<select class="epoch" id="epoch_'+i+'">';

                for(var j=0;j<_this.epoch_info[i].length;j++){
                    if(_this.cur_epoch[i] == _this.epoch_info[i][j].epoch && _this.tag[i] == _this.epoch_info[i][j].tag){
                        html += '<option value="'+_this.epoch_info[i][j].epoch+'_'+_this.epoch_info[i][j].tag+'" selected="selected">'+evalevel[_this.epoch_info[i][j].tag]+_this.epoch_info[i][j].epoch+'</option>'  //选中
                    }else{
                        html += '<option value="'+_this.epoch_info[i][j].epoch+'_'+_this.epoch_info[i][j].tag+'">'+evalevel[_this.epoch_info[i][j].tag]+_this.epoch_info[i][j].epoch+'</option>'    //未选中
                    }
                }
                html += '</select>'

                /*选择time*/
               // html += '<span>第</span>'
                html += '<select class="time" id="time_'+i+'">'
                for(var j=0;j<_this.times[i].length;j++){
                    if(_this.judge_id[i] == _this.times[i][j].judge){
                        html += '<option value="'+_this.times[i][j].judge+'" selected="selected">'+_this.times[i][j].time+'</option>'  //选中
                    }else{
                        html += '<option value="'+_this.times[i][j].judge+'">'+_this.times[i][j].time+'</option>'      //未选中
                    }
                }
                html += '</select>'
                html += '<span>评测结果</span>'
                html += '</div>'

                html += '</div>'
            }

            html += '<div style="float:right"><a class="refresh v btn blue">查看对比结果</a><a href="javascript:;" onclick="go_back()" class="v btn red">返回</a></div>';
            document.getElementById('right_select').innerHTML = html;

        },
        render_right_compare:function(){
            var html ='';
            html += '<h3>评测参数对比</h3>'
            document.getElementById('right_compare').innerHTML = html;
        },
        get_config_data:function(){
            var _this = this;
            var url = interface.train.detail;
            for(var i=0;i<this.ids.length;i++){
                (function(i){
                    var datastr = 'id='+ids[i];
                    ajaxpost(url,datastr,function(data){
                        _this.data_config[i] = data.data.data_config;
                        _this.model_config[i] = data.data.model_config;
                    })
                })(i)
            }
        },
        render_data_config:function(){
            var _this = this;
            var html = '<table style="table-layout: fixed;"><tbody>'
            html += '<tr><th class="column_title"></th>';
            for(var i=0;i<this.ids.length;i++){
                html += '<th class="head" style="width: 50%;">'+this.comparedata[i].task_name+'</th>'    //表头  任务名称
            }
            html += '</tr>';
            for(var key in this.data_config[0]){
                html += '<tr><td class="column_title">'+key+'</td>'
                for(var j=0;j<ids.length;j++){
                    html += '<td>'+_this.data_config[j][key]+'</td>'
                }
                html += '</tr>'
            }
            html += '</tbody></table>'
            /*配置数据*/
            document.getElementsByClassName('config_container')[0].innerHTML = html;
        },
        render_model_config:function(){
            var _this = this;
            var html = '<table style="table-layout: fixed;"><tbody>'
            html += '<tr><th class="column_title"></th>';
            for(var i=0;i<this.ids.length;i++){
                html += '<th class="head" style="width: 50%;">'+this.comparedata[i].task_name+'</th>'    //表头  任务名称
            }
            html += '</tr>';
            for(var key in this.model_config[0]){
                if(_this.model_config[0][key]!='' && _this.model_config[1][key]!='' && typeof _this.model_config[1][key] != 'object'){   //不为空且不是对象
                    html += '<tr><td class="column_title">'+key+'</td>'
                    for(var j=0;j<ids.length;j++){
                        html += '<td>'+_this.model_config[j][key]+'</td>'
                    }
                    html += '</tr>'
                }
            }
            html += '</tbody></table>'
            /*配置数据*/
            document.getElementsByClassName('config_container')[0].innerHTML = html;
        },
        eventinit:function(){
            var dom = document.getElementById(this.domid);
            var self = this;

            /*更新轮数*/
            Event.on(dom,'.epoch','change',function(e){
                var index = parseInt(e.target.id.split('_')[1]);
                console.log(index);
                var selectedIndex = e.target.selectedIndex;

                self.cur_epoch[index] = e.target.options[selectedIndex].value.split('_')[0];
                self.tag[index] = e.target.options[selectedIndex].value.split('_')[1];

                var idx;
                for(var i=0;i<self.epoch_info[index].length;i++){
                    if(self.cur_epoch[index] == self.epoch_info[index][i].epoch && self.tag[index] == self.epoch_info[index][i].tag){
                        idx = i;
                        break;
                    }
                }
                self.times[index] = self.epoch_info[index][idx].times;
                self.judge_id[index] = self.times[index][0].judge;     //每次切换默认选择第一次评测
                self.render_select();

            })

            /*更新评测次数*/
            Event.on(dom,'.time','change',function(e){
                var index = parseInt(e.target.id.split('_')[1]);
                var selectedIndex = e.target.selectedIndex;
                self.judge_id[index] = parseInt(e.target.options[selectedIndex].value);
            })

            Event.on(dom,'.refresh','click',function(){
                self.getidx(function(){
                    self.rendertable();
                    self.renderchart();
                })
            })

            Event.on(dom,'.data_config','click',function(e){
                console.log(self.data_config)
                var popup = tool_popup()
                popup.title = '数据配置对比';
                popup.button_text = '关闭';
                popup.style_popup_con = 'width:780px; min-height:460px; background:#fff; position:absolute; left:50%; top:60px; bottom:100px; transform: translate(-50%, 0); -webkit-transform: translate(-50%, 0);'
                popup.con = '<div class="config_container"></div>'
                popup.show();
                document.getElementById('_tool_p_btn_no').style.display ='none';
                self.render_data_config();
            })

            Event.on(dom,'.model_config','click',function(e){
                console.log(self.model_config)
                var popup = tool_popup()
                popup.title = '模型配置对比';
                popup.button_text = '关闭';
                popup.style_popup_con = 'width:780px; min-height:460px; background:#fff; position:absolute; left:50%; top:60px; bottom:100px; transform: translate(-50%, 0); -webkit-transform: translate(-50%, 0);'
                popup.con = '<div class="config_container"></div>'
                popup.show();
                document.getElementById('_tool_p_btn_no').style.display ='none';
                self.render_model_config();
            })
        }
    }

   
    w.compare_table = function(obj){
        return new Compare_table(obj);
    }
}(window);