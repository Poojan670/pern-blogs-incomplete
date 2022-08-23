import { alertConstants } from "./constants";
// actions
export const showAlertAction = (data) => ({
  type: alertConstants.SHOW_ALERT,
  payload: data,
});

export const hideAlertAction = () => ({
  type: alertConstants.HIDE_ALERT,
});
