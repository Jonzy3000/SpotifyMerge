import React, { Component } from 'react'
import Search from "../../../spotifyApi/requests/search";
import { RecommendationApi, RecommendationQueryParamsFactory } from "../../../spotifyApi/requests/recommendations";
import MultiChipTypeaheadSearchBox from "../../components/searchComponents/multiChipTypeaheadSearchBox"
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Playlists } from "../../../spotifyApi/requests/playlists";

class SearchContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: "",
            selectedItems: null,
            suggestions: [],
            recommendations: [],
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
        });
    }

    createPlaylist() {
        let artist_ids = this.state.selectedItems.filter(item => item.isArtist).map(({ value }) => value);
        let track_ids = this.state.selectedItems.filter(item => !item.isArtist).map(({ value }) => value);

        const params = RecommendationQueryParamsFactory.getRecommendationQueryParams();
        params.seed_artists = artist_ids.join(",");
        params.seed_tracks = track_ids.join(",");
        RecommendationApi.something(params).then((resp) => {
            this.setState(
                { recommendations: resp.data.tracks }
            );
            console.log(resp.data.tracks);
        })
    }

    addToPlaylist() {
        Playlists.addTracksToPlayList("6KcypTTZwgGbEh2TXdmHK6", this.state.recommendations.map(({ uri }) => uri));
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
                {this.state.recommendations.length > 0 ?
                    <React.Fragment>
                        <Button variant="contained" color="secondary" onClick={() => this.addToPlaylist()}>
                            Add To Playlist
                        </Button>
                        <List>
                            {this.state.recommendations.map(track =>
                                <React.Fragment>
                                    <ListItem dense>
                                        <ListItemText primary={track.name} secondary={this.formatArtists(track.artists)} />
                                    </ListItem>
                                    <Divider />
                                </React.Fragment>
                            )}
                        </List>
                    </React.Fragment>
                    : null}
            </div >
        )
    }
}

export default SearchContainer;

