import {
	combineReducers
} from 'redux-immutable'
import common from './common'
import mock from './mock'

const reducer = combineReducers({
	common,
    mock,
})

export default reducer
