import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SearchContainer from "./searchContainers/searchContainer";
import { RecommendationApi, RecommendationQueryParamsFactory } from "../../spotifyApi/requests/recommendations";
import { Playlists } from "../../spotifyApi/requests/playlists";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ScaleLoader from "react-spinners/ScaleLoader";
import { ETIME } from "constants";
import { FormControl, TextField } from "@material-ui/core";

const styles = theme => ({
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    }
});

const c1 = props => (
    <SearchContainer />
)

const c2 = props => (
    <div>Test</div>
)

class SongGenerationContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            activeStep: 0,
            steps: ["Choose Artists and Songs", "Advanced Options", "Check Results"]
        }

        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleNext() {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }))
    }

    handleBack() {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }))
    }

    handleReset() {
        this.setState(state => ({
            activeStep: 0
        }))
    }

    render() {
        const { classes } = this.props;
        const { activeStep, steps } = this.state;

        return (
            <div className={classes.root}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map(label => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <div>
                    {this.state.activeStep === steps.length ? (
                        <div>
                            <Typography className={classes.instructions}>All steps completed</Typography>
                            <Button onClick={this.handleReset}>Reset</Button>
                        </div>
                    ) : (
                            <div className="container">
                                <StepperState activeStep={activeStep} />
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={this.handleBack}
                                        className={classes.backButton}
                                    >
                                        Back
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={this.handleNext}>
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}

/**
 * Need to combine SearchContainer with this some how
 */
class StepperState extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            step: props.activeStep,
            selectedItems: [],
            recommendations: [],
        }

        this.handleSelectedItemsChange = this.handleSelectedItemsChange.bind(this);
    }

    static getDerivedStateFromProps(props, prevState) {
        if (props.activeStep !== prevState.step) {
            return { step: props.activeStep }
        }

        return null;
    }

    handleSelectedItemsChange(value) {
        this.setState({ selectedItems: value });
    }

    addToPlaylist() {
        Playlists.addTracksToPlayList("6KcypTTZwgGbEh2TXdmHK6", this.state.recommendations.map(({ uri }) => uri));
    }

    render() {
        const { step } = this.state;
        let ret = (<Typography>Error</Typography>);
        switch (step) {
            case 0:
                ret = <SearchContainer
                    onSelectedItemsUpdate={this.handleSelectedItemsChange}
                />;
                break;
            case 1:
                ret = <AdvancedOptions />;
                return ret;
            case 2:
                ret = <RecommendationsComponent selectedItems={this.state.selectedItems} />;
                break;
            default:
                return <Typography>Error</Typography>
        }

        return ret;
    }
}

class RecommendationsComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recommendations: [],
        }
    }

    createPlaylist() {
        let artist_ids = this.props.selectedItems.filter(item => item.isArtist).map(({ value }) => value);
        let track_ids = this.props.selectedItems.filter(item => !item.isArtist).map(({ value }) => value);

        const params = RecommendationQueryParamsFactory.getRecommendationQueryParams();
        params.seed_artists = artist_ids.join(",");
        params.seed_tracks = track_ids.join(",");
        RecommendationApi.something(params).then((resp) => {
            this.setState(
                { recommendations: resp.data.tracks }
            );
        })
    }

    componentDidMount() {
        this.createPlaylist();
    }

    formatArtists(artists) {
        const artistsName = artists.map(({ name }) => name);
        return artistsName.join(", ");
    }


    render() {
        return (
            this.state.recommendations.length > 0 ?
                <React.Fragment>
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
                : <ScaleLoader />
        )
    }
}

class AdvancedOptions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            minMax: {
                minPopularity: 0,
                maxPopularity: 100,
                minTempo: 0,
                maxTempo: 200,
            },
            limit: 100
        }
    }

    render() {
        return (
            <FormControl>
                <TextField
                    id="name"
                    label="Limit"
                    variant="outlined"
                    required
                    type="number"
                    max="100"
                />
            </FormControl>
        );
    }


}

export default withStyles(styles)(SongGenerationContainer);
