import React from "react";
import PropTypes from "prop-types";
import {FormControl, FormGroup, InputGroup} from "react-bootstrap";

class NewPlaylistForm extends React.Component {
    visible() {
        return (
            <form onClick={(e) => {
                e.stopPropagation();
            }}>
                <hr />
                <FormGroup controlId="name" bsSize="small">
                    <InputGroup>
                        <InputGroup.Addon>Name</InputGroup.Addon>
                        <FormControl
                            onChange={(e) => this.props.onNameChange(e.target.value)}
                            type="text"
                        />
                    </InputGroup>
                </FormGroup>

                <FormGroup controlId="description">
                    <InputGroup>
                        <InputGroup.Addon>Description</InputGroup.Addon>
                        <FormControl
                            componentClass="textarea"
                            placeholder="textarea"
                            onChange={(e) => this.props.onDescriptionChange(e.target.value)}
                        />
                    </InputGroup>
                </FormGroup>

                <FormGroup>
                    <Button
                        bsStyle="success"
                        onClick={() => this.props.onSuccessClick()}
                        block
                    >
                        <Glyphicon glyph="plus" /> Create Playlist
                    </Button>
                </FormGroup>
            </form >
        );
    }

    notVisible() {
        console.log("not visible");
        return ("");
    }

    render() {
        return (
            this.props.isVisible ? this.visible() : this.notVisible()
        );
    }
}

NewPlaylistForm.propTypes = {
    onNameChange: PropTypes.func,
    onDescriptionChange: PropTypes.func,
    onSuccessClick: PropTypes.func,
    isVisible: PropTypes.bool
}

export default NewPlaylistForm;