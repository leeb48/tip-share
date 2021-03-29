import { Grid } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { RootState } from "app/rootReducer";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
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

  const { searchResults } = useSelector((state: RootState) => {
    return {
      searchResults: state.search.searchResults,
    };
  }, shallowEqual);

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid className={classes.resultItemRoot} container direction="column">
        {searchResults &&
          searchResults.length > 0 &&
          searchResults.map((result) => (
            <SearchResultItem key={result.placeId} result={result} />
          ))}
      </Grid>
    </Grid>
  );
};

export default SearchResults;
