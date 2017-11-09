import { Map, List } from 'immutable'
import { GET_COMMITTEE_DETAIL } from '../actions/committee'
import _ from 'lodash'

const initialState = Map({
    committeeDetail: null,
})

const committee = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMMITTEE_DETAIL[1]:
            return state.set('committeeDetail', action.payload)
    default:
        return state
    }
}

export default committee
