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
};

const initialState: AuthState = {
  username: "",
  authorities: [],
  isAuthenticated: false,
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

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: { loginUserAction: loginUserReducer },
});

export const { loginUserAction } = AuthSlice.actions;

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
