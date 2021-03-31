import { combineReducers } from "redux";
import alertsReducer from "components/alert/alertSlice";
import profileReducer from "components/profile/profileSlice";
import authReducer from "components/auth/authSlice";
import searchReducer from "components/search/searchSlice";
import tipPostReducer from "components/tip-posts/TipPostSlice";

const rootReducer = combineReducers({
  alerts: alertsReducer,
  profile: profileReducer,
  auth: authReducer,
  search: searchReducer,
  tipPost: tipPostReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
