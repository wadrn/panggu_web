!function(w){
    function Preview(obj){
        var obj   = obj || {}
        this.url = obj.url
        this.domid = obj.domid
        this.data = obj.data || [];
        this.result = obj.result || [];
        this.dataid = obj.dataid
        this.cur  = obj.cur   || 0
        this.call = obj.call  || null
        this.page =1
        this.ispage  = obj.ispage || true
        this.israw = obj.israw || false;
        this.init()
    }
    Preview.prototype.init=function(){
        this.ajaximgdata();
        this.eventinit();
    }

    Preview.prototype.ajaximgdata = function(){
        var _this = this
        var url = this.url
        console.log(this.dataid);
        var datastr = "id="+this.dataid+"&offset="+(this.page-1)+"&limit=6";
        ajaxpost(url,datastr,function(data){
            if(data.error == 0){
                if(_this.israw){
                    _this.data = data.data[0].detail;
                    if(_this.data.length!==0){
                        _this.renderrawhtml();
                        _this.set_raw_img_size();
                    }else{
                        document.getElementById(_this.domid).innerHTML = '<h1 style="text-align: center;color: #ddd; font-size: 24px;">没有数据</h1>';
                    }
                }else{
                    if(data.data[0].detail.detail){
                        _this.data = data.data[0].detail.detail[0];
                        if(_this.data.length!==0){
                            _this.renderclassifyhtml();
                            document.getElementById('_cur_img').style.height = '340px'
                        }
                    }else{
                        _this.data =data.data[0].detail.content;
                        _this.result = data.data[0].detail.result;
                        if(_this.data.length!==0){
                            _this.renderhtml();
                            _this.set_img_size();
                        }else{
                            document.getElementById(_this.domid).innerHTML = '<h1 style="text-align: center;color: #ddd;font-size: 24px;">没有数据</h1>';
                        }
                    }
                }
                _this.removeshape();
                _this.drawshape();
            }else{
                errorPrompt(data['msg']);
            }
        })
    }

    Preview.prototype.renderclassifyhtml = function(){
        var img = [];
        for(var i=0;i<6;i++){
            img[i]= this.data[i];
        }

        var html ='';
        html += '<div id="preview_con">';
        html += '<div id="large"><div id="img_mask">';
        html += '<img id="_cur_img" src="'+this.data[this.cur].show_url+'"/>'+'</div>';
        html += '</div><div id="small">'
        html += '<span class="pre"><a href="javascript:;" id="_pre_img_btn"><i class="iconfont icon-down3"></i></a></span>'
        html += '<ul>'
        for(var i=0;i<img.length;i++){
            html += '<li>'
            if(i == this.cur){
                html += '<img src="'+this.data[i].show_url+'" class="small_img active_img" id="img_'+i+'"/>'
            }else{
                html += '<img src="'+this.data[i].show_url+'" class="small_img" id="img_'+i+'"/>'
            }
            html +='</li>'
        }
        html += '</ul>'
        html += '<span class="next"><a href="javascript:;" id="_next_img_btn"><i class="iconfont icon-down2"></i></a></span>'
        html += '</div>'
        html += '</div>'


        document.getElementById(this.domid).innerHTML = html;
    }
    Preview.prototype.renderhtml = function(){

        var img = [];
        for(var i=0;i<6;i++){
            img[i]= this.data[i];
        }

        var html ='';
        html += '<div id="preview_con">';
        html += '<div id="large"><div id="img_mask">';
        html += '<img id="_cur_img" src="'+this.data[this.cur].img.major.url+'"/>'+'</div>';
        html += '</div><div id="small">'
        html += '<span class="pre"><a href="javascript:;" id="_pre_img_btn"><i class="iconfont icon-down3"></i></a></span>'
        html += '<ul>'
        for(var i=0;i<img.length;i++){
            html += '<li>'
            if(i == this.cur){
                html += '<img src="'+this.data[i].img.major.url+'" class="small_img active_img" id="img_'+i+'"/>'
            }else{
                html += '<img src="'+this.data[i].img.major.url+'" class="small_img" id="img_'+i+'"/>'
            }
            html +='</li>'
        }
        html += '</ul>'
        html += '<span class="next"><a href="javascript:;" id="_next_img_btn"><i class="iconfont icon-down2"></i></a></span>'
        html += '</div>'
        html += '</div>'


        document.getElementById(this.domid).innerHTML = html;
    }


    Preview.prototype.set_img_size = function(){
        var width = this.data[this.cur].img.major.width;
        var height =this.data[this.cur].img.major.height;
        var r_width;
        var r_height;
        if((340*width/height)>600){
            r_width = 600
            r_height = 600*height/width
        }else{
            r_width = 340*width/height
            r_height = 340
        }
        document.getElementById('_cur_img').style.width = r_width+'px'
        document.getElementById('_cur_img').style.height = r_height +'px'
    };

    Preview.prototype.renderrawhtml = function(){
        var img=[];
        var k=0;
        for(var i in this.data){
            img[k++] = this.data[i];
            if(k == 6){
                break;
            }
        }
        var html ='';
        html += '<div id="preview_con">';
        html += '<div id="large"><div id="img_mask">';
        html += '<img id="_cur_img" src="'+img[this.cur].token+'"/>'+'</div>';
        html += '</div><div id="small">'
        html += '<span class="pre"><a href="javascript:;" id="_pre_img_btn"><i class="iconfont icon-down3"></i></a></span>'
        html += '<ul>'
        for(var i=0;i<img.length;i++){
            html += '<li>'
            if(i == this.cur){
                html += '<img src="'+img[i].token+'" class="small_img active_img" id="img_'+i+'"/>'
            }else{
                html += '<img src="'+img[i].token+'" class="small_img" id="img_'+i+'"/>'
            }
            html +='</li>'
        }
        html += '</ul>'
        html += '<span class="next"><a href="javascript:;" id="_next_img_btn"><i class="iconfont icon-down2"></i></a></span>'
        html += '</div>'
        html += '</div>'

        document.getElementById(this.domid).innerHTML = html;
    }

    Preview.prototype.set_raw_img_size = function(){
        var width = this.data[this.cur].width;
        var height =this.data[this.cur].height;
        var r_width;
        var r_height;
        if((340*width/height)>600){
            r_width = 600
            r_height = 600*height/width
        }else{
            r_width = 340*width/height
            r_height = 340
        }
        document.getElementById('_cur_img').style.width = r_width+'px'
        document.getElementById('_cur_img').style.height = r_height +'px'
    }

    Preview.prototype.removeshape =function(){
        var points = document.getElementsByClassName('point');
        var boxes = document.getElementsByClassName('rect');
        for(var i=0;i<points.length;i++){
            document.getElementById('img_mask').removeChild(points[i]);
        }
        for(i=0;i<boxes.length;i++){
            document.getElementById('img_mask').removeChild(boxes[i]);
        }
    };

    Preview.prototype.drawshape = function(){
        var points = (this.result[this.cur] && this.result[this.cur].points) || [];
        var boxes = (this.result[this.cur] && this.result[this.cur].boxes) || [];
        var type,div,i;
        if(points){
            for(i=0;i<points.length;i++){
                type = 1;
                div = document.createElement('div');
                div.className ='point';
                div.innerHTML = this.rendershape(type,points[i]['v']);
                document.getElementById('img_mask').appendChild(div)
            }
        }
        if(boxes){
            for(i=0;i<boxes.length;i++){
                type = 2;
                div = document.createElement('div');
                div.className='rect';
                div.innerHTML = this.rendershape(type,boxes[i]['r']);
                document.getElementById('img_mask').appendChild(div)
            }
        }
    };

    Preview.prototype.rendershape = function(shapetype,data){
        var width = this.data[this.cur].img.major.width;
        var height =this.data[this.cur].img.major.height;
        var r_width;
        var r_height;
        if((340*width/height)>600){
            r_width = 600
            r_height = 600*height/width
        }else{
            r_width = 340*width/height
            r_height = 340
        }
        var html ='';
        if(shapetype == 1){
            var x = data[0]
            var y = data[1]
            var r_x = r_width*x/width
            var r_y = r_height*y/height
            html += '<div style="background: #f00;width: 5px;height: 5px;border-radius: 100%;position: absolute;left:'+r_x+'px;top:'+r_y+'px;"></div>'
        }else if(shapetype == 2){
            var t_x = data[0]
            var t_y = data[1]
            var b_x = data[2]
            var b_y = data[3]
            var r_t_x = r_width*(t_x/width)
            var r_t_y = r_height*(t_y/height)
            var r_b_x = r_width*(b_x/width)
            var r_b_y = r_width*(b_y/width)

            html += '<div style="background: #f00;width:'+ (r_b_x-r_t_x)+'px;height:'+(r_b_y-r_t_y)+'px;opacity: 0.2;position: absolute;left:'+r_t_x+'px;top:'+r_t_y+'px;"></div>'
        }
        return html;
    }

    Preview.prototype.eventinit =function(){
        var _this = this;
        var _dom = document.getElementById(this.domid);
        Event.on(_dom,'.small_img','click',function(e){
            $('#img_mask').find('.rect').remove()
            document.getElementById('_cur_img').src = e.target.getAttribute('src');
            var imgs = document.getElementsByClassName('small_img');
            for(var i=0;i<imgs.length;i++){
                Class.removeClass(imgs[i],'active_img')
            }
            Class.addClass(e.target,'active_img');
            _this.cur = parseInt(e.target.getAttribute('id').substr(4));
            _this.removeshape();
            _this.drawshape();
        })
        Event.on(_dom,'#_next_img_btn','click',function(e){
            _this.page++;
            _this.ajaximgdata()
        });
        Event.on(_dom,'#_pre_img_btn','click',function(e){
            if(_this.page == 1){
                return;
            }else{
                _this.page--;
                _this.ajaximgdata()
            }

        })

    }

    w.genPreview = function(obj){
        return new Preview(obj);
    }
}(window);
