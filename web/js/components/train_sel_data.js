var _list_1 = null
var _list_2 = null
var _list_3 = null
var _index_data = 0
var _sel_data = {}
var seldata_obj = {
    url:interface.data.reslist,
    domid:'sel_data_con_html_1',
    data:{list:0,status:2},
    ispage:false,
    isrobotdata:true,
    title:[
        {
            title:'<input type="checkbox" class="train_sel_box cuscheck" value="all" id="open_check"/><label for="open_check" ></label>',
            callback:function(data,send_data){
                return '<span><input type="checkbox" id="checkbox_'+send_data.status+'_'+data+'" class="train_sel_box cuscheck" value="'+data+'"/><label for="checkbox_'+send_data.status+'_'+data+'" ></label></span>'
            },
            style:"width:60px;text-align: center;"
        },
        {
            title:'ID#版本号',
            callback:function(data){
                var raw = data[0];
                var version = data[1];
                return '<span>'+raw+'#'+version+'</span>'
            }
        },
        {
            title:"数据描述",
            callback:function(data){
                if(data){
                    return '<span style="display: inline-block; width:100%;overflow: hidden; text-overflow: ellipsis;white-space: nowrap;" title="'+data[0]+'">'+data[1]+'|'+data[2]+':'+data[0]+'</span>'
                }else{
                    return '<span>'+'</span>'
                }
            },
            style:"width:150px;"
        },
        {
            title:"创建时间",
            callback:function(data){
                return '<span>'+data+'</span>'
            },
            style:"width:130px;"
        },
        {
            title:"图片／框数",
            callback:function(data){
                return '<span>'+data[0]+' / '+data[1]+'</span>'
            }
        },
        {
            title:'数据属性',
            callback:function(data){
                return '<a href="javascript:;" style="display: inline-block; width: 100%; height: 15px; text-overflow:ellipsis;overflow:hidden;white-space:nowrap;" title='+__trim(JSON.stringify(data[1]))+' onclick="showGraph('+JSON.stringify(data[2])+')">'+data[0]+'</a>'
            }
        },
        {
            title:'数据场景',
            callback:function(data){
                if(data){
                    var tags = '';
                    for(var i=0;i<data.length;i++){
                        var tmp = data[i].category+': '+data[i].detail +';';
                        tags += tmp;
                    }
                    tags = tags.substring(0,tags.length-1);
                    return '<span>'+tags+'</span>'
                }else{
                    return '<span>'+'</span>'
                }
            }
        },
        {
            title:'操作',
            callback:function(data){
                return '<a href="javascript:;" onclick="toggle_preview(this)" did="'+data+'">收起预览</a>'
            }
        }
    ],
    rendcall:function(data){
        if(data.domid == 'sel_data_con_html_1'){
            if(data.page < data.maindata.page.page_num){
                $('.train_adddata').eq(0).addClass('blue')
            }else{
                $('.train_adddata').eq(0).removeClass('blue')
            }
        }else{
            if(data.page < data.maindata.page.page_num){
                $('.train_adddata').eq(1).addClass('blue')
            }else{
                $('.train_adddata').eq(1).removeClass('blue')
            }
        }
    },
    isaddcon:true,
    datakey:[
        'id',
        ['raw','version'],
        ['comment','raw','version'],
        'create_time',
        ["pic_num",'boxes','groups','points'],
        ["attrParsed","attr","id"],
        "tags",
        'id'
    ]
}

function __trim(str){
    if(!str) return false;
    var str = str.replace(/ /g,'');
    for(var i=str.length-1; i>=0; i--){
        if(/\S/.test(str.charAt(i))){
            str = str.substring(0, i+1);
            break;
        }
    }
    return str;
}

