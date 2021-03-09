import {
  Box,
  Button,
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
    rootGrid: {
      marginTop: "2rem",
    },

    tipPostRoot: {
      maxWidth: "1000px",
    },

    headerRootGrid: {
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
      paddingBottom: "30px",
    },

    headerLeftCol: {
      minWidth: "190px",
      flexDirection: "row",
    },

    mobileRowMargin: {
      [theme.breakpoints.down("xs")]: {
        marginBottom: "1rem",
      },
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

    tipInfoPaper: {
      padding: "8px",
      marginRight: "5px",
    },

    bottomRootGrid: {
      padding: "20px",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },

    userShareTitle: {
      padding: "5px",
    },

    userSharePost: {
      [theme.breakpoints.down("sm")]: {
        flexDirection: "row",
        paddingBottom: "20px",
      },
    },
  })
);

const TipPostMain = () => {
  const classes = useStyles();

  return (
    <Grid justify="center" className={classes.rootGrid} container>
      <Grid item sm={1} />
      <Grid
        className={classes.tipPostRoot}
        item
        sm={10}
        container
        direction="column"
      >
        <Paper variant="outlined">
          {/* Header Component */}
          <Grid item container className={classes.headerRootGrid}>
            {/* Left Column / Top row on mobile */}
            <Grid
              item
              justify="center"
              className={classes.mobileRowMargin}
              container
              sm={5}
            >
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

            {/* Right Column or Bottom Row on mobile */}
            <Grid
              container
              direction="column"
              justify="space-evenly"
              alignItems="center"
              item
              sm={7}
            >
              <Grid className={classes.mobileRowMargin} item>
                <Typography component="p" variant="h6">
                  Wolf + Sparrow
                </Typography>
                <Typography component="p" variant="body1">
                  4480 Spring Mountain Rd #100, Las Vegas, NV 89102
                </Typography>
                <Typography component="p" variant="subtitle2">
                  <span style={{ fontWeight: "bold" }}>Operational:</span> Yes
                </Typography>
              </Grid>
              <Grid justify="center" item container wrap="nowrap">
                <Grid item>
                  <Paper className={classes.tipInfoPaper}>Low: $10/hr</Paper>
                </Grid>
                <Grid item>
                  <Paper className={classes.tipInfoPaper}>Avg: $15/hr</Paper>
                </Grid>
                <Grid item>
                  <Paper className={classes.tipInfoPaper}>High: $120/hr</Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Typography variant="h5" component="h5">
              <Paper
                className={classes.userShareTitle}
                component="span"
                variant="outlined"
              >
                User Shares
              </Paper>
            </Typography>
          </Grid>

          {/* Bottom Component (User post component) */}
          <Grid item>
            <Paper>
              <Grid
                className={classes.bottomRootGrid}
                item
                container
                justify="space-around"
              >
                <Grid
                  item
                  sm={12}
                  md={3}
                  container
                  alignItems="center"
                  spacing={1}
                  direction="column"
                  className={classes.userSharePost}
                >
                  <Grid item>
                    <Paper className={classes.tipInfoPaper}>Low: $10/hr</Paper>
                  </Grid>
                  <Grid item>
                    <Paper className={classes.tipInfoPaper}>Avg: $15/hr</Paper>
                  </Grid>
                  <Grid item>
                    <Paper className={classes.tipInfoPaper}>
                      High: $120/hr
                    </Paper>
                  </Grid>
                </Grid>
                <Grid item sm={12} md={9} container direction="column">
                  <Grid item>
                    <Typography component="p" variant="body2">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Rerum, earum voluptas magnam incidunt id quasi labore iste
                      impedit officiis doloribus dolorum totam vitae nisi ipsum,
                      et mollitia reprehenderit excepturi est nesciunt atque.
                      Accusantium odio cumque, quo qui provident quos quia nulla
                      cupiditate! Vitae beatae unde sapiente similique
                      perspiciatis laborum error?
                    </Typography>
                  </Grid>
                  <Grid item>Flag and up/down vote buttons</Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Paper>
      </Grid>
      <Grid item sm={1} />
    </Grid>
  );
};

export default TipPostMain;
