import { combineReducers } from "redux";
import commonReducer from "./common/commonReducer";
import userReducer from "./user/user.reducer";
import projectReducer from "./project/project.reducer";
import allProjectReducer from "./all-projects/allProjectReducer";
import effortReducer from "./effort/effort.reducer";

export default combineReducers({
  common: commonReducer,
  user: userReducer,
  project: projectReducer,
  dashboard: allProjectReducer,
  effort: effortReducer,
});
