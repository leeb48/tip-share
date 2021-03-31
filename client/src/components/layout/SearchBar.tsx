import {
  Button,
  fade,
  Grid,
  InputBase,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { createStyles } from "@material-ui/styles";
import { useAppDispatch } from "app/store";
import { useForm } from "components/componentUtils/useForm";
import { SearchQueryDto } from "components/search/search.dto";
import { makeSearch } from "components/search/searchSlice";
import React, { Fragment } from "react";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "auto",
      },
    },

    searchMobile: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "auto",
      },
    },

    searchBtnMobile: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },

    inputRoot: {
      color: "inherit",
    },
    textInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    searchBarDesktop: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "flex",
      },
    },
    searchBarMobile: {
      display: "flex",
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
  })
);

const initialFormValues: SearchQueryDto = {
  placeName: "",
  placeAddr: "",
};

const SearchBar = () => {
  const dispatch = useAppDispatch();

  const classes = useStyles();

  const history = useHistory();

  const { values, onChange } = useForm<SearchQueryDto>(initialFormValues);

  const { placeName, placeAddr } = values;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(makeSearch(values));

    history.push("/results");
  };

  return (
    <Fragment>
      <div className={classes.searchBarDesktop}>
        <div className={classes.search}>
          <InputBase
            placeholder="Restaurant Name"
            classes={{
              root: classes.inputRoot,
              input: classes.textInput,
            }}
            name="placeName"
            value={placeName}
            onChange={onChange}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
        <div className={classes.search}>
          <InputBase
            placeholder="Address"
            classes={{
              root: classes.inputRoot,
              input: classes.textInput,
            }}
            name="placeAddr"
            value={placeAddr}
            onChange={onChange}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
        <Button onClick={onSubmit} variant="contained">
          Search
        </Button>
      </div>

      <div className={classes.searchBarMobile}>
        <Grid container justify="center">
          <div className={classes.searchMobile}>
            <InputBase
              placeholder="Restaurant Name"
              classes={{
                root: classes.inputRoot,
                input: classes.textInput,
              }}
              name="placeName"
              value={placeName}
              onChange={onChange}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.searchMobile}>
            <InputBase
              placeholder="Address"
              classes={{
                root: classes.inputRoot,
                input: classes.textInput,
              }}
              name="placeAddr"
              value={placeAddr}
              onChange={onChange}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <Button
            onClick={onSubmit}
            className={classes.searchBtnMobile}
            variant="contained"
          >
            Search
          </Button>
        </Grid>
      </div>
    </Fragment>
  );
};

export default SearchBar;
