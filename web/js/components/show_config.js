!function(w){
    function Config(obj){
        this.domid = obj.domid || null;
        this.url = obj.url;
        this.taskid = obj.id;
        this.judgeid = obj.judgeid;
        this.data = obj.data;
        this.config_data = obj.config_data || null;
        this.isVerification = obj.isVerification || null
        this.result = [];
        this.init();
    }
    Config.prototype.init = function(){
        if(this.url){
            this.ajaxconfigdata();
        }else{
            this.renderhtml();
            if(this.config_data){
                this.selectedhtml(this.config_data);
            }
            this.initevent();
            this.genresult();
        }
    };
    Config.prototype.ajaxconfigdata = function(){
        var url = this.url;
        var _this = this;
        var datastr;
        if(this.taskid){
            datastr = "id="+this.taskid;
        }else if(this.judgeid){
            datastr = "id="+this.judgeid;
        }
        ajaxpost(url,datastr,function(data){
            if(data.error == 0){
                _this.data = data.data;
                _this.renderhtml();
                if(this.config_data){
                    _this.selectedhtml();
                }
                _this.initevent();
                _this.genresult();
            }else{
                alert(data['msg'])
            }
        })
    }
    Config.prototype.selectedhtml = function(configdata){
        if(!configdata) return false;

        var nodes = document.getElementsByClassName('config');
        for(var i=0;i<nodes.length;i++){
            if(Class.hasClass(nodes[i],'config-select')){
                var value = configdata[nodes[i].name];
                if(value){
                    for(var j=0;j<nodes[i].options.length;j++){
                        if(nodes[i].options[j].value == value){
                            nodes[i].selectedIndex = j;
                            nodes[i].options[j].selected = true;
                        }
                    }
                }

            }else if(Class.hasClass(nodes[i],'config-input')){

                value = configdata[nodes[i].name];
                if(value){
                    nodes[i].value = value;
                }
            }
        }
    }
    Config.prototype.renderhtml = function(){
        var html= '';
        var data,title,dropList,input;
        if(this.data && this.data.data_config){      //数据格式化
            this.data = this.data.data_config;
        }
        if(this.data instanceof Array){
            this.networkdata = {}
            for(var i=0;i<this.data.length;i++){
                data= this.data[i];
                title =data['title'];
                dropList = data['drop_list'];
                input = data['input'];
                network = data['network'];
                if(title){
                    html += this.rendertitle(title);
                }
				html += '<div class="block" style="background: #fff; border: 1px solid #e2e2e2;">'
                if(dropList){
                    for(var j=0;j<dropList.length;j++){
                        html += this.renderdropList(dropList[j],i,j);
                    }
                }

                if(input){
                    if(title == 'AlphaDet_正样本配置'){
                        html += '<div style="line-height: 20px; padding-top: 20px; padding-left: 20px; margin: 0px 10px 0px 10px; background: #f5f5f5;">' +
                            '<div style="width:20px; height:15px; background: rgba(0,0,255,.3); display: inline-block;"></div>正例样本区域的半径比值'+
                            '<div style="width:20px; height:15px; background: rgba(255,0,0,.3); display: inline-block;"></div>无视圆环区域的半径比例'+
                            '<div style="width:20px; height:15px; background: rgba(0,255,0,.3); display: inline-block;"></div>坐标回归区域半径比值'+

                            '</div>'
                        html += '<div style="padding:30px 0; background: #f5f5f5; margin: 0px 10px 0px 10px"><div style="width: 400px; float:left; height:256px; margin:20px; position: relative; font-size: 12px;  display: inline-block;">'+

                            '<div style="width: 20px; height:20px; background: #09f; position: relative; font-size: 12px; display: inline-block; left: 50%;top: 50%; transform: translate(-50%, -50%); transform-origin: 50% 50% 0px;" id="standard_div">'+
                            '<div style="position: absolute; height: 20px; width: 1px; background: #333; top:-30px; left: 0px;"></div>'+
                            '<div style="position: absolute; height: 20px; width: 1px; background: #333; top:-30px; right: 0px;"></div>'+
                            '<div style="position: absolute; width: 100%; height: 1px; background: #333; left: 0px; top:-20px;"></div>'+

                            '<div style="position: absolute; z-index:99; width: 20px; height: 1px; background: #09f; top:0px;    right: -30px;"></div>'+
                            '<div style="position: absolute; z-index:99; width: 20px; height: 1px; background: #09f; bottom:0px; right: -30px;"></div>'+
                            '<div style="position: absolute; z-index:99; height: 100%; width: 1px; background: #09f; top:0px; right: -20px;"></div>'+

                            '<div style="width: 16px; height: 16px;  position: absolute; left: 50%; top:50%; transform:translate(-50%,-50%); transform-origin:50% 50%;"  id="standard_div_con">'+
                            '<div iname="ignore_region_radius_ratio"     class="show_arc" style="position: absolute;  left: 50%; top:50%; transform:translate(-50%,-50%); transform-origin:50% 50%;  background: rgba(255,0,0,.3); border-radius: 100%;">' +
                            // '<div class="ignore_region_radius_ratio_r _size_line" style="position: absolute; z-index:99; width: 50%; height: 1px; background: #333; bottom:0px; left: 0px;"></div>'+
                            // '<div></div>'+
                            '</div>'+
                            '<div iname="regression_region_radius_ratio" class="show_arc" style="position: absolute;  left: 50%; top:50%; transform:translate(-50%,-50%); transform-origin:50% 50%; background: rgba(0,255,0,.3);  border-radius: 100%;">' +
                            // '<div class="ignore_region_radius_ratio_r _size_line" style="position: absolute; z-index:99; width: 50%; height: 1px; background: #333; bottom:0px; left: 0px;"></div>'+
                            // '<div></div>'+
                            '</div>'+
                            '<div iname="positive_region_radius_ratio"     class="show_arc" style="position: absolute;  left: 50%; top:50%; transform:translate(-50%,-50%); transform-origin:50% 50%; background: rgba(0,0,255,.3);  border-radius: 100%;">' +
                            // '<div class="ignore_region_radius_ratio_r _size_line" style="position: absolute; z-index:99; width: 50%; height: 1px; background: #333; bottom:0px; left: 0px;"></div>'+
                            // '<div></div>'+
                            '</div>'+


                            '<div class="norm_method type_height" style="display:none">'+
                            '<div style="position: absolute; width: 36px; height: 1px; background: #f00; top:0px;    left: -40px;"></div>'+
                            '<div style="position: absolute; width: 36px; height: 1px; background: #f00; bottom:0px; left: -40px;"></div>'+
                            '<div style="position: absolute; height: 100%; width: 1px; background: #f00; top:0px;    left: -30px;"></div>'+
                            '</div>'+

                            '<div class="norm_method type_width" style="display:none">'+
                            '<div style="position: absolute; z-index:99; width: 100%; height: 1px; background: #f00; top:-10px; left: 0px;" class="_size_linered"></div>'+
                            '</div>'+

                            '<div class="norm_method type_diagonal" style="transform:rotate(24deg); transform-origin:left top; margin-top:7px; margin-left:-7px; display:none; position:relative; z-index:99;">'+
                            '<div style="position: absolute; z-index:99; width: 105%; height: 1px; background: #f00; top:-10px; left: 1px;" class="_size_linered"></div>'+
                            '</div>'+

                            '</div>'+

                            '<div style="position: absolute; background: #f5f5f5; left: 50%;margin-left: -30px; margin-top: -30px;">宽度<span id="input_0_2_span" style="width: 40px; height: 20px; border: 1px solid #ccc; text-align: center" value="40" class="standard_config"></span></div>'+
                            '<div style="position: absolute; background: #f5f5f5; right: -50px; top: 50%; color:#09f; padding:2px; margin-top: -20px;">高度<br/>  <span  id="input_0_3_span" style="width: 40px; height: 20px; border: 1px solid #ccc;text-align: center" value="40" class="standard_config"></span></div>'+
                            '<div style="position: absolute; left: -70px;top: 0; margin-top: -20px; color:#f00;">标准长度<br/><span id="input_0_4_span" style="width: 40px; height: 20px; border: 1px solid #ccc;text-align: center" value="32" class="standard_config"></span></div>'+

                            '</div>'+

                            '</div>'+

                            '<div style="margin:20px;  border: 1px dashed #333; position: relative; font-size: 12px;  display: inline-block;" id="demo_div">' +
                            '<div style="width: 20px; height:20px; background: rgba(0, 153, 255,0.3); position: relative; font-size: 12px; display: inline-block; left: 50%;top: 50%; transform: translate(-50%, -50%); transform-origin: 50% 50% 0px;" id="standard_div_sj"></div>'+

                            '<div style="position: absolute; height: 20px; width: 1px; background: #333; top:-30px; left: 0px;"></div>'+
                            '<div style="position: absolute; height: 20px; width: 1px; background: #333; top:-30px; right: 0px;"></div>'+
                            '<div style="position: absolute; width: 100%; height: 1px; background: #333; left: 0px; top:-20px;"></div>'+

                            '<div style="position: absolute; width: 20px; height: 1px; background: #333; top:0px;    right: -30px;"></div>'+
                            '<div style="position: absolute; width: 20px; height: 1px; background: #333; bottom:0px; right: -30px;"></div>'+
                            '<div style="position: absolute; height: 100%; width: 1px; background: #333; top:0px; right: -20px;"></div>'+

                            '<div style="position: absolute; width: 70%; height: 1px; background: #333; left: -30%; top:27%;    transform: rotate(6deg); transform-origin: left top 0px; margin-top: 7px; margin-left: -7px;"></div>'+
                            '<div style="position: absolute; width: 70%; height: 1px; background: #333; left: -30%; bottom:28%; transform: rotate(-6deg); transform-origin: left top 0px; margin-top: 7px; margin-left: -7px;"></div>'+


                            '<div style="position: absolute; left: 50%; top: 0px; margin-left: -50px; margin-top: -30px; background: #f5f5f5;padding: 0px 10px;">样本图像宽度<span type="text"       id="input_0_0_span" style="width: 40px; height: 20px; border: 1px solid #ccc;  text-align: center" class="standard_config"></span></div>'+
                            '<div style="position: absolute; right: -90px; top: 50%; margin-top: -40px;                  background: #f5f5f5;padding: 10px 0;">样本图像高度<br/>  <span type="text"  id="input_0_1_span"  style="width: 40px; height: 20px; border: 1px solid #ccc;text-align: center" class="standard_config"></span></div>'+


                            '</div>' +
                            '<div class="clear"></div>'+
                            '</div>'
                        this.isksh = true
                    }

                    for (j = 0; j < input.length; j++){
                        html += this.renderinput(input[j],i,j);
                    }

                }
                if(network){
                    html += '<div style="position: relative; top:0px; left: 1px; height: 800px; width: 60%; display: inline-block" id="network_btn_con_'+i+'">' +
                                '<div id="svg_task_btn_'+i+'" style="position: absolute;  top:0px; left: 0px; right:0px; background: #fff;"> </div>'+
                                '<div id="svg_task_'+i+'"    class="svgdiv" style="position: absolute; height:100%; top:40px; left: 0px; right:0px; background: #fff;"></div>'+
                            '</div>'+
                            '<div id="svg_task_config_'+i+'" style="display: inline-block; width: 39%; float: right;"></div>'
                    this.networkdata[i] = network
                }
				html += '</div>'
            }
        }else{
            data = this.data;

            title =data['title'];
            dropList = []
            input = []
            if(data.drop_list){
                dropList = data['drop_list'];
            }
            if(data.input){
                input = data['input'];
            }

            if(title){
                html += this.rendertitle(title);
            }
            if(dropList){
                for(var j=0;j<dropList.length;j++){
                    html += this.renderdropList(dropList[j],i,j);
                }
            }
            if(input) {
                for (j = 0; j < input.length; j++){
                    html += this.renderinput(input[j],i,j);
                }
            }
        }

        if(this.domid){
            if(this.isVerification){
                document.getElementById(this.domid).innerHTML = '<form id="formID" class="formular">'+html+'</form>';
            }else{
                document.getElementById(this.domid).innerHTML = html;
            }
        }else{
            this.html = html;
        }

        if(this.networkdata){
            //this.rendernetwork()
            rendernetwork(this.networkdata)
        }
    }
    Config.prototype.genresult = function(){
        this.result =[];
        var nodes = document.getElementsByClassName('config');
        for(var i=0;i<nodes.length;i++){
            var str ='';
            var name_cn = nodes[i].getAttribute('name_cn');
            if(Class.hasClass(nodes[i],'config-select')){
                var index= nodes[i].selectedIndex;
                var value = nodes[i].options[index].value;
                str = nodes[i].name+'^_^'+value+'^_^'+name_cn;
                this.result.push(str);
            }else if(Class.hasClass(nodes[i],'config-input')){
                str = nodes[i].name +'^_^'+nodes[i].value+'^_^'+name_cn;
                this.result.push(str);
            }
        }
    }
    Config.prototype.rendertitle =function(title){
        var html ='';
        html += '<div style="padding: 10px;">'+title+'</div>'
        return html;
    }

    Config.prototype.renderdropList = renderdropList
    Config.prototype.renderinput = renderinput

    w.w_renderdropList = renderdropList
    w.w_renderinput = renderinput

    function renderdropList(droplist,i,j,cur){
        var html ='';
            html += '<div class="formcon-item" style=" margin: 10px 0px; line-height: 36px;position: relative;">';
            html += '<span style="margin-right:10px; display: inline-block; width: 20%; height:36px; overflow:hidden; float: left; padding-left: 10px;">'+droplist['name']+'</span>';
            html += '<select id="sel_'+i+'_'+j+'" class=" config config-select" name="'+droplist['key']+'" name_cn="'+droplist['name']+'" style="height: 30px; float: left;">';

            for(var k=0;k< droplist['value'].length;k++){
                if(cur && cur == droplist['value'][k]['value']){
                    html += '<option value="'+droplist['value'][k]['value']+'" selected="selected">'+droplist['value'][k]['value']+'</option>'
                }else{
                    html += '<option value="'+droplist['value'][k]['value']+'">'+droplist['value'][k]['value']+'</option>'
                }
            }
            if(droplist['info'].length<20){
                html += '</select><span style="margin-right:10px;  font-size: 12px; color: #999; display: inline-block; overflow:hidden; float: left; padding-left: 10px; width: 55%; line-height: 30px;">'+droplist['info']+'</span>'
            }else{
                html += '</select><span style="margin-right:10px;  font-size: 12px; color: #999; display: inline-block; overflow:hidden; float: left; padding-left: 10px; width: 55%; line-height: 30px;" title="'+droplist['info']+'"><span style="display: inline-block; width: 20px; height: 20px; border-radius: 20px; background: #09f; color: #fff; text-align: center; line-height: 20px;">?</span></span>'
            }

            html += '<div class="clear"></div>'+
                '</div>'
            return html;
    }

    function renderinput(input,i,j){

        var _class = 'config config-input '
        var size = ''
        if(input.max){
            size += ',max['+input.max+']'
        }
        if(input.min){
            size += ',min['+input.min+']'

        }
        _class += 'validate[required,'+size+'] text-input'

        var html ='';
            html += '<div class="formcon-item" style="margin: 10px 0px;min-height: 36px; line-height: 36px;position: relative;">' +
                        '<span style="margin-right:10px; display: inline-block; width: 20%;height:36px; overflow:hidden; float: left; padding-left: 10px;">'+input['name']+'</span>'
                        if(typeof input['value'] === 'number'){
                           html += '<input id="input_'+i+'_'+j+'" class="'+_class+'" style="height: 30px; padding: 0 5px; width:20%; float: left; border-radius: 5px; border: 1px solid #ccc;" max="'+input.max+'" min="'+input.min+'" type="text" name_cn="'+input['name']+'" name="'+input['key']+'" itype="number" value="'+input['value']+'">'
                        }else{
                            html += '<input id="input_'+i+'_'+j+'" class="'+_class+'" style="height: 30px; padding: 0 5px; width:20%; float: left; border-radius: 5px; border: 1px solid #ccc;" max="'+input.max+'" min="'+input.min+'" type="text" name_cn="'+input['name']+'" name="'+input['key']+'" itype="string" value="'+input['value']+'">'
                        }
                        if(input['info'].length<20){
                            html += '<span style="margin-right:10px;  font-size: 12px; color: #999; display: inline-block;  overflow:hidden; float: left; padding-left: 10px;  width: 50%; line-height: 30px;">'+input['info']+'</span>'
                        }else{
                            html += '<span style="margin-right:10px;  font-size: 12px; color: #999; display: inline-block;  overflow:hidden; float: left; padding-left: 10px;  width: 50%; line-height: 30px;" title="'+input['info']+'"><span style="display: inline-block; width: 20px; height: 20px; border-radius: 20px; background: #09f; color: #fff; text-align: center; line-height: 20px;">?</span></span>'
                        }

                        html += '<div class="clear"></div>'+
                    '</div>'
            return html;
    }

    Config.prototype.initevent = function(){
        var _this = this;
        var _dom = document.getElementById(this.domid);
        Event.on(_dom,'.config-select','change',function(){
            _this.genresult();
        });
        Event.on(_dom,'.config-input','change',function(){
            _this.genresult();
        })

        if(_this.isVerification){
            $('#formID').validationEngine();
        }

        if(_this.isksh){
            _train_config_init()
        }

        function _train_config_init(){
            var num  = 3
            var _w = 35
            var _h = 15
            var _c = Math.sqrt(_w * _w + _h * _h)
            var _sqrt = Math.sqrt(_w * _h )
            var _quar = (_w + _h) / 2

            standard_init()
            function standard_init(){
                var size = $('#input_0_4').val()
                var size2 = $('#input_0_2').val()
                var size3 = $('#input_0_3').val()
                var size0 = $('#input_0_0').val()
                var size1 = $('#input_0_1').val()

                $('#standard_div').css({
                    "height":(size2 * num)+'px',
                    "width" :(size3 * num)+'px'
                })
                $('#standard_div_sj').css({
                    "height":(size2)+'px',
                    "width" :(size3)+'px'
                })
                $('#demo_div').css({
                    "height":(size1 )+'px',
                    "width" :(size0 )+'px'
                })
                setTimeout(function(){
                    $('#input_0_0_span').text($('#input_0_0').val())
                    $('#input_0_1_span').text($('#input_0_1').val())
                    $('#demo_div').css({
                        width:($('#input_0_0').val()) +'px',
                        height:($('#input_0_1').val()) +'px',
                    })
                },400)
            }
            setarc()
            function setarc(){
                $('.show_arc').each(function(){
                    var name = $(this).attr('iname')
                    var size = $('[name="'+name+'"]').val()  * $('#input_0_4').val() * num * 2
                    $(this).css({
                        width:size+'px',
                        height:size+'px'
                    })
                })
            }

            function standard_div_con(){
                $('#standard_div_con').css({
                    "height":(def_h * num)+'px',
                    "width" :(def_w * num)+'px'
                })
            }

            var norm_method_obj = {
                'height':function(){
                    $('.norm_method').hide()
                    $('.type_height').show()

                    def_w = $('#input_0_4').val() / _h * _w
                    def_h = $('#input_0_4').val()
                    def_c = Math.sqrt(def_w * def_w + def_h * def_h)

                    standard_div_con()
                },
                'width':function(){
                    $('.norm_method').hide()
                    $('.type_width').show()

                    def_w = $('#input_0_4').val()
                    def_h = $('#input_0_4').val() / _w * _h
                    def_c = Math.sqrt(def_w * def_w + def_h * def_h)

                    $('.type_width').find('div').css({
                        left:'0px'
                    })

                    standard_div_con()
                },
                'diagonal':function(){
                    $('.norm_method').hide()
                    $('.type_diagonal').show()

                    def_w = $('#input_0_4').val() / _c * _w
                    def_h = $('#input_0_4').val() / _c * _h

                    standard_div_con()
                },
                'sqrt_area':function(){
                    $('.norm_method').hide()
                    $('.type_width').show()
                    var val = $('#input_0_4').val()

                    def_w = val * 2 / _sqrt * _w
                    def_h = val * 2 / _sqrt * _h
                    $('.type_width').find('div').css({
                        width:(val * num) +'px',
                        left:'50%'
                    })
                    standard_div_con()
                },
                'quar_peri':function(){
                    $('.norm_method').hide()
                    $('.type_width').show()
                    var val = $('#input_0_4').val()

                    def_w = val * 2 / _quar * _w
                    def_h = val * 2 / _quar * _h

                    $('.type_width').find('div').css({
                        width:(val * num) +'px',
                        left:'50%'
                    })
                    standard_div_con()
                },
                'center_point':function(){
                    $('.norm_method').hide()
                    $('.type_center_point').show()
                }
            }

            if(norm_method_obj[$('#sel_0_0').val()]){
                norm_method_obj[$('#sel_0_0').val()]()
            }

            $('body').on('change','#sel_0_0',function(){
                var val = $(this).val()
                norm_method_obj[val]()
            })

            $('.standard_config').each(function(){
                var text= $(this).attr('value')
                $(this).text(text)
            })


            $('body').on('blur','[name="ignore_region_radius_ratio"]',function(){
                var size = $(this).val()
                var max = ($(this).attr('max'))
                var min = ($(this).attr('min'))
                if(size>=min && size<=max){
                    var size = size  * $('#input_0_4').val() * num * 2
                    $('.show_arc').eq(0).css({
                        width:size+'px',
                        height:size+'px'
                    })
                }
            })

            $('body').on('blur','[name="regression_region_radius_ratio"]',function(){
                var size = $(this).val()
                var max = ($(this).attr('max'))
                var min = ($(this).attr('min'))
                if(size>=min && size<=max){
                    var size = size  * $('#input_0_4').val() * num * 2
                    $('.show_arc').eq(1).css({
                        width:size+'px',
                        height:size+'px'
                    })
                }
            })

            $('body').on('blur','[name="positive_region_radius_ratio"]',function(){
                var size = $(this).val()
                var max = ($(this).attr('max'))
                var min = ($(this).attr('min'))
                if(size>=min && size<=max){
                    var size = size  * $('#input_0_4').val() * num * 2
                    $('.show_arc').eq(2).css({
                        width:size+'px',
                        height:size+'px'
                    })
                }
            })

            //感受野宽度
            $('body').on('blur','#input_0_0',function(){
                var size = parseInt($(this).val())
                var max = parseInt($(this).attr('max'))
                var min = parseInt($(this).attr('min'))
                if(size>=min && size<=max){
                    $('#input_0_0_span').text($(this).val())
                    $('#demo_div').css({
                        width:($(this).val() ) +'px'
                    })
                }
            })
            //感受野宽度
            $('body').on('blur','#input_0_1',function(){
                var size = parseInt($(this).val())
                var max = parseInt($(this).attr('max'))
                var min = parseInt($(this).attr('min'))
                if(size>=min && size<=max){
                    $('#input_0_1_span').text($(this).val())
                    $('#demo_div').css({
                        height:($(this).val() ) +'px'
                    })
                }
            })

            //感受野宽度
            $('body').on('blur','#input_0_2',function(){
                var size = parseInt($(this).val())
                var max = parseInt($(this).attr('max'))
                var min = parseInt($(this).attr('min'))
                if(size>=min && size<=max){
                    $('#input_0_2_span').text($(this).val())
                    $('#standard_div').css({
                        width:($(this).val() * num) +'px'
                    })
                    $('#standard_div_sj').css({
                        width:($(this).val() ) +'px'
                    })

                }
            })
            $('body').on('blur','#input_0_3',function(){
                var size = parseInt($(this).val())
                var max = parseInt($(this).attr('max'))
                var min = parseInt($(this).attr('min'))
                if(size>=min && size<=max){
                    $('#input_0_3_span').text($(this).val())
                    $('#standard_div').css({
                        height:($(this).val() * num) +'px'
                    })
                    $('#standard_div_sj').css({
                        height:($(this).val() ) +'px'
                    })
                }
            })

            $('body').on('blur','#input_0_4',function(){
                var size = parseInt($(this).val())
                var max = parseInt($(this).attr('max'))
                var min = parseInt($(this).attr('min'))
                if(size>=min && size<=max){
                    $('#input_0_4_span').text($(this).val())

                    if(norm_method_obj[$('#sel_0_0').val()]){
                        norm_method_obj[$('#sel_0_0').val()]()
                    }
                }
            })

            $("#"+_this.domid).on('keyup','.standard_config',function(){
                var size = $(this).val()
                var domid = $(this).attr('iid')
                var type = $(this).attr('itype')

                var min = parseInt($(this).attr('min'))
                var max = parseInt($(this).attr('max'))
                if(type=='all'){
                    $('#'+domid).css({
                        "height":(size * num)+'px',
                        "width" :(size * num)+'px'
                    })
                }else{
                    if(size>=min && size<=max){
                        var obj = {}
                        if(domid=='demo_div'){
                            obj[type] = (size)+'px'
                        }else{
                            obj[type] = (size * num)+'px'
                        }

                        $('#'+domid).css(obj)
                    }else{
                        alert('输入值必须再'+min+'-'+max)
                    }
                }
            })
        }
    };
    Config.prototype.getData = function(){
        if(this.networkdata){}
        return this.result;
    }

    Config.prototype.getjsonData = function(){
        var result ={};
        var nodes = document.getElementsByClassName('config');
        for(var i=0;i<nodes.length;i++){
            var str ='';
            var name_cn = nodes[i].getAttribute('name_cn');
            if(Class.hasClass(nodes[i],'config-select')){
                var index= nodes[i].selectedIndex;
                var value = nodes[i].options[index].value;
                str = +'^_^'+value+'^_^'+name_cn;
                result[nodes[i].name] = value
            }else if(Class.hasClass(nodes[i],'config-input')){
                str = nodes[i].name +'^_^'+nodes[i].value+'^_^'+name_cn;
                if(nodes[i].getAttribute('itype') == 'number'){
                    result[nodes[i].name] = parseFloat(nodes[i].value)
                }else{
                    result[nodes[i].name] = nodes[i].value
                }
            }
        }
        return result
    }

    w.show_config = function(obj){
        return new Config(obj);
    }
}(window)