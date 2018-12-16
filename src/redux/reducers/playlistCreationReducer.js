import * as actionTypes from "../actions/actionTypes";

const playlistReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.PLAYLIST_SONGS_CHOSEN:
      return Object.assign({}, state, {
        generationPayload: action.payload
      });
    case actionTypes.PLAYLIST_OPTIONS_CHOSEN:
      return Object.assign({}, state, {
        playlistOptions: action.payload
      });
    case actionTypes.UPDATE_PLAYLIST_ID:
      return Object.assign({}, state, {
        id: action.payload
      });
    case actionTypes.UPDATE_RECOMMENDATIONS:
      return Object.assign({}, state, {
        recommendations: action.payload
      });
    default:
      return state;
  }
};

export default playlistReducer;
