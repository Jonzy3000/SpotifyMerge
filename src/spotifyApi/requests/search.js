import Utils from "../utils";
import Axios from "axios";
import store from "./../../redux/store";

const SEARCH_URL = `${Utils.SPOTIFY_URL}/search`;

class Search {
    static searchForTracksAndArtists(str) {
        return Axios.get(SEARCH_URL, {
            params: {
                q: str,
                type: "artist,track",
                limit: 4
            },
            headers: {
                "Authorization": "Bearer " + store.getState().users.oAuthToken
            }
        })
    }
}

export default Search;