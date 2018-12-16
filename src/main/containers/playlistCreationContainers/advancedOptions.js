import React from "react";
import Typography from "@material-ui/core/Typography";
import { FormControl, TextField } from "@material-ui/core";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { connect } from "react-redux";
import * as playlistCreation from "../../../redux/actions/playlistCreation";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class AdvancedOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minMax: {
        popularity: {
          defaultMin: 0,
          defaultMax: 100,
          label: "Popularity",
          min: null,
          max: null
        },
        tempo: {
          defaultMin: 0,
          defaultMax: 200,
          label: "Tempo",
          min: null,
          max: null
        }
      },
      limit: 100
    };
  }

  onSliderChange(key, value) {
    var property = { ...this.state.minMax[key] };
    property.min = value[0];
    property.max = value[1];

    this.setState({
      minMax: {
        ...this.state.minMax,
        [key]: property
      }
    });

    this.props.updateOptions(this.state);
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
        <FormControl>
          <TextField
            id="name"
            label="Limit"
            variant="outlined"
            required
            type="number"
            max="100"
            onChange={e => this.onLimitChange(e)}
          />
        </FormControl>

        {Object.keys(this.state.minMax).map(key => {
          const value = this.state.minMax[key];
          return (
            <div key={key}>
              <Typography variant="body1">{value.label}</Typography>
              <Range
                key={key}
                allowCross={false}
                defaultValue={[value.defaultMin, value.defaultMax]}
                tipFormatter={value => (
                  <Typography variant="body1">{value}</Typography>
                )}
                onChange={value => this.onSliderChange(key, value)}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateOptions: options =>
      dispatch(playlistCreation.updateOptionsChosen(options))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AdvancedOptions);
