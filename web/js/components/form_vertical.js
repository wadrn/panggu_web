!function(w){
    function Form_vertical(){
        this.domid = ''
        this.data=[]
    }
    Form_vertical.prototype.renderhtml=function(id){
        this.domid =id
        var data = this.data
        var _this = this;
        var html = ''
        for(var i in data){
            if(this[data[i]['type']]){
                html += this[data[i]['type']](data[i])
            }
        }
        document.getElementById(this.domid).innerHTML = '<div class="content">'+html+'</div>'
    }
    Form_vertical.prototype.title = function(data){
        var html =''
        html += '<div class="cfg_title">'+data['desc']+'</div>'
        return html;
    }
    Form_vertical.prototype.text = function(data){
        var html ='';
        html += '                      <div class="call row">' +
            '                          <div><span class="name">'+data['desc']+'</span></div>' +
            '                          <input type="text">' +
            '                      </div>'
        return html
    }
    Form_vertical.prototype.textarea = function(data){
        var html =''
        html +=  '                      <div class="describe row">\n' +
            '                          <div><span class="name">'+data['desc']+'</span></div>\n' +
            '                          <textarea name="" cols="30" rows="10"></textarea>\n' +
            '                      </div>'
        return html
    }
    Form_vertical.prototype.select =function(data){
        var html =''
        html += '<div class="type row">'+
            '<div><span class="name">'+data['desc']+'</span></div>'+
            '<select name="">'+
            select(data.data)+
            '</select>'+
            '</div>'

        function select(data){
            var html = ''
            for(var i in data){
                html +=		  '<option value='+data[i]['key']+'>'+data[i]['text']+'</option>'
            }
            return html
        }
        return html
    }
    Form_vertical.prototype.initevent = function(){
    }
    window.form_vertical = function(){
        return new Form_vertical()
    }
}(window)