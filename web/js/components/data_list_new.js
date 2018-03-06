!function(w){

  function Datalist(obj){
    this.url     = obj['url']
    this.dom     = obj['dom']
    this.data    = obj['data'] || {page:1}
    this.maindata= null
    this.title   = obj['title']
    this.dataFun = obj['dataFun']
    this.renderfun = obj['renderfun'] || null
    this.page    = 1
    this.ispage  = obj.ispage
    this.isstatus = obj.isstatus || null
    this.listtitle = obj['listtitle']||null
    this.right_btn=obj.right_btn
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

  Datalist.prototype.ajaxdata = function(callback){
      var _this = this
      var url = this.url
      //this.data.page = parseInt(this.data.page) - 1
      var idata = JSON.parse(JSON.stringify(this.data))
      idata.page = 0
      var data = objzstr(idata).replace(/page/g, "offset")
      __postData(url,data,function(data){
          _this.maindata = data
          if(!data.data){
              data.data = {}
              data.data.detail = []
              data.data.page = {}
          }
          _this.renderhtml()
          if(callback)callback()
      })
  }

    Datalist.prototype.ajaxpagedata = function(callback){
        var _this = this
        var url = this.url
        var idata = JSON.parse(JSON.stringify(this.data))
        idata.page = parseInt(idata.page)
        __postData(url,data,function(data){
            _this.maindata = data
            if(!data.data){
                data.data = {}
                data.data.detail = []
                data.data.page = {}
            }
            _this.renderhtml()
            if(callback)callback()
        })
    }

  Datalist.prototype.renderhtml = function(){
      var html = ''
      if(this.isstatus) html += this.statushtml()
      if(this.listtitle) html +='<div class="title_2 col-md-8 mb20">'+this.listtitle+'</div>'
      html += '<table style="table-layout:fixed;" class="table table-bordered" >'
      html +=  this.titlehtml()
      html +=  this.conhtml()
      html += '</table>'
      if(this.ispage || this.ispage == undefined) {html += this.pagehtml()}
      if(this.right_btn){
          html+=this.btnhtml()
      }
      this.dom.innerHTML = html
      if(this.renderfun)this.renderfun(this.maindata,this.data.status)
  }

  Datalist.prototype.eventinit = function(){
      var _this = this
      var _dom  = this.dom
      Event.on(_dom,'._page_num',"click",function(e){
          _this.page = e.target.innerText
          pageFun()
      });
      Event.on(_dom,'._page_next',"click",function(e){
        var len = _this.maindata.data.page.page_num
        if(_this.page < len){
          _this.page ++
          pageFun()
        }
      });
      Event.on(_dom,'._page_prev',"click",function(e){
        if(_this.page > 1){
          _this.page --
          pageFun()
        }
      });

      function pageFun(){
          _this.data['page'] = _this.page
          _this.ajaxpagedata()
      }


      // 属性排序
      Event.on(_dom,'._sort_btn',"click",function(e){
          var sdata = e.target.getAttribute('sdata')
          _this.data['sort'] = sdata
      });

      // 状态切换
      Event.on(_dom,'._status_btn',"click",function(e){
          _this.isstatus.cur = e.target.getAttribute('sid')
          _this.data.status = _this.isstatus.cur
          _this.ajaxpagedata()
      });
  }

  Datalist.prototype.titlehtml = function(){
    var data = this.title
    var html = ''
    html += '<thead><tr>'
    for(var i in data){
      if(data[i].tfun){
          html += '<th style="'+data[i]['style']+'">'+data[i].tfun(data[i]['t'])+'</th>'
      }else if(data[i].issort){
          html += '<th style="'+data[i]['style']+'"><a href="javascript:;" class="_sort_btn" sdata="'+data[i].sdata+'">'+data[i]['t']+'</a></th>'
      }else{
          html += '<th style="'+data[i]['style']+'">'+data[i]['t']+'</th>'
      }
    }
    html += '</thead></tr>'
    return html
  }

  Datalist.prototype.conhtml = function (){
    var html = ''
    html += '<tbody>'
    html += this.dataFun(this.maindata)
    html += '</tbody>'
    return html
  }


  Datalist.prototype.pagehtml = function(data){
      var len = this.maindata.data.page.page_num
      var html = ""
          html+= '<div class="oz">'
          html+=  '<div class="col-sm-8">'
          html+=    '<nav aria-label="Page navigation" style="display:inline-block">'
              html += '<ul class="pagination">'
              html += '<li><a href="javascript:;" class="_page_prev" aria-label="Previous"><span aria-hidden="true">«</span></a> </li>'
              html += num(len)
              html += '<li><a href="javascript:;" class="_page_next" aria-label="Next"><span aria-hidden="true">»</span></a></li>'
              html += '</ul>'
          html+=    '</nav>'
          html+=  '</div>'
          html+=  '<div class="col-sm-4" style="text-align:right" id="_pageright"></div>'
          html+= '</div>'
      return html;

      function num (len){
        var html = ""
        for(var i = 0; i<len; i++){
          html += '<li><a href="javascript:;" class="_page_num">'+(parseInt(i) + 1)+'</a></li>'
        }
        return html
      }
  }
    Datalist.prototype.btnhtml = function(){
        var html = ""
        html+= '<div class="oz">'
        html+=  '<div class="col-sm-12" style="text-align:right" name="_right_btn"></div>'
        html+= '</div>'
        return html;
    }

  Datalist.prototype.statushtml = function (){
      var data = this.isstatus.data
      var cur = this.isstatus.cur
      var html = ""
      html += '<div class="url_tabs">'
      for(var i in data){
        if(data[i]['status'] == cur){
            html += '<a href="javascript:;" class="cur">'+data[i]['text']+'</a>'
        }else{
            html += '<a href="javascript:;" sid="'+data[i]['status']+'" class=" _status_btn">'+data[i]['text']+'</a>'
        }
      }
      html += '</div>'
      return html
  }



  w.datalist = function(obj){
    return new Datalist(obj)
  }

/*
  var xmlhttp = new XMLHttpRequest()
  function __postData(url,data,callback){
		xmlhttp.onreadystatechange = function(){
			if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
				var data = JSON.parse(xmlhttp.responseText)
				_data = data;
				if(callback) callback(data)
			}
		}
		xmlhttp.open('post',url,false)
		xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded")
		xmlhttp.send(data)
	}
 */

    function __postData(url,data,callback){
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
        }
        xmlhttp.open("POST",url,false);
        xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded")
        xmlhttp.send(data);
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
