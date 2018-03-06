!function(w){
    function Vertical_table(obj){
        this.rowHeads = obj.rowHeads || [];
        this.columnData = obj.columnData || [];
        this.width = obj.width ||'';

        this.domid = obj.domid;
        this.title = obj.title||'';

        this.height = 0;
        this.innerWidth = 0;
        this.innerLWidth = 0;

        this.perUnitWidth = obj.perUnitWidth || 10;

        this.noDataStr = obj.noDataStr || "没有数据";
        this.init();

    }
    Vertical_table.prototype = {
        init:function(){
            this.renderhtml();
        },
        createTable:function(){
            var totalwidth = 0;
            var tablehtml = '<table>'
            for(var i=0;i<this.rowHeads.length;i++){
                var head = this.rowHeads[i];
                var width = head.width;
                totalwidth += parseInt(width);
                var row_name = head.row_name;
                for(var j=0;j<row_name.length;j++){
                    var name_item = row_name[j];
                    if(j == row_name.length-1){
                        tablehtml += '<tr><td class="last" width="'+width+'px">'+name_item.name+'</td></tr>'
                    }else{
                        tablehtml += '<tr><td class="first" width="'+width+'px">'+name_item.name+'</td></tr>'
                    }
                    this.height = this.height+40;
                }
            }
            tablehtml += '</table>';
            var headhtml = '<div class="lefthead" style="width:'+totalwidth+'px">'
            headhtml += (tablehtml + "</div>");
            this.innerLWidth = totalwidth;
            this.innerWidth = this.width -totalwidth -5;
            return headhtml;
        },
        renderhtml:function(){
            var headhtml = this.createTable();
            var html = "<div id='outerframe' class='outerframecss' style='width:" + this.width + "px;'>"
                + headhtml
                + "<div id='dataframe' class='dataframecss' style='width:" + this.innerWidth + "px;'>"
                + "<div id='leftgriddataview' class='innerdivcss'>"
                + "</div>"
                + "</div>"
                + "</div>"
            document.getElementById(this.domid).innerHTML = html;
            this.show();
        },
        show:function(){
            if(this.columnData && this.columnData.length >0){
                var obj = this.columnData[0];
                var widthArr =obj.width;
                var rows = obj.rows;
                var totalwidth = 0;
                for(var i=0;i<widthArr.length;i++){
                    widthArr[i] = parseInt(widthArr[i])*this.perUnitWidth;
                    totalwidth += widthArr[i];
                }
                var tablehtml = '<table width="'+totalwidth+'">';
                for(var i=0;i<rows.length;i++){
                    var rowArr = rows[i];
                    tablehtml += '<tr>';
                    for(var j=0;j<rowArr.length;j++){
                        tablehtml += ('<td width="'+widthArr[j]+'px">'+rowArr[j]+'</td>');
                    }
                    tablehtml += '</tr>';
                }
                tablehtml += '</table>';
                if(this.innerWidth >totalwidth){
                    document.getElementById("dataframe").style.width=(parseInt(totalwidth))+"px";
                    document.getElementById("outerframe").style.width=(parseInt(this.innerLWidth)+parseInt(totalwidth)+4)+"px";
                }
                document.getElementById("leftgriddataview").innerHTML = tablehtml;
            }else{
                document.getElementById("leftgriddataview").style.height=(this.height+4)+"px";
                document.getElementById("leftgriddataview").innerHTML = this.noDataStr;
            }
        },
        addData:function(){
            this.columnData = data;
            this.show();
        },
        getData:function(){
            var dataarr =[];
            if(this.columnData && this.columnData.length>0){
                var obj = this.columnData[0];
                var rows = obj.rows;
                for(var i=0;i>rows.length;i++){
                    var rowArr = rows[i];
                    for(var j=0;j<rowArr.length;j++){
                        if(j ==0 ){
                            dataarr[i] = rowArr[j];
                        }else{
                            dataarr[i] += ','+rowArr[j];
                        }
                    }
                }
            }
        }
    }
    w.vertical_table = function(obj){
        return new Vertical_table(obj);
    }
}(window)