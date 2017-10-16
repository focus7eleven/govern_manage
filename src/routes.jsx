import React from 'react'
import Bundle from './components/common/Bundle'
import BaseContainer from './containers/BaseContainer'
import HomeContainer from 'bundle-loader?lazy!./containers/home/HomeContainer'
import CenterIntroContainer from 'bundle-loader?lazy!./containers/center_intro/CenterIntroContainer'

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
        path: '/',
        component: BaseContainer,
        routes: [
            {
                path: '/',
                exact: true,
                component: createComponent(HomeContainer)
            },{
                path: '/center_intro',
                name: '中心简介 > 中心概况',
                component: createComponent(CenterIntroContainer)
            },{
                path: '/center_law',
                name: '中心简介 > 法律地位',
                component: createComponent(CenterIntroContainer)
            },{
                path: '/center_certificate',
                name: '中心简介 > 授权证书',
                component: createComponent(CenterIntroContainer)
            },{
                path: '/center_facility',
                name: '中心简介 > 重点设备',
                component: createComponent(CenterIntroContainer)
            },{
                path: '/center_address',
                name: '中心简介 > 地理位置',
                component: createComponent(CenterIntroContainer)
            }
        ]
    }
]

export default routes
