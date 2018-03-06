!function(w){
    function Workflow(obj){
        this.data = (obj && obj.data) || []
		this.ele = (obj && obj.domid) || "workflow"
		this.cur = (obj && obj.cur) || 0
		this.init()
	}
	Workflow.prototype.init = function(){
		var html = this.renderHtml();
		$("#"+this.ele).html(html)
		//this.initEvent()
	}
	Workflow.prototype.renderHtml = function(){
		var html = ""
		html += '<div class="workflow_block">'
		for(var i=0;i<this.data.length;i++){
			var point_color = i< this.cur+1 ? "blue" : "gray"
			var line_color  = i< parseInt(this.cur)? "blue" : "gray"

			html += '<div style="position: relative;">'
			html += '	<span class="work_point '+point_color+'" index="point_'+i+'"></span>'
			html += '	<span class="btn normal_btn work_btn '+point_color+'" index="btn_'+i+'" onclick="'+this.data[i].click+'">'+this.data[i].name+'</span>'
			html += '</div>'

			if(i != this.data.length-1){
				html += '<div>'
				html += '	<span class="work_line '+line_color+'" index="line_'+i+'"></span>'
				html += '</div>'
			}
		}
		html += '</div>'
		return html;
	}
	Workflow.prototype.initEvent = function(){
		var _this = this;
		// $('#'+this.ele).off('click').on('click','.work_btn',function(){
		// 	var index = $(this).attr("index").split("_")[1]
		// 	_this.cur = index;
		// 	if(_this.data[index].isclick){
		// 		_this.data[index].click();
		// 	}
		// })
	}
	Workflow.prototype.toCur = function(i){
		var total = this.data.length;
		if(i <0 || i > total-1){
			console.log("cur超出范围")
			return;
		}
		else{
			this.cur = i;
			this.init();
			//this.data[i].click();
		}
	}
	Workflow.prototype.getCur = function(){
		return this.cur;
	}
	
	w.workflow = function(obj){
        return new Workflow(obj)
    }
}(window)