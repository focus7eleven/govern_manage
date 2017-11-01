import React from 'react'
import Bundle from './components/common/Bundle'
import LoginControlHOC from './containers/AccessControlContainer'
import BaseContainer from './containers/BaseContainer'
import LoginContainer from './containers/user/LoginContainer'
import HomeContainer from 'bundle-loader?lazy!./containers/home/HomeContainer'
import CenterIntroContainer from 'bundle-loader?lazy!./containers/center/CenterIntroContainer'
import AddArticleContainer from 'bundle-loader?lazy!./containers/article/AddArticleContainer'
import AllArticleContainer from 'bundle-loader?lazy!./containers/article/AllArticleContainer'
import AllCategoryContainer from 'bundle-loader?lazy!./containers/category/AllCategoryContainer'

const Loading = () => (<div>Loading...</div>)

const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Comp) => (Comp ? <Comp {...props}/> : <Loading />)
        }
    </Bundle>
)

const routes = [
    {
        path: '/login',
        exact: true,
        component: LoginContainer,
    },
    {
        path: '/index',
        component: LoginControlHOC(BaseContainer),
        routes: [
            {
                path: '/index',
                exact: true,
                name: '首页',
                component: createComponent(HomeContainer)
            },{
                path: '/index/center_intro',
                name: '中心简介 > 中心概况',
                component: createComponent(CenterIntroContainer)
            },{
                path: '/index/center_law',
                name: '中心简介 > 法律地位',
                component: createComponent(CenterIntroContainer)
            },{
                path: '/index/center_certificate',
                name: '中心简介 > 授权证书',
                component: createComponent(CenterIntroContainer)
            },{
                path: '/index/center_facility',
                name: '中心简介 > 重点设备',
                component: createComponent(CenterIntroContainer)
            },{
                path: '/index/center_address',
                name: '中心简介 > 地理位置',
                component: createComponent(CenterIntroContainer)
            },{
                path: '/index/inspect_119',
                name: '授权范围 > 火灾报警产品',
                component: createComponent(CenterIntroContainer)
            },{
                path: '/index/inspect_protect',
                name: '授权范围 > 火灾防护产品',
                component: createComponent(CenterIntroContainer)
            },{
                path: '/index/inspect_outfire',
                name: '授权范围 > 灭火设备产品',
                component: createComponent(CenterIntroContainer)
            },{
                path: '/index/inspect_equipment',
                name: '授权范围 > 消防装备产品',
                component: createComponent(CenterIntroContainer)
            },{
                path: '/index/inspect_3c',
                name: '授权范围 > 非3C认证产品',
                component: createComponent(CenterIntroContainer)
            },{
                path: '/index/article_add',
                name: '文章管理 > 新增文章',
                component: createComponent(AddArticleContainer)
            },{
                path: '/index/article_all',
                name: '文章管理 > 所有文章',
                component: createComponent(AllArticleContainer)
            },{
                path: '/index/category_all',
                name: '版块管理 > 所有版块',
                component: createComponent(AllCategoryContainer)
            }
        ]
    }
]

export default routes
