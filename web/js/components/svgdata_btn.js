!function(w){
    function Svgbtn(obj){
        var obj = obj || {}
        this.domid = obj.domid
        this.data = obj.data || []
        this.init()
        this.svg = obj.svg
    }

    Svgbtn.prototype.init = function(){
        this.render()
        this.eventinit()
    }

    Svgbtn.prototype.render = function(){
        var _dom = document.getElementById(this.domid)
        _dom.innerHTML = this.html()
    }

    Svgbtn.prototype.eventinit = function(){
        var _this = this
        var _dom = document.getElementById(this.domid)
        var svg_task = document.getElementById('svg_task')

        // $('#'+this.domid).on('dragend','.element-source',function(e){
        //
        //     var index = e.target.getAttribute('d-id')
        //     var data = JSON.parse(JSON.stringify(_this.searchid(index)))
        //     var svgarr = [svg_task.offsetLeft,svg_task.offsetTop]
        //     var endarr = [e.offsetX,e.offsetY]
        //     console.log([e.offsetX,e.offsetX])
        //
        //     var idata = _this.svg.lendata()
        //     data.id = idata['id']+1
        //     _this.svg.curid = [data.id]
        //
        //     //data.x = (endarr[0] -  svgarr[0]) + _dom.offsetLeft + e.target.offsetLeft + 90
        //     //data.y = (endarr[1] -  svgarr[1]) + _dom.offsetTop  + e.target.offsetTop  - 15
        //
        //     data.x = endarr[0]
        //     data.y = endarr[1] - 60
        //     _this.svg.data.push(data)
        //     _this.svg.render()
        // })

        Event.on(_dom,'.element-source',"dragend",function(e){
            var index = e.target.getAttribute('d-id')
            var data = JSON.parse(JSON.stringify(_this.searchid(index)))
            var svgarr = [svg_task.offsetLeft,svg_task.offsetTop]
            var endarr = [e.offsetX,e.offsetY]

            var idata = _this.svg.lendata()
            data.id = idata['id']+1
            _this.svg.curid = [data.id]


            //
            data.x = (endarr[0])
            //data.x = (endarr[0] -  svgarr[0]) + _dom.offsetLeft + e.target.offsetLeft - 10
            //data.y = (endarr[1] -  svgarr[1]) + _dom.offsetTop  + e.target.offsetTop  - 15

            //data.x = endarr[0]
            data.y = endarr[1] - 40
            _this.svg.data.push(data)
            _this.svg.render()
        });

        // Event.on(_dom,'.element-source',"drag",function(e){
        //     var index = parseInt(e.target.getAttribute('d-id'))
        //     var data = JSON.parse(JSON.stringify(_this.searchid(index)))
        //     var svgarr = [svg_task.offsetLeft,svg_task.offsetTop]
        //     var endarr = [e.offsetX,e.offsetY]
        //
        //     var idata = _this.svg.lendata()
        //     data.id = idata['id']+1
        //     _this.svg.curid = [data.id]
        //
        //     data.x = (endarr[0] -  svgarr[0]) + _dom.offsetLeft + e.target.offsetLeft + 90 - 180
        //     data.y = (endarr[1] -  svgarr[1]) + _dom.offsetTop  + e.target.offsetTop  - 15;
        // });

        Event.on(_dom,'.element-source',"dblclick",function(e){
            var target = e.target
            while(!Class.hasClass(target,'element-source')){
                target = target.parentNode;
            }
            var index = target.getAttribute('d-id')
            var data = JSON.parse(JSON.stringify(_this.searchid(index)))

            if(_this.svg.curid.length){
                var cid = _this.svg.lendata()['cid']
                var iddata = _this.svg.searid(cid)

                data.id = _this.svg.lendata()['id'] + 1
                data.link.push(cid)
                data.x = iddata.x
                data.y = iddata.y + 50

                _this.svg.curid = [data.id]
                _this.svg.data.push(data)
                _this.svg.render()
            }
        });
    }

    Svgbtn.prototype.html = function(){
        var html = ''
        var data = this.data
            html += '<div>'
            for(var i in data){
                html += this.btn_tel(data[i],i)
            }
            html += '</div>'
        return html
    }

    Svgbtn.prototype.searchid = function(id){
        var data = this.data
        for(var i in data){
            if(data[i].id == id){
               return  data[i]
            }
        }
        return false
    }

    Svgbtn.prototype.btn_tel = function(data,i){
        var top = 50 * i;
        var html =  '<div class="pane-node-content element-source" style="position: absolute; top:'+top+'px;" draggable="'+data.draggable+'" d-id="'+data.id+'" callback="'+data.click+'">'+
                    '<span class="icon icon-data"></span>'+
                    '<span></span>'+
                        data.text+
                    '<span class="status "></span>'+
                    '<div class="pane-port-list in"></div>'+
                    '<div class="pane-port-list in"><div class="pane-port-wrap" style="width: 50%;"><div class="pane-port end-pan" d-id="'+data.id+'"></div></div></div>'+
                    '<div class="pane-port-list out">'+
                    '<div class="pane-port-wrap" style="width: 50%;">'+
                    '<div class="pane-port start-pan" islink="'+data.islink+'" d-id="'+data.id+'"></div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="pane-node-bulb"><span class="icon icon-bulb"></span></div>'
        return html
    }

    w.svgbtn = function(obj){
        return new Svgbtn(obj)
    }
}(window)