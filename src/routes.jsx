import React from 'react'
import Bundle from './components/common/Bundle'
import BaseContainer from './containers/BaseContainer'
import HomeContainer from 'bundle-loader?lazy!./containers/home/HomeContainer'

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
            }
        ]
    }
]

export default routes
