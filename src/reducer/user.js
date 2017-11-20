import { Map, List, Record } from 'immutable'
import { DELETE_ADMIN, GET_ADMIN_LIST, GET_POWER_LIST } from '../actions/user'
import _ from 'lodash'

const initialState = Map({
    adminList: List([]),
    powerList: List([]),
})

const user = (state = initialState, action) => {
    let list = []
    switch (action.type) {
        case GET_ADMIN_LIST[1]:
            return state.set('adminList', List(action.payload))
        case GET_POWER_LIST[1]:
            return state.set('powerList', List(action.payload.map(v => v.codeId)))
        case DELETE_ADMIN:
            list = state.get('adminList')
            return state.set('adminList', list.delete(list.findIndex(v => v.adminId === action.payload)))
    default:
        return state
    }
}

export default user
