import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "app/store";
import { springAxios } from "config/springAxios";
import { setAlert } from "components/alert/alertSlice";
import { getErrorMessage } from "components/componentUtils/getErrorMessage";
import {
  JWTDecoded,
  LoginSuccessDto,
  LoginUserDto,
  RegisterUserDto,
} from "./auth.dto";
import jwt_decode from "jwt-decode";

export type AuthState = {
  username: string;
  authorities: string[];
  isAuthenticated: boolean;

  authLoading: boolean;
};

const initialState: AuthState = {
  username: "",
  authorities: [],
  isAuthenticated: false,
  authLoading: false,
};

// Case Reducers
export const loginUserReducer: CaseReducer<
  AuthState,
  PayloadAction<LoginSuccessDto>
> = (state, { payload }) => {
  state.username = payload.username;
  state.authorities = payload.authorities;
  state.isAuthenticated = payload.isAuthenticated;
};

export const logoutReducer: CaseReducer<AuthState> = (state) => {
  localStorage.removeItem("jwt");
  sessionStorage.removeItem("jwt");
  state.username = "";
  state.authorities = [];
  state.isAuthenticated = false;
};

export const setAuthLoadingReducer: CaseReducer<
  AuthState,
  PayloadAction<boolean>
> = (state, { payload }) => {
  state.authLoading = payload;
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUserAction: loginUserReducer,
    logoutAction: logoutReducer,
    setAuthLoadingAction: setAuthLoadingReducer,
  },
});

export const {
  loginUserAction,
  logoutAction,
  setAuthLoadingAction,
} = AuthSlice.actions;

export default AuthSlice.reducer;

//-------------------------------------------------------------------------------
// Thunks

/**
 * Register new users
 * @param data user registration data
 * @param history used to navigate the user to login page after successful registration
 * @returns void
 */
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

/**
 * Log in the user with the given credentials and redirects to landing page
 * upon successful login
 * @param data contains user login credentials
 * @param history used to redirect the user after successful login
 * @returns
 */
export const loginUser = (data: LoginUserDto, history: any): AppThunk => async (
  dispatch
) => {
  try {
    const res = await springAxios.post<{ [field: string]: string }>(
      "/auth/login",
      data
    );

    // save the jwt in session or local storage
    const jwt: string = res.data["jwt"];
    if (data.rememberMe) {
      localStorage.setItem("jwt", jwt);
    } else {
      sessionStorage.setItem("jwt", jwt);
    }
    // update the current auth state
    const jwt_decoded: JWTDecoded = jwt_decode(jwt);
    dispatch(
      loginUserAction({
        username: jwt_decoded.username,
        authorities: jwt_decoded.authorities.split(","),
        isAuthenticated: true,
      })
    );

    history.push("/");
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch(setAlert({ alertType: "error", message: errorMessage }));
  }
};

export const authenticateUserFromJWT = (): AppThunk => async (dispatch) => {
  dispatch(setAuthLoadingAction(true));

  const jwt = sessionStorage.getItem("jwt") || localStorage.getItem("jwt");
  if (jwt) {
    const jwt_decoded: JWTDecoded = jwt_decode(jwt);

    dispatch(
      loginUserAction({
        username: jwt_decoded.username,
        authorities: jwt_decoded.authorities.split(","),
        isAuthenticated: true,
      })
    );
  }

  dispatch(setAuthLoadingAction(false));
};
