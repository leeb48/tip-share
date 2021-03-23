import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "app/store";
import { springAxios } from "config/springAxios";
import { setAlert } from "features/alerts/alertSlice";
import { RegisterUserDto } from "./auth.dto";

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

// Thunks
export const registerUser = (data: RegisterUserDto): AppThunk => async (
  dispatch
) => {
  try {
    const res = await springAxios.post<string>("/auth/register", data);

    dispatch(setAlert({ alertType: "success", message: res.data }));
  } catch (error) {
    if (error.response) {
      // display the first error message
      const errors = error.response.data as { [field: string]: string };
      const errorMessage = Object.values(errors)[0];
      dispatch(setAlert({ alertType: "error", message: errorMessage }));
    }
  }
};
