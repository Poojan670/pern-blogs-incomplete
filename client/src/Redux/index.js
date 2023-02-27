import { combineReducers } from "redux";
import alertReducer from "./Alert/reducer";
import authReducer from "./Auth/reducer";

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
});

export default rootReducer;
