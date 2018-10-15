import React, { Component } from 'react'
import Search from "../../../spotifyApi/requests/search";
import { RecommendationApi, RecommendationQueryParamsFactory } from "../../../spotifyApi/requests/recommendations";
import MultiChipTypeaheadSearchBox from "../../components/searchComponents/multiChipTypeaheadSearchBox"



// const suggestions = [
//     { label: 'Afghanistan' },
//     { label: 'Aland Islands' },
//     { label: 'Albania' },
//     { label: 'Algeria' },
//     { label: 'American Samoa' },
//     { label: 'Andorra' },
//     { label: 'Angola' },
//     { label: 'Anguilla' },
//     { label: 'Antarctica' },
//     { label: 'Antigua and Barbuda' },
//     { label: 'Argentina' },
//     { label: 'Armenia' },
//     { label: 'Aruba' },
//     { label: 'Australia' },
//     { label: 'Austria' },
//     { label: 'Azerbaijan' },
//     { label: 'Bahamas' },
//     { label: 'Bahrain' },
//     { label: 'Bangladesh' },
//     { label: 'Barbados' },
//     { label: 'Belarus' },
//     { label: 'Belgium' },
//     { label: 'Belize' },
//     { label: 'Benin' },
//     { label: 'Bermuda' },
//     { label: 'Bhutan' },
//     { label: 'Bolivia, Plurinational State of' },
//     { label: 'Bonaire, Sint Eustatius and Saba' },
//     { label: 'Bosnia and Herzegovina' },
//     { label: 'Botswana' },
//     { label: 'Bouvet Island' },
//     { label: 'Brazil' },
//     { label: 'British Indian Ocean Territory' },
//     { label: 'Brunei Darussalam' },
// ].map(suggestion => ({
//     value: suggestion.label,
//     label: suggestion.label,
// }));

class SearchContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: "",
            artists: [],
            tracks: [],
            multi: null,
            suggestions: [],
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    handleChange(value) {
        this.setState({
            multi: value,
        });
    }

    formatArtists(artists) {
        const artistsName = artists.map(({ name }) => name);
        return artistsName.join(", ");
    }

    createSuggestions() {
        const artistsForSuggestions = this.state.artists.map(({ id, name }) =>
            ({ value: id, label: name })
        )

        const tracksForSuggestions = this.state.tracks.map(({ id, name, artists }) => ({
            value: id, label: `${name} - ${this.formatArtists(artists)}`
        }));

        this.setState(() => {
            return {
                suggestions: [
                    {
                        label: "Artists",
                        options: artistsForSuggestions
                    },
                    {
                        label: "Tracks",
                        options: tracksForSuggestions
                    }
                ]
            }
        })
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

        Search.searchForTracksAndArtists(str, 6).then(({ data }) => {
            console.log(data);
            this.setState(() => {
                return {
                    artists: data.artists.items,
                    tracks: data.tracks.items
                }
            });

            this.createSuggestions();
            // if (data.artists.items.length > 1) {
            //     const params = RecommendationQueryParamsFactory.getRecommendationQueryParams();
            //     params.seed_artists = data.artists.items[0].id;
            //     RecommendationApi.something(params).then((resp) => {
            //         console.log(resp.data.tracks);
            //     })
            // }
        })
    }

    render() {

        return (
            <div  >
                <MultiChipTypeaheadSearchBox
                    onSelectionChange={this.handleChange}
                    onInputChange={this.onSearchChange}
                    suggestions={this.state.suggestions}
                    value={this.state.multi}
                />
                {/* <form autoComplete="off">
                    <TextField
                        fullWidth
                        placeholder="Type a song or artist"
                        variant="outlined"
                        label="Search"
                        onChange={(e) => this.onSearchChange(e.target.value)}
                        InputProps={{
                            startAdornment:
                                <InputAdornment position="start">
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                        }}>

                    </TextField>
                </form> */}
                {

                    /* <FormGroup controlId="name" bsSize="small">
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
                </FormGroup> */}
            </div >
        )
    }
}

export default SearchContainer;

