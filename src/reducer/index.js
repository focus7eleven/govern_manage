import {
	combineReducers
} from 'redux-immutable'
import common from './common'
import category from './category'
import article from './article'
import mock from './mock'

const reducer = combineReducers({
	common,
	article,
	category,
    mock,
})

export default reducer
