import { Button, Grid, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { RootState } from "app/rootReducer";
import { useAppDispatch } from "app/store";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import SearchResultItem from "./SearchResultItem";
import { loadNextPage } from "./searchSlice";
import LoadingSpinner from "components/layout/LoadingSpinner";

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

const LoadMoreButton = styled(Button)`
  margin-bottom: 2rem;
  padding: 1.5rem;
`;

const NoResultsMessage = styled(Typography)`
  margin-top: 30%;
`;

const SearchResults = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const {
    searchResults,
    nextPageToken,
    searchLoading,
    nextPageLoading,
  } = useSelector((state: RootState) => {
    return {
      searchResults: state.search.searchResults,
      nextPageToken: state.search.nextPageToken || "",
      searchLoading: state.search.searchLoading,
      nextPageLoading: state.search.loadNextPageLoading,
    };
  }, shallowEqual);

  const handleLoadNextPage = () => {
    dispatch(loadNextPage({ nextPageToken }));
  };

  const displaySearchResults =
    searchResults &&
    searchResults.length > 0 &&
    searchResults.map((result) => (
      <SearchResultItem key={result.placeId} result={result} />
    ));

  const displayNextPageBtn = nextPageToken && (
    <LoadMoreButton
      onClick={handleLoadNextPage}
      variant="outlined"
      color="primary"
    >
      {nextPageLoading ? (
        <CircularProgress />
      ) : (
        <Typography variant="h6">Load More Places</Typography>
      )}
    </LoadMoreButton>
  );

  // display no results found message when search has done loading
  // and the results array is empty
  const displayNoResultsFound = !searchLoading &&
    searchResults &&
    searchResults.length === 0 && (
      <NoResultsMessage variant="h4" align="center">
        No results, please try another search
      </NoResultsMessage>
    );

  return (
    <Grid container justify="center" className={classes.root}>
      {searchLoading ? (
        <LoadingSpinner />
      ) : (
        <Grid className={classes.resultItemRoot} container direction="column">
          {displayNoResultsFound}

          {displaySearchResults}

          {displayNextPageBtn}
        </Grid>
      )}
    </Grid>
  );
};

export default SearchResults;
