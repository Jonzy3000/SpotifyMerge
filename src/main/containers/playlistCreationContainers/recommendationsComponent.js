import React from "react";
import { connect } from "react-redux";
import {
  RecommendationApi,
  RecommendationQueryParamsFactory
} from "../../../spotifyApi/requests/recommendations";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ScaleLoader from "react-spinners/ScaleLoader";
import * as playlistsActions from "../../../redux/actions/playlistCreation";

class RecommendationsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendations: []
    };
  }

  generateParamsFromOptions() {
    const params = RecommendationQueryParamsFactory.getRecommendationQueryParams();
    params.limit = this.props.options.limit;
    return params;
  }

  createPlaylist() {
    let artist_ids = this.props.selectedItems
      .filter(item => item.isArtist)
      .map(({ value }) => value);

    let track_ids = this.props.selectedItems
      .filter(item => !item.isArtist)
      .map(({ value }) => value);

    const params = this.generateParamsFromOptions();

    params.seed_artists = artist_ids;
    params.seed_tracks = track_ids;

    RecommendationApi.getRecommendations(params).then(responses => {
      debugger;
      const tracks = [].concat(
        ...responses.map(response => response.data.tracks)
      );
      this.setState({ recommendations: tracks });
      this.props.updateRecommendations(tracks);
    });
  }

  componentDidMount() {
    this.createPlaylist();
  }

  formatArtists(artists) {
    const artistsName = artists.map(({ name }) => name);
    return artistsName.join(", ");
  }

  render() {
    return this.state.recommendations.length > 0 ? (
      <React.Fragment>
        <List>
          {this.state.recommendations.map(track => (
            <React.Fragment>
              <ListItem dense>
                <ListItemText
                  primary={track.name}
                  secondary={this.formatArtists(track.artists)}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </React.Fragment>
    ) : (
      <ScaleLoader />
    );
  }
}

const mapStateToProps = ({ playlists }) => {
  return {
    selectedItems: playlists.generationPayload,
    options: playlists.playlistOptions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateRecommendations: recommendations =>
      dispatch(playlistsActions.updateRecommendations(recommendations))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecommendationsComponent);
