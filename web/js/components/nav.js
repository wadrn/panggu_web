
!function(w){
    var data = [
        // {
        //     name:'概览',
        //     router:'../html-index/demo.html',
        //     ico:"icon-shiyan",
        //     child:[]
        // },
        {
            name:'训练',
            router:'../html-train/index.html',
            ico:"icon-train",
			mid: 0,
            child:[
                // {
                //     name:'训练管理',
                //     router:'../html-train/index.html',
                //
                // },
                // {
                //     name:'训练详情',
                //     router:'../html-train/evaluate_detail.html',
                // },
                // {
                //     name:'新建训练',
                //     router:'#',
                //     click:'g_add_task()'
                // }
            ]
        },
        // {
        //     name:'标注',
        //     router:'../html-annotate/index.html',
        //     ico:"icon-biaozhu",
        //     child:[
        //         // {
        //         //     name:'标注管理',
        //         //     router:'#'
        //         // },
        //         // {
        //         //     name:'新建标注',
        //         //     router:'#'
        //         // }
        //     ]
        // },
        {
            name:'数据',
            router:'javascript:;',
            ico:"icon-data1",
			mid: 1,
            child:[
                {
                    name:'地平线开放数据',
                    router:'../html-data/index.html'
                },
                {
                    name:'用户上传数据',
                    router:'../html-data/mydata.html'
                }
            ]
        },
        {
            name:'模型',
            router:'../html-model/index.html',
            ico:"icon-module",
			mid: 2,
            child:[
            ]
        },
        {
            name:'编译',
            router:'../html-compile/index.html',
            ico:"icon-shiyan",
			mid: 3,
            child:[
            ]
        },
        {
            name:'用户',
            router:'../html-user/user_list.html',
            ico:"icon-yonghu1",
			mid: 4,
            child:[
                // {
                //     name:'用户管理',
                //     router:'#'
                // },
                // {
                //     name:'用户组管理',
                //     router:'#'
                // },
                // {
                //     name:'批量创建用户',
                //     router:'#',
                //     click: 'add_users()'
                // }
            ]
        }
    ]
	
	var u_data = [
		{
            name:'账号设置',
            router:'../html-user/mycenter.html',
        },
		{
            name:'密码修改',
            router:'../html-user/updateinfo.html'
        },
		/*{
            name:'用户管理',
            router:'javascript:;'
        },*/
		{
            name:'退出登录',
            router:'logout'
        },
	]

    function htmlnav(oname,tname){
        var ohtml = '';
        for(var i in data){
			var active = oname == data[i].name? "active": "";
			var show = oname == data[i].name? 1:0;
			var show_child_flag = oname == data[i].name? true: false;
			if(!data[i].child){
                data[i].child = []
            }

			var onclick_htm = data[i].child.length != 0? "onclick='expand_child("+data[i].mid+")'": "";
			var icon_down = (data[i].child.length !=0 && oname == data[i].name)? "icon-down": "icon-down2"
			ohtml += '<div class="menu_item" style="position: relative;"><a show='+show+' mid='+data[i].mid+' '+onclick_htm+' href="'+data[i].router+'" class="nav_one '+active+'" oname="'+data[i].name+'" tname="'+tname+'">'+
						'<i class="iconfont '+data[i].ico+'"></i>'+
						'<span style="vertical-align: 3px;">'+data[i].name+'</span>'+
						'<i class="iconfont '+icon_down+'" style="float: right; right: 10px; position:relative; cursor: pointer;"></i>'+
					 '</a>'+gen_expand_html(data[i].mid,show_child_flag,tname)+'</div>'
        }
        return {
            ohtml:ohtml
        }
    }
	function gen_expand_html(mid,flag,tname){
		for(var i=0;i<data.length;i++){
			if(data[i].mid == mid){
				key = i;
			}
		}
		var child = data[key].child;
		var expand_html = "";
		var display = flag? "":"display:none;";
		for(var i=0;i<child.length;i++){
			var active = tname == child[i].name? "active": "";
			expand_html += '<a href="'+child[i].router+'" style="'+display+' text-align: center;" class="nav_one child '+active+'" oname="" tname=""><i class="iconfont"></i><span style="vertical-align: 3px; margin-left:0px;">'+child[i].name+'</span></a>'	
		}
		return expand_html;
	}

    function renderhtml(obj){
        var datahtml = htmlnav(obj.oname,obj.tname)
        var hide = ''
        if(obj.ishide){
            hide = 'display:none'
        }
        var html =  '<div style="position: absolute; width: 100%; height: 60px; border:1px solid rgba(151,151,151,.2); border-right-width: 0;border-left-width: 0;background: #fff;">'+
					'<div id="uname_block" tabindex="0" style="width: 146px;float: right; font-size: 12px;position: relative;text-align: center; line-height: 60px; cursor: pointer;"><span style="background:#d8d8d8;border-radius: 50%;display: inline-block;height: 30px;width: 30px;vertical-align: middle; margin-right: 10px;"><i style="position: relative;top: -14px;font-size: 20px; color: #008CD6;" class="iconfont icon-dipingxianlanseLOGO"></i></span><span id="username"></span></div>'+
					gen_u_html()+
					'</div>'+
					'<div class="_main_con_1">'+
                        '<div class="top_nav">'+
                            '<div class="logo">'+
                            '<i class="iconfont icon-dipingxianlanseLOGO"></i>'+
                            '</div>'+
                            '<div class="one_nav">'+
                                 datahtml.ohtml +
                            '</div>'+
                        '</div>'+

                        '<div class="bottom_nav">'+
                            '<div class="one_nav">'+
                                /*'<a class="nav_one" href="../html-user/mycenter.html" id="_myname">'+
                                    '<i class="iconfont icon-yonghu"></i>'+
                                    '<span id="username">用户名</span>'+
									'<i class="iconfont icon-down2"></i>'+
                                '</a>'+*/
                                '<a class="nav_one" href="#" id="_myhelp" style="border-top: 2px solid #f5f5f5">'+
                                    '<i class="iconfont icon-bangzhu"></i>'+
                                    '<span style="vertical-align: 3px;">帮助</span>'+
									'<i class="iconfont icon-down2" style="float: right; right: 10px; position:relative; cursor: pointer;"></i>'+
                                '</a>'+
                                '<a class="nav_one" href="#" id="_myfeedback">'+
                                    '<i class="iconfont icon-fankui"></i>'+
                                    '<span style="vertical-align: 3px;">反馈</span>'+
									'<i class="iconfont icon-down2" style="float: right; right: 10px; position:relative; cursor: pointer;"></i>'+
                                '</a>'+
                            '</div>'+
                        '</div>'+
                    '</div>'
                    // '<div class="_main_con_2" id="_bar_con" style="left:60px '+hide+'">'+
                    // '    <div class="_mc_con">'+
                    // '        <div class="nav_t_list" id="nav_two" style="display: none;">'+
                    //             datahtml.thtml +
                    // '        </div>'
                    // '    </div>'+
                    // '    <div class="showhide_bar" id="showhide_bar" onclick="showhide_bar()">'+
                    // '        <i class="iconfont icon-down2"></i>'+
                    // '    </div>'+
                    // ' </div>'

        document.getElementById('_nav').innerHTML = html
        if(document.getElementById('_r_title')){
            document.getElementById('_r_title').innerHTML = obj.tname
        }

        if(obj.call){
            obj.call()
        }
    }

	function gen_u_html(){
		var html = ""
		html += '<div style="position: absolute;right: 0;top: 60px;z-index: 99;width: 146px; background: #fff; border: 1px solid rgba(151,151,151,.2);display:none;" id="u_menu">';
		for(var i=0;i< u_data.length;i++){		
			html += '<div class="u_item" style="padding: 15px; text-align: center;border-bottom: 1px solid rgba(151,151,151,.2);font-size: 12px;" router="'+u_data[i].router+'">'+u_data[i].name+'</div>'
		}
		html += '</div>';
		return html;
	}

    function eventinit(){
		$('body').on('mouseenter','#uname_block',function(e){
            $(this).css("background","rgba(0,140,214,.05)")
			$("#u_menu").slideDown('normal')
			$(this).attr("enter","1");
        });
		$('body').on('mouseleave','#uname_block',function(e){
			$(this).attr("enter","0");
        });
		$('body').on('click',function(e){
            $("#uname_block").css("background","#fff")
			$("#u_menu").slideUp('normal')
        });
		$('body').on('mouseleave','#u_menu',function(e){
            $("#uname_block").css("background","#fff")
			setTimeout(function(){
				if($("#uname_block").attr("enter") != "1"){
					$("#u_menu").slideUp('normal')
				}
			},50)
        });
        $('body').on('mouseover','.nav_one:not(.child)',function(e){
            $(this).addClass("left")
        });
        $('body').on('mouseout','.nav_one:not(.child)',function(e){
            $(this).removeClass("left")
        });
		$('body').on('click','.u_item',function(e){
			var router = $(this).attr("router");
			if(router == "logout"){
				cookie.delCookie('_user_name')
				var url = interface.user.logout
				$.ajax({
					async: false,
					type: "get",
					url: url,
					success: function(data){
						window.location.href = '/static/web/html-user/login.html'
					},
					error: function(){
						window.location.href = '/static/web/html-user/login.html'
					}
				});
			}
			else{
				location.href = router;
			}
        });
    }

    function shownav(obj){
        var url = interface.user.permissionnav
        $.ajax({
            url:url,
            type:"get",
            dataType:'json',
            success:function(response){
                data = response;
                _obj = obj
                renderhtml(_obj)
                getUserName();
                eventinit();
            }
        })
    }

    function getUserName(){
		var user_name = cookie.getCookie('_user_name') || '用户名';
		if(user_name.length > 9){
			user_name = user_name.substr(0,6)+"..."
		}
        document.getElementById('username').innerHTML = user_name
        document.getElementById('username').style.fontSize ='12px'
    }
	
	function expand_child(mid){
		if($("a[mid="+mid+"]").attr("show") != 1){
			$("a[mid="+mid+"]").attr("show",1)
			$("a[mid="+mid+"] .icon-down2").removeClass("icon-down2").addClass("icon-down")
			$("a[mid="+mid+"]").siblings('a').show();
		}
		else{
			$("a[mid="+mid+"]").attr("show",0)
			$("a[mid="+mid+"] .icon-down").removeClass("icon-down").addClass("icon-down2")
			$("a[mid="+mid+"]").siblings('a').hide();
		}
	}
    // function showhide_bar(){
    //     var _bar_con = document.getElementById('_bar_con')
    //     var barleft = _bar_con.style.left
    //     if(barleft == '60px'){
    //         _bar_con.style.left = '-140px'
    //         if(document.getElementById('_data_con')){
    //             document.getElementById('_data_con').style.left = '60px'
    //         }
    //         if(document.getElementById('_main_con_3')){
    //             document.getElementById('_main_con_3').style.left = '60px'
    //         }
    //
    //
    //     }else{
    //         _bar_con.style.left = '60px'
    //         if(document.getElementById('_data_con')){
    //             document.getElementById('_data_con').style.left = '260px'
    //         }
    //         if(document.getElementById('_main_con_3')){
    //             document.getElementById('_main_con_3').style.left = '260px'
    //         }
    //     }
    // }


    ///user/userinfo/
    w.showhide_bar = showhide_bar
	w.expand_child = expand_child
    w.shownav = shownav

}(window)
