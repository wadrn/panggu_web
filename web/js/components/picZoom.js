!function(w){
    function picZoom(obj){
        var defaults ={
            target:  '.small_pic',   //目标元素 li 中的a元素
            parentCls :'.parentCls'   //li 父容器
        }
        this.options = $.extend({},defaults,obj.options);
        this.init();
        this.callback = obj.callback;
    }
    picZoom.prototype ={
        /*初始化*/
        init :function(){
            var _this = this;
            var options = this.options;
            if($(options.target).length <=0){
                return;
            }else{
                $(options.target).each(function(){
                    var img_href = $(this).attr('href');
                    _this.zoom(this,img_href)
                    $(this).unbind('click').bind('click',function(e){
                        e.preventDefault();
                        // var img_href = $(this).attr('href');
                        _this.zoom(this,img_href);
                    })
                })
            }
        },
        zoom :function(dom,img_href){
            var options = this.options;
            var width = 0;
            var height = 0;
            var maxWidth = $(dom).closest(options.parentCls).outerWidth();

            /*图片预加载*/
            var loadImg = function(url,fn){
                var img = new Image();
                img.src = url;
                if(img.complete){
                    fn.call(img);
                }else{
                    img.onload = function(){
                        fn.call(img);
                    }
                }
            }

            /*点击大图切换小图，点击小图切换大图*/
            var tool = function(){
                var domparent = $(dom).closest(options.parentCls);
                $(dom).hide();
                if($('.large_img',domparent).length >0 && $('.large_img',domparent).css('display') == 'none'){
                    $('.large_img',domparent).show();
                }
                /*图片缩放*/
                if(width >maxWidth){
                    height = maxWidth / width * height;
                    width = maxWidth;
                }
                console.log(height,width);
                if($('.large_img',domparent).length <= 0){
                    var html = '<div class="large_img">'+
                        '<a href="'+img_href+'" class="maxImg">'+
                        '<img class="maxImg" width="'+width+'" height="'+height+'" src="'+img_href+'"/>'+
                        '</a>'+
                        '</div>';
                    $(domparent).append(html);
                }
                $('.large_img',domparent).find('a').unbind('click').bind('click',function(e){
                    e.preventDefault();
                    var $this = $(this),
                        $parent = $(this).closest(options.parentCls);
                    var box = $('.large_img',$parent);
                    if($($this).hasClass('maxImg')){
                        box.hide();
                        box.prev().show();
                    }
                })
            }
            loadImg(img_href,function(){
                width = this.width;
                height = this.height;
                tool();
            })
        }
    }
    w.pic_zoom = function(obj){
        return new picZoom(obj);
    }
}(window)