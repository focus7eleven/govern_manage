import React from 'react'
import { Route } from 'react-router-dom'

const SubRoutes = (route) => (
    <Route exact={route.exact || false} path={route.path} render={props => ( <route.component {...props} routes={route.routes} />)} />
)

const Children = ({routes}) => {
    return routes.map((route, i) => (
        <SubRoutes key={i} {...route} />
    ))
}

export default Children
