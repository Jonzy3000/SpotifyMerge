import Utils from "../utils";
import Axios from "axios";
import store from "./../../redux/store";

const SEARCH_URL = `${Utils.SPOTIFY_URL}/search`;

class Search {
    static searchForTracksAndArtists(str, limit) {
        if (str == "") {
            return;
        }

        return Axios.get(SEARCH_URL, {
            params: {
                q: str,
                type: "artist,track",
                limit: Number(limit)
            },
            headers: {
                "Authorization": "Bearer " + store.getState().users.oAuthToken
            }
        })
    }
}

export default Search;