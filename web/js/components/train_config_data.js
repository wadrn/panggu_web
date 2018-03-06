function _train_config_data(){
    var html = '<form class="registerform"> ' +
                    '<div style="background: #eee; padding: 10px;">正样本配置</div>'+
                    '<div>' +
                    '</div>'
                    '<div>'+
                        '<div style="width: 20px; height:20px; margin:70px; background: #09f; position: relative; font-size: 12px; display: inline-block; float: left;" id="standard_div">'+
                        '<div style="width: 16px; height: 16px; background: #ffff66; position: absolute; left: 50%; top:50%; transform:translate(-50%,-50%); transform-origin:50% 50%;"  id="standard_div_con"></div>'+
                        '<div style="position: absolute; left: 50%;margin-left: -50px; margin-top: -30px;">宽度： <input type="text" iid="standard_div" itype="width"  min="24" max="72" style="width: 40px; height: 20px; border: 1px solid #ccc; text-align: center" value="40" class="standard_config"/></div>'+
                        '<div style="position: absolute; right: -50px; top: 50%; margin-top: -40px;">高度：<br/>  <input type="text" iid="standard_div" itype="height" min="24" max="72" style="width: 40px; height: 20px; border: 1px solid #ccc;text-align: center" value="40" class="standard_config"/></div>'+
                        '<div style="position: absolute; left: -70px; top: 50%; margin-top: -40px;">标准长度：<br/><input type="text"  iid="standard_div_con"  itype="all" style="width: 40px; height: 20px; border: 1px solid #ccc;text-align: center" value="32" class="standard_config"/></div>'+
                        '</div>'+
                        '<div style="width: 384px; height:256px;  margin:70px; background: #ccc; position: relative; font-size: 12px;  display: inline-block;" id="demo_div">'+
                        '<div style="width: 120px; height: 120px; background: #09f; position: absolute; left: 50%; top:50%; transform:translate(-50%,-50%); transform-origin:50% 50%;" id="demo_div_con"></div>'+
                        '<div style="position: absolute; left: 50%;margin-left: -50px; margin-top: -30px;">样本图像宽度： <input type="text" iid="demo_div" itype="width"  min="128" max="512" style="width: 40px; height: 20px; border: 1px solid #ccc; text-align: center" value="384" class="standard_config"/></div>'+
                        '<div style="position: absolute; right: -90px; top: 50%; margin-top: -40px;">样本图像高度：<br/>  <input type="text" iid="demo_div" itype="height"  min="128" max="512" style="width: 40px; height: 20px; border: 1px solid #ccc;text-align: center" value="256" class="standard_config"/></div>'+
                        '</div>'+
                    '</div>'+
                '</form>'
    $('#config_data').html(html)

    _train_config_init()
}


function _train_config_init(){
    $(".registerform").Validform({
        tiptype:2
    });


    var num  = 3
    standard_init()
    function standard_init(){
        var size = 32
        var size2 = 40
        $('#standard_div_con').css({
            "height":(size * num)+'px',
            "width" :(size * num)+'px'
        })
        $('#standard_div').css({
            "height":(size2 * num)+'px',
            "width" :(size2 * num)+'px'
        })
    }

    $(".registerform").on('keyup','.standard_config',function(){
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








