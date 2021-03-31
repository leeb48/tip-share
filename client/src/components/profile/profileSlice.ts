import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

// TODO: implment using createAsyncThunk

export type ProfileState = {
  profileTabIdx: number;
};

const initialState: ProfileState = {
  profileTabIdx: 0,
};

// ------------------------------------------------------------------------------
// Case Reducers
export const changeProfileTabIdxReducer: CaseReducer<
  ProfileState,
  PayloadAction<number>
> = (state, { payload }) => {
  state.profileTabIdx = payload;
};

const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: { changeProfileTabIdx: changeProfileTabIdxReducer },
});

export const { changeProfileTabIdx } = ProfileSlice.actions;

export default ProfileSlice.reducer;

// ------------------------------------------------------------------------------
// Thunks
