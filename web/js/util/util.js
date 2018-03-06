function hasClass(elem, cls) {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length == 0) return false;
    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}

function addClass(elem, cls) {
    if (!hasClass(elem, cls)) {
        elem.className = elem.className == '' ? cls : elem.className + ' ' + cls;
    }
}


function removeClass(elem, cls) {
    if (hasClass(elem, cls)) {
        var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
        while (newClass.indexOf(' ' + cls + ' ') >= 0) {
            newClass = newClass.replace(' ' + cls + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}

function show_loading(){
    var div = document.createElement('div');
    var html ='';
    html += '<div style="position: absolute; left: 0px; right: 0px; top: 0px; bottom: 0px; z-index: 999999;background:rgba(0,0,0,0);">';
    html += '<div style="position: absolute; left: 0px; right: 0px; top: 0px; bottom: 0px;"></div>';
    html += '<div class="spinner" style="top: 50%; left:50%; transform: translate(-50%, -100%);margin:20% auto;width: 50px; height:60px;text-align: center;font-size: 10px;">'
    html += '<div class="rect1"></div>' +
        '<div class="rect2"></div>' +
        '<div class="rect3"></div>' +
        '<div class="rect4"></div>' +
        '<div class="rect5"></div>' +'</div>';
        html += '</div>';
        div.innerHTML = html ;
        div.setAttribute('id','loading');
        document.body.appendChild(div);
}
function hide_loading(){
    var loading =document.getElementById('loading');
    if(loading){
        document.body.removeChild(loading);
    }
}


function ajaxget(url,call){
    show_loading()
  $.ajax({
    url:url,
    type:"get",
    dataType:'json',
    success:function(data){
        hide_loading();
      if(data.error == 0){
          call(data)
      }else if(data.error == 2){
          walert('没有登录,是否返回登录页面',function(){
              window.location.href = '/static/web/html-user/login.html'
          })
      }else{
        alert(data.msg)
      }
    },
    error:function(){
        hide_loading();
        alert('接口 '+url+' 请求错误')
    }
  })
}

function ajaxpost(url,data,call){
    show_loading();
    $.ajax({
        url:url,
        type:"post",
        data:data,
        dataType:'json',
        success:function(data){
            hide_loading();
            if(data.error == 0){
                call(data)
            }else if(data.error == 2){
                walert('没有登录,是否返回登录页面',function(){
                    window.location.href = '/static/web/html-user/login.html'
                })
            }else{
                alert(data.msg)
            }
        },
        error:function(){
            hide_loading();
            alert('接口 '+url+' 请求错误')
        }
    })
}
function ajaxpost_noloading(url,data,call){
    $.ajax({
        url:url,
        type:"post",
        data:data,
        dataType:'json',
        success:function(data){
            if(data.error == 0){
                call(data)
            }else if(data.error == 2){
                walert('没有登录,是否返回登录页面',function(){
                    window.location.href = '/static/web/html-user/login.html'
                })
            }else{
                alert(data.msg)
            }
        },
        error:function(){
            alert('接口 '+url+' 请求错误')
        }
    })
}
function ajaxget_noloading(url,call){
    $.ajax({
        url:url,
        type:"get",
        dataType:'json',
        success:function(data){
            if(data.error == 0){
                call(data)
            }else if(data.error == 2){
                walert('没有登录,是否返回登录页面',function(){
                    window.location.href = '/static/web/html-user/login.html'
                })
            }else{
                alert(data.msg)
            }
        },
        error:function(){
            alert('接口 '+url+' 请求错误')
        }
    })
}
function ajaxsyncpost(url,data,call){
    show_loading();
    $.ajax({
        url:url,
        async:false,
        type:"post",
        data:data,
        dataType:'json',
        success:function(data){
            hide_loading();
            if(data.error == 0){
                call(data)
            }else if(data.error == 2){
                walert('没有登录,是否返回登录页面',function(){
                    window.location.href = '/static/web/html-user/login.html'
                })
            }else{
                alert(data.msg)
            }
        },
        error:function(){
            hide_loading();
            alert('接口 '+url+' 请求错误')
        }
    })
}