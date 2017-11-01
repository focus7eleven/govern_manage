import {
	combineReducers
} from 'redux-immutable'
import common from './common'
import category from './category'
import mock from './mock'

const reducer = combineReducers({
	common,
	category,
    mock,
})

export default reducer
