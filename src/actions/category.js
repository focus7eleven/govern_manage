import { actionNames } from 'action-utils'
import config from '../config'
import { notification } from 'antd'

export const GET_CATEGORY = actionNames('GET_CATEGORY');
export function getCategory() {
    return (dispatch, getState) => {
        return fetch(config.api.category.get, {
            method: 'GET',
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                dispatch({
                    type: GET_CATEGORY[1],
                    payload: res
                })
            } else {
                notification.error({
                    message: '失败',
                    description: '服务器错误'
                })
            }
        })
    }
}

// export function getCategory2() {
//     return {
//         types: GET_CATEGORY,
//         callAPI: () => {
//             return fetch(config.api.category.get, {
//                 method:'POST',
//                 headers:{
//                     'Authorization': sessionStorage.getItem('accessToken'),
//                 },
//             }).then(res => res.json())
//         }
//     }
// }
