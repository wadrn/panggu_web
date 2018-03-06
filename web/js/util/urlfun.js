!function(w){
    function Getquery(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }

    function Getqueryobj(url){
        var url = url || window.location.search.substr(1)
        var data = url.split('&')
        var obj = {}
        for(var i in data){
            var iarr = data[i].split('=')
            obj[iarr[0]] = unescape(iarr[1])
        }
        return obj
    }

    function objdata(obj){
        var num = 0
        var str = ''
        for(var i in obj){
            if(num != 0){
                str += '&'+i+'='+ objstr(obj[i])
            }else{
                str += i+'='+ objstr(obj[i])
            }
            num ++
        }
        return str
        function objstr(obj){
            if(typeof obj === 'object'){
                return JSON.stringify(obj)
            }else{
                return obj
            }
        }
    }

    w.urlfun = {
        getquery   :Getquery,
        getqueryobj:Getqueryobj,
        objdata    : objdata
    }

}(window)