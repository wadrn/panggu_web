!function(w){

  function Datalist(obj){
    this.url     = obj['url']    // 接口地址
    this.domid   = obj['domid']
    this.data    = obj['data'] || {offset:0}
    this.maindata= null

    this.title =   obj['title']
    this.datakey =   obj['datakey']

    this.page    = 1
    this.ispage  =  obj.ispage
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
      this.ajaxpagedata(function(){
		  _this.eventinit()
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
            _this.renderhtml()
            if(callback)callback(data)
            if(_this.rendcall)_this.rendcall(_this)
        })
    }

    Datalist.prototype.eventinit = function(){
        var _this = this
        var _dom  = document.getElementById(this.domid)
        Event.on(_dom,'._gopage',"click",function(e){
            _this.page = e.target.getAttribute('ipage')
            pageFun()
        });

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
    }

    Datalist.prototype.renderhtml = function(){
        this.renderstatushtml()
        var html = ''
            html += '<table class="v table bgnone" id="_data_table" style="table-layout: fixed">'+this.tablehtml()+'</table>'
            html += '<ul class="v page" id="_data_page" style="padding: 10px 0px 10px 0px">'+this.pagehtml()+'</ul>'

        if(this.isaddcon && this.page!=1){
            //document.getElementById(this.domid).innerHTML += html
            $('#'+this.domid).find('tbody').append(this.tbodyhtml())
        }else{
            document.getElementById(this.domid).innerHTML = html
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
            tbody += '<tbody>'
            tbody += this.tbodyhtml()
            tbody += '</tbody>'
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
            // var thead = '<div style="text-align: center; color: #999;" id="default_show">没有数据</div>'
        }


        return thead + tbody
    }

    Datalist.prototype.tbodyhtml= function(){
        var data = this.arrdata()
        var con  = this.title
        var tbody = ''

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
                        var datastr = "id="+json+"&offset="+(this.page-1)+"&limit=6";
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
                                                    tr_li[k].childNodes[0].src = imgs[k].show_url;
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
                                                    tr_li[k].childNodes[0].src = imgs[k].img.major.url;
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
            html += '<li style="height: 80px; margin-right: 10px; float: left;">'
            html += '<img src="'+imgs[i].img.major.url+'" class="img" did="'+id+'" id="img_'+i+'" onclick="preview(this,this.id)" style="height: 98%;"/>'
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
                    current:parseInt(this.page)                      // 当前页
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
