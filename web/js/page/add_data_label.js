!function(w){

    function Labedata(data){
        this.data = data || []
        this.curr = 0
    }

    Labedata.prototype.inithtml = function(){
        var data = this.data
        var html = '<div class="oz" id="_Labedata">' + this.labelbtnhtml() + this.labelconhtml() + '</div>'
        return html
    }

    Labedata.prototype.initevent = function(){
        var _dom = document.getElementById('_Labedata')
        var _this = this
        Event.on(_dom,'.select_label',"click",function(e){
            _this.curr = e.target.getAttribute('dadai')
            _this.renderhtml()
        });
        Event.on(_dom,'._next_btn',"click",function(e){
            var len = _this.data.length
            if(_this.curr < len -1){
                _this.curr ++
                _this.renderhtml()
            }
        });

        Event.on(_dom,'._radio',"click",function(e){
            _this.data[e.target.name]['curdata'] = e.target.value
        });

        Event.on(_dom,'._checkbox',"click",function(e){
            if(e.target.checked){
                _this.data[e.target.name]['curdata'].push(e.target.value)
            }else{
                var data = _this.data[e.target.name]['curdata']
                for(var i in data){
                    if(data[i] == e.target.value){
                        data.splice(i,1)
                    }
                }
            }
            _this.renderhtml();
            //
        });


        Event.on(_dom,'._textarea',"keyup",function(e){
            _this.data[e.target.name]['curdata'] = e.target.value
        });

        Event.on(_dom,'._text',"keyup",function(e){
            var i = e.target.name
            _this.data[_this.curr]['curdata'][i] = e.target.value
        });

        Event.on(_dom,'._add_text',"click",function(e){
            _this.data[_this.curr]['curdata'].push('')
            _this.renderhtml()
        });

        Event.on(_dom,'._less_text',"click",function(e){
            var i = e.target.getAttribute('datai')
            _this.data[_this.curr]['curdata'].splice(i,1)
            _this.renderhtml()
        });


    }

    Labedata.prototype.renderhtml = function(){
        var _dom = document.getElementById('_Labedata')
        _dom.innerHTML = this.labelbtnhtml() + this.labelconhtml() + this.labelselectedhtml()
    }

    Labedata.prototype.labelbtnhtml = function(){
        var data = this.data
        var html = ''
        for(var i in data){
            if(data[i]['isSelect']){
                var ihtml = '<i class="glyphicon glyphicon-ok"></i>'
            }else{
                var ihtml = '<i class=""></i>'
            }
            if(i == this.curr){
                html += '<div dadai="'+i+'" class="label_left select_label cur"> <span dadai="'+i+'" >'+data[i].title+'</span> '+ihtml+' <span class="L_cur_span"></span> </div>'
            }else{
                html += '<div dadai="'+i+'" class="label_left select_label"> <span dadai="'+i+'" >'+data[i].title+'</span> '+ihtml+' <span class="L_cur_span"></span> </div>'
            }
        }
        return '<div class="col-sm-4" style="width: 160px;border-right:1px solid #eee;">' + html + '</div>'
    }

    Labedata.prototype.labelconhtml = function(){
        var data = this.data
        var type = data[this.curr]['type']
        var title = data[this.curr]['title']
        var arrdata = data[this.curr]['data']
        var curdata = data[this.curr]['curdata']
        var nextbtn = (this.curr == data.length-1) ? '' : '<a href="javascript:;" class="btn btn-default _next_btn">跳过此标签</a>';
        var html = '<div style="width:200px;position: absolute;top: 10px; left: 190px; border-right: 1px solid #eee;"><div class="mb20">' + this.labeltypehtml(data[this.curr])(arrdata,curdata) + '</div>'+nextbtn+'</div>'
        return html
    }

    Labedata.prototype.labeltypehtml = function(curdata){
        var type = curdata['type']
        var title = curdata['title']
        var curdata = curdata['curdata']
        var _this = this
        var obj = {}
        obj['radio'] = function (data,cur){
            var html = ''
            for(var i in data){
                if(data[i] == cur){
                    html += '<div class="radio"><label><input class="_radio" type="radio" name="'+_this.curr+'" value="'+data[i]+'" checked/> '+data[i]+'</label></div>'
                }else{
                    html += '<div class="radio"><label><input class="_radio" type="radio" name="'+_this.curr+'" value="'+data[i]+'"/> '+data[i]+'</label></div>'
                }
            }
            return html;
        }

        obj['checkbox'] = function (data,cur){
            var html = ''
            for(var i in data){
                if(cur.indexOf(data[i].id) >- 1){
                    html += '<div class="checkbox"><label><input class="_checkbox" type="checkbox" name="'+_this.curr+'" value="'+data[i].id+'" checked/> '+data[i].detail+'</label></div>'
                }else{
                    html += '<div class="checkbox"><label><input class="_checkbox" type="checkbox" name="'+_this.curr+'" value="'+data[i].id+'"/> '+data[i].detail+'</label></div>'
                }
            }
            return html;
        }

        obj['textarea'] = function (){
            var html = ""
            html += '<div>'
            html += '<textarea class="_textarea" name="'+_this.curr+'" style="width:100%; height:80px; padding:5px 10px;">'+curdata+'</textarea>'
            html += '<a href="javascript:;" type="submit" class="btn btn-default">指定抽帧范围</a>'
            html += '</div>'
            return html
        }

        obj['inputarr'] = function inputarr(){
            var html = ""
            for(var i in curdata){
                html += '<div class="mb20"><i datai="'+i+'" style="cursor: pointer;" class="glyphicon glyphicon-minus _less_text"></i> <input value="'+curdata[i]+'" name="'+i+'" style="width: 80%; display: inline-block;" class="form-control _text" type="text"/></div>'
            }
            html += '<div><i style="cursor: pointer;" class="glyphicon glyphicon-plus _add_text"></i></div>'
            return html
        }
        return obj[type]
    }

    Labedata.prototype.labelselectedhtml = function(){
        var html ='';
        html +='<div style="width:200px;position: absolute;top: 10px; left: 400px;">'+ this._labedata(this.idcnarr())+ '</div>'
        return html;
            }

    Labedata.prototype.showdata = function(){
        var data = this.data
        var arr = []
        for(var i in data){
            if(typeof data[i].curdata == 'string'){
                arr.push(data[i].curdata)
            }else if(typeof data[i].curdata == 'object'){
                var curdata = data[i].curdata
                for(var j in curdata){
                    if(curdata[j] != ''){
                        arr.push(curdata[j])
                    }
                }
            }
        }
        return arr
    }

    Labedata.prototype.idcnarr = function(){
        var data = this.data
        var obj = {}
        for(var i in data){
            for(var j in data[i]['data']){
                var jdata = data[i]['data'][j]
                obj[jdata.id] = jdata.detail
            }
        }
        var sdata = this.showdata()
        var sarr = []
        for(var i in sdata){
            sarr.push(obj[sdata[i]])
        }

        return sarr
    }

    Labedata.prototype._labedata =function(data){
        var html = ''
        for(var i in data){
            html += '<button type="button" class="btn btn-default btn-xs" style="float: left; margin-right: 10px;margin-bottom: 10px; padding: 2px;">'+data[i]+'</button>'
        }
        return html
    }

    w.labe_data = function(obj){
        return new Labedata(obj)
    }

}(window)
