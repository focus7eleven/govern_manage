import _ from 'lodash'

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
			add: {
				post: `${baseURL}/article/insertArticle`
			}
		}
    }
})

export default config
