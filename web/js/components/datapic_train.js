!function(w){
    var _data_ksh_pic = []
    function html(id){
        var html = ''
            html += '<div style="background: #eee; padding: 10px;">Region Proposal stage 示例<a href="javascript:;" id="show_ksh_btn">查看样本示例</a></div>'
            html += '<div style="padding:10px; display: none" id="show_ksh_con">'
                html += '<div style="margin-bottom: 10px;"><a href="javascript:;" class="v btn ksh_type_btn blue">Region Proposal stage</a><a href="javascript:;" class="v btn ksh_type_btn">CNN后验证stage</a></div>'

                html += '<div>'

                html += '<div class="ksh_cont_ten">'
                        html += '<div style="margin-bottom: 10px;"><a href="javascript:;" class="v btn cnn_nextpic green" type="0">换一张</a></div>'
                        html += '<div><img src="http://10.19.19.23:8100/tmp/57/buf/ftp/10035/compress_road-002_transcode.mp4__00000000.jpg" style="width: 400px;" alt=""></div>'

                        html += '<div style="margin-bottom: 20px;">' +
                                    '<div style="background: #eee; padding: 10px; margin-bottom: 10px">正样本示例 </div>'+
                                    '<img src="http://10.19.19.23:8100/tmp/57/buf/ftp/10035/compress_road-002_transcode.mp4__00000000.jpg" style="width: 150px;" alt="">' +
                                    '<img src="http://10.19.19.23:8100/tmp/57/buf/ftp/10035/compress_road-002_transcode.mp4__00000000.jpg" style="width: 150px;" alt="">' +
                                    '<img src="http://10.19.19.23:8100/tmp/57/buf/ftp/10035/compress_road-002_transcode.mp4__00000000.jpg" style="width: 150px;" alt="">' +
                                '</div>'

                        html += '<div>' +
                                    '<div style="background: #eee; padding: 10px; margin-bottom: 10px">负样本示例 </div>'+
                                    '<img src="http://10.19.19.23:8100/tmp/57/buf/ftp/10035/compress_road-002_transcode.mp4__00000000.jpg" style="width: 150px;" alt="">' +
                                    '<img src="http://10.19.19.23:8100/tmp/57/buf/ftp/10035/compress_road-002_transcode.mp4__00000000.jpg" style="width: 150px;" alt="">' +
                                    '<img src="http://10.19.19.23:8100/tmp/57/buf/ftp/10035/compress_road-002_transcode.mp4__00000000.jpg" style="width: 150px;" alt="">' +
                                '</div>'

                        html += '<div>' +
                                    '<div style="background: #eee; padding: 10px; margin-bottom: 10px">忽略样本示例 </div>'+
                                    '<img src="http://10.19.19.23:8100/tmp/57/buf/ftp/10035/compress_road-002_transcode.mp4__00000000.jpg" style="width: 150px;" alt="">' +
                                    '<img src="http://10.19.19.23:8100/tmp/57/buf/ftp/10035/compress_road-002_transcode.mp4__00000000.jpg" style="width: 150px;" alt="">' +
                                    '<img src="http://10.19.19.23:8100/tmp/57/buf/ftp/10035/compress_road-002_transcode.mp4__00000000.jpg" style="width: 150px;" alt="">' +
                                '</div>'

                        html += '</div>'
                        html += '<div class="ksh_cont_ten" style="display: none">'
                            html += '<div style="margin-bottom: 10px;"><a href="javascript:;" class="v btn cnn_nextpic green"  type="1">换一张</a></div>'
                            html += '<div id="__cnnstage"></div>'
                        html += '</div>'
                    html += '</div>'

                    html += '</div>'

        $('#'+id).html(html)
        getkshimg()
    }

    $('body').on('click','#show_ksh_btn',function(){
        $('#show_ksh_con').show()
    })

    $('body').on('click','.ksh_type_btn',function(){
        var index = $(this).index()
         $('.ksh_type_btn').removeClass('blue')
         $(this).addClass('blue')

        $('.ksh_cont_ten').eq(index).show().siblings().hide()
        ksh_cn(index)
    })

    $('body').on('click','.cnn_nextpic',function(){
        var i = $(this).attr('itype')
        ksh_cn(i)
    })


    function getkshimg(){
        var url = interface.data.resvision
        var arr = []
        var data =  g_taskdata.data_val.train_data.split(',')
        for(var i in data){
            var iarr = data[i].split('|')
            arr.push(iarr[2])
        }
        var data = 'id='+JSON.stringify(arr)+'&limit=10&offset=0'
        ajaxpost(url,data,function(data){
            _data_ksh_pic = data.data[0].detail.content
            //ksh_cn()
        })
    }

    function ksh_cn(i){
        var num = GetRandomNum(0,8)
        if(i == 0){

        }else{
            var idata = _data_ksh_pic[num]
            var data = 'id='+urlfun.getquery('id') +'&url=' + idata.img.major.url +'&result='+JSON.stringify(idata.img.result) +'&post=1'
            var url = interface.train.visual + data
            //var url = 'http://10.19.19.23:8500/trainsys/train/task/visual/?id=1&url=http://10.19.19.23:8100/tmp/GAKK-0004%E5%8D%97%E7%8E%AF%E8%B7%AF%E9%AD%8F%E9%83%BD%E5%A4%A7%E9%81%93-%E5%8D%A1%E5%8F%A3198017_352021980170101_2017_01_01_19_58_53_2.avi__00000000.jpg&result={%22vehicle%22:[{%22data%22:[1067.308,900.782,1713.514,1078.154],%22attrs%22:{%22type%22:%22SUV%22,%22occlusion%22:%22heavily_occluded%22,%22ignore%22:%22no%22,%22hard_sample%22:%22no%22},%22id%22:1,%22track_id%22:-1,%22struct_type%22:%22rect%22},{%22data%22:[1136.207,265.597,1764.996,953.394],%22attrs%22:{%22type%22:%22SUV%22,%22occlusion%22:%22heavily_occluded%22,%22ignore%22:%22no%22,%22hard_sample%22:%22no%22},%22id%22:2,%22track_id%22:-1,%22struct_type%22:%22rect%22},{%22data%22:[1133.82,13.691,1576.897,419.28],%22attrs%22:{%22type%22:%22Sedan_Car%22,%22occlusion%22:%22heavily_occluded%22,%22ignore%22:%22no%22,%22hard_sample%22:%22no%22},%22id%22:3,%22track_id%22:-1,%22struct_type%22:%22rect%22},{%22data%22:[1770.609,0,1918.538,277.594],%22attrs%22:{%22type%22:%22Sedan_Car%22,%22occlusion%22:%22heavily_occluded%22,%22ignore%22:%22no%22,%22hard_sample%22:%22no%22},%22id%22:5,%22track_id%22:-1,%22struct_type%22:%22rect%22},{%22data%22:[373.962,2,948.816,479.196],%22attrs%22:{%22type%22:%22Sedan_Car%22,%22occlusion%22:%22occluded%22,%22ignore%22:%22no%22,%22hard_sample%22:%22no%22},%22id%22:7,%22track_id%22:-1,%22struct_type%22:%22rect%22}],%22image_key%22:%22GAKK-0004\u5357\u73af\u8def\u9b4f\u90fd\u5927\u9053-\u5361\u53e3198017_352021980170101_2017_01_01_19_58_53_2.avi__00000000.jpg%22,%22video_name%22:%221%22,%22video_index%22:0,%22height%22:1080,%22width%22:1920}&post=1'
            var html = '<div>'
                html += '<p>可视化图片</p>'
                html += '<img src="'+idata.img.major.url+'" width="380"/>'
                html += '</div>'
            $('#__cnnstage').html(html)
            ajaxget(url,function(data){
                if(data.error == 0){
                    var html = '<div>'
                    html += '<p>结果图片</p>'
                    for(var i in data.data){
                        html += '<img src="'+data.data[i]+'" />'
                    }
                    html += '</div>'
                    $('#__cnnstage').append(html)
                }else{
                    alert(data.msg)
                }
            })
        }
    }

    function GetRandomNum(Min,Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return(Min + Math.round(Rand * Range));
    }

    w.datapic_train = html


}(window)
