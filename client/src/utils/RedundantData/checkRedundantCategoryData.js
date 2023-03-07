import axios from "axios";
import { checkRedundantData } from "../../Redux/Category/api";

let cancelToken;
export const checkRedundantCategoryData = async (e) => {
  //Check if there are any previous pending requests
  if (typeof cancelToken !== typeof undefined) {
    cancelToken.cancel("Operation canceled due to new request.");
  }
  //Save the cancel token for the current request
  cancelToken = axios.CancelToken.source();
  try {
    const { data } = await checkRedundantData(e, cancelToken);
    if (data.results.length > 0) {
      return true;
    }
    if (data.results.length <= 0) {
      return false;
    }
  } catch (error) {}
};
