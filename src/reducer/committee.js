import { Map, List, fromJS } from 'immutable'
import { UPDATE_BTCM_SUCCESS, DELETE_BTCM, GET_ALL_BTCM, GET_COMMITTEE_DETAIL } from '../actions/committee'
import _ from 'lodash'

const initialState = Map({
    committeeDetail: null,
    btcmList: List(),
})

const committee = (state = initialState, action) => {
    let list
    switch (action.type) {
        case GET_COMMITTEE_DETAIL[1]:
            return state.set('committeeDetail', action.payload)
        case GET_ALL_BTCM[1]:
            return state.set('btcmList', fromJS(action.payload))
        case UPDATE_BTCM_SUCCESS:
            let idx = state.get('btcmList').findIndex(v => v.get('id') === action.payload.id)
            console.log(idx);
            return state.updateIn(['btcmList', idx], v => v.set('password', action.payload.password).set('btcId', action.payload.btcId))
        case DELETE_BTCM:
            list = state.get('btcmList')
            return state.set('btcmList', list.delete(list.findIndex(v => v.get('id') === action.payload)))
    default:
        return state
    }
}

export default committee
