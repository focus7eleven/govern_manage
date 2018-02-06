import _ from 'lodash'

// export const baseURL = "http://47.93.242.215:8927/manage"
export const baseURL = "http://47.93.242.215:8928/manage"

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
		logout: {
			post: `${baseURL}/admin/logout`
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
		report: {
			getReportList: `${baseURL}/reportFileInfo/selectAllReportFileInfoByPage`
		},
		upload: {
			image: `${baseURL}/upload/uploadNewsImg`,
			attach: `${baseURL}/upload/uploadNewsAttach`,
		},
		committee: {
			getById: (id) => `${baseURL}/btc/selectBtcById?id=${id}`,
			update: `${baseURL}/btc/updateByPrimaryKeyWithBLOBs`,
		},
		message: {
			getAll: `${baseURL}/leaveMessage/selectAllLeaveMessageByPage`,
			// getAll: `${baseURL}/leaveMessage/selectAllLeaveMessageByPage?page=0&pageSize=9999`,
			review: (id, pass) => `${baseURL}/leaveMessage/verifyLeaveMessage?id=${id}&pass=${pass}`,
			reply: `${baseURL}/leaveMessage/reply`,
		},
		user: {
			getPower: (id) => `${baseURL}/adminPower/getAdminPowerListAdminId/${id}`,
			deletePower: `${baseURL}/adminPower/deleteAdminPower`,
			addPower: `${baseURL}/adminPower/addAdminPowers`,
			addAdmin: `${baseURL}/admin/regist`,
			getAllAdmin: `${baseURL}/admin/selectAllAdmin`,
			deleteAdmin: (id) => `${baseURL}/admin/deleteAdmin/${id}`,
		}
    }
})

export default config
