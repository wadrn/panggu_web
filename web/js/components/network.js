/**
 * Created by wei on 2017/9/5.
 */
var nt_isevent = false
var nt_cur_id = false
function rendernetwork(data){
    //var data = this.networkdata
    //g_taskdata.model_config.network
    var network = [
        {
            "id": 1,
            "num_filter": 16,
            "kernel_x": 3,
            "kernel_y": 3,
            "stride_x": 2,
            "stride_y": 2,
            "pad_x": 1,
            "pad_y": 1,
            "use_activation": 1,
            "pre": null,
            "post": [
                2
            ],
            x:200,
            y:510
        },
        {
            "id": 2,
            "num_filter": 16,
            "kernel_x": 3,
            "kernel_y": 3,
            "stride_x": 2,
            "stride_y": 2,
            "pad_x": 0,
            "pad_y": 0,
            "use_activation": 1,
            "pre": [
                1
            ],
            "post": [
                3
            ],
            x:200,
            y:470
        },
        {
            "id": 3,
            "num_filter": 32,
            "kernel_x": 3,
            "kernel_y": 3,
            "stride_x": 2,
            "stride_y": 2,
            "pad_x": 0,
            "pad_y": 0,
            "use_activation": 1,
            "pre": [
                2
            ],
            "post": [
                4
            ],
            x:200,
            y:420
        },
        {
            "id": 4,
            "num_filter": 32,
            "kernel_x": 3,
            "kernel_y": 3,
            "stride_x": 1,
            "stride_y": 1,
            "pad_x": 1,
            "pad_y": 1,
            "use_activation": 1,
            "pre": [
                3
            ],
            "post": [
                5
            ],
            x:200,
            y:370
        },
        {
            "id": 5,
            "num_filter": 32,
            "kernel_x": 3,
            "kernel_y": 3,
            "stride_x": 1,
            "stride_y": 1,
            "pad_x": 1,
            "pad_y": 1,
            "use_activation": 1,
            "pre": [
                4
            ],
            "post": [
                6,
                8
            ],
            x:200,
            y:320
        },
        {
            "id": 6,
            "num_filter": 48,
            "kernel_x": 3,
            "kernel_y": 3,
            "stride_x": 2,
            "stride_y": 2,
            "pad_x": 1,
            "pad_y": 1,
            "use_activation": 1,
            "pre": [
                5
            ],
            "post": [
                7
            ],
            x:100,
            y:270
        },
        {
            "id": 7,
            "num_filter": 32,
            "kernel_x": 3,
            "kernel_y": 3,
            "stride_x": 1,
            "stride_y": 1,
            "pad_x": 1,
            "pad_y": 1,
            "use_activation": 1,
            "pre": [
                6
            ],
            "post": [
                8
            ],
            x:100,
            y:220
        },
        {
            "id": 8,
            "num_filter": 32,
            "kernel_x": 1,
            "kernel_y": 1,
            "stride_x": 2,
            "stride_y": 2,
            "pad_x": 0,
            "pad_y": 0,
            "use_activation": 1,
            "pre": [
                5,
                7
            ],
            "post": [
                9
            ],
            x:200,
            y:170
        },
        {
            "id": 9,
            "num_filter": 48,
            "kernel_x": 3,
            "kernel_y": 3,
            "stride_x": 1,
            "stride_y": 1,
            "pad_x": 1,
            "pad_y": 1,
            "use_activation": 1,
            "pre": [
                8
            ],
            "post": [
                10
            ],
            x:200,
            y:120
        },
        {
            "id": 10,
            "num_filter": 64,
            "kernel_x": 1,
            "kernel_y": 1,
            "stride_x": 1,
            "stride_y": 1,
            "pad_x": 0,
            "pad_y": 0,
            "use_activation": 1,
            "pre": [
                9
            ],
            "post": [
                11
            ],
            x:200,
            y:70
        },
        {
            "id": 11,
            "num_filter": 5,
            "kernel_x": 1,
            "kernel_y": 1,
            "stride_x": 1,
            "stride_y": 1,
            "pad_x": 0,
            "pad_y": 0,
            "use_activation": 1,
            "pre": [
                10
            ],
            "post": null,
            x:200,
            y:20
        }
    ]

    function __okdata(data){
        for(var i in data){
            var idata = data[i]
            idata.text     ="alphaconv"
            idata.draggable=true
            idata.islink   =true
            idata.rear     =idata.pre
            idata.link     =idata.post
            idata.click    ='nt_show_config(2,'+(10000)+',this)'

            // arr.push({
            //     "rear":idata.pre,
            //     "link":idata.post,
            //     "draggable":true,
            //     "islink":true,
            //     "click":,
            // })
        }
        return data
    }
    window._svg_data = {}
    window._svg_btn = {}
    for(var i in data){
        var arr = []
        for(var j in data[i]){
            var obj = {
                id:10000+parseInt(j),
                x:0,
                y:0,
                text:data[i][j].key,
                rear:[],
                link:[],
                draggable:true,
                islink:true,
                click:'nt_show_config('+i+','+(10000+parseInt(j))+',this)',
                input:data[i][j].input,
                drop_list:data[i][j].drop_list
            }
            if(data[i][j].input){
                obj.input = data[i][j].input
            }
            if(data[i][j].drop_list){
                obj.drop_list = data[i][j].drop_list
            }
            arr.push(obj)
        }

        window._svg_data['svg_'+i] = svgdata({
            taskdata:{
                id:100,
                name:'训练任务1',
            },
            domid:'svg_task_'+i,
            isico:true,
            data: __okdata(network),
            btndata:[],
            del_line_fun:'net_del_line_fun',
            sel_line_fun:'net_sel_line_fun',
            add_size:1
        })

        window._svg_btn['svg_'+i] = svgbtn({
            svg:_svg_data['svg_'+i],
            domid:'svg_task_btn_'+i,
            data:arr
        })

        window.net_del_line_fun = function(id,linkid){
            walert('确定删除连线',function(){
                _svg_data['svg_'+i].del_path(id,linkid)
            })
        }

        window.net_sel_line_fun = function(id,linkid){
            _svg_data['svg_'+i].sel_path(id,linkid)
        }
    }
}


