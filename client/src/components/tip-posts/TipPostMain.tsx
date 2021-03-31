import {
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { RootState } from "app/rootReducer";
import { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import TipPostHeader from "./TipPostHeader";
import TipPostUserShareItem from "./TipPostUserShareItem";
import LoadingSpinner from "components/layout/LoadingSpinner";
import { RouteComponentProps, RouteProps } from "react-router";
import { useAppDispatch } from "app/store";
import { loadSelectedPlaceByPlaceId } from "./TipPostSlice";

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

interface MatchParams {
  placeId: string;
}
interface Props extends RouteComponentProps<MatchParams> {
  placeId: string;
}

const TipPostMain: React.FC<Props> = ({ match: { params } }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { tipPostStateLoading, selectedPlace } = useSelector(
    (state: RootState) => {
      return {
        tipPostStateLoading: state.tipPost.tipPostStateLoading,
        selectedPlace: state.tipPost.selectedPlace,
      };
    },
    shallowEqual
  );

  useEffect(() => {
    window.scrollTo(0, 0);

    // fetch data only when user refreshes the page or
    // navigates to component directly through url.
    const placeId = params.placeId;
    if (!tipPostStateLoading && placeId) {
      dispatch(loadSelectedPlaceByPlaceId(placeId));
    }
  }, [dispatch, params.placeId]);

  return tipPostStateLoading ? (
    <LoadingSpinner />
  ) : (
    <Grid justify="center" className={classes.rootGrid} container>
      <Grid item sm={1} />

      {selectedPlace && (
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
              <TipPostHeader selectedPlace={selectedPlace} />
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
      )}
      <Grid item sm={1} />
    </Grid>
  );
};

export default TipPostMain;
