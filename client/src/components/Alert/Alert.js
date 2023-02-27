import { toast } from "react-toastify";
import { hideAlertAction, showAlertAction } from "../../Redux/Alert/action";
import { store } from "../../Redux/store";
toast.configure();
//toast for error

export const errorFunction = (error) => {
  const alertMessage = store.getState().alert.alertMessage;
  const errorMessage = typeof error === "string" ? error : "error";
  if (alertMessage !== errorMessage) {
    store.dispatch(showAlertAction(errorMessage));
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClose() {
        store.dispatch(hideAlertAction());
      },
    });
  }
};

//toast for success
export const successFunction = (data) => {
  const successMessage = typeof data === "string" ? data : "success";
  toast.info(successMessage, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
//toast for info
export const infoFunction = (data) => {
  const infoMessage = typeof data === "string" ? data : "success";
  toast.info(infoMessage, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
