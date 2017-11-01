import { actionNames } from "action-utils";
import config from "../config";
import _ from "lodash";
import { notification } from 'antd'

export const ADD_ARTICLE_SUCCESS = 'ADD_ARTICLE_SUCCESS'
export const addArticle = (article) => {
    return dispatch => {
        let formData = new FormData()
        formData.append('title', article.title)
        formData.append('source', article.source)
        formData.append('wordSize', '')
        formData.append('categoryId', article.categoryId)
        formData.append('content', article.content)
        formData.append('imageUrl', article.imageUrl || '')
        formData.append('attachUrl', article.attachUrl || '')
        return fetch(config.api.article.add.post, {
            method:'POST',
            body: formData,
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                console.log(res);
                notification.success({
                    message:'成功',
                    description:'新增文章成功'
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
