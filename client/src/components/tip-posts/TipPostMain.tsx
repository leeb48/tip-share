import {
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { RootState } from "app/rootReducer";
import { useAppDispatch } from "app/store";
import LoadingSpinner from "components/layout/LoadingSpinner";
import { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import TipPostHeader from "./TipPostHeader";
import {
  loadSelectedPlaceByPlaceId,
  loadSelectedPlaceTipPosts,
} from "./TipPostSlice";
import TipPostUserShareItem from "./TipPostUserShareItem";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootGrid: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      height: "100vh",
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
  const {
    tipPostStateLoading,
    selectedPlace,
    selectedPlaceTipPosts,
  } = useSelector((state: RootState) => {
    return {
      tipPostStateLoading: state.tipPost.tipPostStateLoading,
      selectedPlace: state.tipPost.selectedPlace,
      selectedPlaceTipPosts: state.tipPost.selectedPlaceTipPosts,
    };
  }, shallowEqual);

  // load the tip posts that belong to the currently selected place
  useEffect(() => {
    if (selectedPlace && selectedPlace.id) {
      dispatch(loadSelectedPlaceTipPosts(selectedPlace.id));
    }
  }, [selectedPlace?.id]);

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
      {selectedPlace && (
        <Grid
          className={classes.tipPostRoot}
          item
          sm={12}
          container
          direction="column"
        >
          <Grid container direction="column" spacing={3}>
            {/* Header Component */}
            <Grid item>
              <TipPostHeader
                selectedPlace={selectedPlace}
                placeId={params.placeId}
              />
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
            <Grid item container justify="center" spacing={3}>
              {selectedPlaceTipPosts.length > 0 &&
                selectedPlaceTipPosts.map((tipPost) => (
                  <Grid key={tipPost.id} item xs={12}>
                    <TipPostUserShareItem tipPost={tipPost} />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default TipPostMain;
