import { actionNames } from "action-utils";
import config from "../config";
import _ from "lodash";
import { notification } from 'antd'

export const GET_REPORT_LIST = actionNames('GET_REPORT_LIST');
export function getReportList() {
    return dispatch => {
        return fetch(config.api.report.getReportList, {
            method: 'GET',
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                dispatch({
                    type: GET_REPORT_LIST[1],
                    payload: res
                })
            } else {
                notification.error({
                    message: '失败',
                    description: '服务器错误，获取列表失败'
                })
            }
            return true
        })
    }
}
