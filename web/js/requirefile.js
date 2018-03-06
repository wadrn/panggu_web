!function(){
    var url = '/static/web'
    var jsdata = [
        '/js/lib/jquery-1.9.0.js',
        '/js/lib/highcharts.js',
        '/js/lib/echarts.js',
        '/js/lib/jquery.validationEngine-zh_CN.js',
        '/js/lib/jquery.validationEngine.js',

        '/js/util/event.js',
        '/js/util/util.js',
        '/js/util/time.js',
        '/js/util/cookie.js',
        '/js/util/urlfun.js',

        '/js/api.js',
        '/js/main.js',
        '/js/status.js',

        '/js/components/nav.js',
        '/js/components/page.js',
        '/js/components/data_list.js',
        '/js/components/data_form_html.js',
        '/js/components/tool_popup.js',
        '/js/components/svgdata.js',
        '/js/components/svgdata_btn.js',
        '/js/components/img_preview.js',
        '/js/components/tool_alert.js',
        '/js/components/chart.js',
        '/js/components/attr_tree.js',
        '/js/components/add_data_label.js',
        '/js/components/select_data.js',
        '/js/components/data_detail.js',
        '/js/components/train_config_data.js',
        '/js/components/train_sel_data.js',
        '/js/components/train_sel_model.js',
        '/js/components/train_m_con.js',
        '/js/components/network.js',
        '/js/components/show_config.js',
        '/js/components/diagram.js',
        '/js/components/model_list.js',
        '/js/components/datapic_train.js',
        '/js/components/demo_list.js',
        '/js/components/fullscreen.js',
        '/js/components/monitor_chart.js',
		'/js/components/datepicker.js',
		'/js/components/workflow.js',
        '/js/components/tboard.js'
    ]
    var html = document.getElementsByTagName('head')[0];

    function addscript(){
        for(var i in jsdata){
            var script  = document.createElement('script')
            script.type = 'text/javascript'
            //script.async=  true
            script.defer=  true
            script.src  =  jsdata[i]
            html.appendChild(script)
        }
    }

    function writescript(){
        for(var i in jsdata){
            var script  = '<script type="text/javascript" src="'+(url+jsdata[i])+'"></script>'
            document.write(script)
        }
    }

    writescript()
}()
