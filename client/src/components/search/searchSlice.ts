import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "app/store";
import { setAlert } from "components/alert/alertSlice";
import { getErrorMessage } from "components/componentUtils/getErrorMessage";
import {
  GooglePlacesResponse,
  Result,
} from "components/interfaces/GooglePlacesInterface";
import { springAxios } from "config/springAxios";
import { NextPageTokenDto, SearchQueryDto } from "./search.dto";

export interface SearchState {
  placeName?: string;
  placeAddr?: string;
  nextPageToken?: string;
  searchLoading: boolean;
  loadNextPageLoading: boolean;

  searchResults?: Result[];
}

const initialState: SearchState = {
  placeName: "",
  placeAddr: "",
  nextPageToken: "",
  searchLoading: false,
  loadNextPageLoading: false,

  searchResults: [],
};

const updateSearchResultsReducer: CaseReducer<
  SearchState,
  PayloadAction<GooglePlacesResponse>
> = (state, { payload }) => {
  state.nextPageToken = payload.nextPageToken;
  state.searchResults = payload.results;
};

const loadNextPageReducer: CaseReducer<
  SearchState,
  PayloadAction<GooglePlacesResponse>
> = (state, { payload }) => {
  state.nextPageToken = payload.nextPageToken;
  state.searchResults = [...state.searchResults!, ...payload.results];
};

const clearSearchResultsReducer: CaseReducer<SearchState> = (state) => {
  state.searchResults = [];
  state.nextPageToken = "";
};

const setSearchLoadingReducer: CaseReducer<
  SearchState,
  PayloadAction<boolean>
> = (state, { payload }) => {
  state.searchLoading = payload;
};

const setLoadNextPageReducer: CaseReducer<
  SearchState,
  PayloadAction<boolean>
> = (state, { payload }) => {
  state.loadNextPageLoading = payload;
};

const SearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearchResultAction: updateSearchResultsReducer,
    loadNextPageAction: loadNextPageReducer,
    clearSearchResultsAction: clearSearchResultsReducer,
    setSearchLoadingAction: setSearchLoadingReducer,
    setLoadNextPageAction: setLoadNextPageReducer,
  },
});

export const {
  updateSearchResultAction,
  loadNextPageAction,
  clearSearchResultsAction,
  setSearchLoadingAction,
  setLoadNextPageAction,
} = SearchSlice.actions;

export default SearchSlice.reducer;

//-------------------------------------------------------------------------------
// Thunks

/**
 * Makes a search to the backend with the given term and update the App State
 * based on response data
 * @param data contains the search query terms
 * @returns
 */
export const makeSearch = (data: SearchQueryDto): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(clearSearchResultsAction());
    dispatch(setSearchLoadingAction(true));

    const res = await springAxios.post<GooglePlacesResponse>(
      "/places/search",
      data
    );

    dispatch(updateSearchResultAction(res.data));
    dispatch(setSearchLoadingAction(false));
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch(setAlert({ alertType: "warning", message: errorMessage }));
    dispatch(setSearchLoadingAction(false));
  }
};

/**
 * Loads the next 20 items of the search query using the nextPageToken given
 * by Google Places API
 * @param data contains the nextPageToken
 * @returns
 */
export const loadNextPage = (data: NextPageTokenDto): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(setLoadNextPageAction(true));
    const res = await springAxios.post<GooglePlacesResponse>(
      "/places/search/next-page",
      data
    );

    dispatch(loadNextPageAction(res.data));
    dispatch(setLoadNextPageAction(false));
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch(setAlert({ alertType: "warning", message: errorMessage }));
    dispatch(setLoadNextPageAction(false));
  }
};
