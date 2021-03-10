import { Grid } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";
import SearchResultItem from "./SearchResultItem";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: "2rem",
    },

    resultItemRoot: {
      maxWidth: "900px",
    },
  })
);

const SearchResults = () => {
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid className={classes.resultItemRoot} container direction="column">
        <SearchResultItem />
        <SearchResultItem />
      </Grid>
    </Grid>
  );
};

export default SearchResults;
