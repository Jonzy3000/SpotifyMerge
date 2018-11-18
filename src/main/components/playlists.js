import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        display: 'flex',
        height: 175
    },
    media: {
        height: 75,
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
                <Grid item key={playlist.id} xs={12} sm={6} md={4} lg={3}>
                    <Card className={props.classes.card}>
                        <CardActionArea className={props.classes.actionArea} onClick={() => { props.onClick(playlist.id) }}>
                            <PlaylistImage imageArray={playlist.images} media={props.classes.media} />
                            <CardContent className={props.classes.content}>
                                <Typography noWrap={true} variant="h6" component="h6">
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

Playlists.propTypes = {
    isChildVisible: PropTypes.bool,
    onClick: PropTypes.func,
}

export default withStyles(styles)(Playlists);

