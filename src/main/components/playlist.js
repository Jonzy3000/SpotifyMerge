import React from 'react'
import PropTypes from 'prop-types'

const Playlist = props =>
    <div>
        <h1> Hello World {props.name}</h1>
        <br />
        {props.track == null || props.track.length == null ?
            <EmptyPlaylist />
            :
            props.tracks.map((track) => {
                return <h6 key={track.track.id}>{track.track.name}</h6>
            })
        }
    </div>

const EmptyPlaylist = () =>
    <h1>Looks like this playlist is empty, lets add some songs!</h1>

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

