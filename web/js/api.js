var param = '?';
var sys = '/trainsys';

function Api(api) {
    return sys+api+param;
}
var interface = {
    user: {
        create: sys + '/user/create/' + param,
        delete: sys + '/user/delete/' + param,
        list: sys + '/user/list/' + param,
        login: sys + '/home/login/' + param,
        logout: sys + '/user/logout/' + param,
        register: sys + '/user/register/' + param,
        resetpwd: sys + '/user/resetpwd/' + param,
        updateinfo: sys + '/user/updateinfo/' + param,
        findpwd: sys + '/user/findpwd/' + param,
        userinfo: sys + '/user/userinfo/' + param,
        userdelete: sys + '/user/delete/' + param,


        permissionview: sys + '/user/permission/view/' + param,
        permissioncreate: sys + '/user/permission/create/' + param,
        permissionfront: sys + '/user/permission/front/' + param,
        permissionlist: sys + '/user/permission/list/' + param,
        permissionupdate: sys + '/user/permission/update/' + param,

        permissionnav:Api('/user/permission/page/control/')
    },
    data: {
        /*结果数据api*/
        reslist: sys + '/data/res/view/' + param,
        resdelete: sys + '/data/res/del/' + param,
        resvision: sys + '/data/res/vision/' + param,
        resupload: sys + '/data/res/upload/' + param,
        resdetail: sys + '/data/res/attrdist/' + param,

        /*原始数据api*/
        rawlist: sys + '/data/raw/view/' + param,
        upload: sys + '/data/raw/upload/' + param,
        rawedit: sys + '/data/raw/edit/' + param,
        rawdelete: sys + '/data/raw/del/' + param,
        rawvision: sys + '/data/raw/vision/' + param,

        upload_progress:sys + '/data/raw/upload/progress/'+param,
        /*搜索条件api*/
        tags: sys + '/data/tag/view/' + param,
        attrs: sys + '/data/items/attrs/' + param,

        // 业务项目组
        firm_view: Api('/data/firm/view/'),

        isresexist:Api('/data/res/exist')

    },
    train: {
        /*训练任务列表*/
        task_list: sys + '/train/task/task_list/' + param,
        name_update: sys + '/train/task/name_update/' + param,
        search: sys + '/train/task/list/' + param,
        cate_list: sys + '/train/cate/cate_list/' + param,
        task_del_status_update: Api('/train/task/task_del_status_update/'),


        create: Api('/train/task/create/'),
        detail: Api('/train/task/detail/'),
        update: Api('/train/task/update/'),
        model_list: Api('/train/cate/list/'),
        del: Api('/train/task/del/'),
        visual: Api('/train/task/visual/'),

        /*训练过程*/
        data_bind: sys + '/train/data/data_update/' + param,
        model_bind: sys + '/train/cate/cate_update/' + param,
        show_model_config: Api('/train/model/model_config_show/'),
        model_config_update: Api('/train/model/model_config_update/'),
        show_data_config: Api('/train/data/data_config_show/'),
        data_config_update: Api('/train/data/data_config_update/'),
        task_start:Api('/train/task/start/'),
        task_info:Api('/train/task/task_info'),

        /*获取epoch*/
        // epoch_info:Api('/train/judge/epoch_info/'),
        epoch_info:Api('/train/task/judge/'),

        // judge_info:Api('/train/judge/judge_info/'),


        /*评测图表api*/
        // judge_curve: Api('/train/judge/compare_judge_curve/'),
        // judge_curve_line:Api('/train/judge/epoch_curve/'),
        // judge_curve_column:Api('/train/judge/columns_curve/'),
        // judge_curve_binary:Api('/train/judge/binary_curve/'),

        judge_curve:Api('/train/judge/compare/'),
        judge_curve_line:Api('/train/judge/epoch/'),
        judge_curve_column:Api('/train/judge/column/'),
        judge_curve_binary:Api('/train/judge/binary/'),


        /*评测配置参数、结果*/
        // judge_result:Api('/train/judge/judge_result/'),
        // judge_option:Api('/train/judge/judge_option/'),

        judge_start:Api('/train/judge/judge/'),   //新建评测任务
        // judge_image_list:Api('/train/judge/judge_image_list/'),




        judge_image_list:Api('/train/judge/image/'),
        judge_option:Api('/train/judge/option/'),
        judge_result:Api('/train/judge/result/'),




        // image_search:Api('/train/judge/image_search/'),

        image_search:Api('/train/judge/scan/'),

        task_kill:Api('/train/task/kill/'),

        monitor_status_show:Api('/train/monitor/monitor_status_show/'),
        judge_tboard:Api('/train/judge/tborad/'),

        judge_tboard_curve:Api('/train/judge/judge_tboard_curve/')

    },
    model: {
        upload_model:Api('/model/upload/'),
        save_model:Api('/model/save/'),
        del_model:Api('/model/delete/'),
        collect_model:Api('/model/gather/'),
        list:Api('/model/list/'),
        update_model:Api('/model/update/')
    }

}