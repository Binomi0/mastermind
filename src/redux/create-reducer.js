export default function(INITIAL_STATE, handlers) {
    return function reducer(state = INITIAL_STATE, action) {
        if (handlers[action.type]) {
            return handlers[action.type](state, action);
        }
        return state;
    }
}