function nt_show_config(dom,dataid,idom){
    var domid = 'svg_task_config_'+dom
    var id    = parseInt(idom.getAttribute('d-id'))
    var data  = dataid
    var isvg  = _svg_data['svg_'+dom]
    var cdata =  isvg.searid(id)

    var idata = _svg_btn['svg_'+dom].searchid(dataid)

    var input = idata.input
    var drop_list  = idata.drop_list

    var html = ''
    if(input){
        for (j = 0; j < input.length; j++){
            html += w_renderinput(input[j],0,j);
        }
    }
    if(drop_list){
        for(var j=0;j<drop_list.length;j++){
            var cur = drop_list[j].value[0].value
            if(drop_list[j].cur){
                cur = drop_list[j].cur
            }
            html += w_renderdropList(drop_list[j],0,j,cur);
        }
    }
    document.getElementById(domid).innerHTML = html


    $('#'+domid).find('.config-input').each(function(){
        var name = $(this).attr('name')
        if(cdata[name]){
            $(this).val(cdata[name])
        }
    })

    $('#'+domid).find('.config-select').each(function(){
        var name = $(this).attr('name')
        if(cdata[name]){
            $(this).val(cdata[name])
        }
    })

    nt_cur_id = idom.getAttribute('d-id')
    if(!nt_isevent){
        nt_event(dom,dataid)
    }
}

function nt_event(dom,dataid){
    nt_isevent = true
    var isvg = _svg_data['svg_'+dom]
    $('#svg_task_config_'+dom).on('change','input',function(){
        var key   = $(this).attr('name')
        var val   = $(this).val()
        var idata = isvg.searid(nt_cur_id)
        if($(this).attr('itype') == 'number'){
            idata[key] = parseFloat(val)
        }else{
            idata[key] = val
        }

        //editdata(idata,key,val)
    })

    $('#svg_task_config_'+dom).on('change','select',function(){
        var key   = $(this).attr('name')
        var val   = $(this).val()
        var idata = isvg.searid(nt_cur_id)
        idata[key] = val
        editseldata(idata,key,val)
    })
}

function nt_okdata(data){
    var arr = []
    for(var i in data){
        var idata = data[i].data

        for(var j in idata){
            var obj   = {}
            obj.id    = idata[j].id
            obj.pre   = idata[j].link
            obj.rear  = idata[j].rear

            var input = idata[j].input
            var drop_list = idata[j].drop_list
            for(var k in input){
                obj[input[k].Key] = input[k].Value
            }
            arr.push(obj)
        }
    }
    return arr
}

function nt_okdata_rend(data){
    var arr = []
    for(var i in data){
        var arr = data[i].data

    }
    return arr
}

function editdata(data,key,val){
    for(var i in data.input){
        if(data.input[i]['Key'] == key){
            data.input[i].Value = val
        }
    }
    return data
}

function editseldata(data,key,val){
    for(var i in data.drop_list){
        if(data.drop_list[i]['Key'] == key){
            data.drop_list[i].cur = val
        }
    }
    return data
}