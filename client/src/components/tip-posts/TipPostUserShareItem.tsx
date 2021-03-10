import {
  ButtonBase,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import FlagIcon from "@material-ui/icons/Flag";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bottomRootGrid: {
      padding: "20px",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },

    userSharePost: {
      [theme.breakpoints.down("sm")]: {
        flexDirection: "row",
        paddingBottom: "20px",
      },
    },

    tipInfoPaper: {
      padding: "8px",
      marginRight: "5px",
    },

    feedbackIcon: {
      marginRight: "4px",
      width: 18,
      height: 18,
    },

    feedbackBtn: {
      borderRadius: "5px",
      padding: "4px 7px 4px 7px",
    },

    flagBtn: {
      borderRadius: "5px",
      padding: "3px 5px 3px 5px",
    },

    flagIcon: {
      width: 13,
      height: 13,
    },

    feedbackBtnMargin: {
      marginBottom: "8px",
    },
  })
);

const TipPostUserShareItem = () => {
  const classes = useStyles();
  return (
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
          justify="space-evenly"
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
            <Paper className={classes.tipInfoPaper}>High: $120/hr</Paper>
          </Grid>
        </Grid>
        <Grid item sm={12} md={9} container direction="column" spacing={2}>
          <Grid item>
            <Typography component="p" variant="body2">
              (Max 365 Characters) Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Rerum, earum voluptas magnam incidunt id quasi
              labore iste impedit officiis doloribus dolorum totam vitae nisi
              ipsum, et mollitia reprehenderit excepturi est nesciunt atque.
              Accusantium odio cumque, quo qui provident quos quia nulla
              cupiditate! Vitae beatae unde sapiente similique perspiciatis.
            </Typography>
          </Grid>
          <Grid item container direction="column" alignItems="flex-end">
            <Grid
              item
              container
              justify="space-evenly"
              className={classes.feedbackBtnMargin}
            >
              <ButtonBase className={classes.feedbackBtn}>
                <ThumbUpIcon className={classes.feedbackIcon} />
                <Typography component="p" variant="subtitle2">
                  Helpful 7
                </Typography>
              </ButtonBase>
              <ButtonBase className={classes.feedbackBtn}>
                <ThumbDownIcon className={classes.feedbackIcon} />
                <Typography component="p" variant="subtitle2">
                  Not Helpful 7
                </Typography>
              </ButtonBase>
            </Grid>
            <Grid item>
              <ButtonBase className={classes.flagBtn}>
                <FlagIcon className={classes.flagIcon} />
                <Typography component="p" variant="caption">
                  Flag this post
                </Typography>
              </ButtonBase>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TipPostUserShareItem;
