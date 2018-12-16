import { combineReducers } from "redux";
import userReducer from "./userReducer";
import playlistReducer from "./playlistCreationReducer";

export default combineReducers({
  users: userReducer,
  playlists: playlistReducer
});
