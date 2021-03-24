import { Grid, IconButton, Paper, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/BookmarkBorder";
import React, { Fragment } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridHeight: {
      height: "100%",
    },
    fullWidth: {
      width: "100%",
    },

    resultPaper: {
      height: "220px",

      [theme.breakpoints.down("xs")]: {
        height: "160px",
      },
      cursor: "pointer",
      padding: 0,
      marginBottom: "10px",
    },

    photoRoot: {
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },

    photo: {
      [theme.breakpoints.down("sm")]: {
        height: "130px",
        width: "130px",
        marginRight: "10px",
      },

      [theme.breakpoints.up("sm")]: {
        height: "160px",
        width: "160px",
      },

      marginTop: "15px",
      marginBottom: "10px",
      backgroundImage: `url(https://lh3.googleusercontent.com/p/AF1QipOD7S2BF3pTieo2TrZ0-N41sKDp88hXU0eRb7Ty=s1600-w400)`,
      backgroundSize: "cover",
      borderRadius: "10px ",
    },

    tipInfoPaper: {
      padding: "8px 15px",
    },

    iconSize: {
      height: 30,
      width: 30,
      padding: 0,
    },
  })
);

const SearchResultItem = () => {
  const classes = useStyles();

  const bookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Fragment>
      {/* Result Item */}
      <Grid item>
        <Paper
          className={`${classes.fullWidth} ${classes.resultPaper}`}
          variant="outlined"
        >
          <Grid wrap="nowrap" justify="space-between" container>
            {/* Left Column */}
            <Grid sm={4} md={3} item>
              <Grid
                container
                className={`${classes.gridHeight} ${classes.photoRoot}`}
                alignItems="center"
                direction="column"
                wrap="nowrap"
              >
                {/* Photo */}
                <Grid item>
                  <Paper className={classes.photo} />
                </Grid>
                {/* Tip share count */}
                <Grid item>
                  <Typography component="p" variant="subtitle2">
                    15 Tip Reports
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* Middle Column */}
            <Grid sm={7} md={8} item>
              <Grid
                container
                className={classes.gridHeight}
                direction="column"
                justify="space-evenly"
              >
                {/* Top Row */}
                <Grid item>
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
                {/* Bottom Row */}
                <Grid item>
                  <Grid justify="space-evenly" container>
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
            </Grid>
            <Grid xs={1} item>
              <IconButton
                style={{ paddingRight: 0, paddingLeft: 0 }}
                onClick={bookmarkClick}
              >
                <SaveIcon className={classes.iconSize} />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Fragment>
  );
};

export default SearchResultItem;
