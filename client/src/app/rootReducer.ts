import { combineReducers } from "redux";
import alertsReducer from "features/alerts/alertSlice";
import profileReducer from "features/profile/profileSlice";
import authReducer from "features/auth/authSlice";

const rootReducer = combineReducers({
  alerts: alertsReducer,
  profile: profileReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
