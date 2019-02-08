import React, { Component } from "react";
import { connect } from "react-redux";

import Search from "../../../../spotifyApi/requests/search";
import MultiChipTypeaheadSearchBox from "../../../components/searchComponents/multiChipTypeaheadSearchBox";
import * as playlistCreation from "../../../../redux/actions/playlistCreation";
import { FormControl, TextField } from "@material-ui/core";

class SearchContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
      selectedItems: null,
      suggestions: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  handleChange(value) {
    this.setState({
      selectedItems: value
    });

    this.props.updateSelection(value);
  }

  formatArtists(artists) {
    const artistsName = artists.map(({ name }) => name);
    return artistsName.join(", ");
  }

  createSuggestions(data) {
    const artistsForSuggestions = data.artists.items.map(({ id, name }) => ({
      value: id,
      label: name,
      isArtist: true
    }));

    const tracksForSuggestions = data.tracks.items.map(
      ({ id, name, artists }) => ({
        value: id,
        label: `${name} - ${this.formatArtists(artists)}`,
        isArtist: false
      })
    );

    return [
      {
        label: "Artists",
        options: artistsForSuggestions
      },
      {
        label: "Tracks",
        options: tracksForSuggestions
      }
    ];
  }

  onSearchChange(str) {
    this.setState(() => {
      return {
        searchQuery: str
      };
    });

    if (str == "") {
      return;
    }

    return Search.searchForTracksAndArtists(str, 6).then(({ data }) => {
      console.log(data);
      return this.createSuggestions(data);
    });
  }

  onLimitChange(e) {
    const number = Number(e.target.value);
    this.setState(
      () => ({
        limit: number
      }),
      () => {
        this.props.updateOptions(this.state);
      }
    );
  }

  render() {
    return (
      <div>
        <MultiChipTypeaheadSearchBox
          onSelectionChange={this.handleChange}
          onLoadSuggestions={this.onSearchChange}
          value={this.state.multi}
        />

        <FormControl>
          <TextField
            id="name"
            label="Number Of Songs"
            variant="outlined"
            required
            type="number"
            max="100"
            onChange={e => this.onLimitChange(e)}
          />
        </FormControl>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateSelection: selectedItems =>
      dispatch(playlistCreation.updateSongsChosen(selectedItems)),
    updateOptions: options =>
      dispatch(playlistCreation.updateOptionsChosen(options))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SearchContainer);
