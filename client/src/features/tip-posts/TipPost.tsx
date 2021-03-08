import {
  Button,
  Container,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerRootGrid: {
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
    },

    headerLeftCol: {
      minWidth: "190px",
      flexDirection: "row",
    },

    photo: {
      height: "190px",
      width: "190px",

      [theme.breakpoints.down("xs")]: {
        height: "210px",
        width: "210px",
      },

      marginTop: "15px",
      marginBottom: "10px",
      backgroundImage: `url(https://lh3.googleusercontent.com/p/AF1QipOD7S2BF3pTieo2TrZ0-N41sKDp88hXU0eRb7Ty=s1600-w400)`,
      backgroundSize: "cover",
      borderRadius: "10px ",
    },
  })
);

const TipPost = () => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item sm={1} />
      <Grid item sm={10} container direction="column">
        <Paper variant="outlined">
          {/* Top Component */}
          <Grid item container className={classes.headerRootGrid}>
            {/* Left Column */}
            <Grid item justify="center" container sm={6}>
              {/* Photo */}
              <Grid
                container
                justify="center"
                item
                className={classes.headerLeftCol}
                md={7}
                sm={12}
              >
                <Paper className={classes.photo} />
              </Grid>
              {/* Post count and create post button */}
              <Grid
                item
                container
                justify="space-evenly"
                alignItems="center"
                direction="column"
                md={5}
              >
                <Grid item>
                  <Typography component="p" variant="h6">
                    Tip Count: 15
                  </Typography>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Leave Tip
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            {/* Right Column */}
            <Grid item sm={6}>
              Right
            </Grid>
          </Grid>

          {/* Bottom Component */}
          <Grid item container>
            Bottom
          </Grid>
        </Paper>
      </Grid>
      <Grid item sm={1} />
    </Grid>
  );
};

export default TipPost;
