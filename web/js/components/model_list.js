!function(w){
    function modelList(obj){
        this.url = obj.url;
        this.domid = obj.domid;
        this.cur_model_id = obj.cur_model_id;
        this.cur_task_id = obj.cur_task_id;
        this.cur_judge_id = obj.cur_judge_id;
        this.cur_task_name = obj.cur_task_name;
        this.cur_model_name = obj.cur_model_name;
        this.flag = obj.flag || 0;
        this.model_type = g_status_mode;
        this.init();
        this.data = obj.data;
        this.pagedata= obj.pagedata || null;
        this.ispage =obj.ispage;
        this.page = obj.page || 1;
    }
    modelList.prototype.init = function(){   //初始化
        var html = '';
        html += '<div id="tabbar" style="height: 30px;"></div>';
        html += '<div id="modellist" class="scrollbar" onscroll="showtoTop(this)"></div>';
        html += '<div id="_train_flow"></div>' +
            '    <div id="_evaluate_result"></div>' +
            '<div id="_chart_list"></div>'+
            '    <div id="_right_panel"></div>';
        document.getElementById(this.domid).innerHTML = html;
        this.renderflaghtml();
    };

    modelList.prototype.ajaxmodeldata = function(){    //刷新左侧列表
        var url = this.url;
        var datastr = 'flag='+this.flag;     //参数为flag0/1 加载不同的列表
        for(var key in this.data){
            datastr =datastr + "&"+key+'='+this.data[key];
        }
        var _this = this;
        ajaxget(url+datastr,function(data){
            if(data.error == 0){
                _this.pagedata = data.data.page;
                var data = data.data.detail;    //data为列表数组
                if(data.length>0){
                    _this.cur_model_id = data[0]['id'];  //取列表第一项作为当前选中模型id
                    _this.cur_task_id = data[0]['task_id'];
                    _this.cur_task_name = data[0]['task_name'];
                    _this.renderlisthtml(data);   // 渲染左侧模型列表
                    _this.setJudgeId(_this.set_right_panel);
                    _this.eventinit();
                }else{
                    errorPrompt('没有数据');
                     _this.renderlisthtml(data);   // 渲染左侧模型列表
                    _this.setJudgeId(_this.set_right_panel);
                    _this.eventinit();
                }

            }
        })
    };

    modelList.prototype.renderflaghtml = function(){
        var html ='';
        if(this.flag == 0){
            html += '<a href="javascript:;" class="v btn blue all_model" style="margin-bottom: 10px; border-radius:3px 3px 0 0; ">全部模型</a>'
            html += '<a href="javascript:;" class="v btn star_model" style="margin-bottom: 10px; border-radius:3px 3px 0 0;">收藏模型</a>'
        }else if(this.flag ==1){
            html += '<a href="javascript:;" class="v btn all_model" style="margin-bottom: 10px; border-radius:3px 3px 0 0;">全部模型</a>'
            html += '<a href="javascript:;" class="v btn blue star_model" style="margin-bottom: 10px; border-radius:3px 3px 0 0;">收藏模型</a>'
        }
        document.getElementById('tabbar').innerHTML =html;
        this.ajaxmodeldata();
    };   //模型类型

    modelList.prototype.renderlisthtml = function(data){
        var html;
        if(data.length){
            html ='<ul>';
            for(var i=0;i<data.length;i++){
                if(this.cur_model_id == data[i]['id']){
                    html += '<li class="model_list_item selected" id="'+data[i]['id']+'" t-id="'+data[i]['task_id']+'" t-name="'+data[i]['task_name']+'">';
                    if(data[i]['model_status'] ==0){
                        html += '<div><span>'+data[i]['model_name']+'</span><a class="del_model"><i class="iconfont icon-shanchu"></i></a><a class="edit_model"><i class="iconfont icon-bianji"></i></a><a class="collect_model"><i class="iconfont icon-shoucang1"></i></a></div>'+
                            '<div>模型类型：'+this.model_type[data[i]['model_type']]+'</div>'+
                            '<div><span>ap:'+data[i]['ap']+'</span><span>epoch:'+data[i]['epoch']+'</span><span>batch_size：'+data[i]['batch_size']+'</span><span>accuracy：'+data[i]['accuracy']+'</span></div>'
                            +'</li>'
                    }else{
                        html += '<div><span>'+data[i]['model_name']+'</span><a class="del_model"><i class="iconfont icon-shanchu"></i></a><a class="edit_model"><i class="iconfont icon-bianji"></i></a><a class="collect_model"><i class="iconfont icon-shoucang"></i></a></div>'+
                            '<div>模型类型：'+this.model_type[data[i]['model_type']]+'</div>'+
                            '<div><span>ap:'+data[i]['ap']+'</span><span>epoch:'+data[i]['epoch']+'</span><span>batch_size：'+data[i]['batch_size']+'</span><span>accuracy：'+data[i]['accuracy']+'</span></div>'
                            +'</li>'
                    }
                }else{
                    html += '<li class="model_list_item" id="'+data[i]['id']+'" t-id="'+data[i]['task_id']+'" t-name="'+data[i]['task_name']+'">';
                    if(data[i]['model_status'] ==0){
                        html += '<div><span>'+data[i]['model_name']+'</span><a class="del_model"><i class="iconfont icon-shanchu"></i></a><a class="edit_model"><i class="iconfont icon-bianji"></i></a><a class="collect_model"><i class="iconfont icon-shoucang1"></i></a></div>'+
                            '<div>模型类型：'+this.model_type[data[i]['model_type']]+'</div>'+
                            '<div><span>ap:'+data[i]['ap']+'</span><span>epoch:'+data[i]['epoch']+'</span><span>batch_size：'+data[i]['batch_size']+'</span><span>accuracy：'+data[i]['accuracy']+'</span></div>'
                            +'</li>'
                    }else{
                        html += '<div><span>'+data[i]['model_name']+'</span><a class="del_model"><i class="iconfont icon-shanchu"></i></a><a class="edit_model"><i class="iconfont icon-bianji"></i></a><a class="collect_model"><i class="iconfont icon-shoucang"></i></a></div>'+
                            '<div>模型类型：'+this.model_type[data[i]['model_type']]+'</div>'+
                            '<div><span>ap:'+data[i]['ap']+'</span><span>epoch:'+data[i]['epoch']+'</span><span>batch_size：'+data[i]['batch_size']+'</span><span>accuracy：'+data[i]['accuracy']+'</span></div>'
                            +'</li>'
                    }
                }
            }
            html +='</ul>';
        }else if(this.flag ==0){
            var index = document.getElementsByName('model_type')[0].selectedIndex;

            if(document.getElementsByName('model_name')[0].value =='' && document.getElementsByName('model_type')[0].options[index] == '请选择'){
                html = '<div style="text-align: center; margin-top: 100px;">' +
                    '<div style="text-align: center;color: #999; width: 100%;margin-bottom: 20px;">您还未保存任何模型，在“训练任务列表”中保存的模型会出现在这里哟~</div>' +
                    '<a href="../html-train/index.html" class="v btn blue" style="margin-bottom: 10px; border-radius:3px; ">去保存</a>' +
                    '</div>'
            }else{
                html = '<div style="text-align: center; margin-top: 100px;">' +
                    '<div style="text-align: center;color: #999; width: 100%;margin-bottom: 20px;">没有找到相关内容，换个搜索条件试试?</div>' +
                    '</div>'
            }

        }else if(this.flag ==1){
            html = '<div style="text-align: center; margin-top: 100px;">' +
                '<div style="text-align: center;color: #999; width: 100%;margin-bottom: 20px;">您还未收藏任何内容，在“全部模型”中收藏的内容会出现在这里哟~</div>' +
                '<a href="javascript:;" class="v btn blue gotoCollect" style="margin-bottom: 10px; border-radius:3px; ">去收藏</a>' +
                '</div>'
        }


        // html += '<ul class="v page" id="_data_page">'+this.pagehtml()+'</ul>'
        document.getElementById('modellist').innerHTML = html;
    };    // 左侧列表

    modelList.prototype.pagehtml = function(){
        if(this.ispage || this.ispage == undefined){
            var obj = {
                args:{
                    pageCount:this.pagedata.page_num, // 总页
                    current:parseInt(this.page)                      // 当前页
                }
            }
            return pageDom(obj).html()
        }else{
            return ''
        }
    }
    modelList.prototype.renertrainflow = function(){
        var html ='';
        html += '<div>' +
            '<div style="margin-top: 10px;"><a href="javascripr:;" class="v btn blue" style="margin-bottom: 10px; border-radius:3px">训练流程</a>' +
            '<a href="javascripr:;" class="v btn blue" style="margin-bottom: 10px;margin-left: 150px; border-radius:3px; float:right">'+this.cur_task_name+'</a></div>' +
            '<div id="flow" style="height: 340px; width:100%;position: absolute; top: 20px;text-align: center;"></div>' +
            '</div>';
        var _this = this;
        document.getElementById('_train_flow').innerHTML = html;

        var data = {
            data:[
                {
                    name:"数据",
                    isclick:true,
                    click:'selectone(this)'
                },
                {
                    name:"模型",
                    isclick:true,
                    click:'selectone(this)'
                },
                {
                    name:"数据配置",
                    isclick:true,
                    click:'selectone(this)'
                },
                {
                    name:"模型配置",
                    isclick:true,
                    click:'selectone(this)'
                },
                {
                    name:'评测详情',
                    isclick:true,
                    click:'selectone(this)'
                }
            ],
            cur:4,
            domid: "flow"
        }
        var test_flow = workflow(data);


    };     //训练流程

    modelList.prototype.renderevaluateresult = function(_this){
        var url =interface.train.judge_result;
        var datastr = 'id='+_this.cur_judge_id;
        var html ='';
        html += '<div>' +
            '<div style="margin-top: 10px;"><a href="javascripr:;" class="v btn blue" style="margin-bottom: 10px; border-radius:3px">评测结果</a></div>' +
            '<div id="evaluate_result_list"></div>' +
            '</div>';
        ajaxpost(url,datastr,function(data){
            if(data.error ==0){
                var data = data.data;
                for(var key in data){
                    html += '<div style="display: inline-block; margin-right: 10px;margin-bottom: 10px; padding: 5px; background: #eee;">' +
                        '<span ">'+key+':'+data[key]+'</span>' + '</div>'
                }
                document.getElementById('_evaluate_result').innerHTML = html;
            }
        })
    };   //评测结果

    modelList.prototype.renderchartlist = function(_this){
        var html ='';
        html += '<div id="chartlist">'
        var url = interface.train.judge_curve_line;
        datastr = "id="+_this.cur_judge_id;

        ajaxpost(url,datastr,function(data) {
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
                html +='<ul style="overflow: hidden;">'
                for(var i=0;i<count;i++){
                    html += '<li style="float: left;padding: 10px; margin-right: 15px;margin-bottom: 15px;"><div id="chart'+i+'" style="width: 250px;height: 250px;"></div></li>'
                }
                html += '</ul></div>'
                document.getElementById('_chart_list').innerHTML = html;
                obj ={
                    start:0,
                    domid:'chart',
                    // dataid:urlfun.getquery('id'),
                    data:dataarr
                };
                diagram(obj);
            }
        })
    };   //评测图表

    modelList.prototype.renderconfigparam = function(_this){
        var html ='<div>';
        var url = interface.train.detail;
        datastr = "id="+_this.cur_task_id;
        ajaxpost(url,datastr,function(data){
            var data = data.data;
            var model_config = data['model_config'];
            var data_config = data['data_config'];
            var data_val = data['data_val'];
            var model_type = data['model_type'];
            var url = interface.train.model_list;
            ajaxget(url,function(data){
                var data = data.data;
                var model_val={};
                if(data instanceof Array){
                    for(var i=0;i<data.length;i++){
                        for(var j=0;j<data[i].cate_list.length;j++){
                            if(model_type == data[i].cate_list[j].id){
                                model_val['model_name'] = data[i].cate_list[j].cate_name;
                                _this.cur_model_name = model_val['model_name'];
                                html += g_task_config_html('数据',data_val);
                                html += g_task_config_html('模型',model_val);
                                html += g_task_config_html('数据配置',data_config);
                                html +=  g_task_config_html('模型配置',model_config);
                                html += '</div>';
                                document.getElementById('_right_panel').innerHTML =html;
                            }
                        }
                    }
                }
            });

        })
    };  //配置参数

    modelList.prototype.set_right_panel = function(_this){    //设置右侧内容部分
        _this.renertrainflow();
        _this.renderevaluateresult(_this);
        _this.renderchartlist(_this);
        _this.renderconfigparam(_this);
    };

    modelList.prototype.setJudgeId = function(callback){    //根据列表中选中的项设置judge_id,重新设置右侧内容
        var url = interface.train.epoch_info;
        var datastr = "id="+this.cur_task_id;
        var _this = this;

        /*默认选择第一个epoch里的第一次评测*/
        // $.ajax({
        //     url:'http://10.19.19.23:8500/static/web/js/data/data.json',
        //     type:"get",
        //     dataType:'json',
        //     success:function(data){
        //        _this.cur_judge_id = data.data[0].times[0].judge_id;
        //        callback(_this);
        //     }
        // });

        ajaxpost(url,datastr,function(data){
            if(data.error == 0){
                _this.cur_judge_id = data.data[0].times[0].judge;
                callback(_this);
            }
        })
    };

    modelList.prototype.eventinit = function(){
        var _dom = document.getElementById(this.domid);
        var _this = this;
        Event.on(_dom,'.model_list_item','click',function(e){
            var item = e.target;
            if(Class.hasClass(item,'del_model') || Class.hasClass(item,'edit_model') || Class.hasClass(item,'collect_model')|| Class.hasClass(item,'iconfont')){
                return;
            }else{
                while(!Class.hasClass(item,'model_list_item')){
                    item = item.parentNode;
                }
                if(Class.hasClass(item,'selected')){
                    return;
                }
                var models = document.getElementsByClassName('model_list_item');
                for(var i=0;i<models.length;i++){
                    Class.removeClass(models[i],'selected');
                }
                Class.addClass(item,'selected');
                Class.addClass(item,'selected');
                _this.cur_model_id = item.id;
                _this.cur_task_id = item.getAttribute('t-id');
                _this.cur_task_name = item.getAttribute('t-name');
                _this.setJudgeId(_this.set_right_panel);
            }
        });
        Event.on(_dom,'.del_model','click',function(e){
            var target = e.target;
            while(!Class.hasClass(target,'model_list_item')){
                target = target.parentNode;
            }
            var id = target.getAttribute('id');
            console.log(id);
            walert("是否删除",function(){
                var url = interface.model.del_model;
                var ids=[];
                ids.push(id);
                var result = JSON.stringify(ids);
                var datastr = "model_ids="+result;
                ajaxpost(url,datastr,function(data){
                    if(data.error ==0){
                        succPrompt('删除成功');
                        _this.ajaxmodeldata();
                    }else{
                        errorPrompt(data['message']);
                    }
                })
            })
        });
        Event.on(_dom,'.edit_model','click',function(e){
            var target = e.target;
            while(!Class.hasClass(target,'model_list_item')){
                target = target.parentNode;
            }
            var id = target.getAttribute('id');
            var popup = tool_popup();
            popup.title = '编辑模型';
            popup.con = '<div id="pop_model_edit">'+'</div>'
            var html = '';
            popup.style_popup_con += 'min-height:310px;height:310px;'
            popup.show();
            html += '<div class="v input_2 mb10" style="margin-top: 50px;padding-right: 50px;">'
            html += '<label class="w30">模型名称</label>'
            html += '<textarea name="" class="text w70" cols="30" rows="6" style="border: 1px solid #ccc;" id="model_name"></textarea>';
            html += ' <p class="info pdw30"></p>'
            html += '</div>'
            document.getElementById('pop_model_edit').innerHTML = html
            popup.callback = function(){
                var model_name =document.getElementById('model_name').value;
                var url = interface.model.update_model;
                datastr = "model_id="+id;
                if(model_name){
                    datastr += '&model_name='+model_name;
                }
                ajaxpost(url,datastr,function(data){
                    if(data.error == 0){
                        succPrompt('修改成功');
                        _this.ajaxmodeldata();
                    }else{
                        errorPrompt(data['msg'])
                    }
                })
            }
        });
        Event.on(_dom,'.collect_model','click',function(e){
            var target = e.target;
            var url = interface.model.collect_model;
            var datastr;
            if(Class.hasClass(target,'icon-shoucang1')){    //未收藏--->收藏
                while(!Class.hasClass(target,'model_list_item')){
                    target = target.parentNode;
                }
                var id = target.getAttribute('id');
                datastr = "model_id="+id+"&status=1";
                ajaxpost(url,datastr,function(data){
                    if(data.error ==0){
                        succPrompt('收藏成功');
                        _this.ajaxmodeldata();
                    }else{
                        errorPrompt(data['msg']);
                    }
                })
            }else if(Class.hasClass(target,'icon-shoucang')){    //已收藏--->取消收藏
                while(!Class.hasClass(target,'model_list_item')){
                    target = target.parentNode;
                }
                var id = target.getAttribute('id');
                var datastr = "model_id="+id+"&status=0";
                ajaxpost(url,datastr,function(data){
                    if(data.error ==0){
                        succPrompt('取消收藏成功');
                        _this.ajaxmodeldata();
                    }else{
                        errorPrompt(data['msg']);
                    }
                })
            }

        });
        Event.on(_dom,'.all_model','click',function(e){
            _this.flag = 0;
            _this.renderflaghtml();

        })
        Event.on(_dom,'.star_model','click',function(e){
            _this.flag = 1;
            _this.renderflaghtml();
        });
        Event.on(_dom,'.gotoCollect','click',function(e){
            _this.flag = 0;
            _this.renderflaghtml();
        })
    };    //绑定事件

    w.modellist = function(obj){
        return new modelList(obj)
    }

}(window)