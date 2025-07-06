import axios from "axios";
import Toast from "react-native-toast-message";

export default function ChangePasswordErrorToast(error: unknown) {
  let msg = "";
  if (axios.isAxiosError(error)) {
    if (error.response) {
      msg =
        error.response.data.error ||
        error.response.data.message ||
        "Change password failed";

      Toast.show({
        type: "error",
        text1: msg,
        position: "bottom",
      });
    } else if (error.message === "Network Error") {
      Toast.show({
        type: "error",
        text1: "Connection problem",
        text2: "Please try again later",
        position: "bottom",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "An unexpected error occurred",
        position: "bottom",
      });
    }
  } else {
    Toast.show({
      type: "error",
      text1: "Something went wrong",
      text2: "Please try again later",
      position: "bottom",
    });
  }
}
