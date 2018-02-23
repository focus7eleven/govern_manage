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

export const UPLOAD_PDF = 'UPLOAD_PDF'
export function uploadPdf(formData) {
    return dispatch => {
        return fetch(config.api.report.uploadPdf, {
            method: 'POST',
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            },
            body: formData
        }).then(res => res.json()).then(res => {
            return res
        })
    }
}

export const UPLOAD_EXCEL = 'UPLOAD_EXCEL'
export function uploadExcel(formData) {
    return dispatch => {
        return fetch(config.api.report.uploadExcel, {
            method: 'POST',
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            },
            body: formData
        }).then(res => res.json()).then(res => {
            return res
        })
    }
}

export const UPLOAD_EXCEL_URL = 'UPLOAD_EXCEL_URL'
export function uploadExcelUrl(formData) {
    return dispatch => {
        return fetch(config.api.report.uploadExcelUrlToDatabase, {
            method: 'POST',
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            },
            body: formData
        }).then(res => {
        // }).then(res => res.json()).then(res => {
            return res
        })
    }
}

export const UPLOAD_INVALID_URL = 'UPLOAD_INVALID_URL'
export function uploadInvalidUrl(formData) {
    return dispatch => {
        return fetch(config.api.report.uploadInvalidUrlToDatabase, {
            method: 'POST',
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            },
            body: formData
        }).then(res => {
        // }).then(res => res.json()).then(res => {
            return res
        })
    }
}
