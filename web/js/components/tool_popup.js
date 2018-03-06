!function(w){
    function Popup(obj){
        this.style_popup = 'position:absolute; left:0px; top:0px; right:0px; bottom:0px; background:rgba(0,0,0,.5); z-index:999999; display:none;'
        this.addstyle = ''
        this.style_popup_con = 'width:680px; min-height:460px; background:#fff; position:absolute; left:50%; top:60px; bottom:100px; transform: translate(-50%, 0); -webkit-transform: translate(-50%, 0);' + this.addstyle
        this.title = '标题展示'
        this.con = ''
		this.head_show = true
		this.foot_show = true
        this.init()
        this.callback = false
        this.dom = document.getElementById('_tool_popup')
        this.button_text=obj||'确定'
    }

    Popup.prototype.init = function(){
        var html = '<div id="_tool_popup" style="'+this.style_popup+'">' + this.clearhtml() + '</div>'

        var popup = document.getElementById('_tool_popup')
        if(!popup){
            var popup = document.createElement('div')
            popup.innerHTML = html
            document.body.appendChild(popup)
        }

    }

    Popup.prototype.clearhtml = function(){
          var html = ''
          //html +='        <div id="_tool_popup" style="'+this.style_popup+'">'
          html +='          <div id="_tool_popup_con" style="'+this.style_popup_con+'">'
          html +='              <div style="">'
		  if(this.head_show){
			html +='                  <div id="_tool_p_titile" style="font-size:14px; background: #eee; padding: 8px 20px; border-bottom: 1px solid #ddd;"> '+this.title+'<a href="javascript:void(0);" id="close" style="float: right;margin-top: 2px;"><i class="iconfont icon-guanbi"></i></a> </div>'
		  }
          html +='                  <div id="_tool_p_con" style="position:absolute; top:50px; bottom:50px; left:20px; right:20px; overflow:hidden; overflow-y:auto;">'
          html +=                       this.con
          html +='                  </div>'
		  if(this.foot_show){
			  html +='                  <div style="position:absolute;left: 0px; right: 0px; bottom:0px; height:36px; background: #eee; border-top: 1px solid #ddd; text-align: right;">'
			  html +='                      <a  id="_tool_p_btn_no" href="javascript:;" class="v btn" style="margin-top: 3px; background: #fff; margin-right: 10px;">取消</a>'
			  html +='                      <a  id="_tool_p_btn_ok" href="javascript:;" class="v btn blue" style="margin-top: 3px; margin-right: 10px;">'+this.button_text+'</a>'
			  html +='                  </div>'
		  }
          html +='              </div>'
          html +='          </div>'
          //html +='       </div>'

          return html;
    }

    Popup.prototype.show = function(){
        this.dom.innerHTML = this.clearhtml()
        this.dom.style.display = 'block'

        var _this = this
		
		if(this.foot_show){
			document.getElementById('_tool_p_btn_no').onclick = function(){
			  _this.hide()
			}
			document.getElementById('_tool_p_btn_ok').onclick = function(){
			  if(_this.callback) _this.callback()
			  _this.hide()
			}
		}
		if(this.head_show){
			document.getElementById('close').onclick = function(){
				_this.hide()
			}
		}
    }

    Popup.prototype.hide = function(callback){
        var _this = this
        this.dom.style.display = 'none'
        if(callback){
          callback(_this)
        }
    }
    w.tool_popup = function(obj){
      return new Popup(obj)
    }
}(window)
