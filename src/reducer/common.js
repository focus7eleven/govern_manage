import { Map, List } from 'immutable'

const initialState = Map({
    isLogin: false,
    token: '',
    breadthumb: List([{
        name: '中心首页',
        path: '/'
    },{
        name: '行业动态',
        path: '/'
    },{
        name: '文章列表',
        path: '/'
    }])
})

const common = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            const { isLogin, token } = action
            return state.set('isLogin', isLogin).set('token', token)
        case 'UPDATE_BREADTHUMB':
            return state.set('breadthumb', action.payload.breadthumb)
    default:
        return state
    }
}

export default common
