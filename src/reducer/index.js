import {
	combineReducers
} from 'redux-immutable'
import common from './common'
import category from './category'
import committee from './committee'
import article from './article'
import mock from './mock'

const reducer = combineReducers({
	common,
	article,
	committee,
	category,
    mock,
})

export default reducer
