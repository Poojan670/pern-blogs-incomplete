import { combineReducers } from "redux";
import alertReducer from "./Alert/reducer";
import authReducer from "./Auth/reducer";
import categoryReducer from "../dashboard/Redux/Category/reducer";
import tagsReducer from "../dashboard/Redux/Tags/reducer";

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  category: categoryReducer,
  tag: tagsReducer,
});

export default rootReducer;
