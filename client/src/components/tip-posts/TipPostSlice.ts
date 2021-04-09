import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "app/store";
import { setAlert } from "components/alert/alertSlice";
import { getErrorMessage } from "components/componentUtils/getErrorMessage";
import { Result } from "components/interfaces/GooglePlaces.interface";
import { Place } from "components/interfaces/Places.interface";
import { TipPost } from "components/interfaces/TipPost.interface";
import { springAxios } from "config/springAxios";
import { RouteComponentProps } from "react-router";
import { CreateNewTipPostDto } from "./TipPost.dto";

export interface TipPostState {
  tipPostStateLoading: boolean;
  selectedPlace?: Place;
  selectedPlaceTipPosts: TipPost[];
}

const initialState: TipPostState = {
  tipPostStateLoading: false,
  selectedPlace: undefined,
  selectedPlaceTipPosts: [],
};

// ------------------------------------------------------------------------------
// Case Reducers

export const setTipPostStateLoadingReducer: CaseReducer<
  TipPostState,
  PayloadAction<boolean>
> = (state, { payload }) => {
  state.tipPostStateLoading = payload;
};

export const loadSelectedPlaceReducer: CaseReducer<
  TipPostState,
  PayloadAction<Place>
> = (state, { payload }) => {
  state.selectedPlace = payload;
};

export const loadSelectedPlaceTipPostsReducer: CaseReducer<
  TipPostState,
  PayloadAction<TipPost[]>
> = (state, { payload }) => {
  state.selectedPlaceTipPosts = payload;
};

export const createNewTipPostReducer: CaseReducer<
  TipPostState,
  PayloadAction<TipPost>
> = (state, { payload }) => {
  state.selectedPlaceTipPosts.unshift(payload);
};

const TipPostSlice = createSlice({
  name: "tip-post",
  initialState,
  reducers: {
    setTipPostStateLoadingAction: setTipPostStateLoadingReducer,
    loadSelectedPlaceAction: loadSelectedPlaceReducer,
    loadSelectedPlaceTipPostsAction: loadSelectedPlaceTipPostsReducer,
    createNewTipPostAction: createNewTipPostReducer,
  },
});

export const {
  setTipPostStateLoadingAction,
  loadSelectedPlaceAction,
  loadSelectedPlaceTipPostsAction,
  createNewTipPostAction,
} = TipPostSlice.actions;
export default TipPostSlice.reducer;

//-------------------------------------------------------------------------------
// Thunks

export const createNewTipPost = (
  newTipPost: CreateNewTipPostDto,
  history: RouteComponentProps["history"],
  placeIdFromPlacesAPI: string
): AppThunk => async (dispatch) => {
  try {
    const res = await springAxios.post<TipPost>("/tip-post/create", newTipPost);

    dispatch(createNewTipPostAction(res.data));
    history.push(`/tip-post/${placeIdFromPlacesAPI}`);
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch(setAlert({ alertType: "error", message: errorMessage }));
  }
};

export const loadSelectedPlaceTipPosts = (placeId: string): AppThunk => async (
  dispatch
) => {
  try {
    const res = await springAxios.get<TipPost[]>(`/tip-post/place/${placeId}`);

    dispatch(loadSelectedPlaceTipPostsAction(res.data));
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch(setAlert({ alertType: "error", message: errorMessage }));
  }
};

/**
 * Sends the search result json object from PlacesAPI to the backend to retrieve
 * the place object that is saved in the database. This action saves the place
 * into the databse if it does not already exist.
 * @param placeSearchResult the search result item from PlacesAPI
 * @param history used to redirect the user after successful place data fetch
 * @returns
 */
export const loadSelectedPlaceDetail = (
  placeSearchResult: Result,
  history: RouteComponentProps["history"]
): AppThunk => async (dispatch) => {
  try {
    dispatch(setTipPostStateLoadingAction(true));
    const res = await springAxios.post<Place>(
      "/places/details",
      placeSearchResult
    );

    const path = `/tip-post/${res.data.placeIdFromPlacesAPI}`;

    history.push(path);

    dispatch(loadSelectedPlaceAction(res.data));
    dispatch(setTipPostStateLoadingAction(false));
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch(setAlert({ alertType: "error", message: errorMessage }));
  }
};

/**
 * Retrieves the place that is stored in the database by using placeId.
 * This thunk is used to retrieve data at the PlaceDetail component level.
 * @param placeIdFromPlacesAPI the id given by PlacesAPI used to query the database
 * @returns
 */
export const loadSelectedPlaceByPlaceId = (
  placeIdFromPlacesAPI: string
): AppThunk => async (dispatch) => {
  try {
    dispatch(setTipPostStateLoadingAction(true));
    const res = await springAxios.get<Place>(
      `places/details/${placeIdFromPlacesAPI}`
    );

    dispatch(loadSelectedPlaceAction(res.data));
    dispatch(setTipPostStateLoadingAction(false));
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch(setAlert({ alertType: "error", message: errorMessage }));
    dispatch(setTipPostStateLoadingAction(false));
  }
};
