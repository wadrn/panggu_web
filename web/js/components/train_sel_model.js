var _iscurId = null
function train_sel_model(idata){
    var html = ''
    html += '<div style="position: absolute; left: 0px; right: 0px; top: 0px; height: 80px;">' +
                '<div class="cfg_title">选择模型</div>'+
                '<div style="padding-top: 10px;">' +
                    '<a href="javascript:;" class="v btn blue sel_model_btn">检测模型</a>'+
                    '<a href="javascript:;" class="v btn sel_model_btn">分类模型</a>'+
                '</div>' +
            '</div>'+

            '<div style="position: absolute; top: 90px; bottom:40px; left: 0px; right:0px; overflow: hidden; overflow-y: auto;">'+
                '<div class="sel_data_con">'+
                    '<div class="sel_model_con_html" id="sel_model_con_html_1">检测模型</div>'+
                '</div>'+

                '<div class="sel_data_con" style="display: none">'+
                    '<div class="sel_model_con_html" id="sel_model_con_html_2">分类模型</div>' +
                '</div>'+
            '</div>'+

            '<div class="select_sub_btn"><span class="b-btn"><a href="javascript:;" class="v btn blue bind_sel_model" onclick="_bind_mode_id()">确认选择</a></span></div>'

    $('#cfg_test_data').html(html)

    var url = interface.train.model_list
    ajaxget(url,function(data){
        var htmlobj = sel_mode_tpl_html(data.data)
        $('#sel_model_con_html_1').html(htmlobj.html1)
        $('#sel_model_con_html_2').html(htmlobj.html2)

        if(idata.data.model_type){
            _iscurId = idata.data.model_type
            $('.sel_item_model').each(function(){
                if($(this).attr('iid') == idata.data.model_type){
                    $(this).addClass('active')
                    if($(this).attr('ctype') ==1){
                        $('.sel_model_btn').removeClass('blue')
                        $('.sel_model_btn').eq(1).addClass('blue')
                        $('.sel_data_con').hide()
                        $('.sel_data_con').eq(1).show()
                    }
                }
            })
        }else{
            _iscurId = $('.sel_item_model').eq(0).attr('iid')
            $('.sel_item_model').eq(0).addClass('active')
        }
    })

    if(g_taskdata.task_status != 0){
        $('.bind_sel_model').hide()
    }

}

function sel_mode_tpl_html(model){
    var data = model_ok_data(model)
    return {
        html1 : datahtml(data['检测']),
        html2 : datahtml(data['分类'])
    }
    function datahtml(data){
        var html = ''
        html += '<div style="background:#fff; margin-left: 1px; margin: 10px;">'
        for(var i in data){
            html += '<div style="background: #ccc; padding:4px 10px;">'+i+'模型</div>'
            var idata = data[i]
            for(var j in idata){
                html += '<div class="style_item_model sel_item_model" ctype="'+idata[j].Cate_type+'" style="" iid="'+idata[j].Id+'">'+
                            '<div style="" class="title">'+idata[j].Cate_name+'</div>'+
                            '<div style="line-height: 170px; color:#ccc;">图片展示</div>'+
                        '</div>'
            }
        }
        html += '</div>'
        return html
    }
}
function model_ok_data(data){
    var type = {
        1:'通用配置',
        2:'安防场景',
        3:'adas场景',
        4:'室内场景'
    }
    var okarr = {}
    for(var i in data){
        var idata = data[i].cate_list
        var arr = []
        var obj = {}
        for(var j in idata){
            if(obj[type[idata[j].orient_type]] == undefined){
                obj[type[idata[j].orient_type]] = [{
                    Cate_name:idata[j].cate_name,
                    Id:idata[j].id,
                    Cate_type:idata[j].cate_type
                }]
            }else{
                obj[type[idata[j].orient_type]].push({
                    Cate_name:idata[j].cate_name,
                    Cate_type:idata[j].cate_type
                })
            }
        }
        okarr[data[i].title] = obj
    }
    return okarr
}

function _bind_mode_id(){
    var url = interface.train.update
    var data = 'id='+urlfun.getquery('id')+'&model_type='+_iscurId
    ajaxpost(url,data,function(data){
        if(data.error == 0){
            walert('模型选择成功，是否继续配置数据',function(){
                _g_status++
                train_fun.setting_data()
            })
        }else{
            alert(data.msg)
        }
    })
}


$('body').on('click','.sel_model_btn',function(){
    var index = $(this).index()
    $('.sel_model_btn').removeClass('blue')
    $(this).addClass('blue')
    $('.sel_data_con').hide()
    $('.sel_data_con').eq(index).show()
})
$('body').on('click','.sel_item_model',function(){
    if(g_taskdata.task_status == 0){
        var id = $(this).attr('iid')
        $('.sel_item_model').removeClass('active')
        $(this).addClass('active')
        _iscurId = id
    }
})






