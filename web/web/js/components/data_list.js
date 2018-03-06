!function(w){

  function Datalist(obj){
    this.url     = obj['url']    // 接口地址
    this.domid   = obj['domid']
    this.data    = obj['data'] || {offset:0}
    this.maindata= obj['maindata'] || null

    this.title =   obj['title']
    this.datakey =   obj['datakey']

    this.page    = 1
    this.ispage  =  obj.ispage
      this.total_page_num = obj.total_page_num;
    this.curid    = obj.curid || 0
    this.isstatus = obj.isstatus || null
    this.isrobotdata = obj.isrobotdata || false;
    this.rendcall    = obj.rendcall || false
    this.isaddcon    = obj.isaddcon || false;

    this.module = obj.module || 'train';

    this.init()
  }

  Datalist.prototype.init = function(){
      var _this = this
      if(this.isstatus){
          this.data.status = this.isstatus.cur
      }
      if(!this.maindata){
          this.ajaxpagedata(function(){
              _this.eventinit()
          })
      }else{
          this.renderhtml();
          this.eventinit();
      }
  }

    Datalist.prototype.ajaxdata_id = function(callback){
        var _this = this;
        var url = this.url;
        var idata = JSON.parse(JSON.stringify(this.data));
        idata.offset = this.page -1
        __postData(url,objzstr(idata),function(data){
            if(!data.data){
                data.data = {}
            }
            if(callback) callback(data.data.detail);
        })
    }

    Datalist.prototype.ajaxpagedata = function(callback){
        var _this = this
        var url = this.url
        var idata = JSON.parse(JSON.stringify(this.data))
        idata.offset = this.page -1
        __postData(url,objzstr(idata),function(data){
            if(!data.data){
                data.data = {}
                data.data.detail = []
                data.data.page = {}
            }
            _this.maindata = data.data
            _this.total_page_num = data.data.page.page_num;
            _this.renderhtml()
            if(callback)callback(data)
            if(_this.rendcall)_this.rendcall(_this)
        })
    }

    Datalist.prototype.graytip = function(){
        var html = '';
        if(this.maindata.page){
            html += '<div id="selectAll" style="display:none;text-align:center">'
            html += '<div id="select_div">已勾选本页'+this.maindata.page.page_num+'数据,<a onclick="check_total()">勾选全部'+this.maindata.page.res_num+'条数据</a></div>'
            html += '<div id="unselected_div" style="display:none">已勾选全部'+this.maindata.page.res_num+'条数据，<a onclick="cancel_check_total()">取消勾选</a></div>'
            html += '</div>'
        }
        return html;
    }

    Datalist.prototype.eventinit = function(){
        var _this = this
        var _dom  = document.getElementById(this.domid)
        Event.on(_dom,'._gopage',"click",function(e){
            _this.page = e.target.getAttribute('ipage')
            pageFun()
        });
        Event.on(_dom,'.goto_page','click',function(e){
                var proper_page = $('input[name="proper_page"]').val();
            console.log(proper_page)
            if(proper_page!=''){
                if(proper_page >0 && proper_page <=_this.total_page_num){
                    _this.page = proper_page;
                    pageFun();
                }else{
                    return;
                }
            }else{
                return;
            }

        })

        function pageFun(){
			_this.ajaxpagedata()
        }

        // 属性排序
        Event.on(_dom,'._sort_btn',"click",function(e){
            var sdata = e.target.getAttribute('sdata')
            _this.data['sort'] = sdata
        });

        // 状态切换
        if(this.isstatus){
            var _sdom = document.getElementById(this.isstatus.domid)
            Event.on(_sdom,'._status_btn',"click",function(e){
                _this.isstatus.cur = e.target.getAttribute('sid')
                _this.data.status = _this.isstatus.cur
                _this.ajaxpagedata()
            });
        }

        $(window).resize(function(){
            var height = document.documentElement.clientHeight -350 || document.body.clientHeight -350;
            $('#tablebody_container').css({
                'maxHeight': height+'px'
            })
        });
    }

    Datalist.prototype.renderhtml = function(head){

        this.renderstatushtml()

        var html = ''
            html += '<div id="tablehead_container"><table class="v table bgnone" id="" style="table-layout: fixed">'+this.tablehtml()+'</table>'
            html += '<ul class="v page" id="_data_page" style="padding: 10px 0px 10px 0px">'+this.pagehtml()+'</ul>'

        if(this.isaddcon && this.page!=1){
            $('#'+this.domid).find('tbody').append(this.tbodyhtml2())

        }else{
            document.getElementById(this.domid).innerHTML = html
        }

        if(document.getElementById('tablebody_container')){
            if(document.getElementById('tablebody_container').scrollHeight > document.getElementById('tablebody_container').clientHeight ){  //存在滚动条
                $('#tablehead_container').css('padding-right','5px');
                if(document.getElementById('train_status_tab')){
                    $('#train_status_tab').css('margin-right','5px');
                }
            }else{   //不存在滚动条
                $('#tablehead_container').css('padding-right','0px');
                if(document.getElementById('train_status_tab')){
                    $('#train_status_tab').css('margin-right','0px');
                }
            }
        }
    }

    Datalist.prototype.clearhtml = function(){
        document.getElementById(this.domid).innerHTML = ''
    }

    Datalist.prototype.tablehtml = function(type){
        var data = this.arrdata()
        var con  = this.title
        var thead = ''
        var tbody = ''

        if(data.length){
            thead += '<thead><tr>'
            for(var i in con){
                if(typeof con[i] == 'object'){
                    if(con[i].title_callback){
                        if(this.isstatus){
                            thead += '<th style="'+con[i].style+'">'+con[i].title_callback(this.isstatus.cur)+'</th>'
                        }else{
                            thead += '<th style="'+con[i].style+'">'+con[i].title+'</th>'
                        }
                    }
					else{
                        thead += '<th style="'+con[i].style+'">'+con[i].title+'</th>'
                    }
                }
				else{
                    thead += '<th style="">'+con[i]+'</th>'
                }
            }
            thead += '</tr></thead>'
            tbody += '</table>'
            tbody += this.graytip();
            tbody += '</div>'
            tbody += this.tbodyhtml()
        }else{
            var count =0;
            thead += '<thead><tr>'
            for(var i in con){
                count++;
                if(typeof con[i] == 'object'){
                    if(con[i].title_callback){
                        if(this.isstatus){
                            thead += '<th style="'+con[i].style+'">'+con[i].title_callback(this.isstatus.cur)+'</th>'
                        }else{
                            thead += '<th style="'+con[i].style+'">'+con[i].title+'</th>'
                        }
                    }
                    else{
                        thead += '<th style="'+con[i].style+'">'+con[i].title+'</th>'
                    }
                }
                else{
                    thead += '<th style="">'+con[i]+'</th>'
                }
            }
            thead += '</tr></thead>'
            tbody += '<tbody>'
            tbody += '<tr style="text-align: center; color: #999;"><td colspan="'+count+'" id="default_show" style="padding: 30px;">没有数据</td></tr>';
            tbody += '</tbody>'
        }


        return thead + tbody
    }

    //加载下一页的新内容部分 ，tr
    Datalist.prototype.tbodyhtml2 = function(){
        var data = this.arrdata();
        var con = this.title;
        var tbody =''
        if(data.length){
            // var ids = [];
            for(var i in data){
                _this =this;
                (function(i){
                    tbody += '<tr>'
                    for(var j in data[i]){
                        if(typeof con[j] == 'object'){
                            if(this.isstatus){
                                tbody += '<td style="'+con[j].style+'">'+con[j].callback(data[i][j],this.isstatus.cur)+'</td>'
                            }else{
                                tbody += '<td style="'+con[j].style+'">'+con[j].callback(data[i][j],_this.data)+'</td>'
                            }
                        }else{
                            tbody += '<td style="'+con[j].style+'">'+data[i][j]+'</td>'
                        }
                    }
                    tbody += '</tr>';
                    if(_this.isrobotdata){
                        var tr_id = data[i][_this.curid];
                        var url = interface.data.resvision;
                        var ids = [];
                        ids.push(tr_id);
                        var json = JSON.stringify(ids);
                        var datastr = "id="+json+"&offset=0"+"&limit=8";
                        var imgs = [
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
                            }
                        ];
                        var pic_tr;
                        ajaxpost(url,datastr,function(data){
                            if(data.error ==0 && data.data && data.data[0].detail){
                                if(data.data[0].detail.detail){
                                    imgs = data.data[0].detail.detail[0];
                                    pic_tr = document.getElementById('pic'+_this.domid+tr_id);
                                    if(pic_tr){
                                        if(imgs.length == 0){
                                            $(pic_tr).prev('tr').children('td:last').html('收起预览');
                                            pic_tr.parentNode.removeChild(pic_tr);
                                        }else{
                                            var tr_li = pic_tr.childNodes[0].childNodes[0].children;
                                            for(var k=0;k<tr_li.length;k++){
                                                if(imgs[k]){
                                                    tr_li[k].childNodes[0].src = imgs[k].show_url + '&width=400&height=400';
                                                }
                                            }
                                        }
                                    }
                                }else{
                                    imgs = data.data[0].detail.content;
                                    pic_tr = document.getElementById('pic'+_this.domid+tr_id);
                                    if(pic_tr){
                                        if(imgs.length == 0){
                                            $(pic_tr).prev('tr').children('td:last').html('收起预览');
                                            pic_tr.parentNode.removeChild(pic_tr);
                                        }else{
                                            var tr_li = pic_tr.childNodes[0].childNodes[0].children;
                                            for(var k=0;k<tr_li.length;k++){
                                                if(imgs[k] && imgs[k].img){
                                                    tr_li[k].childNodes[0].src = imgs[k].img.major.url + '&width=400&height=400';
                                                }
                                            }
                                        }
                                    }
                                }
                            }else{
                                pic_tr = document.getElementById('pic'+_this.domid+tr_id);
                                $(pic_tr).prev('tr').children('td:last').html('收起预览');
                                if(pic_tr) pic_tr.parentNode.removeChild(pic_tr);
                            }
                        });
                        tbody += _this.showsmallpic(tr_id,imgs);
                    }
                })(i)
            }
        }
        return tbody;
    }
    //table内容部分，容器
    Datalist.prototype.tbodyhtml= function(){
        var data = this.arrdata()
        var con  = this.title;
        var height = document.documentElement.clientHeight -350 || document.body.clientHeight -350;

        var tbody = '<div style="max-height:'+height+'px;overflow-y: auto; " id="tablebody_container" class="scrollbar"><table class="v table bgnone" id="_data_table" style="table-layout: fixed">'

        if(data.length){
            // var ids = [];
            for(var i in data){
                _this =this;
                (function(i){
                    tbody += '<tr>'
                    for(var j in data[i]){
                        if(typeof con[j] == 'object'){
                            if(this.isstatus){
                                tbody += '<td style="'+con[j].style+'">'+con[j].callback(data[i][j],this.isstatus.cur)+'</td>'
                            }else{
                                tbody += '<td style="'+con[j].style+'">'+con[j].callback(data[i][j],_this.data)+'</td>'
                            }
                        }else{
                            tbody += '<td style="'+con[j].style+'">'+data[i][j]+'</td>'
                        }
                    }
                    tbody += '</tr>';
                    if(_this.isrobotdata){
                        var tr_id = data[i][_this.curid];
                        var url = interface.data.resvision;
                        var ids = [];
                        ids.push(tr_id);
                        var json = JSON.stringify(ids);
                        var datastr = "id="+json+"&offset=0"+"&limit=8";
                        var imgs = [
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
                            }
                        ];
                        var pic_tr;
                        ajaxpost(url,datastr,function(data){
                            if(data.error ==0 && data.data && data.data[0].detail){
                                if(data.data[0].detail.detail){
                                    imgs = data.data[0].detail.detail[0];
                                    pic_tr = document.getElementById('pic'+_this.domid+tr_id);
                                    if(pic_tr){
                                        if(imgs.length == 0){
                                            $(pic_tr).prev('tr').children('td:last').html('收起预览');
                                            pic_tr.parentNode.removeChild(pic_tr);
                                        }else{
                                            var tr_li = pic_tr.childNodes[0].childNodes[0].children;
                                            for(var k=0;k<tr_li.length;k++){
                                                if(imgs[k]){
                                                    tr_li[k].childNodes[0].src = imgs[k].show_url  + '&width=400&height=400';
                                                }
                                            }
                                        }
                                    }
                                }else{
                                    imgs = data.data[0].detail.content;
                                    pic_tr = document.getElementById('pic'+_this.domid+tr_id);
                                    if(pic_tr){
                                        if(imgs.length == 0){
                                            $(pic_tr).prev('tr').children('td:last').html('收起预览');
                                            pic_tr.parentNode.removeChild(pic_tr);
                                        }else{
                                            var tr_li = pic_tr.childNodes[0].childNodes[0].children;
                                            for(var k=0;k<tr_li.length;k++){
                                                if(imgs[k] && imgs[k].img){
                                                    tr_li[k].childNodes[0].src = imgs[k].img.major.url + '&width=400&height=400';
                                                }
                                            }
                                        }
                                    }
                                }
                            }else{
                                pic_tr = document.getElementById('pic'+_this.domid+tr_id);
                                $(pic_tr).prev('tr').children('td:last').html('收起预览');
                                if(pic_tr) pic_tr.parentNode.removeChild(pic_tr);
                            }
                        });
                        tbody += _this.showsmallpic(tr_id,imgs);
                    }
                })(i)
            }
            // this.ajax_small_img(ids);
        }
        tbody += '</table></div>'
        return tbody
    }

    /*只发一次请求图片*/
    Datalist.prototype.ajax_small_img = function(ids){
        var json = JSON.stringify(ids);
        var datastr = "id="+json+"&offset="+(this.page-1)+"&limit=6";
        var url = interface.data.resvision;
        ajaxpost(url,datastr,function(data){
            console.log(data);
            // if(data.error ==0 && data.data && data.data[0].detail){
            //     if(data.data[0].detail.detail){
            //         imgs = data.data[0].detail.detail[0];
            //         pic_tr = document.getElementById('pic'+_this.domid+tr_id);
            //         if(pic_tr){
            //             if(imgs.length == 0){
            //                 $(pic_tr).prev('tr').children('td:last').html('收起预览');
            //                 pic_tr.parentNode.removeChild(pic_tr);
            //             }else{
            //                 var tr_li = pic_tr.childNodes[0].childNodes[0].children;
            //                 for(var k=0;k<tr_li.length;k++){
            //                     if(imgs[k]){
            //                         tr_li[k].childNodes[0].src = imgs[k].show_url;
            //                     }
            //                 }
            //             }
            //         }
            //     }else{
            //         imgs = data.data[0].detail.content;
            //         pic_tr = document.getElementById('pic'+_this.domid+tr_id);
            //         if(pic_tr){
            //             if(imgs.length == 0){
            //                 $(pic_tr).prev('tr').children('td:last').html('收起预览');
            //                 pic_tr.parentNode.removeChild(pic_tr);
            //             }else{
            //                 var tr_li = pic_tr.childNodes[0].childNodes[0].children;
            //                 for(var k=0;k<tr_li.length;k++){
            //                     if(imgs[k] && imgs[k].img){
            //                         tr_li[k].childNodes[0].src = imgs[k].img.major.url;
            //                     }
            //                 }
            //             }
            //         }
            //     }
            // }else{
            //     pic_tr = document.getElementById('pic'+_this.domid+tr_id);
            //     $(pic_tr).prev('tr').children('td:last').html('收起预览');
            //     if(pic_tr) pic_tr.parentNode.removeChild(pic_tr);
            // }
        });
    }
    Datalist.prototype.showsmallpic = function(id,imgs){
        var html ='<tr id="pic'+this.domid+id+'" class="pic_tr">';
        html += '<td colspan="'+this.title.length+'">'
        html += '<ul style="overflow: hidden;">';
        for(var i=0;i<imgs.length;i++){
            console.log(imgs[i].img.major.url)
            html += '<li style="width: 150px;height: 80px; margin-right: 5px; float: left; text-align: center;">'
            html += '<img src="'+imgs[i].img.major.url+'" ok="&width=400&height=400" class="img" did="'+id+'" id="img_'+i+'" onclick="preview(this,this.id)" style="height: 80px;"/>'
            html +='</li>'
        }
        html += '</ul>';
        html += '</td>';
        html += '</tr>';
        return html;
    }

    Datalist.prototype.pagehtml = function(){
        if(this.ispage || this.ispage == undefined){
            var obj = {
                args:{
                    pageCount:this.maindata.page.page_num, // 总页
                    current:parseInt(this.page),                      // 当前页
                    res_num:this.maindata.page.res_num
                }
            }
            return pageDom(obj).html()
        }else{
            return ''
        }
    }

    Datalist.prototype.renderstatushtml = function(){
        if(!this.isstatus) return false
        var data = this.isstatus.data
        var cur = this.isstatus.cur
        var html = ""
        for(var i in data){
            if(data[i]['status'] == cur){
                html += '<a href="javascript:;" style="margin: 0 1px;" class="v btn blue">'+data[i]['text']+'</a>'
            }else{
                html += '<a href="javascript:;" style="margin: 0 1px;" sid="'+data[i]['status']+'" class="v btn _status_btn">'+data[i]['text']+'</a>'
            }
        }
        document.getElementById(this.isstatus.domid).innerHTML = html
    }

    Datalist.prototype.arrdata = function(){
        var arr = []
        if(this.maindata.detail){
            var data = this.maindata.detail
        }else{
            data = this.maindata
        }
        if(data.length){
            var key  = this.datakey
            for(var i in data){
                var item = []
                for(var j in key){
                    if(typeof key[j] == 'object'){
                        var tearr = []
                        for(var k in key[j]){
                            tearr.push(data[i][key[j][k]])
                        }
                        item.push(tearr)
                    }else{
                        item.push(data[i][key[j]])
                    }

                }
                arr.push(item)
            }
        }
        return arr
    }


    w.datalist = function(obj){
        return new Datalist(obj)
    }


    function __postData(url,data,callback){
        show_loading()
        var xmlhttp;
        if (window.XMLHttpRequest){
            xmlhttp=new XMLHttpRequest();
        }else{// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function(){
            if (xmlhttp.readyState==4 && xmlhttp.status==200){
                var data = JSON.parse(xmlhttp.responseText)
                callback(data)
            }
            hide_loading()
        }
        xmlhttp.open("GET",url + data,false);
        xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded")
        xmlhttp.send();
    }

    function objzstr(obj){
        var str = ''
        var num = 0
        for(var i in obj) {
            if (obj[i] !== "") {
                if (num != 0) {
                    str += '&' + i + '=' + obj[i]
                } else {
                    str += i + '=' + obj[i]
                }
            }
            num++
        }
        return str
    }


}(window)
