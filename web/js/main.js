
function showhide_bar(){
    var _bar_con = document.getElementById('_bar_con')
    var barleft = _bar_con.style.left
    if(barleft == '120px'){
        _bar_con.style.left = '-180px'
    }else{
        _bar_con.style.left = '120px'
    }
}
//新加任务
function g_add_task(name){
    var name = name || ''
    var popup = tool_popup()
    popup.title = '请输入训练名称'
    popup.con = '<div id="add_task">'+'</div>'
    var html = '';
    popup.style_popup_con += 'min-height: 200px; height: 300px;'
    popup.show();

    html += '<div class="v input_2 mb10" style="margin-top: 50px;padding-right: 50px;">'
    html += '<label class="w30">训练名称<span style="color:#f00"> *</span> </label>'
    html += '<input type="text" name="name" class="text w70" value="'+name+'" id="new_task" >'
    html += ' <p class="info pdw30"></p>'
    html += '</div>'
    document.getElementById('add_task').innerHTML = html
    popup.callback = function(){
        var task_name = document.getElementById('new_task').value
        if(task_name == ''){
            alert("任务名称不能为空")
        }else{
            var datastr = "task_type=0&task_name="+task_name
            var url = interface.train.create
            ajaxpost(url,datastr,function(data){
                if(data.error ==0){
                    alert('创建成功')
                    window.location.href="./add_train.html?id="+data.data.id
                }else{
                    alert(data['message'])
                }
            })
        }
    }
}

//开始任务
function g_start_task(id,call){
    var data = 'id='+id
    walert('确定开始训练',function(){
        ajaxpost(interface.train.task_start,data,function(data){
            if(data.error ==0){
                call()
            }else{
                alert(data.msg)
            }
        })
    })
}

function toggle_active(e){
    if(!Class.hasClass(e.target,'active')){
        var parent = e.target.parentNode;
        for(var i=0;i<parent.children.length;i++){
            Class.removeClass(parent.children[i],'active');
        }
        Class.addClass(e.target,'active');
    }
}
//配置
function g_task_config_html(title,data){
    var html = ''
    html += '<div style="border: 1px solid #ddd; margin-bottom: 15px;">'
        html += '<div style="background: #eee; padding: 8px;  font-size: 13px; line-height: inherit; border-bottom: 1px solid #ddd; color: #888;">'+title+'</div>'
        html += '<div class="oz">'
        for(var i in data){
            html += '<div style="border-top: 1px solid #ddd; margin-top: -1px; height: 30px; line-height: 30px; font-size: 13px; float: left ;width: 50%">'
                html += '<span style="display: inline-block; height: 30px; overflow: hidden; width: 58%; padding-right: 2%; background: #f7f7f7; text-align: right; text-overflow:ellipsis; white-space: nowrap;" title="'+i+'">'+i+'</span>'
                html += '<span style="display: inline-block; height: 30px; overflow: hidden; width: 38%; padding-left: 2%; text-overflow:ellipsis; white-space: nowrap;" title="'+data[i]+'">'+data[i]+'</span>'
            html += '</div>'
        }
        // if(data.length%2 != 0){
        //     html += '<div style="border-top: 1px solid #ddd; margin-top: -1px; height: 30px; line-height: 30px; font-size: 13px; float: left; width: 50%">'
        //     html += '<span style="display: inline-block; height: 30px; overflow: hidden; width: 58%; padding-right: 2%; background: #f7f7f7; text-align: right;"> </span>'
        //     html += '<span style="display: inline-block; height: 30px; overflow: hidden; width: 38%; padding-left: 2%;"> </span>'
        //     html += '</div>'
        // }
        html += '</div>'
    html += '</div>'
    return html
}

$('body').on('click','.g_tabsfun',function(){
    var con = $(this).attr('con')
    var index = $(this).index()
    $(this).addClass('active').siblings().removeClass('active')
    $('.'+con).hide()
    $('.'+con).eq(index).show()
})



