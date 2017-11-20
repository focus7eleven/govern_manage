import { actionNames } from "action-utils";
import config from "../config";
import _ from "lodash";
import { notification } from 'antd'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const login = (user,password) => {
    return dispatch => {
        let formData = new FormData()
        formData.append('adminName', user)
        formData.append('password', password)
        return fetch(config.api.login.post, {
            method:'POST',
            body: formData
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                sessionStorage.setItem('accessToken', res.obj.accessToken)
                sessionStorage.setItem('codeIds', JSON.stringify(res.obj.codeIds))
                dispatch({
                    type:LOGIN_SUCCESS,
                    isLogin: true,
                    codeIds: res.obj.codeIds
                })
            } else {
                notification.error({
                    message:'失败',
                    description:'账号与密码不匹配'
                })
            }
        })
    }
}

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const logout = () => {
    return dispatch => {
        return fetch(config.api.logout.post, {
            method:'POST',
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                sessionStorage.removeItem('accessToken')
                dispatch({
                    type:LOGOUT_SUCCESS,
                    isLogin: false
                })
                return true
            } else {
                notification.error({
                    message: '失败',
                    description: res.errorMes
                })
                return false
            }
        })
    }
}

function updateBreadthumb(breadthumb) {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_BREADTHUMB',
            payload: breadthumb
        })
    }
}

export default {
    login,
    logout,
    updateBreadthumb,
}
