!function(w){
    function alertFun(text,callback){
        if(arguments[1] == undefined){
            if(typeof arguments[0] == 'string'){
                this.text = text || '操作成功<br/>very good!'
                this.callback = null
            }else if(typeof arguments[0] == 'function'){
                this.text = '操作成功<br/>very good!'
                this.callback = text || null
            }else{
                return false
            }
        }else{
            this.text = text || '操作成功<br/>very good!'
            this.callback = callback || null
        }

        this.idDom = null
        this.body = document.querySelector('body');
        this.init()
    }
    alertFun.prototype.init = function(text,callback){
        var _this = this
        var html = ''+
            '<div style="position: absolute; left: 0px; right: 0px; top: 0px; bottom: 0px; z-index: 999999;background:rgba(0,0,0,.5);">'+
            '	<div style="position: absolute; left: 0px; right: 0px; top: 0px; bottom: 0px;"></div>'+
            '	<div style="position: absolute; width: 400px; top: 50%; left:50%; transform: translate(-50%, -100%);background:#eee">'+
            //'	<div style="position: absolute; width: 500px; height: 172px; background: #051425; border-radius:10px;  bottom: -85px; margin-left: -140px; left:50%; transform: translate(-50%, -100%); box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);">'+
            '		<div>'+
            '			<div style="height:42px;padding:0 10px;">'+
            '				<span style="font-size: 14px;display: inline-block; margin-top: 8px;">确认</span>'+
            '			</div>'+
            '			<div style="padding:15px 20px; color:black; line-height: 23px; font-size: 16px;  margin-top: -10px;background: #fff;height: 60px;">'+
            this.text +
            '			</div>'+
            '		</div>'+
            '		<div style="width: 100%; bottom: 10px; right:10px; text-align: right; height: 36px;display: flex;align-items: center">'+
            '			<a id="__ceAlert" style=" display:inline-block; padding:6px 0; width: 60px; margin-left: 260px;margin-right: 10px; background: #fff;" class="v btn">取消<a/>'+
            '			<a id="__okAlert" style=" display:inline-block; padding:6px 0; width: 60px; margin-right: 10px;" class="v btn blue">确定</a>'+
            '		</div>'+
            '	</div>'+
            '</div>'

        var alertdiv = document.createElement('div')
        alertdiv.setAttribute('id','__alert')
        alertdiv.innerHTML = html

        this.idDom = document.querySelector('#__alert')
        if(!this.idDom){
            this.body.appendChild(alertdiv)
            this.idDom = document.querySelector('#__alert')
        }else{
            this.idDom.innerHTML = html
        }

        this.evenInit()
    }

    alertFun.prototype.evenInit = function(){
        var _this = this
        closeBtn  = document.querySelector('#__closeAlert')
        okBtn     = document.querySelector('#__okAlert')
        ceBtn     = document.querySelector('#__ceAlert')


        if(closeBtn){
            addEvent(closeBtn,'click',function(){
                hide.call(_this)
            })
        }

        if(ceBtn){
            addEvent(ceBtn,'click',function(){
                hide.call(_this)
            })
        }


        if(okBtn){
            addEvent(okBtn,'click',function(){
                hide.call(_this)
                if(_this.callback) _this.callback()
            })
        }
    }

    function $$(name){
        return document.querySelector(name)
    }

    function addEvent(obj,type,handle){
        try{  // Chrome、FireFox、Opera、Safari、IE9.0及其以上版本
            obj.addEventListener(type,handle,false);
        }catch(e){
            try{  // IE8.0及其以下版本
                obj.attachEvent('on' + type,handle);
            }catch(e){  // 早期浏览器
                obj['on' + type] = handle;
            }
        }
    }


    function confirmFun(){
        this.id = '__confirm'
    }
    confirmFun.prototype.init = function(){

    }

    function promptFun(){
        this.id = '__promp'
    }
    promptFun.prototype.init = function(){

    }

    function hide(){
        if(this.idDom){
            this.idDom.innerHTML = ''
        }
    }
    function show(){
        $(this.id).show()
    }

    w.walert = function (text,callback){
        return new alertFun(text,callback)
    }





    function Prompt(text,color){
        this.init(text,color)
    }
    Prompt.prototype.init = function(text,color){
        var html = '<div id="__vPrompt" style="width: 260px; position: absolute; top: 90px; left: 50%; padding:10px; margin-left: -140px; color: #fff; text-align: center; line-height: 20px; display: none; opacity: 0; font-size: 14px; background: '+color+';"> </div>'
        var body = document.querySelector('body')
        var __vPrompt = document.getElementById('__vPrompt')
        if(!__vPrompt){
            body.innerHTML += html
            __vPrompt = document.getElementById('__vPrompt')
        }
        __vPrompt.style.display = 'block'
        __vPrompt.style.opacity = '.75'

        __vPrompt.innerHTML = text
        setTimeout(function(){
            __vPrompt.style.display = 'none'
            __vPrompt.style.opacity = '0'
        },2000)
    }

    w.succPrompt = function(text){
        return new Prompt(text,'#33cc99')
    }
    w.errorPrompt = function(text){
        return new Prompt(text,'#ff3300')
    }


}(window)
