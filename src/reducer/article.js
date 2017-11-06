import { Map, List, Record } from 'immutable'
import { DELETE_ARTICLE, GET_ARTICLE_LIST, GET_ARTICLE_DETAIL, GET_ARTICLE_BY_CATEGORY } from '../actions/article'

const initialState = Map({
    articleList: List([]),
    editArticle: null,
    articleByCategory: List([]),
})

const article = (state = initialState, action) => {
    let list = []
    switch (action.type) {
        case GET_ARTICLE_LIST[1]:
            list = action.payload.obj.map(o => ({key: o.articleId, isTop: o.isTop, isRed: o.isRed, title: o.title, publishTime: o.publishTime, source: o.source, categoryId: o.categoryId}))
            return state.set('articleList', List(list))
        case GET_ARTICLE_DETAIL[1]:
            return state.set('editArticle', action.payload)
        case GET_ARTICLE_BY_CATEGORY[1]:
            return state.set('articleByCategory', action.payload)
        case DELETE_ARTICLE:
            list = state.get('articleList')
            return state.set('articleList', list.delete(list.findIndex(v => v.key === action.payload)))
    default:
        return state
    }
}

export default article
