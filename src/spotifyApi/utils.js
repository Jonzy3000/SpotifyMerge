const Utils = {
    SPOTIFY_URL: "https://api.spotify.com/v1",
    getHashParams: () => {

        var hashParams = {};
        var e,
            a = /\+/g, // Regex for replacing addition symbol with a space
            r = /([^&;=]+)=?([^&;]*)/g,
            d = function (s) {
                return decodeURIComponent(s.replace(a, " "));
            },
            q = window.location.hash.substring(1);

        while (e = r.exec(q))
            hashParams[d(e[1])] = d(e[2]);

        return hashParams;
    },
    getLastPramOfUrl: (url) => {
        const splitUrl = url.split("/");
        return splitUrl[splitUrl.length - 1] || "";
    }
}

export default Utils;