import { Map, List, Record } from 'immutable'
import { GET_REPORT_LIST } from '../actions/report'
import _ from 'lodash'

const initialState = Map({
    reportList: List([]),
})

const report = (state = initialState, action) => {
    let list = []
    switch (action.type) {
        case GET_REPORT_LIST[1]:
            list = action.payload.obj
            return state.set('reportList', List(list))
        default:
            return state
    }
}

export default report
