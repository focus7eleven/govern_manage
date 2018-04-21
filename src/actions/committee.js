import { actionNames } from "action-utils";
import config from "../config";
import _ from "lodash";
import { notification } from 'antd'

export const GET_COMMITTEE_DETAIL = actionNames('GET_COMMITTEE_DETAIL');
export function getCommittee(id) {
    return dispatch => {
        return fetch(config.api.committee.getById(id), {
            method: 'GET',
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                dispatch({
                    type: GET_COMMITTEE_DETAIL[1],
                    payload: res.obj
                })
                return true
            } else {
                notification.error({
                    message: '失败',
                    description: '服务器错误，获取技术委员会信息失败'
                })
                return false
            }
        })
    }
}

export const GET_ALL_BTCM = actionNames('GET_ALL_BTCM');
export function getAllBtcm() {
    return dispatch => {
        return fetch(config.api.btc.getAllBtcm, {
            method: 'GET',
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                dispatch({
                    type: GET_ALL_BTCM[1],
                    payload: res.obj
                })
                return true
            } else {
                notification.error({
                    message: '失败',
                    description: '服务器错误，获取技术委员会账户失败'
                })
                return false
            }
        })
    }
}

export const UPDATE_COMMITTEE_SUCCESS = 'UPDATE_COMMITTEE_SUCCESS'
export const updateCommittee = (formData) => {
    return dispatch => {
        return fetch(config.api.committee.update, {
            method:'POST',
            body: formData,
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                console.log(res);
                notification.success({
                    message: '成功',
                    description: '更新技术委员会信息成功'
                })
                return true
            } else {
                notification.error({
                    message: '失败',
                    description: '服务器错误'
                })
                return false
            }
        })
    }
}

export const ADD_BTCM_SUCCESS = 'ADD_BTCM_SUCCESS'
export const addBtcm = (formData) => {
    return dispatch => {
        return fetch(config.api.btc.addBtcm, {
            method:'POST',
            body: formData,
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                notification.success({
                    message: '成功',
                    description: '新增账户成功'
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

export const UPDATE_BTCM_SUCCESS = 'UPDATE_BTCM_SUCCESS'
export const updateBtcm = (formData, id, password, btcId) => {
    return dispatch => {
        return fetch(config.api.btc.updateBtcm, {
            method:'POST',
            body: formData,
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                notification.success({
                    message: '成功',
                    description: '更新账户成功'
                })
                dispatch({
                    type: UPDATE_BTCM_SUCCESS,
                    payload: {
                        id,
                        password,
                        btcId
                    }
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

export const DELETE_BTCM = 'DELETE_BTCM'
export const deleteBtcm = (id) => {
    return dispatch => {
        return fetch(config.api.btc.deleteBtcm(id), {
            method: 'GET',
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                dispatch({
                    type: DELETE_BTCM,
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
