import _ from 'lodash'

// export const baseURL = "http://47.93.242.215:8927/manage"
export const baseURL = "http://47.93.242.215:8927/manage"

const isProduction = process.env.NODE_ENV === "production"

const config = _.extend({
	// common config
	debug: !isProduction,
},{
	// dev config
	api:{
		login: {
			post: `${baseURL}/admin/login`
		},
        category: {
            get: `${baseURL}/category/selectAllCategory`
        },
		article: {
			add: `${baseURL}/article/insertArticle`,
			update: `${baseURL}/article/updateArticle`,
			updateContent: `${baseURL}/article/updateContentById`,
			getAll: `${baseURL}/article/selectArticleInfoByCategoryId`,
			getByCategory: (categoryId) => `${baseURL}/article/selectArticleByCategoryId?categoryId=${categoryId}`,
			getById: (id) => `${baseURL}/article/selectArticleById?id=${id}`,
			deleteById: (id) => `${baseURL}/article/deleteById/${id}`,
			isSingle: (id) => `${baseURL}/article/articleIfExist?id=${id}`
		},
		upload: {
			image: `${baseURL}/upload/uploadNewsImg`,
			attach: `${baseURL}/upload/uploadNewsAttach`,
		}
    }
})

export default config
