!function(w){

    /*读取cookie*/
    function getCookie(name)
    {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

        if(arr=document.cookie.match(reg))

            return unescape(arr[2]);
        else
            return null;
    }

    /*删除cookie*/
    function delCookie(name)
    {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=getCookie(name);
        if(cval!=null)
            document.cookie= name + "="+cval+";expires="+exp.toGMTString()+";path=/"+"; secure";
    }

    /*设置cookie*/
    function writeCookie(value,name,key){
        var Days = 2;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        if (key == null || key == "") {
            document.cookie = name + "=" + encodeURI(value) + ";expires=" + exp.toGMTString()+";path=/"+"; secure";
        }
        else {
            var nameValue = getCookie(name);
            if (nameValue == "") {
                document.cookie = name + "=" + key + "=" + encodeURI(value) + ";expires=" + exp.toGMTString() + ";path=/";
            }
            else {
                var keyValue = getCookie(name, key);
                if (keyValue != "") {
                    nameValue = nameValue.replace(key + "=" + keyValue, key + "=" +encodeURI ( value));
                    document.cookie = name + "=" + nameValue + ";expires=" + exp.toGMTString() + ";path=/";
                }
                else {
                    document.cookie = name + "=" + nameValue + "&" + key + "=" + encodeURI(value) + ";expires=" + exp.toGMTString() + ";path=/";
                }
            }
        }
    }
    w.cookie ={
        getCookie:getCookie,
        delCookie:delCookie,
        writeCookie:writeCookie
    }

}(window)