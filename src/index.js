/* eslint-disable */
import 'babel-polyfill'
import 'general-polyfill'
import 'whatwg-fetch'
import 'react-hot-loader/patch';
import ReactDOM from 'react-dom';
import React from 'react';
import MyAppContainer from './client'
import {AppContainer} from 'react-hot-loader'
import registerServiceWorker from './registerServiceWorker';
import { createMyStore } from './store'
import reducer from './reducer'

const store = createMyStore(reducer)

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component store={store} />
        </AppContainer>, document.getElementById('root')
    )
}

render(MyAppContainer)

// Hot Module Replacement API
if (module.hot) {
    const NextAppContainer = require('./client').default
    module.hot.accept('./client', () => {
        render(NextAppContainer)
    })
}
// ReactDOM.render(
// <Provider store={store}>{routes}</Provider>, document.getElementById('root'));
// registerServiceWorker();
