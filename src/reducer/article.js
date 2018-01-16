import { Map, List, Record } from 'immutable'
import { SET_BACK_URL, DELETE_ARTICLE, GET_ARTICLE_LIST, GET_ARTICLE_DETAIL, GET_ARTICLE_BY_CATEGORY } from '../actions/article'
import _ from 'lodash'

const initialState = Map({
    articleList: List([]),
    editArticle: null,
    articleByCategory: [],
    backUrl: ''
})

const article = (state = initialState, action) => {
    let list = []
    switch (action.type) {
        case SET_BACK_URL:
            return state.set('backUrl', action.payload)
        case GET_ARTICLE_LIST[1]:
            list = action.payload.obj.map(o => ({key: o.articleId, isTop: o.isTop, isRed: o.isRed, isRecommend: o.isRecommend, title: o.title, publishTime: o.publishTime, source: o.source, categoryId: o.categoryId}))
            return state.set('articleList', List(list))
        case GET_ARTICLE_DETAIL[1]:
            return state.set('editArticle', action.payload)
        case GET_ARTICLE_BY_CATEGORY[1]:
            list = action.payload.map(o => (_.extend({key: o.articleId}, o)))
            return state.set('articleByCategory', list)
        case DELETE_ARTICLE:
            list = state.get('articleList')
            return state.set('articleList', list.delete(list.findIndex(v => v.key === action.payload)))
    default:
        return state
    }
}

export default article
