import Utils from "../utils.js";
import axios from "axios";

const USER_URL = `${Utils.SPOTIFY_URL}/me`;

class UserProfile {
    getCurrentUsersProfile(oAuthToken) {
        return axios.get(USER_URL, {
            headers: {
                Authorization: "Bearer " + oAuthToken
            },
        })
    }
};

export default UserProfile;