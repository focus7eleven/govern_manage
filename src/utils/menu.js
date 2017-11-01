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
    name: '授权范围', // editor
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
    name: '一分委',
    route: 'one',
    type: 'appstore',
    subMenu: [{
        name: '分委简介', // editor
        route: 'one_desc'
    },{
        name: '留言专区', // blank
        route: 'one_message'
    },{
        name: '下载专区', // list
        route: 'one_download'
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
    type: 'appstore',
    subMenu: [{
        name: '分委简介', // editor
        route: 'two_desc'
    },{
        name: '留言专区', // blank
        route: 'two_message'
    },{
        name: '下载专区', // list
        route: 'two_download'
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
    type: 'appstore',
    subMenu: [{
        name: '分委简介', // editor
        route: 'three_desc'
    },{
        name: '留言专区', // blank
        route: 'three_message'
    },{
        name: '下载专区', // list
        route: 'three_download'
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
    type: 'appstore',
    subMenu: [{
        name: '分委简介', // editor
        route: 'eight_desc'
    },{
        name: '留言专区', // blank
        route: 'eight_message'
    },{
        name: '下载专区', // list
        route: 'eight_download'
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
    type: 'appstore',
    subMenu: [{
        name: '分委简介', // editor
        route: 'iso_desc'
    },{
        name: '留言专区', // blank
        route: 'iso_message'
    },{
        name: '下载专区', // list
        route: 'iso_download'
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
    name: '文章管理',
    route: 'article',
    type: 'appstore',
    subMenu: [{
        name: '所有文章',
        route: 'article_all'
    },{
        name: '新增文章',
        route: 'article_add'
    }]
},{
    name: '版块管理',
    route: 'category',
    type: 'appstore',
    subMenu: [{
        name: '所有版块', // list 名称，简要说明，编辑，删除
        route: 'category_all'
    },{
        name: '新增版块', // form
        route: 'category_add'
    }]
}]
