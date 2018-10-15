import React from 'react'
import PropTypes from 'prop-types'
import NewPlaylistFormContainer from "../containers/newPlaylistFormContainer";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        display: 'flex'
    },
    media: {
        height: 100,
        width: "100%"
    },
    actionArea: {
        width: "100%"
    }
};

const Playlists = (props) =>
    <div className={props.classes.root}>
        <Grid container alignItems="center" spacing={24}>
            {props.playlists.map((playlist) => (
                <Grid item key={playlist.id} xs={12} sm={4} md={3}>
                    <Card className={props.classes.card}>
                        <CardActionArea className={props.classes.actionArea} onClick={() => { props.onClick(playlist.id) }}>
                            <PlaylistImage imageArray={playlist.images} media={props.classes.media} />
                            <CardContent className={props.classes.content}>
                                <Typography variant="h5" component="h5">
                                    {playlist.name}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {playlist.owner.display_name}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </div>

const PlaylistImage = props => {
    const { imageArray, media } = props;
    return (
        imageArray.length > 0 ?
            <CardMedia image={imageArray[0].url} className={media}></CardMedia>
            :
            ""
    )
}

// <ListGroup>
//     <ListGroupItem onClick={() => props.toggleChildVisibility()}>
//         <Glyphicon glyph="plus" /> Create New Playlist
//         <div>
//             <NewPlaylistFormContainer
//                 isVisible={props.isChildVisible}
//                 onSuccess={props.onSuccess}
//             />
//         </div>
//     </ListGroupItem>
//     {props.playlists.map((playlist) => {
//         return <ListGroupItem
//             key={playlist.id}
//             onClick={() => props.onClick(playlist.id)}
//         >
//             {playlist.name}
//         </ListGroupItem>;
//     })}
// </ListGroup>

Playlists.propTypes = {
    isChildVisible: PropTypes.bool,
    onClick: PropTypes.func,
    onSuccess: PropTypes.func
}

export default withStyles(styles)(Playlists);

