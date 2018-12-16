import {
  PLAYLIST_SONGS_CHOSEN,
  PLAYLIST_OPTIONS_CHOSEN
} from "../actions/actionTypes";

const playlistReducer = (state = [], action) => {
  switch (action.type) {
    case PLAYLIST_SONGS_CHOSEN:
      return Object.assign({}, state, {
        generationPayload: action.payload
      });
    case PLAYLIST_OPTIONS_CHOSEN:
      return Object.assign({}, state, {
        playlistOptions: action.payload
      });
    default:
      return state;
  }
};

export default playlistReducer;