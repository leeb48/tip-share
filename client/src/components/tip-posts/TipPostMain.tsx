import {
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import TipPostHeader from "./TipPostHeader";
import TipPostUserShareItem from "./TipPostUserShareItem";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootGrid: {
      marginTop: theme.spacing(4),
    },

    tipPostRoot: {
      overflow: "hidden",
      maxWidth: "1000px",
    },

    userShareTitle: {
      padding: "5px 10px 5px 10px",
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
        xs={12}
        container
        direction="column"
      >
        <Grid container direction="column" spacing={3}>
          {/* Header Component */}
          <Grid item>
            <TipPostHeader />
          </Grid>

          <Grid item>
            <Typography variant="h5" component="h4">
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
          <Grid item container spacing={3}>
            <Grid item>
              <TipPostUserShareItem />
            </Grid>
            <Grid item>
              <TipPostUserShareItem />
            </Grid>
            <Grid item>
              <TipPostUserShareItem />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={1} />
    </Grid>
  );
};

export default TipPostMain;
