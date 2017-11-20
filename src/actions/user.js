import { actionNames } from "action-utils";
import config from "../config";
import _ from "lodash";
import { notification } from 'antd'

export const GET_ADMIN_LIST = actionNames('GET_ADMIN_LIST');
export function getAdminList() {
    return dispatch => {
        return fetch(config.api.user.getAllAdmin, {
            method: 'GET',
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                dispatch({
                    type: GET_ADMIN_LIST[1],
                    payload: res.obj
                })
            } else {
                notification.error({
                    message: '失败',
                    description: res.errorMes
                })
            }
            return true
        })
    }
}

export const GET_POWER_LIST = actionNames('GET_POWER_LIST');
export function getPowerList(id) {
    return dispatch => {
        return fetch(config.api.user.getPower(id), {
            method: 'GET',
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                dispatch({
                    type: GET_POWER_LIST[1],
                    payload: res.obj
                })
            } else {
                notification.error({
                    message: '失败',
                    description: res.errorMes
                })
            }
            return true
        })
    }
}

export const DELETE_ADMIN = 'DELETE_ADMIN'
export const deleteAdmin = (id) => {
    return dispatch => {
        return fetch(config.api.user.deleteAdmin(id), {
            method:'DELETE',
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                dispatch({
                    type: DELETE_ADMIN,
                    payload: id
                })
                notification.success({
                    message: '成功',
                    description: '删除成功'
                })
            } else {
                notification.error({
                    message: '删除失败',
                    description: res.errorMes
                })
            }
            return true
        })
    }
}

export const ADD_ADMIN_SUCCESS = 'ADD_ADMIN_SUCCESS'
export const addAdmin = (formData) => {
    return dispatch => {
        return fetch(config.api.user.addAdmin, {
            method:'POST',
            body: formData,
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                notification.success({
                    message: '成功',
                    description: '新增管理员成功'
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

export const ADD_POWER_SUCCESS = 'ADD_POWER_SUCCESS'
export const addPower = (formData) => {
    return dispatch => {
        return fetch(config.api.user.addPower, {
            method:'POST',
            body: formData,
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            }
        })
    }
}

export const DELETE_POWER_SUCCESS = 'DELETE_POWER_SUCCESS'
export const deletePower = (formData) => {
    return dispatch => {
        return fetch(config.api.user.deletePower, {
            method:'POST',
            body: formData,
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            }
        })
    }
}
