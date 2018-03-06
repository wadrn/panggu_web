!function(w){
	function Form(){
			this.data = []
			this.type = 'inline-block'
			this.isevent = false
			this.subdata = this.subfun()

	}

	Form.prototype.subfun = function(){
			var obj = {}
			var data = this.data
			for(var i in data){
				if(obj[data[i]['name']] == undefined){
					obj[data[i]['name']] = objdata(data[i]['type'],data[i])
				}
			}
			return obj
			function objdata(type,data){
				if(type == 'text') return data['value']
				if(type == 'textarea') return data['value']
				if((type == 'select')&&(data['data'][0])) return data['data'][0]['key']
			}
	}

	Form.prototype.datahtml = function (id){
		if(id) this.domid = id
		this.subdata = this.subfun()
		var data = this.data
		var _this = this

        setTimeout(function(){
            _this.initevent()
        },100)
        document.getElementById(this.domid).innerHTML = this.html()
	}

    Form.prototype.html = function(){
        var data = this.data
        var html = ''
        for(var i in data){
            if(this[data[i]['type']]){
                html += this[data[i]['type']](data[i])
            }
        }
        return html
	}

	Form.prototype.initevent = function(){
			this.isevent = true
			var _dom = document.getElementById(this.domid)
			var _this = this
			Event.on(_dom,'input',"keyup",function(e){
				var idom = e.target
				if (idom.type == 'text') {
					/*
					if (idom.getAttribute('isnum')!='undefined'){
						idom.value=idom.value.replace(/\D/g,'')
					}
					 */
					var key = idom.getAttribute('name')
					_this.subdata[key] = idom.value
				}
			});
			Event.on(_dom,'input',"click",function(e){
				var idom = e.target
				var key = idom.getAttribute('name')
				if(idom.type == 'radio'){
						_this.subdata[key] = idom.value
				}else if(idom.type == 'checkbox'){
						var bs = document.getElementsByName(key)
						var arr = []
						for(var i =0; i<bs.length; i++){
								if(bs[i].checked){
										arr.push(bs[i].value)
								}
						}
						_this.subdata[key] = arr
				}else{

				}
			});
			Event.on(_dom,'textarea',"keyup",function(e){
					var idom = e.target
					var key = idom.getAttribute('name')
					_this.subdata[key] = idom.value
			});
			Event.on(_dom,'select',"change",function(e){
					var idom = e.target
                	var key = idom.getAttribute('name')
					var i = idom.selectedIndex
                	_this.subdata[key] = idom.value
			});
	}

    Form.prototype.title = function(data){
        var html =''
        html += '<div class="cfg_title" style="'+data['style']+'">'+data['desc']+'</div>'
        return html;
    }
	Form.prototype.text = function (data){
		var html = ''
        html += '<div class="item">'+
					'<label>'+data['desc']+'</label>'+
					'<input type="text" name=' + data['name'] + ' style="' + data['style'] + ' display:inline-block;" value="">'+
				'</div>'
		return html
	}

    Form.prototype.btn = function (data){
        var html = ''
        html += '<div class="item" style="'+data['style']+'">'
        html +=	'<label class="col-sm-3 control-label">'+data['desc']+'</label>'
        // html +=	'<div class="col-sm-9">'
        html +=		'<a href="javascript:;" onclick="'+data['click']+'" type="submit" class="btn btn-default show_tag" id="'+data['id']+'">点击添加</a>'

		// if(data['idarr'] && data['namearr']){
         //    html +=		'<textarea type="text" name="'+data['name']+'-name" style="height:80px; margin-top:10px; width: 70%;" class="form-control" placeholder="" disabled="disabled">'+(data['namearr'])+'</textarea>'
         //    html +=		'<input type="hidden"  name="'+data['name']+'-id"  value="'+(data['idarr'])+'"   class="form-control" placeholder="">'
		// }else{
         //    html +=		'<textarea type="text" name="'+data['name']+'-name" style="height:80px; display: none; margin-top:10px;" class="form-control" placeholder="" disabled="disabled"></textarea>'
         //    html +=		'<input type="hidden"  name="'+data['name']+'-id"  value=""   class="form-control" placeholder="">'
		// }
		// html +=	'</div>'

        html +='</div>'
        return html
    }

	Form.prototype.textarea = function (data){
		var html = ''
		html += '<div class="form-group">'
		if(data['desc']){
            html +=	'<label class="col-sm-3 control-label">'+data['desc']+'</label>'
		}
		html +=	'<div class="col-sm-9">'
		html +=		'<textarea type="text" name='+data['name']+' style="height:80px; '+data['style']+'" class="form-control" placeholder="">'+data['value']+'</textarea>'
		html +=	'</div>'
		html +='</div>'
		return html
	}

	Form.prototype.select = function (data){
		var html = ''

        html += '<div class="item">'+
				'<label for="">'+data['desc']+'</label>'+
					'<select class="" name='+data['name']+' style="'+data['style']+'" onchange="'+data['change']+'">'+
            			select(data.data)+
					'</select>'+
				'</div>'

				function select(data){
					var html = ''
					for(var i in data){
						html +=		  '<option value='+data[i]['key']+'>'+data[i]['text']+'</option>'
					}
					return html
				}

		return html
	}
	Form.prototype.date = function(data){
        var html = ''
        html += '<div class="item">'+
            '<label>'+data['desc']+'</label>'+
            '<input type="date" name=' + data['name'] + ' style="' + data['style'] + ' display:inline-block;" value="">'+
            '</div>'
        return html
	}

    Form.prototype.sbtn = function (data){
		var html ='';
		if(data['icon']){
            html = '<div class="item" >'+
                '<a href="javascript:;" onclick="'+data['fun']+'"><i class="iconfont '+data['icon']+'"></i></a>'+
                // '<i class="iconfont '+data['icon']+'" onclick="'+data['fun']+'"></i>'+
                '</div>'
		}else{
            html = '<div class="item" >'+
                '<a href="javascript:;" onclick="'+data['fun']+'" class="v btn blue" style="min-width: 90px; border-radius: 5px;">'+data['text']+'</a>'+
                '</div>'
		}
        return html;
    }

	Form.prototype.radio = function (data){
		var html = ''
				html += '<div class="form-group">'
				html +=	'<label class="col-sm-3 control-label">'+data['desc']+'</label>'
				html +=	'<div class="col-sm-9">'
				html +=		  radios(data.name,data.data)
				html +=	'</div>'
				html +='</div>'

				function radios(name ,data){
					var html = ''
					for(var i in data){
						html +=		  '<label class="radio-inline">'
						html +=					'<input type="radio" name="'+name+'" value='+data[i]['key']+'>' + data[i]['text']
						html +=			'</label>'
					}
					return html
				}
		return html
	}

	Form.prototype.checkbox = function (data){
		var html = ''
				html += '<div class="form-group">'
				html +=	'<label class="col-sm-3 control-label">'+data['desc']+'</label>'
				html +=	'<div class="col-sm-9">'
				html +=		  radios(data.name,data.data)
				html +=	'</div>'
				html +='</div>'

				function radios(name ,data){
					var html = ''
					for(var i in data){
						html +=		  '<label class="checkbox-inline">'
						html +=					'<input type="checkbox" name="'+name+'" value='+data[i]['key']+'>' + data[i]['text']
						html +=			'</label>'
					}
					return html
				}
		return html
	}

	Form.prototype.div = function(data){
		var html ='';
		html += '<div id="'+data['id']+'" style="'+data['style']+'"></div>'
		return html;
	}

	w.data_form = function(){
		return new Form()
	}



}(window)
