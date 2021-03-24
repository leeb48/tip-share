import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "app/store";
import { springAxios } from "config/springAxios";
import { setAlert } from "components/alert/alertSlice";
import { getErrorMessage } from "components/componentUtils/getErrorMessage";
import { LoginUserDto, RegisterUserDto } from "./auth.dto";

export type AuthState = {
  username: string;
  role: string[];
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  username: "",
  role: [],
  isAuthenticated: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const {} = AuthSlice.actions;

export default AuthSlice.reducer;

// Thunks
export const registerUser = (
  data: RegisterUserDto,
  history: any
): AppThunk => async (dispatch) => {
  try {
    const res = await springAxios.post<string>("/auth/register", data);

    dispatch(setAlert({ alertType: "success", message: res.data }));

    history.push("/login");
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch(setAlert({ alertType: "error", message: errorMessage }));
  }
};

export const loginUser = (data: LoginUserDto, history: any): AppThunk => async (
  dispatch
) => {
  try {
  } catch (error) {}
};
