import Utils from "../utils";
import Axios from "axios";
import store from "./../../redux/store";

const RECOMMENDATION_URL = `${Utils.SPOTIFY_URL}/recommendations`;
class RecommendationApi {
  static getRecommendations(params) {
    const limit = params.limit;
    const tracks = params.seed_tracks;
    const artists = params.seed_artists;

    const tracksChunked = this.chunkArray(tracks);
    const artistsChunk = this.chunkArray(artists);

    const numberOfRequests = tracksChunked.length + artistsChunk.length;

    const newLimit = Math.ceil(limit / numberOfRequests);

    let requests = [];

    tracksChunked.forEach(tracks => {
      requests.push(
        this.createRecommendations({
          ...params,
          seed_tracks: tracks.join(","),
          seed_artists: null,
          limit: newLimit
        })
      );
    });

    artistsChunk.forEach(artists => {
      requests.push(
        this.createRecommendations({
          ...params,
          seed_tracks: null,
          seed_artists: artists.join(","),
          limit: newLimit
        })
      );
    });

    return Promise.all(requests);
  }

  static createRecommendations(params) {
    return Axios.get(RECOMMENDATION_URL, {
      params,
      headers: {
        Authorization: "Bearer " + store.getState().users.oAuthToken
      }
    });
  }

  static chunkArray(arr) {
    const chunks = [];

    while (arr.length > 0) {
      chunks.push(arr.splice(0, 5));
    }

    return chunks;
  }

  static getGenreSeeds() {
    const url = `${RECOMMENDATION_URL}/available-genre-seeds`;
    return Axios.get(url, {
      headers: {
        Authorization: "Bearer " + store.getState().users.oAuthToken
      }
    });
  }
}

class RecommendationQueryParamsFactory {
  static getRecommendationQueryParams() {
    return Object.assign({}, RecommendationQueryParams);
  }
}

const RecommendationQueryParams = {
  limit: null,
  market: null,
  seed_artists: null,
  seed_genres: null,
  seed_tracks: null,
  max_acousticness: null,
  min_acousticness: null,
  target_acousticness: null,
  max_danceability: null,
  min_danceability: null,
  target_danceability: null,
  max_duration_ms: null,
  min_duration_ms: null,
  target_duration_ms: null,
  max_energy: null,
  min_energy: null,
  target_energy: null,
  max_instrumentalness: null,
  min_instrumentalness: null,
  target_instrumentalness: null,
  max_liveness: null,
  min_liveness: null,
  target_liveness: null,
  max_loudness: null,
  min_loudness: null,
  target_loudness: null,
  max_mode: null,
  min_mode: null,
  target_mode: null,
  max_popularity: null,
  min_popularity: null,
  target_popularity: null,
  max_speechiness: null,
  min_speechiness: null,
  target_speechiness: null,
  max_tempo: null,
  min_tempo: null,
  target_tempo: null,
  max_time_signature: null,
  min_time_signature: null,
  target_time_signature: null,
  max_valence: null,
  min_valence: null,
  target_valence: null
};

export { RecommendationApi, RecommendationQueryParamsFactory };
