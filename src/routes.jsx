import React from 'react'
import Bundle from './components/common/Bundle'
import LoginControlHOC from './containers/AccessControlContainer'
import BaseContainer from './containers/BaseContainer'
import LoginContainer from './containers/user/LoginContainer'
import HomeContainer from 'bundle-loader?lazy!./containers/home/HomeContainer'
import AddArticleContainer from 'bundle-loader?lazy!./containers/article/AddArticleContainer'
import EditArticleContainer from 'bundle-loader?lazy!./containers/article/EditArticleContainer'
import AllArticleContainer from 'bundle-loader?lazy!./containers/article/AllArticleContainer'
import AllCategoryContainer from 'bundle-loader?lazy!./containers/category/AllCategoryContainer'
import ContentOnly from 'bundle-loader?lazy!./components/common/ContentOnly'
import CommitteeContentOnly from 'bundle-loader?lazy!./containers/committee/CommitteeContentOnly'
import ListOnly from 'bundle-loader?lazy!./components/common/ListOnly'

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
                path: '/index/notification',
                name: '通知公告',
                component: createComponent(ListOnly, '通知公告')
            },{
                path: '/index/law',
                name: '法律法规',
                component: createComponent(ListOnly, '法律法规')
            },{
                path: '/index/trends',
                name: '行业动态',
                component: createComponent(ListOnly, '行业动态')
            },{
                path: '/index/imgNews',
                name: '图片新闻',
                component: createComponent(ListOnly, '图片新闻')
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
                component: createComponent(ListOnly, '重点设备')
            },{
                path: '/index/center_address',
                name: '中心简介 > 地理位置',
                component: createComponent(ContentOnly, '地理位置')
            },{
                path: '/index/inspect_119',
                name: '检验范围 > 火灾报警产品',
                component: createComponent(ListOnly, '火灾报警产品')
            },{
                path: '/index/inspect_protect',
                name: '检验范围 > 火灾防护产品',
                component: createComponent(ListOnly, '火灾防护产品')
            },{
                path: '/index/inspect_outfire',
                name: '检验范围 > 灭火设备产品',
                component: createComponent(ListOnly, '灭火设备产品')
            },{
                path: '/index/inspect_equipment',
                name: '检验范围 > 消防装备产品',
                component: createComponent(ListOnly, '消防装备产品')
            },{
                path: '/index/inspect_3c',
                name: '检验范围 > 非3C认证产品',
                component: createComponent(ListOnly, '非3C认证产品')
            },{
                path: '/index/one_desc',
                name: '一分委 > 分委简介',
                component: createComponent(CommitteeContentOnly, '1,btcBrief')
            },{
                path: '/index/one_contact',
                name: '一分委 > 联系我们',
                component: createComponent(CommitteeContentOnly, '1,connection')
            },{
                path: '/index/one_currentStandard',
                name: '一分委 > 目前管理的标准',
                component: createComponent(CommitteeContentOnly, '1,cms')
            },{
                path: '/index/one_modifyStandard',
                name: '一分委 > 制修订中的标准',
                component: createComponent(CommitteeContentOnly, '1,crs')
            },{
                path: '/index/one_work',
                name: '一分委 > 工作动态',
                component: createComponent(ListOnly, '一分委工作动态')
            },{
                path: '/index/two_work',
                name: '二分委 > 工作动态',
                component: createComponent(ListOnly, '二分委工作动态')
            },{
                path: '/index/three_work',
                name: '三分委 > 工作动态',
                component: createComponent(ListOnly, '三分委工作动态')
            },{
                path: '/index/eight_work',
                name: '八分委 > 工作动态',
                component: createComponent(ListOnly, '八分委工作动态')
            },{
                path: '/index/iso_work',
                name: 'ISO/TC21/SC6 > 工作动态',
                component: createComponent(ListOnly, 'ISO/TC21/SC6工作动态')
            },{
                path: '/index/two_desc',
                name: '二分委 > 分委简介',
                component: createComponent(CommitteeContentOnly, '2,btcBrief')
            },{
                path: '/index/two_contact',
                name: '二分委 > 联系我们',
                component: createComponent(CommitteeContentOnly, '2,connection')
            },{
                path: '/index/two_currentStandard',
                name: '二分委 > 目前管理的标准',
                component: createComponent(CommitteeContentOnly, '2,cms')
            },{
                path: '/index/two_modifyStandard',
                name: '二分委 > 制修订中的标准',
                component: createComponent(CommitteeContentOnly, '2,crs')
            },{
                path: '/index/three_desc',
                name: '三分委 > 分委简介',
                component: createComponent(CommitteeContentOnly, '3,btcBrief')
            },{
                path: '/index/three_contact',
                name: '三分委 > 联系我们',
                component: createComponent(CommitteeContentOnly, '3,connection')
            },{
                path: '/index/three_currentStandard',
                name: '三分委 > 目前管理的标准',
                component: createComponent(CommitteeContentOnly, '3,cms')
            },{
                path: '/index/three_modifyStandard',
                name: '三分委 > 制修订中的标准',
                component: createComponent(CommitteeContentOnly, '3,crs')
            },{
                path: '/index/eight_desc',
                name: '八分委 > 分委简介',
                component: createComponent(CommitteeContentOnly, '4,btcBrief')
            },{
                path: '/index/eight_contact',
                name: '八分委 > 联系我们',
                component: createComponent(CommitteeContentOnly, '4,connection')
            },{
                path: '/index/eight_currentStandard',
                name: '八分委 > 目前管理的标准',
                component: createComponent(CommitteeContentOnly, '4,cms')
            },{
                path: '/index/eight_modifyStandard',
                name: '八分委 > 制修订中的标准',
                component: createComponent(CommitteeContentOnly, '4,crs')
            },{
                path: '/index/iso_desc',
                name: 'ISO/TC21/SC6 > 分委简介',
                component: createComponent(CommitteeContentOnly, '5,Btcbrief')
            },{
                path: '/index/iso_contact',
                name: 'ISO/TC21/SC6 > 联系我们',
                component: createComponent(CommitteeContentOnly, '5,connection')
            },{
                path: '/index/iso_currentStandard',
                name: 'ISO/TC21/SC6 > 目前管理的标准',
                component: createComponent(CommitteeContentOnly, '5,cms')
            },{
                path: '/index/iso_modifyStandard',
                name: 'ISO/TC21/SC6 > 制修订中的标准',
                component: createComponent(CommitteeContentOnly, '5,crs')
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
