import { combineReducers } from "redux";
import alertsReducer from "features/alerts/alertSlice";
import profileReducer from "features/profile/profileSlice";

const rootReducer = combineReducers({
  alerts: alertsReducer,
  profile: profileReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
