import React from 'react'
import PropTypes from 'prop-types'
import NewPlaylistFormContainer from "../containers/newPlaylistFormContainer";
import {ListGroup, ListGroupItem, Glyphicon} from "react-bootstrap"

const Playlists = (props) =>
    <ListGroup>
        <ListGroupItem onClick={() => props.toggleChildVisibility()}>
            <Glyphicon glyph="plus" /> Create New Playlist
            <div>
                <NewPlaylistFormContainer
                    isVisible={props.isChildVisible}
                    onSuccess={props.onSuccess}
                />
            </div>
        </ListGroupItem>
        {props.playlists.map((playlist) => {
            return <ListGroupItem
                key={playlist.id}
                onClick={() => props.onClick(playlist.id)}
            >
                {playlist.name}
            </ListGroupItem>;
        })}
    </ListGroup>

Playlists.propTypes = {
    isChildVisible: PropTypes.bool,
    onClick: PropTypes.func,
    onSuccess: PropTypes.func
}

export default Playlists