// 属性搜索
function g_data_search(){
    var d_form = data_form();
    d_form.data=[
        {
            desc:'数据描述',
            type:"text",
            name:"desc",
        },
        {
            desc:'数据场景',
            type:'btn',
            id:'show_tag',
            click:'show_tags()'
        },
        {
            type:'div',
            id:'_data_label',
            style:'display:none'
        },
        {
            desc:'数据属性',
            type:'btn',
            id:'show_attr',
            click:'show_attrs(this)'
        },
        {
            type:'textarea',
            name:'attr',
            value:'',
            style:'display:none'
        },
        {
            desc:'search',
            type:"sbtn",
            text:'搜索',
            fun:'searchdata()',
            name:"username",
            value:'',
        }
    ];
    d_form.datahtml('_searchdata');
}

/*选择属性*/
function show_attrs(dom){
    var attrtree = attr_tree();
    var url = interface.data.attrs;
    datastr = 'type=4';
    var id = 'show_attr'
    if(dom){
        var id = dom.id
    }

    var idstr = document.getElementById(id).innerHTML
    if(idstr != '点击添加'){
        attrtree.subobj = JSON.parse(idstr);
    }

    ajaxpost(url,datastr,function(data){
        attrtree.data=data.data[4];
        var g_popup = tool_popup();
        g_popup.callback = function(){
            Class.removeClass(document.getElementById(id),'show_tag');
            Class.addClass(document.getElementById(id),'tags');
            if(JSON.stringify(attrtree.seldata()) == '{}'){
                document.getElementById(id).innerHTML = '点击添加'
            }else{
                document.getElementById(id).innerHTML = JSON.stringify(attrtree.seldata())
            }
        }
        g_popup.title = '选择属性'
        g_popup.style_popup_con += 'height:inherit; max-height: none;'
        g_popup.con = attrtree.html('_tool_p_con')
        g_popup.show()
        $('#_tool_p_con').find('input[type="radio"]').hide();
        attrtree.eventinit()
    });
}

/*展示属性*/
function show_attrs_checked(){
    var attrtree = attr_tree({},true);
    var target = window.event.target;
    var data = target.title;
     console.log(data);
    // var url = interface.data.attrs;
    // datastr = 'type=4';
    // ajaxpost(url,datastr,function(data){
    //     attrtree.data=data.data[4];
    //     console.log(data.data[4]);
        //attrtree.data = {"box_type":[{"type":"common_box^_^框","list":[{"type":"vehicle_front_face^_^车前脸","list":["head ^_^车头","tail^_^车尾"]},{"type":"occlusion","list":["full_visible^_^完全可见（无遮挡)","occluded^_^部分遮挡(0-30%)","heavily_occluded^_^严重遮挡(30-70%)","invisible^_^完全不可见"]}]}]}
         attrtree.data = JSON.parse(data);
        var g_popup = tool_popup();
        g_popup.callback = function(){
}
        g_popup.title = '属性'
        g_popup.style_popup_con += 'height:inherit; max-height: none;'
        g_popup.con = attrtree.html('_tool_p_con')
        g_popup.show()
        $('#_tool_p_con').find('input[type="checkbox"]').hide();
        $('#_tool_p_con').find('input[type="radio"]').hide();
        attrtree.eventinit()
    // });
}

/*展示标签*/
function show_tags(){
    var data = data || 'firm='+$('[name="firm"]').val();
    var url = interface.data.tags;
    ajaxpost(url,data,function(data) {
        if (data.data == undefined) {
            alert("当前业务项目组没有数据标签")
        }
        else{
            var dom = document.getElementById('_data_label')
            var data = data.data
            var cur = dom.getAttribute('bid') && JSON.parse(dom.getAttribute('bid'))
            var arr = []
            for(var i in data){
                var obj = {
                    title:data[i].category,
                    type:'checkbox',
                    data:data[i].summary,
                    curdata:setdata(data[i].summary,cur),
                    isSelect:false
                }
                arr.push(obj)
            }
            var labedata = labe_data(arr)
            var g_popup = tool_popup()
            g_popup.callback = function(){
                var data = labedata.showdata()
                console.log(data);

                var jdata = JSON.stringify(data)
                if(data.length){
                    dom.setAttribute('bid',jdata)
                    Class.removeClass(document.getElementById('show_tag'),'show_tag');
                    Class.addClass(document.getElementById('show_tag'),'tags');
                    document.getElementById('show_tag').innerHTML = _labedata(labedata.idcnarr())
                }else{
                    dom.removeAttribute('bid');
                    document.getElementById('show_tag').innerHTML = "点击添加";
                }
            }
            g_popup.title = '选择数据场景'
            g_popup.con = labedata.inithtml()
            g_popup.style_popup_con +='max-height:500px'
            g_popup.show()

            labedata.initevent()
        }
    })
}

