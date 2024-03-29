import { Grid, IconButton, Paper, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/BookmarkBorder";
import { useAppDispatch } from "app/store";
import { Result } from "components/interfaces/GooglePlaces.interface";
import { loadSelectedPlaceDetail } from "components/tip-posts/TipPostSlice";
import ImageNotFound from "image/no-image.png";
import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";

interface Props {
  result: Result;
}

const useStyles = makeStyles<Theme, Props>((theme: Theme) =>
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
        height: "180px",
        padding: "0px 8px",
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
      backgroundImage: ({ result }) => {
        if (result.photos) {
          return `url(${result.photos[0].photoReference})`;
        } else {
          return `url(${ImageNotFound})`;
        }
      },
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

const SearchResultItem: React.FC<Props> = ({ result }) => {
  const classes = useStyles({ result });

  const history = useHistory();

  const dispatch = useAppDispatch();

  const bookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // load place details data and
  // redirect to place details page
  const handleResultItemClick = () => {
    dispatch(loadSelectedPlaceDetail(result, history));
  };

  const displayPhotoAndTipCount = (
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
  );

  const displayPlaceInfo = (
    <Grid item>
      <Typography component="p" variant="h6">
        {result.name}
      </Typography>
      <Typography component="p" variant="body1">
        {result.formattedAddress}
      </Typography>
      <Typography component="p" variant="subtitle2">
        <span style={{ fontWeight: "bold" }}>{result.businessStatus}</span>
      </Typography>
    </Grid>
  );

  const displayRatingAndType = (
    <Grid justify="space-evenly" container>
      <Grid
        xs={4}
        item
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Typography variant="subtitle1" gutterBottom>
          Google Rating
        </Typography>
        <Paper className={classes.tipInfoPaper}>{result.rating}</Paper>
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
          Type
        </Typography>
        <Paper className={classes.tipInfoPaper}>
          {result.types[0].toUpperCase()}
        </Paper>
      </Grid>
    </Grid>
  );

  return (
    <Fragment>
      {/* Result Item */}
      <Grid item>
        <Paper
          className={`${classes.fullWidth} ${classes.resultPaper}`}
          variant="outlined"
          onClick={handleResultItemClick}
        >
          <Grid wrap="nowrap" justify="space-between" container>
            {/* Left Column Start */}
            <Grid sm={4} md={3} item>
              {displayPhotoAndTipCount}
            </Grid>
            {/* Left Column End */}
            {/* Middle Column Start */}
            <Grid sm={7} md={8} item>
              <Grid
                container
                className={classes.gridHeight}
                direction="column"
                justify="space-evenly"
              >
                {/* Top Row */}
                {displayPlaceInfo}

                {/* Top Row End */}
                {/* Bottom Row Start */}
                <Grid item>{displayRatingAndType}</Grid>
                {/* Bottom Row End */}
              </Grid>
            </Grid>
            {/* Middle Column End */}
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
