import React from "react";
import "../css/home.css";
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import LoginButtonContainer from "../auth/loginButton";


const style = theme => ({
    root: {
        flexGrow: 1,
        [theme.breakpoints.up("md")]: {
            margin: 100,
        },
        [theme.breakpoints.down("sm")]: {
            margin: 50,
        },
        [theme.breakpoints.down("xs")]: {
            marginTop: 10,
        }
    },

    gridItem: {
        padding: 20,
    }
});

const imageSizes = {
    xs: 100,
    sm: 150,
    md: 250,
    lg: 350
}

const Home = (props) => {
    const { classes, width } = props;
    console.log(width);
    const imageSize = imageSizes[width];
    return (
        <div className={classes.root}>
            <Grid container justify="center" alignItems="center">
                <Grid item xs={4} className={classes.gridItem}>
                    <img style={{ maxHeight: imageSize, maxWidth: imageSize }}
                        src="/resources/img/headphones.png" />
                </Grid>
                <Grid item xs={8} className={classes.gridItem} alignItems="center" container direction="column" justify="space-around">
                    <Grid item xs>
                        <Typography gutterBottom align="center" variant="h2">
                            Create your perfect playlist
                    </Typography>
                        <Typography gutterBottom align="center" variant="h5" color="textSecondary">
                            Using spotify stuff
                    </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <LoginButtonContainer buttonProps={{ variant: "contained", color: "primary" }} shouldRedirect />
                    </Grid>

                </Grid>
            </Grid>
        </div>
    );
}

export default withWidth()(withStyles(style)(Home));
