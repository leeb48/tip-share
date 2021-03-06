import { combineReducers } from "redux";

const rootReducer = combineReducers({
  root: () => 5,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
