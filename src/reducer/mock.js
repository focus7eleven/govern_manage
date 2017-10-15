import { Map, List } from 'immutable'

const initialState = Map({
    breadthumb: List([{
        name: '中心首页',
        path: '/'
    },{
        name: '行业动态',
        path: '/'
    },{
        name: '文章列表',
        path: '/'
    }]),
    articleList: List([{
        title: '我质检中心2014年参加能力验证取得满意结果',
        preview: '2014年5月，我质检中心参加了由CNCA（国家认证认可监督管理委员会）组织的CNCA-14-B17“50W垂直火焰试验”能力验证。该项能力验证计划由CNCA委托威凯检测技术有限公司负责实施。',
        time: '2015-01-19'
    },{
        title: '我质检中心2014年参加能力验证取得满意结果',
        preview: '2014年5月，我质检中心参加了由CNCA（国家认证认可监督管理委员会）组织的CNCA-14-B17“50W垂直火焰试验”能力验证。该项能力验证计划由CNCA委托威凯检测技术有限公司负责实施。',
        time: '2015-01-19'
    },{
        title: '我质检中心2014年参加能力验证取得满意结果',
        preview: '2014年5月，我质检中心参加了由CNCA（国家认证认可监督管理委员会）组织的CNCA-14-B17“50W垂直火焰试验”能力验证。该项能力验证计划由CNCA委托威凯检测技术有限公司负责实施。',
        time: '2015-01-19'
    },{
        title: '我质检中心2014年参加能力验证取得满意结果',
        preview: '2014年5月，我质检中心参加了由CNCA（国家认证认可监督管理委员会）组织的CNCA-14-B17“50W垂直火焰试验”能力验证。该项能力验证计划由CNCA委托威凯检测技术有限公司负责实施。',
        time: '2015-01-19'
    },{
        title: '我质检中心2014年参加能力验证取得满意结果',
        preview: '2014年5月，我质检中心参加了由CNCA（国家认证认可监督管理委员会）组织的CNCA-14-B17“50W垂直火焰试验”能力验证。该项能力验证计划由CNCA委托威凯检测技术有限公司负责实施。',
        time: '2015-01-19'
    },{
        title: '我质检中心2014年参加能力验证取得满意结果',
        preview: '2014年5月，我质检中心参加了由CNCA（国家认证认可监督管理委员会）组织的CNCA-14-B17“50W垂直火焰试验”能力验证。该项能力验证计划由CNCA委托威凯检测技术有限公司负责实施。',
        time: '2015-01-19'
    }])
})

const mock = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_BREADTHUMB':
            return state.set('breadthumb', action.payload.breadthumb)
    default:
        return state
    }
}

export default mock 
