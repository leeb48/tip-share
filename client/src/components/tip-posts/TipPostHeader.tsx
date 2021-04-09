import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { Place } from "components/interfaces/Places.interface";
import ImageNotFound from "image/no-image.png";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles<Theme, Props>((theme: Theme) =>
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
      backgroundImage: ({ selectedPlace }) => {
        if (selectedPlace.imageUrl) {
          return `url(${selectedPlace.imageUrl})`;
        } else {
          return `url(${ImageNotFound})`;
        }
      },
      backgroundSize: "cover",
      borderRadius: "10px ",
    },

    tipInfoPaper: {
      padding: "8px 15px",
      marginRight: "5px",
    },
  })
);

interface Props {
  selectedPlace: Place;
  placeId?: string;
}

const TipPostHeader: React.FC<Props> = ({ selectedPlace, placeId }) => {
  const classes = useStyles({ selectedPlace });

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
              <Button
                component={Link}
                to={`/tip-post/new/${placeId}`}
                variant="outlined"
                color="primary"
              >
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
              {selectedPlace.placeName}
            </Typography>
            <Typography component="p" variant="body1">
              {selectedPlace.placeAddr}
            </Typography>
            <Typography component="p" variant="subtitle2">
              <span style={{ fontWeight: "bold" }}>
                {selectedPlace.operational}
              </span>
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
              <Typography variant="subtitle1" gutterBottom>
                Lowest
              </Typography>
              <Paper className={classes.tipInfoPaper}>
                ${selectedPlace.lowestAvg}/hr
              </Paper>
            </Grid>
            <Grid
              xs={4}
              item
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Typography variant="subtitle1" gutterBottom>
                Typical
              </Typography>
              <Paper className={classes.tipInfoPaper}>
                ${selectedPlace.typicalAvg}/hr
              </Paper>
            </Grid>
            <Grid
              xs={4}
              item
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Typography variant="subtitle1" gutterBottom>
                Highest
              </Typography>
              <Paper className={classes.tipInfoPaper}>
                ${selectedPlace.highestAvg}/hr
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TipPostHeader;
