import Utils from "../utils.js";
import axios from "axios";
import store from "../../redux/store";

const USER_URL = `${Utils.SPOTIFY_URL}/me`;

class UserProfile {
    static getCurrentUsersProfile(oAuthToken) {
        return axios.get(USER_URL, {
            headers: {
                Authorization: "Bearer " + store.getState().users.oAuthToken
            },
        })
    }
};

export default UserProfile;