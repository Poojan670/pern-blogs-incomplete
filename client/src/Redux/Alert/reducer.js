import { alertConstants } from "./constants";

const initialState = {
  alertMessage: "",
};
const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case alertConstants.SHOW_ALERT:
      return {
        ...state,
        alertMessage: action.payload,
      };
    case alertConstants.HIDE_ALERT:
      return {
        ...state,
        alertMessage: "",
      };

    default:
      return state;
  }
};
export default alertReducer;
