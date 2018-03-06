(function(w){
    function tboard(obj){
        this.tboard_data = obj.data;
        this.tabid = obj.tabid;
        this.chartid = obj.chartid;
        this.init();
    }
    tboard.prototype.init = function(){
        this.renderhtml();
        var key = document.getElementsByClassName('trainMonitor')[0].innerHTML;
        monitor_chart({domid:this.chartid,data:[this.tboard_data[key]]});
        this.eventinit();
    };

    tboard.prototype.renderhtml = function(){
        var html ='';
        var count =0;
        for(var key in this.tboard_data){
            if(count == 0){
                html += '<a href="javascript:;" class="v btn trainMonitor blue"  style="margin-right: 1px">'+key+'</a>'
            }else{
                html += '<a href="javascript:;" class="v btn trainMonitor"  style="margin-right: 1px">'+key+'</a>'
            }
            count++;
        }
        document.getElementById(this.tabid).innerHTML = html;
    };
    tboard.prototype.eventinit = function(){
        var _dom = document.getElementById(this.tabid);
        var _this = this;
        Event.on(_dom,'.trainMonitor','click',function(e){
            var e = e || window.event;
            var key = e.target.innerHTML;
            console.log(key);
            monitor_chart({domid:_this.chartid,data:[_this.tboard_data[key]]});
            $(e.target).addClass('blue').siblings().removeClass('blue')
        })
    }
    w.tboard = function(obj){
        return new tboard(obj);
    }
})(window)