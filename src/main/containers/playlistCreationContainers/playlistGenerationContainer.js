import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SearchContainer from "./searchContainers/searchContainer";
import { Playlists } from "../../../spotifyApi/requests/playlists";
import RecommendationsComponent from "./recommendationsComponent";
import AdvancedOptions from "./advancedOptions";
import * as playlistActions from "../../../redux/actions/playlistCreation";
import { connect } from "react-redux";
import Utils from "../../../spotifyApi/utils";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

class PlaylistGenerationContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
      steps: ["Choose Artists and Songs", "Advanced Options", "Check Results"],
      playlistId: Utils.getHashParams().id
    };

    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleReset = this.handleReset.bind(this);
    props.updatePlaylistId(this.state.id);
  }

  handleNext() {
    if (this.state.activeStep + 1 == this.state.steps.length) {
      this.addToPlaylist();
      return;
    }

    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  }

  handleBack() {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  }

  handleReset() {
    this.setState(state => ({
      activeStep: 0
    }));
  }

  addToPlaylist() {
    Playlists.addTracksToPlayList(
      this.state.playlistId,
      this.props.recommendations.map(({ uri }) => uri)
    );

    this.goToPlaylist(this.state.playlistId);
  }

  goToPlaylist(id) {
    this.props.history.push(`/playlist#id=${id}`);
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
              <Typography className={classes.instructions}>
                All steps completed
              </Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
            <div className="container">
              <StepperStateWithId activeStep={activeStep} />
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                >
                  {activeStep === steps.length - 1
                    ? "Add Songs To Playlist"
                    : "Next"}
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
      recommendations: []
    };

    this.handleSelectedItemsChange = this.handleSelectedItemsChange.bind(this);
  }

  static getDerivedStateFromProps(props, prevState) {
    if (props.activeStep !== prevState.step) {
      return { step: props.activeStep };
    }

    return null;
  }

  handleSelectedItemsChange(value) {
    this.setState({ selectedItems: value });
  }

  render() {
    const { step } = this.state;
    switch (step) {
      case 0:
        return <SearchContainer />;
      case 1:
        return <AdvancedOptions />;
      case 2:
        return <RecommendationsComponent />;
      default:
        return <Typography>Error</Typography>;
    }
  }
}

const style = { width: 400, margin: 50 };

const mapDispatchToProps = dispatch => {
  return {
    updatePlaylistId: id => dispatch(playlistActions.updatePlaylistId(id))
  };
};

const mapStateToProps = ({ playlists }) => {
  return {
    recommendations: playlists.recommendations
  };
};

const StepperStateWithId = connect(
  null,
  mapDispatchToProps
)(withRouter(StepperState));

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PlaylistGenerationContainer));
