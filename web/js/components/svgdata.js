!function(w){
    var _timeId;
    function Svgrender(obj){
        var obj = obj || {}
        this.domid = obj.domid
        this.data = obj.data || []
        this.btndata = obj.btndata || []
        this.taskdata = obj.taskdata || []
        this.scale = 1
        this.curid = obj.curid || []  // 当前选择点
        this.curpath = []  // 当前选择线

        this.allcur = obj.allcur || 0
        this.isico  = obj.isico || false

        this.del_line_fun= obj.del_line_fun || null
        this.sel_line_fun= obj.sel_line_fun || null
        this.add_size= obj.add_size || 1

        this.isdownsvg = false
        this.istop = false
        this.shift = false
        this.ctr   = false
        this.alt   = false

        this.init()
    }

    Svgrender.prototype.init = function(){
        if(this.domid && this.domid!=''){
            this.render()
            this.eventinit()
        }
    }

    Svgrender.prototype.eventinit = function(){
        var _this = this
        var _dom  = document.getElementById(this.domid)
        var startarr = null
        var endarr = null
        var isbtndoen = false

        var isline = false

        Event.on(_dom,'#svg_add',"click",function(e){
            var dom = document.getElementById(_this.domid)
            var svg = document.getElementById(_this.domid+'_svg')
            var svg_g = document.getElementById(_this.domid+'_svg_g')
            _this.scale += 0.1
            //svg_g.style.transform = 'scale('+_this.scale+')'

            _this.svg_g_con()
            return false;
        });

        Event.on(_dom,'#svg_less',"click",function(e){
            var dom = document.getElementById(_this.domid)
            var svg = document.getElementById(_this.domid+'_svg')
            var svg_g = document.getElementById(_this.domid+'_svg_g')
            _this.scale -= 0.1
            _this.svg_g_con()
            return false;
        });

        //连接线
        Event.on(_dom,'.start-pan',"mousedown",function(e){
            var islink = e.target.getAttribute('islink')
            if(islink == 'true'){
                isline = e.target.getAttribute('d-id')
                var sel = document.querySelectorAll('.sour-svg')
                for(var i=0;i<sel.length ; i++){
                    sel[i].setAttribute('draggable','false')
                }
                e.stopPropagation()
            }
        });

        // 单击选择按钮
        Event.on(_dom,'.sour-svg',"click",function(e){
            _timeId = setTimeout(function(){
                var target = e.target
                while(!Class.hasClass(target,'sour-svg')){
                    target = target.parentNode;
                }
                var id = parseInt(target.getAttribute('d-id'))
                var callback = target.getAttribute('callback')

                if(_this.curid.indexOf(id) > -1){
                    _this.curid.splice(_this.curid.indexOf(id),1)
                }else{
                    if(_this.shift){
                        _this.curid.push(id)
                    }else{
                        _this.curid = [id]
                    }
                }
                _this.render()
                if(callback){
                    //eval(callback)
                }
            }, 200);
        });

        // // 双击操作
        // Event.on(_dom,'.sour-svg',"dblclick",function(e){
        //     clearTimeout(_timeId);
        //     var target = e.target
        //     while(!Class.hasClass(target,'sour-svg')){
        //         target = target.parentNode;
        //     }
        //     var id = parseInt(target.getAttribute('d-id'))
        //     var draggable = target.getAttribute('draggable')
        //
        //     if(draggable == 'true'){
        //         walert('确定删除',function(){
        //             _this.delid(id)
        //             return false
        //         })
        //     }
        // });

        // 双击操作删除连线
        Event.on(_dom,'.connector',"click",function(e){

        });



        //移动按钮
        Event.on(_dom,'.sour-svg',"dragstart",function(e){
            if(!isline){
                isbtndoen = e.target.getAttribute('d-id')
                //startarr = [e.clientX-e.offsetX, e.clientY-e.offsetY]
                startarr = [e.clientX, e.clientY]
                e.stopPropagation()
            }
        });
        Event.on(_dom,'.sour-svg',"dragend",function(e){
            if(isbtndoen && !isline){
                if(_this.alt){
                    endarr = [e.clientX,e.clientY]
                    var x = (endarr[0] - startarr[0]) / parseFloat(_this.scale.toFixed(1))
                    var y = (endarr[1] - startarr[1]) / parseFloat(_this.scale.toFixed(1))
                    var idata = JSON.parse(JSON.stringify(_this.searid(isbtndoen)))

                    idata['x']+=x
                    //idata['y']+= (y-28)
                    idata['y']+= (y)
                    idata.link = []
                    idata.rear = []
                    idata.id = _this.lendata()['id'] + 1
                    _this.data.push(idata)
                    _this.curid = [idata.id]
                    _this.render()
                    isbtndoen = false
                }else{
                    endarr = [e.clientX,e.clientY]
                    console.log(startarr,endarr,_this.scale)
                    var x = (endarr[0] - startarr[0]) / parseFloat(_this.scale.toFixed(1))
                    var y = (endarr[1] - startarr[1]) / parseFloat(_this.scale.toFixed(1))
                    var idata = _this.searid(isbtndoen)
                    //_this.exitid(isbtndoen, idata['x']+=x, idata['y']+= (y-28))
                    _this.exitid(isbtndoen, idata['x']+=x, idata['y']+= (y))
                    _this.render()
                    isbtndoen = false
                }
            }
            e.stopPropagation()
        });

        //添加按钮
        Event.on(_dom,'.m_add_btn',"dragstart",function(e){
            if(!isline){
                isbtndoen = e.target.getAttribute('d-id')
                startarr = [e.clientX-e.offsetX, e.clientY-e.offsetY]
                e.stopPropagation()
            }
        });

        Event.on(_dom,'.m_add_btn',"dragend",function(e){
            if(isbtndoen && !isline){
                var sw = $('#'+_this.domid).width()  / ($('#'+_this.domid+'_svg').width())
                var sh = $('#'+_this.domid).height() / ($('#'+_this.domid+'_svg').height())

                endarr = [e.clientX,e.clientY]
                var x = (endarr[0] - startarr[0]) / parseFloat(_this.scale.toFixed(1))
                var y = (endarr[1] - startarr[1]) / parseFloat(_this.scale.toFixed(1))

                var id = e.target.getAttribute('d-id')
                var data = JSON.parse(JSON.stringify(_this.searid(id,_this.btndata)))

                var cid = _this.lendata()['cid']
                data.id = _this.lendata()['id'] + 1
                data.x += x
                data.y += (y-28)
                _this.curid = [data.id]
                _this.data.push(data)
                _this.render()
            }
            e.stopPropagation()
        });

        // 双击添加
        Event.on(_dom,'.m_add_btn',"dblclick",function(e){
            var target = e.target
            while(!Class.hasClass(target,'m_add_btn')){
                target = target.parentNode;
            }
            var id = target.getAttribute('d-id')
            var data = JSON.parse(JSON.stringify(_this.searid(id,_this.btndata)))

            if(_this.curid.length){
                var cid    = _this.lendata()['cid']
                var iddata = _this.searid(cid)
                var idrear = iddata.rear


                data.id = _this.lendata()['id'] + 1
                data.link.push(cid)
                data.rear=JSON.parse(JSON.stringify(idrear))
                data.x = iddata.x
                data.y = iddata.y + 50

                _this.curid = [data.id]
                _this.data.push(data)

                // 修改link
                for(var i in idrear){
                    var idata = _this.searid(idrear[i])
                    idata.link.push(data.id)
                    idata.link.splice(idata.link.indexOf(cid),1)
                }
                // 修改rear
                iddata.rear = [data.id]  // 中间插入
                _this.render()
            }
        });

        //移动画布
        Event.on(_dom,'#'+this.domid+'_svg_scrool',"mousedown",function(e){
            var target = e.target;
            while(target !== _dom ){
                if(hasClass(target,'sour-svg')){
                    isbtndoen = true
                    startarr = [e.layerX,e.layerX]
                    break;
                }
                target = target.parentNode;
            }
            if(!isbtndoen){
                _this.isdownsvg = true
                startarr = [e.offsetX,e.offsetY]
            }
        });
        Event.on(_dom,'#'+this.domid+'_svg_scrool',"mouseup",function(e){
            if(isline){
                if(hasClass(e.target,'end-pan')){
                    _this.setline(isline,e.target.getAttribute('d-id'))
                }
                endhide()
                _this.render()
            }
            _this.isdownsvg = false
            isbtndoen = false
            isline = false
        });

        Event.on(_dom,'#'+this.domid+'_svg_scrool',"mousemove",function(e){
            endarr = [e.offsetX,e.offsetY]
            var svg_scrool = document.getElementById(_this.domid+'_svg_scrool')
            var dom = document.getElementById(_this.domid)
            if(_this.isdownsvg){
                var x = endarr[0] - startarr[0]
                var y = endarr[1] - startarr[1]
                svg_scrool.scrollLeft -= x
                svg_scrool.scrollTop  -= y
            }
            if(isline){
                var idata = _this.searid(isline)
                var curdata = [
                    [idata.x,idata.y],
                    [e.layerX/_this.scale,e.layerY/_this.scale]
                ]
                document.querySelector('.'+_this.domid+'_curpath').innerHTML = _this.pathline({
                    data:curdata
                })
                endshow()
            }
        });

        //验证配置
        Event.on(_dom,'.save_net_config',"click",function(e){
            console.log(JSON.stringify(nt_okdata(_svg_data)))
            console.log(JSON.stringify(nt_okdata_rend(_svg_data)))
            // $.ajax({
            //     url:url,
            //     type:"POST",
            //     data:{data:nt_okdata(_svg_data)},
            //     dataType:'json',
            //     success:function(data){
            //
            //     },
            //     error:function(){
            //         hide_loading();
            //         alert('接口 '+url+' 请求错误')
            //     }
            // })
        });

        // 键盘事件
        document.onkeydown = function(event){
            var e = event || window.event || arguments.callee.caller.arguments[0];
            switch(e.keyCode){
                //Shift
                case 16:
                    _this.shift = true

                    break;
                //Control
                case 17:
                    _this.ctr = true
                    break;
                //Alt
                case 18:
                    _this.alt = true
                    break;
                //esc
                case 27:
                    _this.curid = []
                    _this.curpath = []
                    _this.render()
                    break;
                //Delete
                case 8:
                    if(!$("input").is(":focus") && !$("textarea").is(":focus") ){
                        walert('确定删除',function(){
                            if(_this.curpath.length){
                                for(var i = _this.curpath.length-1; i>=0; i--){
                                    var arr  = _this.curpath[i].split('|')

                                    _this.del_path(parseInt(arr[0]),parseInt(arr[1]))
                                }
                            }

                            if(_this.curid.length){
                                for(var i = _this.curid.length-1; i>=0; i--){
                                    _this.delid(_this.curid[i])
                                }
                            }
                            _this.curpath = []
                            _this.curid   = []
                            return false
                        })
                    }
                default:
            }
        }
        document.onkeyup = function(event){
            var e = event || window.event || arguments.callee.caller.arguments[0];
            switch(e.keyCode){
                //Shift
                case 16:
                    _this.shift = false
                    break;
                //   Control
                case 17:
                    _this.ctr = false
                    break;
                //  Alt
                case 18:
                    _this.alt = false
                    break;
                default:
            }
        }

        function endshow(){
            var end = document.querySelectorAll('.end-pan')
            for(var i=0; i<end.length; i++){
                end[i].style.display = 'block'
            }
        }

        function endhide(){
            var end = document.querySelectorAll('.end-pan')
            for(var i=0; i<end.length; i++){
                end[i].style.display = 'none'
            }
        }
    }

    Svgrender.prototype.render = function(){
        var scrolltop  = $('#'+this.domid +'_svg_scrool').scrollTop();
        var scrollleft = $('#'+this.domid+'_svg_scrool').scrollLeft();

        var _dom = document.getElementById(this.domid)
        var num = 10

        // var w = (_dom.offsetWidth -num) * this.scale,
        //     h = (_dom.offsetHeight-num) * this.scale;

        var w = _dom.offsetWidth * this.add_size,
            h = _dom.offsetHeight* this.add_size;

        _dom.innerHTML = '<div class="svgdiv scrollbar _svg_scrool" id="'+this.domid+'_svg_scrool'+'"><svg class="pane-wrap" width="'+w+'" height="'+h+'" version="1.1" xmlns="http://www.w3.org/2000/svg" id="'+this.domid+'_svg'+'"><g id="'+this.domid+'_svg_g'+'">'+this.btnhtml()+this.markerArrow()+this.html()+'</g></svg></div>'+this.svgico()
        this.svg_g_con()
        $('#'+this.domid +'_svg_scrool').scrollTop(scrolltop)
        $('#'+this.domid+'_svg_scrool').scrollLeft(scrollleft)
    }

    Svgrender.prototype.html = function(){
        var html = ''
        var pathhtml = ''
        var data = this.data
        html += '<g class="'+this.domid+'_curpath"></g>'
        for(var i in data){
            if(i <= this.allcur){
                html += this.modelbtn(data[i],'sour-svg active')
            }else{
                html += this.modelbtn(data[i],'sour-svg ')
            }
            if(data[i].link && data[i].link.length){
                if(i <= this.allcur){
                    html += this.pathhtml({
                        data:this.modelbtnlink(data[i]),
                        color:'#289DE9',
                        id:data[i].id,
                        link:data[i].link
                    })
                }else{
                    html += this.pathhtml({
                        data:this.modelbtnlink(data[i]),
                        color:'#666',
                        id:data[i].id,
                        link:data[i].link
                    })
                }
            }
        }
        return html + pathhtml
    }

    // 直角
    Svgrender.prototype.pathline = function (obj){
        var data = obj.data
        var color = obj.color || '#666'
        var sizenum = 30

        var cx = data[1][0]-data[0][0]
        var cy = data[1][1]-data[0][1]

        var xcon = (data[1][0]-data[0][0])/2 + data[0][0]
        var ycon = (data[1][1]-data[0][1])/2 + data[0][1]

        var del_line = ''
        var sel_line = ''
        if(this.del_line_fun){
            if(obj.id && obj.linkid){
                //del_line = 'ondblclick="'+this.del_line_fun+'('+obj.id+','+obj.linkid+')"'
            }
        }

        if(this.sel_line_fun){
            if(obj.id && obj.linkid){
                sel_line = 'onclick="'+this.sel_line_fun+'('+obj.id+','+obj.linkid+')"'
            }
        }

        if(ycon > data[0][1]){
            if(data[0][0] != xcon && (Math.abs(cx) > sizenum && Math.abs(cy) > sizenum)){
                var xnum = 10
                var num = xnum
                if((data[1][0]-data[0][0]) < 0){
                    num = -xnum
                }
                var okarr = [
                    [(data[0][0]),(ycon-xnum)],
                    [(data[0][0]) ,(ycon)],
                    [(data[0][0]+num) , (ycon)],
                    [(data[1][0]-num),(ycon)],
                    [(data[1][0]),(ycon)],
                    [(data[1][0]) , (ycon+xnum)]
                ]
                var html = '<g><path '+sel_line+' '+del_line+' class="connector" d="M '+data[0] +' '+ okarr[0] +' C'+okarr[0]+' '+okarr[1]+' '+okarr[2]+' M' + okarr[2]+' ' + okarr[3] +' C'+okarr[3]+' '+okarr[4]+' '+okarr[5]+' M'+okarr[5] +' '+ data[1] +'" style="fill:none; stroke:'+color+'; stroke-width=1px; cursor: default; marker-end: url(#markerArrow);"/></g>'
            }else{
                var html = '<g><path '+sel_line+' '+del_line+' class="connector" d="M '+data[0] +' '+ data[1] +'" style="fill:none; stroke:'+color+'; stroke-width=1px; cursor: default; marker-end: url(#markerArrow);"/></g>'
            }
        }else{
            if(data[0][0] != xcon && (Math.abs(cx) > sizenum || Math.abs(cy) > sizenum)){
                var xnum = 10
                var num = xnum
                if((data[1][0]-data[0][0]) < 0){
                    num = -xnum
                }
                var okarr = [
                    [data[0][0],(data[0][1]) + xnum],
                    [(xcon-num),(data[0][1]) + xnum],
                    [xcon,(data[0][1])],
                    [xcon,(data[1][1])],
                    [xcon+num,(data[1][1]) - xnum],
                    [data[1][0],(data[1][1]) - xnum],
                    [(data[1][0]),(data[1][1]-xnum)],

                    [(xcon),(data[0][1]) + xnum],
                    [xcon,(data[1][1])-xnum]
                ]
                var html = '<g><path  '+sel_line+' '+del_line+' class="connector" d="M '+data[0] +' '+ okarr[0] +' '+ okarr[1]+' C'+okarr[1]+' '+okarr[7]+' '+ okarr[2]+' M'+okarr[2]+' '+ okarr[3]+' '+' C'+okarr[3]+ ' '+okarr[8]+' '+okarr[4]+' M'+okarr[4]+' ' +okarr[5]+' '+ okarr[6]  +' '+data[1]+'" style="fill:none; stroke:'+color+'; stroke-width=1px; cursor: default; marker-end: url(#markerArrow);"/></g>'
            }else{
                var html = '<g><path  '+sel_line+' '+del_line+' class="connector" d="M '+data[0] +' '+ data[1] +'" style="fill:none; stroke:'+color+'; stroke-width=1px; cursor: default; marker-end: url(#markerArrow);"/></g>'
            }
        }
        return html
    }

    // 曲线
    Svgrender.prototype.pathline2 = function (data,color){
        var color = color || '#666'
        var num = 40
        var xcon = (data[1][0]-data[0][0])/2 + data[0][0]
        var ycon = (data[1][1]-data[0][1])/2 + data[0][1]
        if(ycon > data[0][1]){
            var html = '<g><path ondblclick="alert(1)" class="connector" d="M '+data[0]+' C '+data[0][0]+','+ycon+' '+data[1][0]+','+ycon+' '+data[1]+'" style="fill:none; stroke:'+color+'; stroke-width=1px; cursor: default; marker-end: url(#markerArrow);"/></g>'
        }else{
            var html = '<g><path ondblclick="alert(1)" class="connector" d="M '+data[0][0]+' '+data[0][1]+' Q '+(data[0][0])+' '+(data[0][1] + num)+' '+xcon+' '+ycon+' T '+data[1][0]+' '+data[1][1]+'" style="fill:none; stroke:'+color+'; stroke-width=1px; cursor: default; marker-end: url(#markerArrow);"/></g>'
        }
        return html
    }

    Svgrender.prototype.modelbtnlink = function(data){
        var link = data.link
        var arr = []
        for(var i in link){
            var iddata = this.searid(link[i])
            if(iddata){
                var idata = [
                    [iddata['x'],iddata['y']+20],
                    [data.x,data.y-16]
                ]
                arr.push(idata)
            }
        }
        return arr
    }

    Svgrender.prototype.pathhtml = function(obj){
        var html = ''
        var data = obj.data
        for(var i in data){
            var color = obj.color
            if(this.curpath.length && this.curpath.indexOf(obj.id+'|'+obj.link[i])>-1){
                color = '#13cbd4'
            }
            html += this.pathline({
                data:data[i],
                color:color,
                id:obj.id,
                linkid:obj.link[i]
            })
        }
        return html
    }

    Svgrender.prototype.setline = function(id,toid){
        if(id===toid) return false
        var id = parseInt(id)
        var toid = parseInt(toid)

        var data = this.searid(toid)
        var idata = this.searid(id)
        if(data.link.indexOf(id) < 0){
            data.link.push(id)
        }

        if(idata.rear.indexOf(toid) < 0){
            idata.rear.push(toid)
        }
    }

    Svgrender.prototype.delid = function(id){
        var data  = this.data
        var _this = this
        for(var i in data){
            if(data[i].link && data[i].link.length && data[i].link.indexOf(id) > -1){
                _this.data[i].link.splice(data[i].link.indexOf(id),1)
            }
            if(data[i].rear && data[i].rear.length && data[i].rear.indexOf(id) > -1){
                _this.data[i].rear.splice(data[i].rear.indexOf(id),1)
            }
            if(id == data[i].id){
                _this.data.splice(i,1)
                _this.render()
            }
        }
    }

    Svgrender.prototype.searid = function(id,data){
        var data = data || this.data
        var isid = false
        for(var i in data){
            if(id == data[i].id){
                isid  = data[i]
            }
        }
        return isid
    }

    Svgrender.prototype.exitIddata = function(id,data){
        var data = data || this.data
        var isid = false
        for(var i in data){
            if(id == data[i].id){
                data[i] = data
            }
        }
    }

    Svgrender.prototype.searindex = function(id){
        var data = this.data
        var isid = false
        for(var i in data){
            if(id == data[i].id){
                isid = i
            }
        }
        return isid
    }

    Svgrender.prototype.exitid = function(id,x,y){
        var data = this.data
        var isid = false
        for(var i in data){
            if(id == data[i].id){
                 data[i].x = x
                 data[i].y = y
            }
        }
    }

    Svgrender.prototype.del_path = function(id,linkid){
        var data = this.data
        var isid = false
        for(var i in data){
            if(id == data[i].id){
                var index = data[i].link.indexOf(linkid)
                if(index >- 1){
                    data[i].link.splice(index,1)
                }
            }
        }
        var data = this.searid(linkid)
        if(data.rear.length){
            var reari = data.rear.indexOf(linkid)
            if(reari>-1){
                data.rear.splice(reari,1)
            }
        }

        this.render()
    }

    Svgrender.prototype.sel_path = function(id,linkid){
        var index = this.curpath.indexOf(id+'|'+linkid)
        if(index>-1){
            this.curpath.splice(index,1)
        }else{
            if(this.shift){
                this.curpath.push(id+'|'+linkid)
            }else{
                this.curpath=[id+'|'+linkid]
            }
        }
        this.render()
    }

    Svgrender.prototype.btnhtml = function(){
        var data = this.btndata
        var html = ''
        for(var i in data) {
            data[i].x = 100
            data[i].y = 50 * (parseInt(i)+1)
            html += this.modelbtn(data[i], 'm_add_btn')
        }
        return html
    }

    Svgrender.prototype.modelbtn = function(data,clas){
        var iscur = ''
        if(this.curid.indexOf(data.id) > -1) iscur = 'current'
        var clickstr = ''
        if(clas != 'm_add_btn'){
            clickstr = 'onclick="'+data.click+'"'
        }

        var html = '<g class="modelbtn" transform="translate('+(data.x - 90)+','+(data.y - 15)+')">'+
                '<foreignObject width="170" height="30">'+
                    '<body xmlns="http://www.w3.org/1999/xhtml">'+
                        '<div class="pane-node-content element-source '+clas+' '+iscur+'" draggable="'+data.draggable+'" d-id="'+data.id+'" '+clickstr+'>'+
                            '<span class="icon icon-data"></span>'+
                            '<span></span>'+
                            data.text+
                            '<span class="status "></span>'+
                            '<div class="pane-port-list in"></div>'+

                            '<div class="pane-port-list in"><div class="pane-port-wrap" style="width: 50%;"><div class="pane-port end-pan" d-id="'+data.id+'"></div></div></div>'+

                            '<div class="pane-port-list out">'+
                                '<div class="pane-port-wrap" style="width: 50%;">'+
                                    '<div class="pane-port start-pan" islink="'+data.islink+'" d-id="'+data.id+'">'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="pane-node-bulb"><span class="icon icon-bulb"></span></div>'+
                    '</body>'+
                '</foreignObject>'+
            '</g>'
        return html
    }

    Svgrender.prototype.svg_scrool = function(){

    }

    Svgrender.prototype.svg_con = function(){
        var num = 10
        var svg = document.getElementById(this.domid+'_svg').getBoundingClientRect(),
            svg_g = document.getElementById(this.domid+'_svg_g').getBoundingClientRect()

        var _dom = document.getElementById(this.domid)
        var _dom_svg = document.getElementById(this.domid+'_svg')
        var w = _dom.offsetWidth * this.scale - num,
            h = (_dom.offsetHeight - 40) * this.scale - num

            if(w>=_dom.offsetWidth){
                _dom_svg.setAttribute('width',w)
                _dom_svg.setAttribute('height',h)
            }else{
                if(svg_g.width > _dom.offsetWidth){
                    _dom_svg.setAttribute('width',svg_g.width + 10*num)
                }
                if(svg_g.height > _dom.offsetHeight){
                    _dom_svg.setAttribute('height',svg_g.height + 10*num)
                }
            }
        this.svg_g_con()
    }

    Svgrender.prototype.svg_g_con = function(){
        // 根据this.scale 设置_svg的尺寸
        var svg = document.getElementById(this.domid+'_svg')
        var w = $('#'+this.domid).width() * this.scale
        var h = $('#'+this.domid).height() * this.scale
        if(this.scale>1){
            svg.setAttribute('width', w)
            svg.setAttribute('height', h)
        }

        document.getElementById(this.domid+'_svg_g').setAttribute('transform','scale('+this.scale+','+this.scale+')')
    }

    Svgrender.prototype.taskhtml = function(){
        var data = this.taskdata
        return '<div class="bpmn-top">'+data.name+'</div>'
    }

    Svgrender.prototype.svgico = function(){
        if(this.isico){
            var html = ''
                //html += '<div class="svg_ico"><a href="javascript:"></a><i class="iconfont" id="svg_add"> + </i> <i class="iconfont" id="svg_less"> - </i></div>'
                //html += '<a href="javascript:;" class="v btn blue save_net_config" style="position: absolute; right: 10px; top: 10px;">校验<a>'
            return html
        }else{
            return ''
        }
    }

    Svgrender.prototype.lendata = function(){
        var id = 0
        var cid = 0
        if(this.data.length){
            id = this.data[this.data.length-1].id
        }
        if(this.curid.length){
            cid = this.curid[this.curid.length-1]
        }
        return {
            id:id,
            cid:cid
        }
    }

    Svgrender.prototype.jiaoyandata = function(){
        console.log(nt_okdata(_svg_data))
        console.log(nt_okdata_rend(_svg_data))
        var _this = this
        _this.isnetdata = false
        // $.ajax({
        //     url:url,
        //     type:"POST",
        //     data:{data:nt_okdata(_svg_data)},
        //     dataType:'json',
        //     success:function(data){
        //         if(data.error == 0){
        //             alert('正确')
        //             _this.isnetdata = true
        //         }
        //     },
        //     error:function(){
        //         alert('接口 '+url+' 请求错误')
        //     }
        // })
    }



    Svgrender.prototype.markerArrow = function (){
        return '<marker id="markerArrow" markerWidth="13" markerHeight="13" refx="2" refy="6" orient="auto"><path d="M2,2 L 2,11 L 10,6 L2,2" style="fill: #666;" /> </marker>'
    }

    Svgrender.prototype.addcur = function (){
        this.allcur ++
        this.render()
    }

    window.svgdata = function(obj){
        return new Svgrender(obj)
    }



}(window)