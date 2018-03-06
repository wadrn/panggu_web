!function(w){
    window.g_taskdata = null
    window._g_status = 0
    w.getiddata = function (callback){
        var data = 'id='+urlfun.getquery('id')
        ajaxpost(interface.train.detail,data,function(data){
            if(data.error ==0){
                g_taskdata = data.data
                var cur = 0
                // if(data.data.data_config){
                //     cur = 3
                // }
                // if(data.data.model_config){
                //     cur = 4
                // }
                //svg.allcur = cur

                if(g_taskdata && g_taskdata.data_val){
                    test_flow.data[1].isclick = true
                    test_flow.toCur(1)
                    cur = 1
                }

                if(g_taskdata && g_taskdata.model_type){
                    test_flow.data[2].isclick = true
                    test_flow.data[3].isclick = true
                    test_flow.toCur(3)
                    cur = 3
                }

                if(g_taskdata && g_taskdata.task_status){
                    test_flow.data[4].name = '结束训练'
                    test_flow.data[4].isclick = true
                    test_flow.toCur(4)
                    cur = 4
                }

                if(g_taskdata && (g_taskdata.task_status  )){
                    test_flow.data[4].name = '训练失败'
                    test_flow.data[4].isclick = true
                    test_flow.data[4].click = 'train_fun.show_train()'
                    test_flow.toCur(4)
                    cur = 4
                }

                if(g_taskdata && (g_taskdata.task_status ==1 || g_taskdata.task_status ==2)){
                    test_flow.data[4].name = '训练中'
                    test_flow.data[4].isclick = true
                    test_flow.data[4].click = 'train_fun.show_train()'
                    test_flow.toCur(4)
                    cur = 4
                }

                if(g_taskdata && (g_taskdata.task_status ==3 )){
                    test_flow.data[4].name = '训练完成'
                    test_flow.data[4].isclick = true
                    test_flow.data[4].click = 'train_fun.show_train()'
                    test_flow.toCur(4)
                    cur = 4
                }


                _g_status  = cur
                //svg.render()
                if(callback){
                    callback(data)
                }
                if(data.data.task_status != 0){
                    $('#config_mask').show()
                    $('#select_data').attr('disabled',true);
                }
                $('.bpmn-top').text("训练名称: "+data.data.task_name)
            }else{
                alert(data.msg)
            }
        })
    }

    function sel(obj){
        return  '<div class="cfg_title">'+obj.title+'</div>'+
            '<div class="select_data scrollbar" id="select_data"></div>'+
            '<div class="select_sub_data" id="select_sub_data"></div>'+

            '<div class="select_sub_btn">'+
            '<span class="b-btn"><a href="javascript:;" onclick="'+obj.subfun+'" class="v btn blue">提交</a></span>'+
            '</div>'
    }

    function con(obj){
        return  ''+

                '<div class="select_data scrollbar" style="bottom: 40px;top: 0px;">' +
            '<div id="config_mask" style="position: absolute; left:0px; right:0px; top:0px;bottom:0; z-index: 999;display: none;"></div>'+
                    '<div id="config_top_data" ></div>'+
                    '<div id="config_data"></div>'+
                    '<div id="config_bottom_data"></div>'+
                '</div>'+

                '<div class="select_sub_btn">'+
                    '<span class="b-btn"><a href="javascript:;" onclick="'+obj.subfun+'" class="v btn blue">提交</a></span>'+
                '</div>'
    }
    function _con(obj){
        return  ''+
            '<div class="select_data scrollbar" style="bottom: 40px;top: 0px;">' +
            '<div id="config_top_data" ></div>'+
            '<div id="config_data"></div>'+
            '<div id="config_bottom_data"></div>'+
            '</div>'+
            '<div class="select_sub_btn">'+
            '<span class="b-btn"><a href="javascript:;" onclick="'+obj.subfun+'" class="v btn blue">提交</a></span>'+
            '</div>'
    }

    w.train_m_con = {
        0:{
            tel:sel,
            config:{
                title:'选择数据',
                subfun:'train_fun.subdataid()',
                callb:show_sel_model
            }
        },
        1:{
            tel:sel,
            config:{
                title:'选择模型',
                subfun:'train_fun.submodelid()',
                callb:show_setting_data
            }
        },
        2:{
            tel:con,
            config:{
                title:'配置数据',
                subfun:'train_fun.sub_setting_data()',
                callb:show_setting_train
            }
        },
        3:{
            tel:con,
            config:{
                title:'配置模型',
                subfun:'train_fun.sub_setting_train()',
                callb:config_ok
            }
        },
        4:{
            tel:con,
            config:{
                title:'确认配置',
                subfun:'train_fun.sub_setting_train()',
                callb:config_ok
            }
        },
        5:{
            tel:_con,
            config:{
                title:'训练过程监控',
                subfun:'train_fun.show_monitor()',
                callb:config_ok
            }
        },
        6:{
            tel:_con,
            config:{
                title:'评测过程监控',
                subfun:'train_fun.show_train()',
                callb:config_ok
            }
        }
    }

    // 选择数据
    var i_data = []
    var s_data = null
    var default_data = {}

    // function show_sel_data(pingtai_page,my_page,curtab){
    //     var dom = document.getElementById('cfg_test_data')
    //     var obj = train_m_con[0]['config']
    //
    //     getiddata(function(data){
    //         if(data.data && data.data.Train_data){
    //             default_data.Train_data = data.data.Train_data
    //         }
    //         if(data.data && data.data.Val_data){
    //             default_data.Val_data=data.data.Val_data
    //         }
    //
    //         dom.innerHTML = train_m_con[0]['tel'](obj)
    //         //getalldata(pingtai_page,my_page,curtab)
    //         if(!s_data){
    //             getalldata(pingtai_page,my_page)
    //         }
    //         else{
    //             s_data.default_data = default_data
    //             s_data.init()
    //         }
    //     })
    // }

    function show_sel_data(){
        getiddata(function(data){
            train_sel_data(data);
        })
    }


    function getalldata(pingtai_page,my_page,curtab){
        var url = interface.data.reslist+'status=2'+"&offset="+pingtai_page
        ajaxget(url,function(data){
            i_data.push({
                title:'平台数据',
                detail:data.data.detail,
                type:'data',
                id:'pingtai',
                page_num:data.data.page.page_num
            })
            getmydata(my_page,curtab)
        })
    }

    function getpingtaidata(pingtai_page){
        var url = interface.data.reslist+'status=2'+"&offset="+pingtai_page
        ajaxget(url,function(data){
            i_data.push({
                title:'平台数据',
                detail:data.data.detail,
                type:'data',
                id:'pingtai',
                page_num:data.data.page.page_num
            })
            s_data = selectdata({
                domid:'select_data',
                domsid:'select_sub_data',
                data:i_data,
                default_data:default_data
            })
        })
    }

    function getmydata(my_page,curtab){
        var url = interface.data.reslist+'status=1'+"&offset="+my_page
        ajaxget(url,function(data){
            i_data.push({
                title:'我的数据',
                detail:data.data.detail,
                type:'data',
                id:'my',
                page_num:data.data.page.page_num
            })
            s_data = selectdata({
                domid:'select_data',
                domsid:'select_sub_data',
                curtab :curtab,
                data:i_data,
                default_data:default_data
            })
        })
    }

    // 选择模型

    var m_data = null
    var m_i_data = []
    var default_data = {}
    // function show_sel_model(){
    //     var dom = document.getElementById('cfg_test_data')
    //     var obj = train_m_con[1]['config']
    //     dom.innerHTML = train_m_con[1]['tel'](obj)
    //
    //     getiddata(function(data){
    //         if(data.data && data.data.Train_data){
    //             default_data.Model_id = data.data.Model_id
    //         }
    //         if(!m_data){
    //             var url = interface.train.cate_list+'is_del=0'
    //             ajaxget(url,function(data){
    //                 console.log(data.data)
    //                 m_i_data = _modeldata(data.data)
    //                 console.log(m_i_data)
    //                 var obj = {
    //                         domid:'select_data',
    //                         domsid:'select_sub_data',
    //                         data:m_i_data,
    //                         default_data:default_data
    //                      }
    //                 m_data = selectdata(obj)
    //             })
    //         }else{
    //             m_data.init()
    //         }
    //     })
    // }

    function show_sel_model(){
        getiddata(function(data){
            train_sel_model(data)
        })
    }

    function _modeldata(data){
        var arr = []
        for(var i in data){
            var obj = {
                title: data[i].title,
                detail: data[i].cate_list,
                type: 'model'
            }
            arr.push(obj)
        }
        return arr
    }

    //数据绑定
    function subdataid(){
        var sdata = s_data.subdata()
        var data = 'task_id='+urlfun.getquery('id')+'&train_data='+sdata.task_id+'&predict_data='+sdata.predict_data
        var obj = {
            url:interface.train.data_bind,
            data:data,
            info:'数据选择成功',
            call:function (){
                walert('数据选择成功，是否继续选择模型',function(){
                    show_sel_model()
                })
            }
        }
        bindfun(obj)
    }

    //模型绑定
    function submodelid(){
        var sdata = m_data.subtrain()
        if(!sdata.length) return false
        var data = 'task_id='+urlfun.getquery('id')+'&model_id='+sdata[0]

        var obj = {
            url:interface.train.model_bind,
            data:data,
            info:'模型选择成功',
            call:function(){
                walert('模型选择成功，是否继续配置数据',function(){
                    _g_status ++
                    show_setting_data()
                })
            }
        }
        bindfun(obj)
    }

    // 绑定
    function bindfun(obj){
        var url = obj.url
        var data = obj.data
        ajaxpost(url,data,function(data){
            if(data.error == 0){
                //succPrompt(obj.info)
                obj.call()
            }else{
                alert(data.msg)
            }
        })
    }

    // 配置数据
    var c_data = null
    function show_setting_data(){
        getiddata(function(data){
            if(g_taskdata.model_type ==0 || !g_taskdata.data_val) {
                alert('请先选择数据和模型')
                return false;
            }



            var dom = document.getElementById('cfg_test_data')
            dom.innerHTML = train_m_con[2]['tel'](train_m_con[2]['config'])
            var top_html = ''

            if(g_taskdata.task_status != 0){
                console.log(g_taskdata.task_status);

                $('.select_sub_btn').hide()
            }


            if(!c_data){
                var obj={
                    domid:'config_data',
                    id:urlfun.getquery('id'),
                    //url:interface.train.show_data_config,
                    isVerification:true,
                    data:data.data.data_info.data_config,
                    //config_data:"Norm_method^_^width,Sample_collection_profile^_^faster,Model_shape_profile^_^slim,Sample_reject_profile^_^harsher,Norm_length^_^123555"
                }
                if(data.data && data.data.data_config){
                    obj.config_data = (data.data.data_config)
                }
                c_data = show_config(obj);
            }else{
                if(data.data && data.data.data_config){
                    c_data.config_data = (data.data.data_config)
                } c_data.init()
            }
            //_train_config_data()
            var html = '<div style="padding: 10px 10px 10px 2px;">样本类型配置</div>' +
                        '<div style="padding: 20px; border: 1px solid rgba(151,151,151,.2);background: #fff;">'
                    html += '<div class="item" style="display: inline-block; width: 48%; margin-right: 20px; padding-right: 20px; border-right: 1px solid #e2e2e2;">' +
                                //'<label class="col-sm-3 control-label" style="margin-right: 20px; margin-bottom: 10px;">地平线开发数据</label>' +
                                '<a href="javascript:;" onclick="con_show_attrs(this)"  style="margin-bottom: 10px;" type="submit" class="v btn blue normal_btn" domid="show_attr">添加开发数据</a>' +
                                '<div id="show_attr" style="height: 100px;  background: #fff; border:1px solid #e2e2e2; overflow: auto;"></div>'+
                            '</div>'

                    html += '<div class="item" style="display: inline-block;width: 48%;">' +
                                //'<label class="col-sm-3 control-label" style="margin-right: 20px;">我的数据</label>    ' +
                                '<a href="javascript:;" onclick="con_show_attrs(this)" style="margin-bottom: 10px;" type="submit" class="v btn blue normal_btn" domid="show_my_attr">添加我的数据</a>' +
                                '<div id="show_my_attr" style="height: 100px;   background: #fff;  border:1px solid #e2e2e2; overflow: auto;"></div>'+
                            '</div>'
                html += '</div>'

                $('#config_top_data').html(html)

                datapic_train('config_bottom_data')

                if(data.data && data.data.content_type){
                    $('#show_attr').html('<pre>'+g_formatJson(data.data.content_type)+'<pre>')
                    $('#show_attr').attr('con_type',JSON.stringify(data.data.content_type))
                }
        })
        console.log($('#config_data').height());
    }

    function sub_setting_data(){
        var cobj= c_data.getjsonData()
        var oobj = $.extend({},g_taskdata.data_config)
        for(var i in oobj){
            if(cobj[i]){
                oobj[i] = cobj[i]
            }
        }
        var obj = {
            data:'data_config='+JSON.stringify(oobj)+'&content_type='+$('#show_attr').attr('con_type'),
            url:interface.train.update,
            name : 'data_config',
            info:'数据配置成功',
            callb:function(){
                walert('数据配置成功，是否继续配置模型',function(){
                    _g_status ++
                    show_setting_train();
                })
            }
        }
        setting(obj)
    }

    // 配置模型
    var c_train = null
    function show_setting_train(){
        getiddata(function(data){
            if(g_taskdata.model_type ==0 || !g_taskdata.data_val) {
                alert('请先选择数据和模型')
                return false;
            }

            var dom = document.getElementById('cfg_test_data')
            dom.innerHTML = train_m_con[3]['tel'](train_m_con[3]['config'])

            if(g_taskdata.task_status != 0){
                $('.select_sub_btn').hide()
            }

            if(!c_train){
                var obj={
                    domid:'config_data',
                    id:urlfun.getquery('id'),
                    data:data.data.model_info.model_config,
                    isVerification:true
                    //url:interface.train.show_model_config
                }
                if(data.data && data.data.model_config){
                    obj.config_data = data.data.model_config
                }
                c_train = show_config(obj);
            }else{
                if(data.data && data.data.model_config){
                    _g_status ++
                    c_train.config_data = data.data.model_config
                }
                c_train.init()
            }
        })
        //mode_con()
    }

    function sub_setting_train(){
        var network =_svg_data.svg_2.data
        var okobj = $.extend({},c_train.config_data,c_train.getjsonData())
        okobj.network = network
        var obj = {
            //data:'model_config='+JSON.stringify(c_train.getjsonData())+'&network_result='+JSON.stringify(nt_okdata(_svg_data))+'&network_option='+JSON.stringify(nt_okdata_rend(_svg_data)),
            data:'model_config='+JSON.stringify(okobj),
            network_result:nt_okdata(_svg_data),
            network_option:JSON.stringify(nt_okdata_rend(_svg_data)),
            url:interface.train.update,
            name : 'model_config',
            info:'模型配置成功',
            callb:function(){
                walert('模型配置成功，是否立即开始训练',function(){
                    _g_status = 4
                    start_tash()
                })
            }
        }

        setting(obj)
        //svg.addcur()
    }

    // 提交配置
    function setting(obj){
        var data = obj.data
        var datastr = 'id='+urlfun.getquery('id')+'&'+data;
        var url = obj.url;
        ajaxpost(url,datastr,function(data){
            if(data.error == 0){
                obj.callb();
            }else{
                alert(data.msg);
            }
        })
    }

    // 配置完成
    function config_ok(){
        succPrompt('开始训练')
    }

    function start_tash(){
        //if(g_taskdata.task_status == 0 && _g_status == 4){
        if(g_taskdata.task_status == 0 && g_taskdata.model_type !=0 && g_taskdata.data_val){
            walert('确定开始训练',function(){
                ajaxget(interface.train.task_start+'id='+urlfun.getquery('id'),function(data){
                    if(data.error ==0){
                        succPrompt('开始训练')
                        getiddata()
                    }else{
                        alert(data.msg)
                    }
                })
            })
        }
    }

    // 显示训练过程
    function show_monitor(){
        if(g_taskdata.task_status==1 || g_taskdata.task_status==2 || g_taskdata.task_status==3){
            var dom = document.getElementById('cfg_test_data')
            var obj = train_m_con[5]['config']
            dom.innerHTML = train_m_con[5]['tel'](obj)

            var url = interface.train.detail;
            var datastr = 'id='+urlfun.getquery('id')
            ajaxpost(url,datastr,function(data){
                var html = show_monitor_con(data.data)
                document.getElementById('config_data').innerHTML = html;

                var tboard_url = interface.train.judge_tboard;
                ajaxpost(tboard_url,datastr,function(tboard_data){
                    var obj = {
                        tboard_data:tboard_data.data,
                        tabid:'_train_chart_tab',
                        chartid:'_train_chart_con',
                    };
                    tboard(obj);
                    // var key = document.getElementsByClassName('trainMonitor')[0].text;
                    // monitor_chart({domid:'_train_chart_con',data:tboard_data.data[key]});
                })

            })
        }
    }

    function show_monitor_con(data){
        var html = ''

        html += '<div style="padding-top: 10px;background: #fff; border-bottom: 1px solid #e2e2e2; border-bottom-width: 0px;">' +
                    '<a href="javascript:;" class="tab selected ">训练过程</a>' +
                    '<a href="javascript:;"  onclick="train_fun.show_evaluating()" class="tab">评测过程</a>' +
                '</div>'

        var objfun = {
            0:function(data){
                html += '<div>任务配置中</div>'
            },
            1:function(data){
                var log = ''
                // if(g_taskdata.monitor_info.job_running_stdoutlog_url != ''){
                //     log = '<a target="_blank" href="'+g_taskdata.monitor_info.job_running_stdoutlog_url+'" class="">任务执行日志</a>'
                // }

                html += '<div style="margin-bottom: 20px;">任务正在训练,还需要'+stringtime(data.monitor_info.job_running_est_time)+' 结束 <a href="javascript:;" onclick="_task_kill()" class="v btn blue">终止任务</a></div>'
                html += '<div style="margin-bottom: 20px;">预计 '+stringtime(data.monitor_info.job_queue_est_time)+' 可查看评测结果 <a href="evaluate_detail.html?id='+urlfun.getquery('id')+'" class="v btn blue">查看评测结果</a></div>'
                html += '<div style="width: 200px; margin-bottom: 10px; height: 20px; background: #ccc; border: 1px solid #333; color: #fff;  position: relative; text-align: center; display: none">' +
                    '<div style="width: '+(data.progress_speed*100)+'%; background: #09f; height: 20px; position: absolute; left: 0px; top:0px;"></div>' +
                    '<span style="position: absolute; z-index: 99; left:0px; width:100%;">训练进度'+(data.progress_speed*100)+'%</span>' +
                    '</div>'+
                    '<div style="margin-bottom: 10px;">' +
                    '<a target="_blank" href="'+g_taskdata.monitor_info.job_running_stderrlog_url+'" class="" style="margin-right: 20px;">训练输出日志</a>' +
                    log +
                    '</div>'+
                    '<div style="margin-bottom: 20px;"><span id="server_status"></span><a href="javascript:;" onclick="_showserver_statuss()" class="">查看全部状态</a></div>'
            },
            2:function(data){
                var log = ''
                // if(g_taskdata.monitor_info.job_running_stdoutlog_url != ''){
                //     log = '<a target="_blank" href="'+g_taskdata.monitor_info.job_running_stdoutlog_url+'" class="">任务执行日志</a>'
                // }

                html += '<div>正在训练依赖任务</div>'
                html += '<div style="margin-bottom: 20px;">任务正在训练,还需要'+stringtime(data.monitor_info.job_running_est_time)+' 结束 <a href="javascript:;" onclick="_task_kill()" class="v btn blue">终止任务</a></div>'
                html += '<div style="margin-bottom: 20px;">预计 '+stringtime(data.monitor_info.job_queue_est_time)+' 可查看评测结果 <a href="evaluate_detail.html?id='+urlfun.getquery('id')+'" class="v btn blue">查看评测结果</a></div>'
                html += '<div style="width: 200px; margin-bottom: 10px; height: 20px; background: #ccc; border: 1px solid #333; color: #fff;  position: relative; text-align: center; display: none">' +
                            '<div style="width: '+(data.progress_speed*100)+'%; background: #09f; height: 20px; position: absolute; left: 0px; top:0px;"></div>' +
                            '<span style="position: absolute; z-index: 99; left:0px; width:100%;">训练进度'+(data.progress_speed*100)+'%</span>' +
                        '</div>'+
                        '<div style="margin-bottom: 10px;">' +
                            '<a target="_blank" href="'+g_taskdata.monitor_info.job_running_stderrlog_url+'" class="" style="margin-right: 20px;">训练输出日志</a>' +
                            log +
                        '</div>'+
                        '<div style="margin-bottom: 20px;"><span id="server_status"></span><a href="javascript:;" onclick="_showserver_statuss()" class="">查看全部状态</a></div>'
            },
            3:function(data){
                var log = ''
                // if(g_taskdata.monitor_info.job_running_stdoutlog_url != ''){
                //     log = '<a target="_blank" href="'+g_taskdata.monitor_info.job_running_stdoutlog_url+'" class="">任务执行日志</a>'
                // }
                html += '<div style="margin-bottom: 20px;">任务训练完成</div>'
                html += '<div style="margin-bottom: 20px;"><a href="evaluate_detail.html?id='+urlfun.getquery('id')+'" class="v btn blue">查看评测结果</a></div>'
                html += '<div style="width: 200px; margin-bottom: 30px; height: 20px; background: #ccc; border: 1px solid #333; color: #fff;  position: relative; text-align: center;display: none">' +
                    '<div style="width: 100%; background: #09f; height: 20px; position: absolute; left: 0px; top:0px;"></div>' +
                    '<span style="position: absolute; z-index: 99; left:0px; width:100%; font-size: 12px;">训练进度100%<span>' +
                    '</div>'+
                    '<div style="margin-bottom: 10px;">' +
                        '<a target="_blank" href="'+g_taskdata.monitor_info.job_running_stderrlog_url+'" class="" style="margin-right: 20px;">训练输出日志</a>' +
                        log +
                    '</div>'+
                    '<div style="margin-bottom: 20px;"><span id="server_status"></span><a href="javascript:;" onclick="_showserver_statuss()" class="">查看全部状态</a></div>'

            },
            // 11:function(data){
            //     html += '<div>任务正在排队,预计'+data.queue_time+'开始 <a href="javascript:;"  onclick="_task_kill()" class="v btn blue">终止任务</a></div>'
            // },
            4:function(data){
                html += '<div>数据配置错误</div>'
            },
            5:function(data){
                html += '<div>模型配置错误</div>'
            },
            6:function(data){
                html += '<div>异常中断，失败原因：'+g_taskdata.monitor_info.job_stop_reason+'</div>'
            },
            7:function(data){
                html += '<div>系统错误</div>'
            },
            8:function(data){
                html += '<div>任务终止</div>'
            },
            9:function(data){
                html += '<div>任务失败</div>'
            }
        }
        html += '<div style="padding: 10px;">'
        objfun[data['task_status']](data)
        html += '</div>'
        html += '</div>'
        // if(iobj['task_status'] == 1 || iobj['task_status'] == 3){
        //     ajaxget(interface.train.task_info+'task_id='+urlfun.getquery('id'),function(data){
        //         if(data.error == 0){
        //             var idata = data.data[data.data.length-1]
        //             $('#server_status').text('最新状态：'+idata.time+' '+idata.info)
        //         }
        //     })
        // }

        if(data['task_status'] == '1' || data['task_status'] == '3'){
                html += '<div id="_train_chart_tab"></div>';
                html += '<div id="_train_chart_con"></div>'
            // html += '</div>'
            // html += '<div id="_train_chart_tab">' +
            //     '<a href="javascript:;" class="v btn trainMonitor blue"  style="margin-right: 1px">loss</a>' +
            //     '<a href="javascript:;" class="v btn trainMonitor"       style="margin-right: 1px" >l2loss</a>' +
            //     '<a href="javascript:;" class="v btn trainMonitor"       style="margin-right: 1px" >l2lossratio</a>' +
            //     '<a href="javascript:;" class="v btn trainMonitor"       style="margin-right: 1px" >acc</a>' +
            //     '<a href="javascript:;" class="v btn trainMonitor"       style="margin-right: 1px" >diffp-penalty</a>' +
            //     '<a href="javascript:;" class="v btn trainMonitor"       style="margin-right: 1px" >dropout_keep_rate_1</a>' +
            //     '<a href="javascript:;" class="v btn trainMonitor"       style="margin-right: 1px" >prepro</a>' +
            //     '</div>'
            // html += '<div id="_train_chart_con"></div>'
        }
        return html;
        //html += '<div><a href="" class="v btn blue">终止任务</a></div>'

    }


    // 显示评测过程
    function show_evaluating(){
        if(_g_status >3){
            var dom = document.getElementById('cfg_test_data')
            var obj = train_m_con[6]['config']
            dom.innerHTML = train_m_con[6]['tel'](obj)

            var html = '<div style="padding-top: 10px;background: #fff; border-bottom: 1px solid #e2e2e2; border-bottom-width: 0px;">' +
                            '<a href="javascript:;" onclick="train_fun.show_train()" class="tab">训练过程</a>' +
                            '<a href="javascript:;"  class="tab selected">评测过程</a>' +
                        '</div>'
                html += '<a href="evaluate_detail.html?id='+urlfun.getquery('id')+'" class="v btn blue">查看评测</a>'
                html += '<div id="evalua_"></div><div></div>'

            document.getElementById('config_data').innerHTML = html

            var totalurl = interface.train.judge_curve
            // var datastr = 'id='+urlfun.getquery('id');
            var datastr = 'id=1';
            ajaxpost(totalurl,datastr,function(data){
                if (data.error == 0) {
                    var dataarr = data.data;
                    monitor_chart({domid:'evalua_',data:dataarr,istype:1})
                    //diagram(obj);
                }
            })
        }
    }

    function stringtime(time){
        var hours = parseInt(time/3600);
        var minutes = parseInt((time%3600)/60);
        var seconds = (time%3600)%60;

        if(hours < 10){
            hours = '0'+hours;
        }
        if(minutes <10){
            minutes ='0'+minutes;
        }
        if(seconds <10){
            seconds ='0'+seconds;
        }
        return hours+':'+minutes+':'+seconds;
    }


    //显示训练
    function show_train(){
        var dom = document.getElementById('cfg_test_data')
        var obj = train_m_con[6]['config']
        dom.innerHTML = train_m_con[6]['tel'](obj)

        var url = interface.train.detail;
        var datastr = 'id='+urlfun.getquery('id')
        ajaxpost(url,datastr,function(data){
            var html = show_monitor_con(data.data)
            document.getElementById('config_data').innerHTML = html;
            var tboard_url = interface.train.judge_tboard;
            ajaxpost(tboard_url,datastr,function(tboard_data){
                var obj = {
                    data:tboard_data.data,
                    tabid:'_train_chart_tab',
                    chartid:'_train_chart_con',
                };
                tboard(obj);
            })
        })
    }
    function show_train_con(data){
        var html = ''
        html += '<div>任务状态：'+g_status_monitor[data.task_status]+'</div>'
        return html
    }


    w.train_fun = {
        show_data:show_sel_data,
        subdataid:subdataid,

        show_model:show_sel_model,
        submodelid:submodelid,

        setting_data:show_setting_data,
        sub_setting_data:sub_setting_data,

        setting_train :show_setting_train,
        sub_setting_train :sub_setting_train,

        start_tash:start_tash,
        show_monitor:show_monitor,

        show_train:show_train,

        show_evaluating:show_evaluating
    }

}(window)

