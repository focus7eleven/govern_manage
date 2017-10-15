function updateBreadthumb(breadthumb) {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_BREADTHUMB',
            payload: breadthumb
        })
    }
}

export default {
    updateBreadthumb
}
