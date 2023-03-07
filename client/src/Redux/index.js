import { combineReducers } from "redux";
import alertReducer from "./Alert/reducer";
import authReducer from "./Auth/reducer";
import categoryReducer from "./Category/reducer";

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  category: categoryReducer,
});

export default rootReducer;
