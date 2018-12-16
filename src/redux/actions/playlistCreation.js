import * as actionTypes from "./actionTypes";

export const updateSongsChosen = songsAndArtists => ({
  type: actionTypes.PLAYLIST_SONGS_CHOSEN,
  payload: songsAndArtists
});

export const updateOptionsChosen = options => ({
  type: actionTypes.PLAYLIST_OPTIONS_CHOSEN,
  payload: options
});

export const updatePlaylistId = id => ({
  type: actionTypes.UPDATE_PLAYLIST_ID,
  payload: id
});

export const updateRecommendations = recommendations => ({
  type: actionTypes.UPDATE_RECOMMENDATIONS,
  payload: recommendations
});