function train_sel_data(idata){
    var html = ''
        html += '<div style="position: absolute; left: 0px; right: 0px; top: 0px; height: 80px;">' +
                    //'<div class="cfg_title">选择数据</div>'+
                    '<div style="padding-top: 10px;background: #fff; border: 1px solid #e2e2e2; border-bottom-width: 0px;">' +
                        '<a href="javascript:;" class="tab selected sel_data_btn">地平线开放数据</a>'+
                        '<a href="javascript:;" class="tab sel_data_btn">用户上传数据</a>'+
                    '</div>' +
                '</div>'+
                '<div style="position: absolute; left: 0px; right: 0px; top: 50px; bottom: 41px; overflow: hidden;">'+
                    '<div class="sel_data_con">'+
                        '<div class="search_div" style="margin-bottom: 0px; position:absolute; top: 0px; height: 40px; left: 0px; right: 0px; border: 1px solid #e2e2e2;">' +
                            '<div class="item">' +
                                '<label>数据描述</label>' +
                                    '<input type="text" name="desc" class="_desc_" style="undefined display:inline-block;" value="">' +
                            '</div>' +
                            '<div class="item">' +
                                '<label>数据id|版本</label>' +
                                '<input type="text" name="raw" class="_raw_" style="undefined display:inline-block;" value="">' +
                            '</div>' +
                            '<div class="item">' +
                                '<label>业务项目组</label>' +
                                '<select name="firm"></select>' +
                            '</div>' +
                            '<div class="item" style="">' +
                                '<label class="col-sm-3 control-label">数据场景</label><a href="javascript:;" onclick="show_tags()" type="submit" class="v btn normal_btn btn-default show_tag btn_hide" id="show_tag">点击添加</a>' +
                            '</div>' +
                            '<div id="_data_label" style="display:none"></div><div class="item" style="undefined"><label class="col-sm-3 control-label">数据属性</label><a href="javascript:;" onclick="show_attrs(this)" type="submit" class="v btn normal_btn btn-default show_tag btn_hide" id="show_attr1">点击添加</a></div>' +
                            //'<div class="form-group"><div class="col-sm-9"><textarea type="text" name="attr" style="height:80px; display:none" class="form-control" placeholder=""></textarea></div></div>' +
                            '<div class="item"><a href="javascript:;" onclick="_searchdata_1()" class="v btn blue normal_btn">搜索</a></div>' +
                        '</div>'+
                        '<div style="position: absolute; top: 61px; bottom: 0px; left: 0px; right: 0px; overflow: hidden; overflow-y: auto;">' +
                            '<div class="sel_data_con_html" id="sel_data_con_html_1"></div>'+
                            '<div style="text-align:center; padding-bottom:20px;padding-top:20px;"><a href="javascript:;" class="v btn normal_btn train_adddata" type="1">加载下一页</a></div>' +
                        '</div>'+
                    '</div>'+

                    '<div class="sel_data_con" style="display: none">'+
                        '<div class="search_div" style="margin-bottom: 0px; position:absolute; top: 0px; height: 40px; left: 0px; right: 0px; border: 1px solid #e2e2e2;">' +
                            '<div class="item">' +
                                '<label>数据描述</label>' +
                                    '<input type="text" name="desc" class="_desc_" style="undefined display:inline-block;" value="">' +
                            '</div>' +
                            '<div class="item" style="">' +
                                '<label class="col-sm-3 control-label">创建日期</label> 开始时间 <input type="text" id="start_time" name="start_time" style="margin-left: 5px;margin-right: 5px;"/>结束时间 <input type="text" id="end_time" name="end_time" style="margin-left: 5px;"/>' +
                            '</div>' +
                            '<div id="_data_label" style="display:none"></div><div class="item" style="undefined"><label class="col-sm-3 control-label">数据属性</label><a href="javascript:;" onclick="show_attrs(this)" type="submit" class="v btn normal_btn btn-default show_tag btn_hide"  id="show_attr2">点击添加</a></div>' +
                            '<div class="form-group"><div class="col-sm-9"><textarea type="text" name="attr" style="height:80px; display:none" class="form-control" placeholder=""></textarea></div></div>' +
                            '<div class="item"><a href="javascript:;" onclick="_searchdata_2()" class="v btn blue normal_btn">搜索</a></div>' +
                        '</div>'+
                        '<div style="position: absolute; top: 61px; bottom: 0px; left: 0px; right: 0px; overflow: hidden; overflow-y: auto;">' +
                            '<div class="sel_data_con_html" id="sel_data_con_html_2"></div>' +
                            '<div style="text-align:center; padding-bottom:20px;padding-top:20px;"><a href="javascript:;" class="v btn normal_btn train_adddata" type="2">加载下一页</a></div>' +
                        '</div>'+
                    '</div>'+
                '</div>'+
               '<div id="config_mask" style="position: absolute; left:0px; right:0px; top:0px; bottom:0px; z-index: 999; display:none;"></div>'+
                '<div class="select_sub_btn"><span class="b-btn"><a href="javascript:;" class="v btn blue normal_btn show_div" showid="show_sel_data">查看已选数据</a></span></div>'+

                '<div id="show_sel_data" style="position: absolute; top:0px; bottom:0px; left:0px; right:0px; background:#eee; display:none;">' +
                    '<div class="cfg_title">已选数据</div>'+
                    '<div style="position:absolute; top:40px; bottom:40px; left:0px; right:0px; overflow: hidden; overflow-y: auto;">' +
                        '<div style="margin-bottom:20px;  background: #fff; padding: 10px; margin-left: 1px;">'+
                            '<div style="">' +
                                '<div style="background:#eee; padding:5px;">训练集</div>'+
                                '<div style="background:#eee; padding:5px; color:#666;" class="_sel_train_pic">图片数:</div>'+
                                '<div id="sel_chart_train">chart</div>'+
                            '</div>'+
                            '<div style="">' +
                                '<div style="background:#eee; padding:5px;">测试集</div>'+
                                '<div style="background:#eee; padding:5px; color:#666;" class="_sel_test_pic">图片数:</div>'+
                                '<div id="sel_chart_test">chart</div>'+
                            '</div>'+
                            '<div style="">' +
                                '<div style="background:#eee; padding:5px;">总计</div>'+
                                '<div style="background:#eee; padding:5px; color:#666;" class="_sel_all_pic">图片数:</div>'+
                                '<div id="sel_chart_all">chart</div>'+
                            '</div>'+
                            '<div style="padding: 10px 10px; background: #eee;">所选数据：训练集例为<input type="text" style="width: 60px; padding: 2px 5px;" id="_train_num" value="90"/>% 测试集比例为<input type="text" id="_test_num" style="width: 60px; padding: 2px 5px;" value="10" />%</div>'+
                        '</div>'+

                        '<div id="sel_data_con_html_3"></div>'+
                    '</div>'+
                    '<div class="select_sub_btn"><span class="b-btn"><a href="javascript:;" hideid="show_sel_data"  class="v btn show_div">取消</a> <a href="javascript:;" class="v btn blue train_bind_data">确定</a></span></div>'+
                '</div>'
    $('#cfg_test_data').html(html)
	datePicker('start_time', {
		inputId: 'start_time',
		className: 'date-picker-wp',
		seprator: '-'
	});
	datePicker('end_time', {
		inputId: 'end_time',
		className: 'date-picker-wp',
		seprator: '-'
	});

    ajaxget(interface.data.firm_view+'limit=0',function(data){
        var html = ''
        if(data.error == 0){
            html += '<option value="">全部</option>'
            for(var i in data.data.detail){
                html += '<option value="'+data.data.detail[i].id+'">'+data.data.detail[i].name+'</option>'
            }
        }
        $('[name="firm"]').html(html)
    })


    if(idata && idata.data.data_val){
        var tarinarr = idata.data.data_val.train_data.split(',')
        for(var i in tarinarr){
            var arr = tarinarr[i].split('|')
            if(arr.length == 3){
                _sel_data[arr[2]] = {
                    train:true,
                    test:false
                }
            }
        }
        var testarr  = idata.data.data_val.val_data.split(',')
        for(var i in testarr){
            var arr = testarr[i].split('|')
            if(arr.length == 3){
                if(_sel_data[arr[2]]){
                    _sel_data[arr[2]] = {
                        train:true,
                        test:true
                    }
                }else{
                    _sel_data[arr[2]] = {
                        train:false,
                        test:true
                    }
                }
            }
        }
        $('#show_sel_data').show()
        _ischeckeddata()

        if(g_taskdata.task_status != 0){
            $('.select_sub_btn').find('.b-btn').hide()
        }
    }else{
        if(!_list_1){
            var obj = seldata_obj
            obj.data.status = 2
            obj.domid = 'sel_data_con_html_1'
            _list_1 = datalist($.extend({},obj))
        }else{
            _list_1.renderhtml()
        }

        if(_list_2){
            _list_2.renderhtml()
        }
    }
}

