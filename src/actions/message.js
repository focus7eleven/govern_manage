import { actionNames } from "action-utils";
import config from "../config";
import _ from "lodash";
import { notification } from 'antd'

export const GET_MESSAGE_LIST = actionNames('GET_MESSAGE_LIST');
export function getMessageList() {
    return dispatch => {
        return fetch(config.api.message.getAll, {
            method: 'GET',
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                dispatch({
                    type: GET_MESSAGE_LIST[1],
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

export const REVIEW_MESSAGE = actionNames('REVIEW_MESSAGE');
export function reviewMessage(id, pass) {
    return dispatch => {
        return fetch(config.api.message.review(id, pass), {
            method: 'GET',
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                dispatch({
                    type: REVIEW_MESSAGE[1],
                    id,
                    pass
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


export const REPLY_MESSAGE_SUCCESS = 'REPLY_MESSAGE_SUCCESS'
export const replyMessage = (id, reply) => {
    return dispatch => {
        let formData = new FormData()
        formData.append('id', id)
        formData.append('reply', reply)
        return fetch(config.api.message.reply, {
            method:'POST',
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            },
            body: formData
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                dispatch({
                    type: REPLY_MESSAGE_SUCCESS,
                    payload: {
                        messageId: id,
                        reply
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
