import { Map, List } from 'immutable'
import { GET_CATEGORY } from '../actions/category'

const initialState = Map({
    category: [],
})

const category = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORY[1]:
            const list = action.payload.obj
            list.sort((a, b) => a.id - b.id)
            const cate = list.map(l => ({key: l.id, id: l.id, name: l.name}))
            return state.set('category', cate)
    default:
        return state
    }
}

export default category
