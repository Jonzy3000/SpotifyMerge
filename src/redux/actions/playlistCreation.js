import * as actionTypes from "./actionTypes";

export const updateSongsChosen = songsAndArtists => ({
    type: actionTypes.PLAYLIST_SONGS_CHOSEN,
    payload: songsAndArtists
});

export const updateOptionsChosen = options => ({
    type: actionTypes.PLAYLIST_OPTIONS_CHOSEN,
    payload: options
});