export default [{
    name: '中心简介', // editor
    route: 'center',
    type: 'home',
    subMenu: [{
        name: '中心概况',
        route: 'center_intro',
    },{
        name: '法律地位',
        route: 'center_law',
    },{
        name: '授权证书',
        route: 'center_certificate',
    },{
        name: '重点设备',
        route: 'center_facility',
    },{
        name: '地理位置',
        route: 'center_address',
    }]
},{
    name: '通知公告', // editor
    route: 'notification',
    type: 'notification',
    canAddArticle: true,
},{
    name: '图片新闻', // editor
    route: 'imgNews',
    type: 'picture',
    canAddArticle: true,
},{
    name: '法律法规', // editor
    route: 'law',
    type: 'safety',
    canAddArticle: true,
},{
    name: '新闻动态', // editor
    route: 'trends',
    type: 'to-top',
    canAddArticle: true,
},{
    name: '认证专栏', // editor
    route: 'certificate',
    type: 'idcard',
    canAddArticle: true,
},{
    name: '合同预签', // editor
    route: 'contract_presign',
    type: 'file-ppt',
    canAddArticle: true,
},{
    name: '社会责任报告', // editor
    route: 'social_report',
    type: 'global',
    canAddArticle: true,
},{
    name: '文件下载', // editor
    route: 'file_download',
    type: 'file-ppt',
    canAddArticle: true,
},{
    name: '检验范围', // editor
    route: 'inspect',
    type: 'appstore',
    subMenu: [{
        name: '火灾报警产品',
        route: 'inspect_119'
    },{
        name: '火灾防护产品',
        route: 'inspect_protect'
    },{
        name: '灭火设备产品',
        route: 'inspect_outfire'
    },{
        name: '消防装备产品',
        route: 'inspect_equipment'
    },{
        name: '非3C认证产品',
        route: 'inspect_3c'
    }]
},{
    name: '技术委员会',
    route: 'committee',
    type: 'team',
    subMenu: [{
        name: '一分委',
        route: 'one',
        type: 'team',
        subMenu: [{
            name: '分委简介', // editor
            route: 'one_desc'
        // },{
        //     name: '留言专区', // blank
        //     route: 'one_message'
        // },{
        //     name: '下载专区', // list
        //     route: 'one_download'
        },{
            name: '联系我们', // editor
            route: 'one_contact'
        },{
            name: '目前管理的标准', // editor
            route: 'one_currentStandard'
        },{
            name: '制修订中的标准', // editor
            route: 'one_modifyStandard'
        },{
            name: '工作动态', // list
            route: 'one_work'
        }]
    },{
        name: '二分委',
        route: 'two',
        type: 'team',
        subMenu: [{
            name: '分委简介', // editor
            route: 'two_desc'
        // },{
        //     name: '留言专区', // blank
        //     route: 'two_message'
        // },{
        //     name: '下载专区', // list
        //     route: 'two_download'
        },{
            name: '联系我们', // editor
            route: 'two_contact'
        },{
            name: '目前管理的标准', // editor
            route: 'two_currentStandard'
        },{
            name: '制修订中的标准', // editor
            route: 'two_modifyStandard'
        },{
            name: '工作动态', // list
            route: 'two_work'
        }]
    },{
        name: '三分委',
        route: 'three',
        type: 'team',
        subMenu: [{
            name: '分委简介', // editor
            route: 'three_desc'
        // },{
        //     name: '留言专区', // blank
        //     route: 'three_message'
        // },{
        //     name: '下载专区', // list
        //     route: 'three_download'
        },{
            name: '联系我们', // editor
            route: 'three_contact'
        },{
            name: '目前管理的标准', // editor
            route: 'three_currentStandard'
        },{
            name: '制修订中的标准', // editor
            route: 'three_modifyStandard'
        },{
            name: '工作动态', // list
            route: 'three_work'
        }]
    },{
        name: '八分委',
        route: 'eight',
        type: 'team',
        subMenu: [{
            name: '分委简介', // editor
            route: 'eight_desc'
        // },{
        //     name: '留言专区', // blank
        //     route: 'eight_message'
        // },{
        //     name: '下载专区', // list
        //     route: 'eight_download'
        },{
            name: '联系我们', // editor
            route: 'eight_contact'
        },{
            name: '目前管理的标准', // editor
            route: 'eight_currentStandard'
        },{
            name: '制修订中的标准', // editor
            route: 'eight_modifyStandard'
        },{
            name: '工作动态', // list
            route: 'eight_work'
        }]
    },{
        name: 'ISO/TC21/SC6',
        route: 'iso',
        type: 'team',
        subMenu: [{
            name: '分委简介', // editor
            route: 'iso_desc'
        // },{
        //     name: '留言专区', // blank
        //     route: 'iso_message'
        // },{
        //     name: '下载专区', // list
        //     route: 'iso_download'
        },{
            name: '联系我们', // editor
            route: 'iso_contact'
        },{
            name: '目前管理的标准', // editor
            route: 'iso_currentStandard'
        },{
            name: '制修订中的标准', // editor
            route: 'iso_modifyStandard'
        },{
            name: '工作动态', // list
            route: 'iso_work'
        }]
    },{
        name: '技术委员会账号管理',
        route: 'btcm',
        subMenu: [{
            name: '所有账户',
            route: 'btcm_all'
        },{
            name: '添加账户',
            route: 'btcm_regist'
        }]
    }]
},{
    name: '文章管理',
    route: 'article',
    type: 'file-text',
    subMenu: [{
        name: '所有文章',
        route: 'article_all'
    },{
        name: '新增文章',
        route: 'article_add'
    }]
// },{
//     name: '版块管理',
//     route: 'category',
//     type: 'folder',
//     subMenu: [{
//         name: '所有版块', // list 名称，简要说明，编辑，删除
//         route: 'category_all'
//     },{
//         name: '新增版块', // form
//         route: 'category_add'
//     }]
},{
    name: '公众留言',
    route: 'message',
    type: 'message',
},{
    name: '后台用户管理',
    route: 'admin',
    type: 'user',
    subMenu: [{
        name: '所有管理员',
        route: 'admin_all'
    },{
        name: '注册管理员',
        route: 'admin_regist'
    }]
},{
    name: '检验报告管理',
    route: 'report',
    type: 'copy',
    subMenu: [{
        name: '数据导入',
        route: 'report_import'
    // },{
    //     name: '图片上传',
    //     route: 'report_upload'
    // },{
    //     name: '报告列表',
    //     route: 'report_list'
    }]
}]
