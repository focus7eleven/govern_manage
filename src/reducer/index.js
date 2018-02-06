import {
	combineReducers
} from 'redux-immutable'
import common from './common'
import category from './category'
import committee from './committee'
import message from './message'
import user from './user'
import article from './article'
import report from './report'
import mock from './mock'

const reducer = combineReducers({
	common,
	article,
	report,
	user,
	committee,
	message,
	category,
    mock,
})

export default reducer
