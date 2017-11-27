import { actionNames } from "action-utils";
import config from "../config";
import _ from "lodash";
import { notification } from 'antd'

export const GET_ARTICLE_LIST = actionNames('GET_ARTICLE_LIST');
export function getArticleList() {
    return dispatch => {
        return fetch(config.api.article.getAll, {
            method: 'GET',
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                dispatch({
                    type: GET_ARTICLE_LIST[1],
                    payload: res
                })
            } else {
                notification.error({
                    message: '失败',
                    description: '服务器错误，获取文章列表失败'
                })
            }
            return true
        })
    }
}

export const GET_ARTICLE_DETAIL = actionNames('GET_ARTICLE_DETAIL');
export function getArticleDetail(id) {
    return dispatch => {
        return fetch(config.api.article.getById(id), {
            method: 'GET',
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                dispatch({
                    type: GET_ARTICLE_DETAIL[1],
                    payload: res.obj
                })
                return true
            } else {
                notification.error({
                    message: '失败',
                    description: '服务器错误，获取文章详细内容失败'
                })
                return false
            }
        })
    }
}

export const GET_ARTICLE_BY_CATEGORY = actionNames('GET_ARTICLE_BY_CATEGORY');
export function getArticleByCategory(id) {
    return dispatch => {
        return fetch(config.api.article.getByCategory(id), {
            method: 'GET',
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                dispatch({
                    type: GET_ARTICLE_BY_CATEGORY[1],
                    payload: res.obj
                })
                return true
            } else {
                notification.error({
                    message: '失败',
                    description: '服务器错误，获取文章失败'
                })
                return false
            }
        })
    }
}

export const IS_ARTICLE_SINGLE = actionNames('IS_ARTICLE_SINGLE');
export function isArticleSingle(id) {
    return dispatch => {
        return fetch(config.api.article.isSingle(id), {
            method: 'GET',
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                if (res.obj === 1) {
                    return false
                } else {
                    return true
                }
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

export const UPDATE_ARTICLE_SUCCESS = 'UPDATE_ARTICLE_SUCCESS'
export const updateArticle = (id, article) => {
    return dispatch => {
        let formData = new FormData()
        formData.append('id', id)
        formData.append('title', article.title)
        formData.append('source', article.source)
        formData.append('wordSize', '')
        formData.append('categoryId', article.categoryId)
        formData.append('content', article.content)
        formData.append('isRed', +article.isRed || 0)
        formData.append('isTop', +article.isTop || 0)
        formData.append('isRecommend', +article.isRecommend || 0)
        formData.append('imgUrl', article.imgUrl || '')
        formData.append('attachUrl', article.attachUrl || '')
        formData.append('imgName', article.imgName || '')
        formData.append('attachName', article.attachName || '')
        return fetch(config.api.article.update, {
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
                    description: '更新文章成功'
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

export const UPDATE_ARTICLE_CONTENT_SUCCESS = 'UPDATE_ARTICLE_CONTENT_SUCCESS'
export const updateArticleContent = (id, content) => {
    return dispatch => {
        let formData = new FormData()
        formData.append('id', id)
        formData.append('content', content)
        return fetch(config.api.article.updateContent, {
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
                    description: '更新成功'
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

export const ADD_ARTICLE_SUCCESS = 'ADD_ARTICLE_SUCCESS'
export const addArticle = (article) => {
    return dispatch => {
        let formData = new FormData()
        formData.append('title', article.title)
        formData.append('source', article.source)
        formData.append('wordSize', '')
        formData.append('categoryId', article.categoryId)
        formData.append('content', article.content)
        formData.append('isRed', +article.isRed || 0)
        formData.append('isTop', +article.isTop || 0)
        formData.append('isRecommend', +article.isRecommend || 0)
        formData.append('imgUrl', article.imgUrl || '')
        formData.append('attachUrl', article.attachUrl || '')
        formData.append('imgName', article.imgName || '')
        formData.append('attachName', article.attachName || '')
        return fetch(config.api.article.add, {
            method:'POST',
            body: formData,
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                notification.success({
                    message: '成功',
                    description: '新增文章成功'
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

export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS'
export const uploadImage = (img) => {
    return dispatch => {
        let formData = new FormData()
        formData.append('img', img)
        return fetch(config.api.upload.image, {
            method:'POST',
            body: formData,
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                return res.obj
            } else {
                notification.error({
                    message: '图片上传失败',
                    description: '服务器错误'
                })
            }
        })
    }
}

export const DELETE_ARTICLE = 'DELETE_ARTICLE'
export const deleteArticle = (id) => {
    return dispatch => {
        return fetch(config.api.article.deleteById(id), {
            method:'DELETE',
            headers: {
                'Authorization': sessionStorage.getItem('accessToken')
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 1) {
                dispatch({
                    type: DELETE_ARTICLE,
                    payload: id
                })
                notification.success({
                    message: '成功',
                    description: '删除成功'
                })
            } else {
                notification.error({
                    message: '删除失败',
                    description: '服务器错误'
                })
            }
            return true
        })
    }
}
