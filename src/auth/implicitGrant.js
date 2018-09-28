/**
 * https://github.com/jonnyk20/spotify-node-react-starter-kit/blob/master/auth-server/implicit_grant/public/index.html
 */


class ImplicitGrant {
    constructor() {
        this.stateKey = 'spotify_auth_state';
    }


    /**
     * Obtains parameters from the hash of the URL
     * @return Object
     */
    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while (e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }

    /**
     * Generates a random string containing numbers and letters
     * @param  {number} length The length of the string
     * @return {string} The generated string
     */
    generateRandomString(length) {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    login() {
        var client_id = '86fd4a042b0447cab2dee2c58f417c05'; // Your client id
        var redirect_uri = 'http://localhost:8080/callback'; // Your redirect uri

        var state = this.generateRandomString(16);

        localStorage.setItem(this.stateKey, state);

        var scope = 'user-read-private user-read-email playlist-read-private playlist-modify-private playlist-read-collaborative playlist-modify-public';

        var url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(client_id);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
        url += '&state=' + encodeURIComponent(state);

        window.location = url;
    }
};

export default ImplicitGrant;