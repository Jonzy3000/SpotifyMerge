import React, { Component } from 'react'
import Search from "../../../spotifyApi/requests/search";
import { FormControl, FormGroup, InputGroup, Button, Glyphicon } from "react-bootstrap";
import { RecommendationApi, RecommendationQueryParamsFactory } from "../../../spotifyApi/requests/recommendations";



class SearchContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: "",
            artists: [],
            tracks: []
        }
    }

    onSearchChange(str) {
        this.setState((prevState) => {
            return {
                searchQuery: str,
            }
        });


        Search.searchForTracksAndArtists(str).then(({ data }) => {
            console.log(data);
            this.setState((prevState) => {
                return {
                    artists: data.artists.items,
                    tracks: data.tracks.items
                }
            });

            if (data.artists.items.length > 1) {
                const params = RecommendationQueryParamsFactory.getRecommendationQueryParams();
                params.seed_artists = data.artists.items[0].id;
                RecommendationApi.something(params).then((resp) => {
                    console.log(resp.data.tracks);
                })
            }
        })
    }

    render() {
        return (
            <div>
                <FormGroup controlId="name" bsSize="small">
                    <InputGroup>
                        <InputGroup.Addon>Search</InputGroup.Addon>
                        <FormControl
                            onChange={(e) => this.onSearchChange(e.target.value)}
                            type="text"
                        />
                        <FormControl componentClass="select">
                            {this.state.artists.map((artist) =>
                                <option value={artist.id} key={artist.id}>{artist.name}</option>
                            )}
                            {this.state.tracks.map((track) =>
                                <option value={track.id} key={track.id}>{track.name}</option>
                            )}
                            <option value="other">...</option>
                        </FormControl>
                    </InputGroup>
                </FormGroup>
            </div>
        )
    }
}

export default SearchContainer

