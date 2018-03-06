!function(w){
    function demoList(obj){
        this.domid = obj.domid;
        this.modellist =obj.modellist;
        this.curmodel = obj.curmodel;
        this.cur_img =obj.cur_img || 0;
        this.imgs_url =obj.imgs_url || interface.data.resvision;
        this.imgs = obj.imgs;
        this.page = obj.page||1;
    }
    demoList.prototype.init = function(){
        this.renderbase();
        this.renderleftlist();
        this.rendertoplist();
        this.ajaximgsdata();
        this.initevent();
    };

    demoList.prototype.renderbase = function(){
        var html = '';
        html += '<div id="leftlist"></div>';
        html += '<div id="right_section">';
        html += '<div id="select_img"></div>'+
            '<div id="pre_result"></div>' +
            '<div id="imgs"></div></div>'
        document.getElementById(this.domid).innerHTML = html;
    };

    demoList.prototype.renderleftlist = function(){
        var list = this.modellist;
        var html ='<ul>';
        for(var i=0;i<list.length;i++){
            if(this.curmodel == list[i]['model']){
                html += '<li id="'+list[i]['model']+'" class="demo_list_item selected"><a class="a">'+list[i]['title']+'</a></li>'
            }else{
                html += '<li id="'+list[i]['model']+'" class="demo_list_item"><a class="a">'+list[i]['title']+'</a></li>'
            }
        }
        html += '</ul>'
        document.getElementById('leftlist').innerHTML = html;
    };

    demoList.prototype.rendertoplist = function(){
        var html ='';
        html += '<form>'
        html += '<input type="file"/>';
        html += '<input type="text" placeholder="请输入图片url" style="height: 25px;"/>';
        html += '<input type="submit" value="确定" class="v btn blue">'
        html += '</form>'
        document.getElementById('select_img').innerHTML = html;
    };

    demoList.prototype.rendersmallimgslist = function(imgs){
        var html ='';
        html += '<span class="pre"><a href="javascript:;" id="_pre_img_btn"><i class="iconfont icon-down3"></i></a></span>'
        html += '<ul>'
        for(var i=0;i<imgs.length;i++){
            html += '<li>'
            if(i == this.cur_img){
                html += '<img src="'+imgs[i].img.major.url+'" class="img cur_img" id="img_'+i+'"/>'
            }else{
                html += '<img src="'+imgs[i].img.major.url+'" class="img" id="img_'+i+'"/>'
            }
            html +='</li>'
        }
        html += '</ul>'
        html += '<span class="next"><a href="javascript:;" id="_next_img_btn"><i class="iconfont icon-down2"></i></a></span>'
        document.getElementById('imgs').innerHTML = html;
    }

    demoList.prototype.renderresult = function(){
        var html ='';
        html += '<div id="img_mask">';
        html += '<img id="_cur_img" src="'+this.imgs[this.cur_img].img.major.url+'"/>'+'</div>';
        html += '<div id="full_screen"></div>';
        document.getElementById('pre_result').innerHTML =html;
        obj ={
            domid:'full_screen'
        };
        full_screen(obj);
    };

    demoList.prototype.ajaximgsdata = function(){
        var _this = this;
        var url = this.imgs_url;
        var ids = [];
        ids.push('260');
        var json = JSON.stringify(ids);
        var datastr = "id="+json+"&offset="+(this.page-1)+"&limit=6";
        ajaxpost(url,datastr,function(data){
            if(data.error == 0){
                _this.imgs = data.data.detail[0].content;
                _this.cur_img = 0;
                _this.rendersmallimgslist(_this.imgs);
                _this.renderresult();
            }
        })
    };

    demoList.prototype.ajaxresult = function(){
        var _this = this;
        var url = this.result_url;
        var datastr = '';
        ajaxpost(url,datastr,function(data){
            if(data.error ==0){
                _this.renderresult();
            }
        })
    };

    demoList.prototype.initevent = function(){
        var _dom = document.getElementById(this.domid);
        var _this = this;
        Event.on(_dom,'.demo_list_item','click',function(e){
            var item =e.target;
                while(!Class.hasClass(item,'demo_list_item')){
                    item = item.parentNode;
                }
                if(Class.hasClass(item,'selected')){
                    return;
                }
                _this.curmodel = item.id;
                _this.renderleftlist();
                _this.ajaximgsdata();
        });
        Event.on(_dom,'#_next_img_btn','click',function(e){
            _this.page++;
            _this.ajaximgsdata()
        });
        Event.on(_dom,'#_pre_img_btn','click',function(e){
            if(_this.page == 1){
                return;
            }else{
                _this.page--;
                _this.ajaximgsdata()
            }
        });
        Event.on(_dom,'.img','click',function(e){
            _this.cur_img = e.target.id.substr(4);
            _this.rendersmallimgslist(_this.imgs);
            _this.renderresult();
        })
    }
    w.demo = function(obj){
        return new demoList(obj)
    }

}(window);