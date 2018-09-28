import Utils from "../utils.js";
import axios from "axios";

const PLAYLIST_URL = `${Utils.SPOTIFY_URL}/playlists`

class FullListOfPlaylists {
    constructor(oAuthToken) {
        this.playlistsRequests = new Playlists(oAuthToken);
        this.oAuthToken = oAuthToken;
    }

    getFullListOfUsersPlaylists(nextUrl, previousPlaylists) {
        if (nextUrl == null && previousPlaylists) {
            return previousPlaylists;
        }

        if (nextUrl == null && previousPlaylists == null) {
            return this.playlistsRequests.getListOfUsersPlaylists()
                .then((resp) => {
                    if (resp.data.next) {
                        return this.getFullListOfUsersPlaylists(
                            resp.data.next,
                            resp.data.items
                        );
                    } else {
                        return resp.data.items;
                    }
                });
        } else {
            return this.playlistsRequests.getNextPageListOfUsersPlaylists(
                nextUrl
            ).then((resp) => {
                if (resp.data.next) {
                    return this.getFullListOfUsersPlaylists(
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

class Playlists {
    constructor(oAuthToken) {
        this.oAuthToken = oAuthToken;
    }

    getListOfUsersPlaylists() {
        const url = `${Utils.SPOTIFY_URL}/me/playlists`;
        return axios.get(url, {
            headers: {
                "Authorization": "Bearer " + this.oAuthToken
            }
        });
    }

    getNextPageListOfUsersPlaylists(nextUrl) {
        return axios.get(nextUrl, {
            headers: {
                "Authorization": "Bearer " + this.oAuthToken
            }
        })
    }

    getListOfTracksFromPlaylist(playlistId) {
        return axios.get(`${PLAYLIST_URL}/${playlistId}`, {
            headers: {
                "Authorization": "Bearer " + this.oAuthToken
            }
        });
    }

    createPlaylist(userId, playlistOptions) {
        return axios.post(
            `${Utils.SPOTIFY_URL}/users/${userId}/playlists`,
            playlistOptions, {
                headers: {
                    "Authorization": "Bearer " + this.oAuthToken
                }
            });
    }
}

export {
    Playlists,
    FullListOfPlaylists
};