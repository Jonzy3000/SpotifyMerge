import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import StringManipulationUtils from "../../utils/stringManipulationUtils";
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

const Playlist = props =>
    <div>
        {/* <h1> {props.name}</h1>
        <br /> */}
        {props.tracks == null || props.tracks.length == null ?
            <EmptyPlaylist />
            :
            <Paper className={props.classes.root}>
                <Table className={props.classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Artist</TableCell>
                            <TableCell>Album</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell numeric>Duration</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.tracks.map(track =>
                            <TableRow key={track.track.id}>
                                <TableCell component="th" scope="row">
                                    {track.track.name}
                                </TableCell>
                                <TableCell>{track.track.artists[0].name}</TableCell>
                                <TableCell>{track.track.album.name}</TableCell>
                                <TableCell>{track.added_at}</TableCell>
                                <TableCell numeric>{StringManipulationUtils.getMMSSFromMS(track.track.duration_ms)}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Paper>
        }
    </div>

const EmptyPlaylist = () =>
    <h1>Looks like this playlist is empty, lets add some songs!</h1>

const PlaylistTitle = props =>
    <React.Fragment>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            Playlist:
    </Typography>
        <Typography variant="h3" gutterBottom>
            {props.name}
        </Typography>
    </React.Fragment>


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

PlaylistTitle.propTypes = Playlist.propTypes;

const PlaylistWithStyles = withStyles(styles)(Playlist)

export {
    PlaylistWithStyles,
    PlaylistTitle
}