function _searchdata_1(){
    var data = {list: 0, status: 2,offset:0}
    _list_1.data = data
    if($('[name="firm"]').val() != ''){
        _list_1.data.firm = $('[name="firm"]').val()
    }

    _list_1.data.desc = $('._desc_').eq(0).val();

    _list_1.data.raw = $('._raw_').eq(0).val().replace(/#/g,'|')

    var attr = document.getElementById('show_attr1').innerText;
    if(attr && attr!='点击添加') _list_1.data.attr =attr;
    var bid = document.getElementById('_data_label').getAttribute('bid');
    if(bid) _list_1.data.tags = bid;
    _list_1.page = 1
    _list_1.clearhtml()
    _list_1.ajaxpagedata()
}

function _searchdata_2(){
    var data = {list: 0, status: 1,offset:0}
    _list_2.data = data
    _list_2.data.desc = $('._desc_').eq(1).val();
    var attr = document.getElementById('show_attr2').innerText;
    if(attr && attr!='点击添加') _list_2.data.attr =attr;

    var start_time = document.getElementsByName('start_time')[0].value;
    if(start_time) _list_2.data.bind_stime = start_time;

    var end_time = document.getElementsByName('end_time')[0].value;
    if(end_time) _list_2.data.bind_etime = end_time;

    _list_2.page = 1
    _list_2.clearhtml()
    _list_2.ajaxpagedata()
}

$('body').on('change','#_train_num',function(){
    var num = parseInt($(this).val())
    if(num>100 || num<=0){
        alert('超出范围0-100')
        $(this).val('90')
    }else{
        $('#_test_num').val(100-num)
    }
    _sel_data_box()
})

$('body').on('change','#_test_num',function(){
    var num = parseInt($(this).val())
    if(num>100 || num<=0){
        alert('超出范围0-100')
        $(this).val('10')
    }else{
        $('#_train_num').val(100-num)
    }
    _sel_data_box()
})

$('body').on('click','.sel_data_btn',function(){
    var index = $(this).index()
    $('.sel_data_btn').removeClass('selected')
    $(this).addClass('selected')
    $('.sel_data_con').hide()
    $('.sel_data_con').eq(index).show()
    _index_data = index
    if(index == 1 && !_list_2){
        //show_loading()
        var obj = seldata_obj
        obj.data.status = 1
        obj.domid = 'sel_data_con_html_2'
        _list_2 = datalist($.extend({},obj))
    }
})


$('body').on('click','.show_div',function(){
    var showid = $(this).attr('showid')
    var hideid = $(this).attr('hideid')
    if(showid){
        $('#'+showid).show()
        if(showid == 'show_sel_data'){
            _ischeckeddata()
        }
    }
    if(hideid){
        $('#'+hideid).hide()
        if(!_list_1){
            show_loading()
            seldata_obj.data.status = 2
            seldata_obj.domid = 'sel_data_con_html_1'
            _list_1 = datalist($.extend({},seldata_obj))
        }
    }
})

// 选择数据
$('body').on('change','.train_sel_box',function(){
    var id = parseInt($(this).val())
    if($(this).val() == 'all'){

        if($(this).is(":checked")){
            if(_index_data == 0){
                $('#sel_data_con_html_1').find('.train_sel_box').prop("checked", true);
                alldomcheckbox($('#sel_data_con_html_1').find('.train_sel_box'),true)
            }else{
                $('#sel_data_con_html_2').find('.train_sel_box').prop("checked", true);
                alldomcheckbox($('#sel_data_con_html_2').find('.train_sel_box'),true)
            }
        }else{
            if(_index_data ==0){
                $('#sel_data_con_html_1').find('.train_sel_box').prop("checked", false);
                alldomcheckbox($('#sel_data_con_html_1').find('.train_sel_box'),false)
            }else{
                $('#sel_data_con_html_2').find('.train_sel_box').prop("checked", false);
                alldomcheckbox($('#sel_data_con_html_2').find('.train_sel_box'),false)
            }
        }
    }else{
        if($(this).is(":checked")){
            if(id && id != undefined){
                _sel_data[id] = {
                    train:true,
                    test:true
                }
            }
        }else{
            delete _sel_data[id]
        }
    }
})

function alldomcheckbox(dom,type){
    dom.each(function(){
        var id = parseInt($(this).val())
        if(type){
            if(id)_sel_data[id] = {train:true, test:true}
        }else{
            if(id) delete _sel_data[id]
        }
    })
}


$('body').on('click','.train_adddata',function(){
    if($(this).hasClass('blue')){
        var index = $(this).attr('type')
        if(index == 1){
            var top = $('#sel_data_con_html_1').parent().scrollTop()
            _list_1.page ++
            _list_1.ajaxpagedata()
            $('#sel_data_con_html_1').parent().scrollTop(top)
        }else{
            var top = $('#sel_data_con_html_2').parent().scrollTop()
            _list_2.page ++
            _list_2.ajaxpagedata()
            $('#sel_data_con_html_2').parent().scrollTop(top)
        }
    }
})

//提交数据
$('body').on('click','.train_bind_data',function(){
    var train = []
    var test = []
    $('.train_sel_ok_box').each(function(){
        if($(this).is(":checked")){
            train.push($(this).attr('sub'))
        }
    })
    $('.test_sel_ok_box').each(function(){
        if($(this).is(":checked")){
            test.push($(this).attr('sub'))
        }
    })
    var url = interface.train.update
    var data = 'id='+urlfun.getquery('id')+'&train_data='+train+'&val_data='+test
    //var data = 'id='+urlfun.getquery('id')+'&train_data=231|1|633&val_data=231|1|633'
    ajaxpost(url,data,function(data){
        if(data.error == 0){
            walert('数据选择成功，是否继续选择模型',function(){
                train_fun.show_model()
            })
        }else{
            alert(data.msg)
        }
    })
})

//提交数据选择
$('body').on('change','.train_sel_ok_box',function(){
    if(g_taskdata.task_status == 0){
        var id = parseInt($(this).val())
        if($(this).is(":checked")){
            _sel_data[id].train = true
        }else{
            _sel_data[id].train = false
        }
    }
    _sel_data_box()

})
$('body').on('change','.test_sel_ok_box',function(){
    if(g_taskdata.task_status == 0) {
        var id = parseInt($(this).val())
        if ($(this).is(":checked")) {
            _sel_data[id].test = true
        } else {
            _sel_data[id].test = false
        }
    }
    _sel_data_box()
})


function _arr_del_id(id){
    for(var i in _sel_data){
        if(_sel_data[i] == id){
            _sel_data.splice(i, 1);
        }
    }
}

function searchdata(){
    var arr = []
    for(var i in _sel_data){
        arr.push(parseInt(i))
    }
    return arr
}

function _ischeckeddata(){
    var obj = {
        url:interface.data.reslist,
        domid:'sel_data_con_html_3',
        data:{limit:0,list:0,status:0,id:JSON.stringify(searchdata())},
        ispage:false,
        isrobotdata:true,
        rendcall:function(){
            $('.train_sel_ok_box').each(function(){
                var id = $(this).val()
                if(_sel_data[id]!=undefined && _sel_data[id].train){
                    $(this).attr("checked", true);
                }
            })
            $('.test_sel_ok_box').each(function(){
                var id = $(this).val()
                if(_sel_data[id]!=undefined && _sel_data[id].test){
                    $(this).attr("checked", true);
                }
            })
            _sel_data_box()
        },
        title:[
            {
                title:'',
                callback:function(data){
                    return ''
                },
                style:"width:0px;"
            },
            {
                title:'训练集',
                callback:function(data){
                    return '<span><input type="checkbox" class="train_sel_ok_box" value="'+data[0]+'" sub="'+data[1]+'|'+data[2]+'|'+data[0]+'" idata="'+data[3]+'|'+data[4]+'|'+data[5]+'|'+data[6]+'"/></span>'
                },
                style:"width:50px;"
            },
            {
                title:'测试集',
                callback:function(data){
                    return '<span><input type="checkbox" class="test_sel_ok_box" value="'+data[0]+'" sub="'+data[1]+'|'+data[2]+'|'+data[0]+'" idata="'+data[3]+'|'+data[4]+'|'+data[5]+'|'+data[6]+'"/></span>'
                },
                style:"width:50px;"
            },
            {
                title:"数据描述",
                callback:function(data){
                    if(data){
                        return '<span style="display: inline-block; width:100%;overflow: hidden; text-overflow: ellipsis;white-space: nowrap;" title="'+data[0]+'">'+data[0]+'</span>'
                    }else{
                        return '<span>'+'</span>'
                    }
                },
                style:"width:150px;"
            },
            {
                title:"创建时间",
                callback:function(data){
                    return '<span>'+data+'</span>'
                },
                style:"width:130px;"
            },
            {
                title:"图片／框数",
                callback:function(data){
                    return '<span>'+data[0]+' / '+data[1]+'</span>'
                }
            },
            {
                title:'数据属性',
                callback:function(data){
                    return '<a href="javascript:;" style="display: inline-block; width: 100%; height: 15px; text-overflow:ellipsis;overflow:hidden;white-space:nowrap;" title='+data[1]+' onclick="showGraph('+data[2]+')">'+data[0]+'</a>'
                }
            },
            {
                title:'数据场景',
                callback:function(data){
                    if(data){
                        var tags = '';
                        for(var i=0;i<data.length;i++){
                            var tmp = data[i].category+': '+data[i].detail +';';
                            tags += tmp;
                        }
                        tags = tags.substring(0,tags.length-1);
                        return '<span>'+tags+'</span>'
                    }else{
                        return '<span>'+'</span>'
                    }
                }
            },
            {
                title:'操作',
                callback:function(data){
                    return '<a href="javascript:;" onclick="toggle_preview(this)" did="'+data+'">收起预览</a>'
                }
            }
        ],
        datakey:[
            'id',
            ['id','raw','version','boxes','groups','points','pic_num'],
            ['id','raw','version','boxes','groups','points','pic_num'],
            ['comment','raw','version'],
            'create_time',
            ["pic_num","boxes"],
            ["attrParsed","attr","id"],
            "tags",
            'id'

        ]
    }
    _list_3 = datalist(obj)
}


function _type_idata_id(data){
    var arr = [[],[],[]]
    for(var i in data){
        if(data[i].train){
            arr[0].push(parseInt(i))
        }
        if(data[i].test){
            arr[1].push(parseInt(i))
        }
        if(data[i].test || data[i].train){
            arr[2].push(parseInt(i))
        }
    }
    return arr
}

function _sel_data_box(){
    var data = _type_idata_id(_sel_data)
    var obj ={
        domid:'sel_chart_train',
        url:interface.data.resdetail,
        dataid:JSON.stringify(data[0])
    }
    graph(obj);

    var obj ={
        domid:'sel_chart_test',
        url:interface.data.resdetail,
        dataid:JSON.stringify(data[1])
    }
    graph(obj);

    var obj ={
        domid:'sel_chart_all',
        url:interface.data.resdetail,
        dataid:JSON.stringify(data[2])
    }
    graph(obj);


    var train = [0,0,0,0]
    var test  = [0,0,0,0]
    $('.train_sel_ok_box').each(function(i){
        var data = $(this).attr('idata').split('|')
        var num = parseInt($('#_train_num').val())/100
        if($(this).is(":checked")){
            if($('.test_sel_ok_box').eq(i).is(":checked")){
                train[0]+=parseInt(data[0] * num)
                train[1]+=parseInt(data[1] * num)
                train[2]+=parseInt(data[2] * num)
                train[3]+=parseInt(data[3] * num)
            }else{
                train[0]+=parseInt(data[0])
                train[1]+=parseInt(data[1])
                train[2]+=parseInt(data[2])
                train[3]+=parseInt(data[3])
            }
        }
    })

    $('.test_sel_ok_box').each(function(i){
        if($(this).is(":checked")){
            var data = $(this).attr('idata').split('|')
            var num = 1 - parseInt($('#_train_num').val())/100
            if($(this).is(":checked")){
                if($('.train_sel_ok_box').eq(i).is(":checked")){
                    test[0]+=parseInt(data[0] * num)
                    test[1]+=parseInt(data[1] * num)
                    test[2]+=parseInt(data[2] * num)
                    test[3]+=parseInt(data[3] * num)
                }else{
                    test[0]+=parseInt(data[0])
                    test[1]+=parseInt(data[1])
                    test[2]+=parseInt(data[2])
                    test[3]+=parseInt(data[3])
                }
            }
        }
    })

    $('._sel_train_pic').text('图片/框数:'+train[3]+'/'+train[0])
    $('._sel_test_pic').text('图片/框数:'+test[3]+'/'+train[0])
    $('._sel_all_pic').text('图片/框数:'+(test[3]+train[3])+'/'+(train[0]+test[0]))

    // $('._sel_train_data').text('框／段／点数:'+train[0]+'／'+train[1]+'／'+train[2])
    // $('._sel_test_data').text('框／段／点数:'+test[0]+'／'+test[1]+'／'+test[2])
    // $('._sel_all_data').text('框／段／点数:'+(train[0]+test[0])+'／'+(train[1]+test[1])+'／'+(train[2]+test[2]))
}


function _labedata(data){
    var html = ''
    for(var i in data){
        html += data[i]+','
    }
    return html
}





