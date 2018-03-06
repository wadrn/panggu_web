!function(w){
    function Attrtree(obj,ifcheck){
        this.data = (obj && obj.data) || {
        }


        this.domid = ''
        this.defaulobj = {}
        this.subobj = null
        this.ifcheck=ifcheck
    }

    Attrtree.prototype.eventinit = function(){
        var _this = this
        var _dom = document.getElementById(this.domid)

        Event.on(_dom,'.twobox',"change",function(e){
            var checked = e.target.checked
            var name =   e.target.getAttribute('iname')
            var box = document.getElementsByName(name)
            for(var i=0;i<box.length; i++){
                box[i].checked = checked
            }
        });

        Event.on(_dom,'.typebtn',"click",function(e){
            var idom = e.target.parentNode,
                item = idom.parentNode,
                iclass = idom.getAttribute('iclass'),
                cdom = document.querySelector('.'+iclass);

            if(cdom.style.display == 'none'){
                cdom.style.display = 'block'
                Class.removeClass(idom.children[0],'icon-zhankai');
                Class.addClass(idom.children[0],'icon-shouqi');
                item.style.backgroundColor ='#008bd5'
            }else{
                cdom.style.display = 'none'
                Class.removeClass(idom.children[0],'icon-shouqi');
                Class.addClass(idom.children[0],'icon-zhankai');
                item.style.backgroundColor ='#eee'
            }
        });

    }

    Attrtree.prototype.seldata = function(){
        var onebox = document.querySelectorAll('.onebox')
        var obj = {}
        for(var i=0; i<onebox.length; i++){
            if(onebox[i].checked){
                if(obj[onebox[i].name]  == undefined){
                    obj[onebox[i].name] = []
                }
                var iobj = {
                    type:onebox[i].value,
                    list:[]
                }

                if(parseInt(onebox[i].getAttribute('num'))){
                    iobj.num = parseInt(onebox[i].getAttribute('num'))
                }

                var iclas = '.' + strToarr(onebox[i].value)[0]
                var twobox = document.querySelectorAll(iclas)[0].querySelectorAll('.twobox')
                var threebox = document.querySelectorAll(iclas)[0].querySelectorAll('.threebox')
                var threebox = document.querySelectorAll(iclas)[0].querySelectorAll('.threebox')

                for(var j = 0; j< twobox.length; j++){
                    if( ischecked(twobox[j]) ){
                        var dataobj = ischecked(twobox[j]),
                            bname = twobox[j].getAttribute('iname'),
                            iname = bname +'_radio'

                        var ilist = boxkey(document.getElementsByName(bname))
                        var con   = radiokey(document.getElementsByName(iname))
                        dataobj.list = JSON.parse(JSON.stringify( defaultnum(ilist,con) ))
                        iobj.list.push(dataobj)
                    }
                }
                obj[onebox[i].name].push(iobj)
            }
        }
        return obj

        function radiokey(radios){
            for(var i=0; i<radios.length; i++){
                if(radios[i].checked){
                    return radios[i].value
                }
            }
        }

        function boxkey(boxs){
            var arr = []
            for(var i=0; i<boxs.length; i++){
                if(boxs[i].checked){
                    arr.push(boxs[i].value)
                }
            }
            return arr
        }

        function defaultnum(arr,con){
            if(arr.indexOf(con) > -1){
                var i = arr.indexOf(con)
                arr.splice(i,1)
                arr.splice(0,0,con)
            }
            return arr
        }

        function ischecked(datai){
            if(datai.checked){
                return  {
                    type:datai.value,
                    list:[]
                }
            }else{
                return false
            }
        }
    }



    Attrtree.prototype.html = function(domid){
        this.domid = domid
        var data = this.data
        var html  = ''
        var sunobj = this.subobj
        for(var i in data){

            html += '<div>'
            html += '<div style="margin:20px 0 10px; padding-left:20px;">'+strToarr(i)[1]+'</div>'
            if(sunobj && sunobj[strToarr(i)[0]]){
                html += '<div style="padding:0 40px;">' + otype(data[i],i,this.ifcheck, sunobj[strToarr(i)[0]]) + '</div>'
            }else{
                html += '<div style="padding:0 40px;">' + otype(data[i],i,this.ifcheck) + '</div>'
            }

            html += '</div>'
        }
        return html

        function otype(data,name,ifcheck,sub){
            var ischecked =false;
            var html = ''
            for(var i in data){
                var num = 0
                if(data[i].num) {
                    num = data[i].num
                }

                for(var j in sub){
                    if(sub[j].type == data[i].type){
                        ischecked = sub[j].list
                    }else{
                        ischecked = false
                    }
                }

                if(data[i])
                html += ''+
                    '            <div style="background: #eee; padding:6px 10px; margin-bottom:1px">'+
                    '                <label>'

                if(ischecked) {
                    html+='<input type="checkbox" class="onebox" name="'+name+'" num ='+num+' value="'+data[i].type+'" checked="true"/> '
                }else{
                    html+='<input type="checkbox" class="onebox" name="'+name+'" num ='+num+' value="'+data[i].type+'" /> '
                }
                html+= strToarr(data[i].type)[1] +
                    ' </label>'
                if(!ifcheck){
                    html+= '<span iclass="'+strToarr(data[i].type)[0]+'" class="typebtn" style="float:right; cursor:pointer;"><i class="iconfont icon-zhankai"></i></span>'
                }else{
                    html+= '<span iclass="'+strToarr(data[i].type)[0]+'" class="typebtn" style="float:right; cursor:pointer;"><i class="iconfont icon-shouqi"></i></span>'
                }
                html+='            </div>'
                if(!ifcheck){
                    if(ischecked){
                        html+='            <div class="'+strToarr(data[i].type)[0]+'" style="padding:10px 20px; display:block;">'
                    }else{
                        html+='            <div class="'+strToarr(data[i].type)[0]+'" style="padding:10px 20px; display:none;">'
                    }
                }else{
                    html+='            <div class="'+strToarr(data[i].type)[0]+'" style="padding:10px 20px; display:block;">'
                }
                if(ischecked){
                    html+=              tType(data[i].list,strToarr(data[i].type)[0],ifcheck,ischecked)
                }else{
                    html+=              tType(data[i].list,strToarr(data[i].type)[0],ifcheck)
                }
                    html += '            </div>'
            }
            return html;
        }
        function tType(data,name,ifcheck,sub){
            if(data && data.length != 0){
                var html = ""
                for(var i in data){
                    var ischeck = false
                    html += ""+
                        '            <div style="padding:10px 20px; overflow: hidden; zoom: 1; border-bottom: 1px solid #eee;">'+
                        '              <span style=" float: left; display: inline-block; width: 150px; text-align: right; padding-right: 20px;">'+
                        '               <label> '
                    if(!ifcheck) {
                        if(sub){
                            for(var j in sub){
                                if(sub[j].type == data[i].type){
                                    ischeck = sub[j].list
                                }
                            }
                        }
                        if(ischeck){
                            html+='<input type="checkbox" class="twobox" iname="'+name+'_'+strToarr(data[i].type)[0]+'" value="'+data[i].type+'" style="margin-right:10px" checked="true"/>'
                        }else{
                            html+='<input type="checkbox" class="twobox" iname="'+name+'_'+strToarr(data[i].type)[0]+'" value="'+data[i].type+'" style="margin-right:10px" />'
                        }

                    }else{
                        html+='<input type="checkbox" class="twobox" iname="'+name+'_'+strToarr(data[i].type)[0]+'" value="'+data[i].type+'" style="margin-right:10px" checked="true" />'
                    }
                    html+=                       strToarr(data[i].type)[1]+
                        '               </label></span>'+
                        '              <div style="display:inline-block;">'+
                        lcon(data[i].list,name+'_'+strToarr(data[i].type)[0],ifcheck,ischeck) +
                        '              </div>'+
                        '            </div>'
                }
                return html;
            }else{
                var html = ""
                return html;
            }
        }

        function lcon(data,name,ifcheck,sub){
            var html = ''
            for(var i in data){
                var ischeked = ''
                var boxcheck = false
                if(i == 0){
                    ischeked = 'checked'
                }
                html += '<div style="line-height:20px;">  <label style="display:inline-block;">'
                if(sub){
                    for(var j in sub){
                        if(sub[j] == data[i]){
                            boxcheck = true
                        }
                    }
                }

                if(!ifcheck) {
                    if(boxcheck){
                        html += '<input class="threebox" type="checkbox" name="'+name+'" value="'+data[i]+'" style="margin-right:10px" checked="true"/>'
                    }else{
                        html += '<input class="threebox" type="checkbox" name="'+name+'" value="'+data[i]+'" style="margin-right:10px"/>'
                    }

                }
                html += ' <span style="display:inline-block; width:150px">'+strToarr(data[i])[1]+' </span> </label> '
                if(!ifcheck) {
                    html += '<input type="radio" name="'+name+'_radio" value="'+data[i]+'" '+ischeked+'/> '
                }
                html+='</div>'
            }
            return html;
        }
    }





    w.attr_tree = function(obj,ifcheck){
        return new Attrtree(obj,ifcheck)
    }

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


    function strToarr(str){
        if(!str) return ''
        if(str.indexOf('^_^') != -1){
            return str.split('^_^');
        }else{
            return [str,str];
        }
    }


}(window)
