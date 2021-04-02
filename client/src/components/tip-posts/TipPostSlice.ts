import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "app/store";
import { setAlert } from "components/alert/alertSlice";
import { getErrorMessage } from "components/componentUtils/getErrorMessage";
import { Result } from "components/interfaces/GooglePlaces.interface";
import { Place } from "components/interfaces/Places.interface";
import { springAxios } from "config/springAxios";
import { RouteComponentProps } from "react-router";

export interface TipPostState {
  tipPostStateLoading: boolean;
  selectedPlace?: Place;
}

const initialState: TipPostState = {
  tipPostStateLoading: false,
  selectedPlace: undefined,
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

const TipPostSlice = createSlice({
  name: "tip-post",
  initialState,
  reducers: {
    setTipPostStateLoadingAction: setTipPostStateLoadingReducer,
    loadSelectedPlaceAction: loadSelectedPlaceReducer,
  },
});

export const {
  setTipPostStateLoadingAction,
  loadSelectedPlaceAction,
} = TipPostSlice.actions;
export default TipPostSlice.reducer;

//-------------------------------------------------------------------------------
// Thunks

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
 * @param placeId the id given by PlacesAPI used to query the database
 * @returns
 */
export const loadSelectedPlaceByPlaceId = (placeId: string): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(setTipPostStateLoadingAction(true));
    const res = await springAxios.get<Place>(`places/details/${placeId}`);

    dispatch(loadSelectedPlaceAction(res.data));
    dispatch(setTipPostStateLoadingAction(false));
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch(setAlert({ alertType: "error", message: errorMessage }));
    dispatch(setTipPostStateLoadingAction(false));
  }
};