function setdata(data,cur){
    if(!data || !cur) return []
    var arr = []
    for(var i in data){
        for(var j in cur){
            if(data[i].id == cur[j]){
                arr.push(cur[j])
            }
        }
    }
    return arr
}
// 预览 图片预览
function preview(dom,id){
    var did = dom.getAttribute('did');
    var ids = [];
    ids.push(did);
    var json = JSON.stringify(ids);
    var popup = tool_popup();
    popup.init()
    popup.con = '<div id="_preview"></div>';
    popup.callback = function(){}
    popup.title = '预览'
    popup.style_popup_con += 'max-height:560px;'
    popup.show()
    var cur_i
    if(id){
        cur_i = id.substr(4);
    }else{
        cur_i =0;
    }
    var obj = {
        dataid:json,
        url:interface.data.resvision,
        domid:'_preview',
        data:[],
        cur:cur_i
    };
    genPreview(obj)
}

function toggle_preview(dom){
    var did = $(dom).attr('did');
    var tr_next = $(dom).parent().parent().next();
    if(Class.hasClass(dom,'close')){
        $(tr_next).show();
        $(dom).html('收起预览');
        $(dom).removeClass('close');

    }else{
        $(tr_next).hide();
        $(dom).html('预览');
        $(dom).addClass('close');
    }
}


// 详情 属性分布
function showGraph(id){
    var popup = tool_popup()
    popup.init()
    popup.con = "<div id='graph' style='width:600px;height:400px;margin:0 auto'></div>"
    popup.callback = function(){
    }
    popup.title = '详情'
    popup.style_popup_con += 'height:500px;'
    popup.show();
    var idList=[];
    idList.push(parseInt(id));
    var jsonstr = JSON.stringify(idList);
    var obj ={
        domid:'graph',
        url:interface.data.resdetail,
        dataid:jsonstr
    }
    graph(obj);
}

//JSON 格式化
function g_formatJson(json, options) {
    var reg = null,
        formatted = '',
        pad = 0,
        PADDING = '    ';
    options = options || {};
    options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
    options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;
    if (typeof json !== 'string') {
        json = JSON.stringify(json);
    } else {
        json = JSON.parse(json);
        json = JSON.stringify(json);
    }
    reg = /([\{\}])/g;
    json = json.replace(reg, '\r\n$1\r\n');
    reg = /([\[\]])/g;
    json = json.replace(reg, '\r\n$1\r\n');
    reg = /(\,)/g;
    json = json.replace(reg, '$1\r\n');
    reg = /(\r\n\r\n)/g;
    json = json.replace(reg, '\r\n');
    reg = /\r\n\,/g;
    json = json.replace(reg, ',');
    if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
        reg = /\:\r\n\{/g;
        json = json.replace(reg, ':{');
        reg = /\:\r\n\[/g;
        json = json.replace(reg, ':[');
    }
    if (options.spaceAfterColon) {
        reg = /\:/g;
        json = json.replace(reg, ':');
    }
    (json.split('\r\n')).forEach(function (node, index) {
            var i = 0,
                indent = 0,
                padding = '';

            if (node.match(/\{$/) || node.match(/\[$/)) {
                indent = 1;
            } else if (node.match(/\}/) || node.match(/\]/)) {
                if (pad !== 0) {
                    pad -= 1;
                }
            } else {
                indent = 0;
            }

            for (i = 0; i < pad; i++) {
                padding += PADDING;
            }

            formatted += padding + node + '\r\n';
            pad += indent;
        }
    );
    return formatted;
}

