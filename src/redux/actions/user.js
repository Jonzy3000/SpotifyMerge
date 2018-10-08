import * as actionTypes from "./actionTypes";

export const updateOAuthToken = token => ({
    type: actionTypes.UPDATE_O_AUTH_TOKEN,
    payload: token
});

export const updateUserId = userId => ({
    type: actionTypes.UPDATE_USER_ID,
    payload: userId
})