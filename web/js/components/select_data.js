
!function(w){

    function Selectdata(obj){
        var obj     = obj || {}
        this.data   = obj.data
        this.taskid = obj.taskid || {}
        this.preid  = obj.preid || {}
        this.domid  = obj.domid
        this.domsid = obj.domsid
        this.default_data = obj.default_data || {}
        this.page = obj.page || 1
        this.curtab =obj.curtab || 0
        this.init()
    }

    Selectdata.prototype.init = function(){
        this.default_to_trainid()
        this.render()
        this.eventinit()
    }

    Selectdata.prototype.render = function(){
        document.getElementById(this.domid).innerHTML = this.html()
        this.rendersel()
    }

    Selectdata.prototype.rendersel = function(){
        var data = this.seldata()
        document.getElementById(this.domsid).innerHTML = this.html(data,true)
    }

    Selectdata.prototype.eventinit = function(){
        var _this = this
        var _dom  = document.getElementById(this.domid)
        Event.on(_dom,'._task',"click",function(e){
            var target = e.target;
            var id = target.getAttribute('d-id')
            if(!hasClass(target,'active')){
                if(hasClass(target,'checkbox')){
                    _this.taskid = {}
                    _this.taskid[id] = true
                    $('._task').removeClass('active')
                }else{
                    _this.taskid[id] = true
                }
                addClass(target,'active')
            }else{
                delete _this.taskid[id]
                removeClass(target,'active')
            }
            _this.rendersel()
        });
        Event.on(_dom,'._pre',"click",function(e){
            var target = e.target;
            var id = target.getAttribute('d-id')
            if(!hasClass(target,'active')){
                _this.preid[id] = true
                addClass(target,'active')
            }else{
                delete _this.preid[id]
                removeClass(target,'active')
            }
            _this.rendersel()
        });
    }

    Selectdata.prototype.html = function(data,issel){
        var data = data || this.data
        var html = ''
        html += '<div class="task_data" id="task_data">'
            var istab = true
            var isone = 0
            for(var i in data){
                if(data[i]['type'] == 'data'){
                    var sel_data = ''
                    var page = ''
                    var display = 'display:none'

                    if(issel){
                        display = 'display:block'
                    }else{
                        if(isone == 0){
                            html += '<div class="search_div"  style="margin-bottom: 0px; margin-left: 1px;">' +
                                        '<a class="v btn seltadata_btn blue" style="margin-right: 10px;" >平台数据</a>' +
                                        '<a class="v btn seltadata_btn" >我的数据</a>' +
                                    '</div>'
                            display = 'display:block'
                        }
                        page = '<a class="v btn" onclick="getPrePage(this.id)" style="position: absolute;top: 0; right: 70px;" id="'+data[i].id+'">上一页</a>'+
                               '<a class="v btn" onclick="getNextPage(this.id,this.page_num)" style="position: absolute;top: 0; right: 0;" id="'+data[i].id+'" page_num="'+data[i].page_num+'">上一页</a>'
                    }

                    html += '<ul class="for_task_data active seltadata_data" style="position: relative; '+display+'" >'
                    html += '<span class="title-ico seltadata_tab g_tabsfun active" con="seltadata_data" style=""> '+data[i].title+' </span>'
                    html += page
                    var detail = data[i]['detail']

                    html += this.typehtml(data[i]['type']).call(this,detail,issel)
                    html += '</ul>'
                    istab = false

                }else{
                    html += '<span class="title-ico"><i class="fa fa-list-ul"></i> '+data[i]['title']+' </span> </span>'
                    html += '<ul class="for_task_data active">'
                    var detail = data[i]['detail']

                    html += this.typehtml(data[i]['type']).call(this,detail)
                    html += '</ul>'
                }
                isone ++
            }
        html += '</div>'
        return html
    }

    Selectdata.prototype.typehtml = function(type){
        var _this = this;
        var obj = {
            data:function(detail,issel){
                var html = ''
                html += '<table class="v table bgnone" style="background: #fff; margin-left: 1px;">'
                    html += '<thead><tr>'
                        html += '<th style="">选择</th>'
                        html += '<th style="">创建时间</th>'
                        html += '<th style="">数据描述</th>'
                        html += '<th style="">图片数</th>'
                        html += '<th style="">框／段／点</th>'
                        html += '<th style="">数据场景</th>'
                        html += '<th style="width: 200px;">数据属性</th>'
                        html += '<th style="">属性分布</th>'
                    html += '</tr></thead>'

                    html += '<tbody>'
                    for(var j in detail){
                    var _this = this;
                        (function(j){
                            var task = ''
                            var pre  = ''
                            if(_this.taskid[detail[j]['id']]){
                                task = 'active'
                            }
                            if(_this.preid[detail[j]['id']]){
                                pre = 'active'
                            }
                            html += '<tr d-id="'+detail[j]['id']+'">'+
                                        '<td><i class="fa fa-columns _task '+task+'" d-id="'+detail[j]['id']+'"></i> <i class="fa fa-columns _pre '+pre+'" d-id="'+detail[j]['id']+'"></i> </td>' +
                                        '<td><span>'+detail[j]['create_time']+'</span></td>' +
                                        '<td><span>'+detail[j]['comment']+'</span> </td>' +
                                        '<td><span>'+detail[j]['pic_num']+'</span> </td>' +
                                        '<td><span>'+detail[j]['boxes']+'/'+detail[j]['group']+'/'+detail[j]['points']+'</span> </td>' +
                                        '<td><span>'+detail[j]['tags']+'</span> </td>' +
                                        '<td><span style="display: inline-block; height: 15px; overflow: hidden;" title='+detail[j]['attr']+'>'+detail[j]['attr']+'</span> </td>' +

                                        '<td><span  did="'+detail[j]['id']+'" onclick="showGraph('+detail[j]['id']+')">详情</span> / <span  did="'+detail[j]['id']+'" onclick="preview(this)">预览</span> ' +
                                      '</tr>'
                            var tr_id = detail[j]['id'];
                            var images = [
                                {
                                    img : {
                                        major:{
                                            url:'',
                                            width:'',
                                            height:''
                                        }
                                    },
                                },
                                {
                                    img : {
                                        major:{
                                            url:'',
                                            width:'',
                                            height:''
                                        }
                                    },
                                },
                                {
                                    img : {
                                        major:{
                                            url:'',
                                            width:'',
                                            height:''
                                        }
                                    },
                                },
                                {
                                    img : {
                                        major:{
                                            url:'',
                                            width:'',
                                            height:''
                                        }
                                    },
                                },
                                {
                                    img : {
                                        major:{
                                            url:'',
                                            width:'',
                                            height:''
                                        }
                                    },
                                },
                                {
                                    img : {
                                        major:{
                                            url:'',
                                            width:'',
                                            height:''
                                        }
                                    },
                                },
                            ];
                            var url = interface.data.resvision;
                            var ids = [];
                            ids.push(tr_id);
                            var json = JSON.stringify(ids);
                            var datastr = "id="+json+"&offset="+(_this.page-1)+"&limit=6";
                            var pic_tr;
                            ajaxpost(url,datastr,function(data){
                                if(data.error ==0 && data.data && data.data[0].detail){
                                    images = data.data[0].detail.content;
                                    pic_tr = document.getElementById('pic'+tr_id);
                                    if(images.length == 0){
                                        pic_tr.parentNode.removeChild(pic_tr);
                                    }else{
                                        var tr_li = pic_tr.childNodes[0].childNodes[0].children;
                                        for(var k=0;k<tr_li.length;k++){

                                            if(images[k] && images[k].img){
                                                tr_li[k].childNodes[0].src = images[k].img.major.url;
                                            }
                                        }
                                    }
                                }else{
                                    pic_tr = document.getElementById('pic'+tr_id);
                                    pic_tr.parentNode.removeChild(pic_tr);
                                }
                            });
                            if(!issel){
                                html += _this.showpic(tr_id,images);
                            }

                        })(j)
                    }
                    html += '</tbody>'
                html += '</table>'
                return html
            },
            model:function(detail,issel){
                var html = ''
                for(var j in detail){
                    var task = ''
                    if(this.taskid[detail[j]['Id']]){
                        task = 'active'
                    }
                    html += '<li d-id="'+detail[j]['Id']+'"><i class="fa fa-columns _task checkbox '+task+'" d-id="'+detail[j]['Id']+'"></i> <span class="did">'+detail[j]['Id']+'</span> <span class="topic">'+detail[j]['Cate_name']+'</span><span></span></li>'
                }
                return html
            }
        }
        return obj[type]
    }

    Selectdata.prototype.showpic = function(id,imgs){
        var html ='<tr id="pic'+id+'" class="pic_tr">';
        html += '<td colspan="8">'
        html += '<ul style="overflow: hidden;">';
        for(var i=0;i<imgs.length;i++){
            html += '<li style="height: 60px; margin-right: 10px; float: left;">'
            html += '<img src="'+imgs[i].img.major.url+'" did="'+id+'" class="img" id="img_'+i+'" onclick="preview(this,this.id)" style="height: 98%;"/>'
            html +='</li>'
        }
        html += '</ul>';
        html += '</td>';
        html += '</tr>';
        return html;
    };

    Selectdata.prototype.seldata = function(){
        var taskid = this.taskid
        var preid = this.preid
        var data = this.data
        var arr = []
        var type = 'data'
        for(var i in data){
            var detail = data[i].detail
            type = data[i].type
            for(var j in detail){
                if(taskid[detail[j].Id]){
                    arr.push(detail[j])
                }

                if(taskid[detail[j].id]){
                    arr.push(detail[j])
                }else{
                    if(preid[detail[j].id]){
                        arr.push(detail[j])
                    }
                }
            }
        }
        return [
            {
                title:'当前选择的任务数据',
                detail:arr,
                type:type
            }
        ]
    }

    Selectdata.prototype.subdata = function(){
        var taskid = this.taskid
        var preid = this.preid
        var data = this.data
        var taskarr = []
        var prearr = []
        for(var i in data){
            var detail = data[i].detail
            for(var j in detail){
                if(taskid[detail[j].id] ){
                    taskarr.push(detail[j].raw+'|'+detail[j].version)
                }
                if(preid[detail[j].id]){
                    prearr.push(detail[j].raw+'|'+detail[j].version)
                }
            }
        }
        return {
            task_id:taskarr,
            predict_data:prearr
        }
    }

    Selectdata.prototype.subtrain = function(){
        var taskid = this.taskid
        var data = this.data
        var taskarr = []
        for(var i in data){
            var detail = data[i].detail
            for(var j in detail){
                if(taskid[detail[j].Id] ){
                    taskarr.push(detail[j].Id)
                }
            }
        }
        return taskarr
    }

    Selectdata.prototype.default_to_trainid = function(){
        if(this.default_data.Train_data || this.default_data.Val_data){
            var data = this.data
            var tobj = iobj(this.default_data.Train_data)
            var vobj = iobj(this.default_data.Val_data)
            for(var i in data){
                var detail = data[i].detail
                for(var j in detail){
                    if(tobj[detail[j].raw] && tobj[detail[j].raw] == detail[j].version){
                        this.taskid[detail[j].id] = true
                    }
                    if(vobj[detail[j].raw] && vobj[detail[j].raw] == detail[j].version){
                        this.preid[detail[j].id] = true
                    }
                }
            }
        }

        if(this.default_data.Model_id && this.default_data.Model_id != ''){
            this.taskid[this.default_data.Model_id] = true
        }

        function iobj(str){
            var arr = str.split(',')
            var obj = {}
            if(!arr.length) return obj
            for(var i in arr){
                var iarr = arr[i].split('|')
                obj[iarr[0]] = iarr[1]
            }
            return obj
        }
    }


    w.selectdata = function(obj){
        return new Selectdata(obj)
    }
}(window)
