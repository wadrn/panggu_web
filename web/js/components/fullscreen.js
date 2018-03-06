!function(w){
    function fullscreen(obj){
        this.domid = obj.domid;
        this.init();
    }
    fullscreen.prototype.init = function(){
        this.renderhtml();
        this.initevent();
    }
    fullscreen.prototype.renderhtml = function(){
        var html ='';
        html += '<a href="javascript:;" class="screen full-screen"><i class="iconfont icon-quanping"></i></a>'
        document.getElementById(this.domid).innerHTML =html;
    }
    fullscreen.prototype.initevent = function(){
        var _dom =document.getElementById(this.domid);
        var _this = this;
        Event.on(_dom,'.screen','click',function(e){
            var target = e.target;
            while(!Class.hasClass(target,'screen')){
                target = target.parentNode;
            }
            if(Class.hasClass(target,'full-screen')){
                var docElm = document.documentElement;
                if (docElm.requestFullscreen) {
                    docElm.requestFullscreen();
                }
                else if (docElm.msRequestFullscreen) {
                    docElm.msRequestFullscreen();
                }
                else if (docElm.mozRequestFullScreen) {
                    docElm.mozRequestFullScreen();
                }
                else if (docElm.webkitRequestFullScreen){
                    docElm.webkitRequestFullScreen();
                }
                Class.removeClass(target,'full-screen');
                Class.addClass(target,'exit-screen');
            }else if(Class.hasClass(target,'exit-screen')){
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
                else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                }
                else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
                Class.removeClass(target,'exit-screen');
                Class.addClass(target,'full-screen');
            }
        })
    }

    w.full_screen = function(obj){
        return new fullscreen(obj);
    }
}(window);