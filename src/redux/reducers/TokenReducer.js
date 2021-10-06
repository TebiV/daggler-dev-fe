import { SET_TOKEN, RESET_TOKEN } from "../actions/TokenActions";

function tokenReducer(state = '', action) {
    switch (action.type) {
        case SET_TOKEN:
            return action.token;
        case RESET_TOKEN:
            return '';
        default:
            return state;
    }
}

export default tokenReducer;