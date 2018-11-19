
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Search from "../../../spotifyApi/requests/search";
import MultiChipTypeaheadSearchBox from "../../components/searchComponents/multiChipTypeaheadSearchBox";

class SearchContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: "",
            selectedItems: null,
            suggestions: [],
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    handleChange(value) {
        this.setState({
            selectedItems: value,
        });

        this.props.onSelectedItemsUpdate(value);
    }

    formatArtists(artists) {
        const artistsName = artists.map(({ name }) => name);
        return artistsName.join(", ");
    }

    createSuggestions(data) {
        const artistsForSuggestions = data.artists.items.map(({ id, name }) =>
            ({ value: id, label: name, isArtist: true })
        )

        const tracksForSuggestions = data.tracks.items.map(({ id, name, artists }) => ({
            value: id, label: `${name} - ${this.formatArtists(artists)}`,
            isArtist: false,
        }));

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
                searchQuery: str,
            }
        });

        if (str == "") {
            return;
        }

        return Search.searchForTracksAndArtists(str, 6).then(({ data }) => {
            console.log(data);
            return this.createSuggestions(data);
        });
    }

    render() {

        return (
            <div  >
                <MultiChipTypeaheadSearchBox
                    onSelectionChange={this.handleChange}
                    onLoadSuggestions={this.onSearchChange}
                    value={this.state.multi}
                />
            </div >
        )
    }
}

SearchContainer.propTypes = {
    onSelectedItemsUpdate: PropTypes.func.isRequired,
}

export default SearchContainer;

