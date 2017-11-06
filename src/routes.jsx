import React from 'react'
import Bundle from './components/common/Bundle'
import LoginControlHOC from './containers/AccessControlContainer'
import BaseContainer from './containers/BaseContainer'
import LoginContainer from './containers/user/LoginContainer'
import HomeContainer from 'bundle-loader?lazy!./containers/home/HomeContainer'
import CenterIntroContainer from 'bundle-loader?lazy!./containers/center/CenterIntroContainer'
import AddArticleContainer from 'bundle-loader?lazy!./containers/article/AddArticleContainer'
import EditArticleContainer from 'bundle-loader?lazy!./containers/article/EditArticleContainer'
import AllArticleContainer from 'bundle-loader?lazy!./containers/article/AllArticleContainer'
import AllCategoryContainer from 'bundle-loader?lazy!./containers/category/AllCategoryContainer'
import ContentOnly from 'bundle-loader?lazy!./components/common/ContentOnly'

const Loading = () => (<div>Loading...</div>)

const createComponent = (component, contentName) => (props) => (
    <Bundle load={component}>
        {
            (Comp) => (Comp ? <Comp contentName={contentName} {...props}/> : <Loading />)
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
                component: createComponent(ContentOnly, '中心概况')
            },{
                path: '/index/center_law',
                name: '中心简介 > 法律地位',
                component: createComponent(ContentOnly, '法律地位')
            },{
                path: '/index/center_certificate',
                name: '中心简介 > 授权证书',
                component: createComponent(ContentOnly, '授权证书')
            },{
                path: '/index/center_facility',
                name: '中心简介 > 重点设备',
                component: createComponent(ContentOnly, '重点设备')
            },{
                path: '/index/center_address',
                name: '中心简介 > 地理位置',
                component: createComponent(ContentOnly, '地理位置')
            },{
                path: '/index/inspect_119',
                name: '授权范围 > 火灾报警产品',
                component: createComponent(ContentOnly, '火灾报警产品')
            },{
                path: '/index/inspect_protect',
                name: '授权范围 > 火灾防护产品',
                component: createComponent(ContentOnly, '火灾防护产品')
            },{
                path: '/index/inspect_outfire',
                name: '授权范围 > 灭火设备产品',
                component: createComponent(ContentOnly, '灭火设备产品')
            },{
                path: '/index/inspect_equipment',
                name: '授权范围 > 消防装备产品',
                component: createComponent(ContentOnly, '消防装备产品')
            },{
                path: '/index/inspect_3c',
                name: '授权范围 > 非3C认证产品',
                component: createComponent(ContentOnly, '非3C认证产品')
            },{
                path: '/index/one_desc',
                name: '一分委 > 分委简介',
                component: createComponent(ContentOnly, '分委简介')
            },{
                path: '/index/one_contact',
                name: '一分委 > 联系我们',
                component: createComponent(ContentOnly, '联系我们')
            },{
                path: '/index/one_currentStandard',
                name: '一分委 > 目前管理的标准',
                component: createComponent(ContentOnly, '目前管理的标准')
            },{
                path: '/index/one_modifyStandard',
                name: '一分委 > 制修订中的标准',
                component: createComponent(ContentOnly, '制修订中的标准')
            },{
                path: '/index/two_desc',
                name: '二分委 > 分委简介',
                component: createComponent(ContentOnly, '分委简介')
            },{
                path: '/index/two_contact',
                name: '二分委 > 联系我们',
                component: createComponent(ContentOnly, '联系我们')
            },{
                path: '/index/two_currentStandard',
                name: '二分委 > 目前管理的标准',
                component: createComponent(ContentOnly, '目前管理的标准')
            },{
                path: '/index/two_modifyStandard',
                name: '二分委 > 制修订中的标准',
                component: createComponent(ContentOnly, '制修订中的标准')
            },{
                path: '/index/three_desc',
                name: '三分委 > 分委简介',
                component: createComponent(ContentOnly, '分委简介')
            },{
                path: '/index/three_contact',
                name: '三分委 > 联系我们',
                component: createComponent(ContentOnly, '联系我们')
            },{
                path: '/index/three_currentStandard',
                name: '三分委 > 目前管理的标准',
                component: createComponent(ContentOnly, '目前管理的标准')
            },{
                path: '/index/three_modifyStandard',
                name: '三分委 > 制修订中的标准',
                component: createComponent(ContentOnly, '制修订中的标准')
            },{
                path: '/index/eight_desc',
                name: '八分委 > 分委简介',
                component: createComponent(ContentOnly, '分委简介')
            },{
                path: '/index/eight_contact',
                name: '八分委 > 联系我们',
                component: createComponent(ContentOnly, '联系我们')
            },{
                path: '/index/eight_currentStandard',
                name: '八分委 > 目前管理的标准',
                component: createComponent(ContentOnly, '目前管理的标准')
            },{
                path: '/index/eight_modifyStandard',
                name: '八分委 > 制修订中的标准',
                component: createComponent(ContentOnly, '制修订中的标准')
            },{
                path: '/index/iso_desc',
                name: 'ISO/TC21/SC6 > 分委简介',
                component: createComponent(ContentOnly, '分委简介')
            },{
                path: '/index/iso_contact',
                name: 'ISO/TC21/SC6 > 联系我们',
                component: createComponent(ContentOnly, '联系我们')
            },{
                path: '/index/iso_currentStandard',
                name: 'ISO/TC21/SC6 > 目前管理的标准',
                component: createComponent(ContentOnly, '目前管理的标准')
            },{
                path: '/index/iso_modifyStandard',
                name: 'ISO/TC21/SC6 > 制修订中的标准',
                component: createComponent(ContentOnly, '制修订中的标准')
            },{
                path: '/index/article_add',
                name: '文章管理 > 新增文章',
                component: createComponent(AddArticleContainer)
            },{
                path: '/index/article_edit',
                name: '文章管理 > 编辑文章',
                component: createComponent(EditArticleContainer)
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
