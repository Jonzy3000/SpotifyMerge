import React, { Component } from 'react'
import Search from "../../../spotifyApi/requests/search";
import { RecommendationApi, RecommendationQueryParamsFactory } from "../../../spotifyApi/requests/recommendations";
import MultiChipTypeaheadSearchBox from "../../components/searchComponents/multiChipTypeaheadSearchBox"
import Button from '@material-ui/core/Button';

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
            // if (data.artists.items.length > 1) {
            //     const params = RecommendationQueryParamsFactory.getRecommendationQueryParams();
            //     params.seed_artists = data.artists.items[0].id;
            //     RecommendationApi.something(params).then((resp) => {
            //         console.log(resp.data.tracks);
            //     })
            // }
        });
    }

    createPlaylist() {
        let artist_ids = this.state.selectedItems.filter(item => item.isArtist).map(({ value }) => value);
        let track_ids = this.state.selectedItems.filter(item => !item.isArtist).map(({ value }) => value);

        const params = RecommendationQueryParamsFactory.getRecommendationQueryParams();
        params.seed_artists = artist_ids.join(",");
        params.seed_tracks = track_ids.join(",");
        RecommendationApi.something(params).then((resp) => {
            console.log(resp.data.tracks);
        })
    }

    render() {

        return (
            <div  >
                <MultiChipTypeaheadSearchBox
                    onSelectionChange={this.handleChange}
                    onLoadSuggestions={this.onSearchChange}
                    value={this.state.multi}
                />
                <Button variant="contained" color="primary" onClick={() => { this.createPlaylist() }}>
                    Create Playlist
                </Button>
            </div >
        )
    }
}

export default SearchContainer;

