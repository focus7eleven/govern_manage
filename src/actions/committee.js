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