// $('body').on('click','.trainMonitor',function(){
//     var key = $(this).text();
//     monitor_chart({domid:'_train_chart_con',data:[data]})
//     // _showchart(type)
//     $(this).addClass('blue').siblings().removeClass('blue')
// })

function _showchart(type){
    $.ajax({
        type:'get',
        url:interface.train.judge_tboard_curve+'curve_type='+type+'&task_id='+urlfun.getquery('id'),
        dataType:'json',
        success:function(data){
            if(data.length){
                monitor_chart({domid:'_train_chart_con',data:[data]})
            }else{
                alert('获取数据错误')
            }
        },
        error:function(){
            alert(interface.train.judge_tboard_curve+'curve_type=loss' +'接口错误')
        }
    })
}
// 终止任务
function _task_kill(){
    walert('确定终止任务',function(){
        $.ajax({
            type:'get',
            url:interface.train.task_kill+'id='+urlfun.getquery('id'),
            dataType:'json',
            success:function(data){
                if(data.error ==0){
                    alert('任务终止成功')
                }else{
                    alert(data.msg)
                }
            },
            error:function(){
                alert(interface.train.judge_tboard_curve+'curve_type=loss' +'接口错误')
            }
        })
    })
}

// 显示集群的任务状态
function _showserver_statuss(){
    var url = interface.train.detail;
    var datastr = 'id='+urlfun.getquery('id');
    // var datastr = 'id=1';
    ajaxpost(url,datastr,function(data){
        if(data.error == 0){
            var data = data.data.epoch_info;
            var html = ''
            for(var i in data){
                if(i!=0){
                    html += '<span style="margin-bottom: 10px;"> -->> </span>'
                }
                html += '<a href="javascript:;" class="v btn blue" style="margin-bottom: 10px;">'+'第'+i+'轮 '+data[i]+'</a>'
            }
            var popup = tool_popup()
            popup.init()
            popup.con = "<div id='graph' style='width:600px;height:400px;margin:0 auto'>"+html+"</div>"
            popup.callback = function(){}
            popup.title = '详情'
            popup.style_popup_con += 'height:500px;'
            popup.show();
        }else{
            alert(data.msg)
        }
    })
}

