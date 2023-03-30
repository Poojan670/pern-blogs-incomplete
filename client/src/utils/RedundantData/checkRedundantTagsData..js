import axios from "axios";
import { checkRedundantTagsTitle } from "../../dashboard/Redux/Tags/api";

let cancelToken;
export const checkRedundantTagsData = async (e) => {
  //Check if there are any previous pending requests
  if (typeof cancelToken !== typeof undefined) {
    cancelToken.cancel("Operation canceled due to new request.");
  }
  //Save the cancel token for the current request
  cancelToken = axios.CancelToken.source();
  try {
    const { data } = await checkRedundantTagsTitle(e, cancelToken);
    if (data.results.length > 0) {
      return true;
    }
    if (data.results.length <= 0) {
      return false;
    }
  } catch (error) {}
};
