import { Map, List } from 'immutable'
import { GET_MESSAGE_LIST, REVIEW_MESSAGE, REPLY_MESSAGE_SUCCESS } from '../actions/message'

const initialState = Map({
    messageList: List([]),
})

const message = (state = initialState, action) => {
    switch (action.type) {
        case GET_MESSAGE_LIST[1]:
            return state.set('messageList', List(action.payload))
        case REVIEW_MESSAGE[1]:
            const { id, pass } = action
            return state.update('messageList', l => l.update(l.findIndex(v => v.id === id), v => {v.pass = pass;return v}))
        case REPLY_MESSAGE_SUCCESS:
            const { messageId, reply } = action.payload
            return state.update('messageList', l => l.update(l.findIndex(v => v.id === messageId), v => {v.reply = reply;return v}))
    default:
        return state
    }
}

export default message