//
function con_attr_sub_type(data,id){
    var obj = {}
    var bdata = data.box_type
    for(var i in bdata){
        obj[bdata[i].type.split('^_^')[0]] = {}
        if(bdata[i].list && bdata[i].list.length){
            //obj[bdata[i].type.split('^_^')[0]][bdata[i].type.split('^_^')[0]] = eachstr(bdata[i].list[0].list)
            if(bdata[i].list[0].list.length == 1){
                obj[bdata[i].type.split('^_^')[0]][bdata[i].type.split('^_^')[0]] = ''+eachstr(bdata[i].list[0].list)
            }else{
                obj[bdata[i].type.split('^_^')[0]][bdata[i].type.split('^_^')[0]] = 'ALL'
            }
        }
    }
    return obj
    function eachstr(data){
        var arr = []
        for(var i in data){
            arr.push(data[i].split('^_^')[0])
        }
        return arr
    }
}

function con_attr_sub_type_cn(data){
    var obj = {}
    var bdata = data.box_type
    for(var i in bdata){
        obj[bdata[i].type.split('^_^')[1]] = {}
        if(bdata[i].list && bdata[i].list.length){
            obj[bdata[i].type.split('^_^')[1]][bdata[i].type.split('^_^')[1]] = eachstr(bdata[i].list[0].list)
        }
    }
    return obj

    function eachstr(data){
        var arr = []
        for(var i in data){
            arr.push(data[i].split('^_^')[1])
        }
        return arr
    }
}



