import Utils from "../utils.js";
import axios from "axios";
import store from "./../../redux/store";

const PLAYLIST_URL = `${Utils.SPOTIFY_URL}/playlists`

class FullListOfPlaylists {
    static getFullListOfUsersPlaylists(nextUrl, previousPlaylists) {
        if (nextUrl == null && previousPlaylists) {
            return previousPlaylists;
        }

        if (nextUrl == null && previousPlaylists == null) {
            return Playlists.getListOfUsersPlaylists()
                .then((resp) => {
                    if (resp.data.next) {
                        return FullListOfPlaylists.getFullListOfUsersPlaylists(
                            resp.data.next,
                            resp.data.items
                        );
                    } else {
                        return resp.data.items;
                    }
                });
        } else {
            return Playlists.getNextPageListOfUsersPlaylists(
                nextUrl
            ).then((resp) => {
                if (resp.data.next) {
                    return FullListOfPlaylists.getFullListOfUsersPlaylists(
                        resp.data.next,
                        [...previousPlaylists, ...resp.data.items]
                    )
                } else {
                    return [...previousPlaylists, ...resp.data.items];
                }
            });
        }

    }
}

class FullListOfTracks {
    static getPlaylistWithAllTracks(playlistId) {
        return Playlists.getListOfTracksFromPlaylist(playlistId).then((resp) => {
            if (resp.data.next) {
                return FullListOfTracks.keepGettingTracks(resp.data.next, resp.data.items);
            } else {
                return resp.data.items;
            }
        })
    }

    static keepGettingTracks(nextUrl, tracks) {
        if (nextUrl) {
            return Playlists.get(nextUrl).then((resp) => {
                if (resp.data.next) {
                    return FullListOfTracks.keepGettingTracks(
                        resp.data.next,
                        [...tracks, ...resp.data.items]
                    );
                } else {
                    return [...tracks, ...resp.data.items];
                }
            })
        } else {
            return tracks;
        }
    }
}

class Playlists {
    static getListOfUsersPlaylists() {
        const url = `${Utils.SPOTIFY_URL}/me/playlists`;
        return axios.get(url, {
            headers: {
                "Authorization": "Bearer " + store.getState().users.oAuthToken
            }
        });
    }

    static get(url) {
        return axios.get(url, {
            headers: {
                "Authorization": "Bearer " + store.getState().users.oAuthToken
            }
        })
    }

    static getNextPageListOfUsersPlaylists(nextUrl) {
        return axios.get(nextUrl, {
            headers: {
                "Authorization": "Bearer " + store.getState().users.oAuthToken
            }
        })
    }

    static getListOfTracksFromPlaylist(playlistId) {
        return axios.get(`${PLAYLIST_URL}/${playlistId}/tracks`, {
            headers: {
                "Authorization": "Bearer " + store.getState().users.oAuthToken
            }
        });
    }

    static getPlaylist(playlistId) {
        return axios.get(`${PLAYLIST_URL}/${playlistId}`, {
            headers: {
                "Authorization": "Bearer " + store.getState().users.oAuthToken
            }
        });
    }

    static createPlaylist(playlistOptions) {
        return axios.post(
            `${Utils.SPOTIFY_URL}/users/${store.getState().users.userId}/playlists`,
            playlistOptions, {
                headers: {
                    "Authorization": "Bearer " + store.getState().users.oAuthToken
                }
            });
    }
}

export {
    Playlists,
    FullListOfPlaylists,
    FullListOfTracks
};