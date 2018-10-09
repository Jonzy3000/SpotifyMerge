import React from 'react'
import PropTypes from 'prop-types'

const Playlist = props =>
    <div>
        <h1> Hello World {props.name}</h1>
        <br />
        {props.tracks.map((track) => {
            return <h6 key={track.track.id}>{track.track.name}</h6>
        })}
    </div>

Playlist.propTypes = {
    name: PropTypes.string,
    tracks: PropTypes.arrayOf(
        PropTypes.shape({
            track: PropTypes.shape({
                id: PropTypes.string,
                name: PropTypes.string,
                artists: PropTypes.arrayOf(PropTypes.string),
            })
        })
    )
}

export default Playlist

