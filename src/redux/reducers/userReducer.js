import { UPDATE_O_AUTH_TOKEN, UPDATE_USER_ID, LOG_OUT } from "../actions/actionTypes";

const userReducer = (state = [], action) => {
    switch (action.type) {
        case UPDATE_O_AUTH_TOKEN:
            return Object.assign({}, state, {
                oAuthToken: action.payload
            });
        case UPDATE_USER_ID:
            return Object.assign({}, state, {
                userId: action.payload
            });
        case LOG_OUT: 
            return Object.assign({}, state, {
                userId: null,
                oAuthToken: null
            });
        default:
            return state;
    }
};

export default userReducer;