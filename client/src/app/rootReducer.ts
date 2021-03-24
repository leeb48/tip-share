import { combineReducers } from "redux";
import alertsReducer from "components/alert/alertSlice";
import profileReducer from "components/profile/profileSlice";
import authReducer from "components/auth/authSlice";

const rootReducer = combineReducers({
  alerts: alertsReducer,
  profile: profileReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