/*contentype展示属性*/
function con_show_attrs(dom){
    var attrtree = attr_tree();
    var url = interface.data.attrs;
    //datastr = 'id='+JSON.stringify(_contypedata());
    datastr = 'id='+_contypedata();
    //datastr = 'id=[121,421]';
    //datastr = 'type=4';
    var id = 'show_attr'
    if(dom){
        var id = dom.getAttribute('domid')
    }
    ajaxpost(url,datastr,function(data){
        attrtree.data=data.data[4];
        var g_popup = tool_popup();
        g_popup.callback = function(){
            Class.removeClass(document.getElementById(id),'show_tag');
            Class.addClass(document.getElementById(id),'tags');
            $('#'+id).html('<pre>'+g_formatJson(JSON.stringify(con_attr_sub_type_cn(attrtree.seldata())))+'<pre>')
            $('#'+id).attr('con_type',JSON.stringify(con_attr_sub_type(attrtree.seldata(),id)))
        }
        g_popup.titile = '选择属性'
        g_popup.style_popup_con += 'height:inherit; max-height: none;'
        g_popup.con = attrtree.html('_tool_p_con',true)
        g_popup.show()
        attrtree.eventinit()

        $('#_tool_p_con').find('div').eq(0).siblings().hide()
        var $type = $('#_tool_p_con').find('div').eq(0).find('div').eq(1).find('div')
        $type.each(function(){
            if($(this).attr('class') != undefined){
                $(this).find('div').eq(0).siblings().hide()
            }
        })
        $('.twobox').attr('checked',true)
        $('.twobox').hide()
        $('#_tool_p_con').find('input[type="radio"]').hide()
    });
}

function _contypedata(){
    var train = g_taskdata.data_val.train_data.split(',')
    var test  = g_taskdata.data_val.val_data.split(',')
    var arr = []
    for(var i in train){
        arr.push(train[i])
    }

    for(var i in test){
        if(arr.indexOf(test[i]) == -1){
            arr.push(test[i])
        }
    }
    return arr
}

function splicobj(data){
    var str = ''
    var num = 0
    for(var i in data){
        if(num!=0){
            str+=','
        }
        str+= i + '^_^'+data[i]
        num++
    }
    console.log(str)
    return str
}



