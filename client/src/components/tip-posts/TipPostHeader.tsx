import {
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
      padding: "8px 15px",
      marginRight: "5px",
    },
  })
);

const TipPostHeader = () => {
  const classes = useStyles();

  return (
    <Paper variant="outlined">
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
          <Grid justify="space-evenly" item container wrap="nowrap">
            <Grid
              xs={4}
              item
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Typography variant="subtitle1">Lowest</Typography>
              <Paper className={classes.tipInfoPaper}>$18/hr</Paper>
            </Grid>
            <Grid
              xs={4}
              item
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Typography variant="subtitle1">Typical</Typography>
              <Paper className={classes.tipInfoPaper}>$24/hr</Paper>
            </Grid>
            <Grid
              xs={4}
              item
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Typography variant="subtitle1">Highest</Typography>
              <Paper className={classes.tipInfoPaper}>$35/hr</Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TipPostHeader;