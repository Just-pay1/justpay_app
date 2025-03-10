import axios from "axios";
import Toast from "react-native-toast-message";
export default function CustomErrorToast(error: unknown) {
  let msg = "";
  if (axios.isAxiosError(error)) {
    if (error.response) {
      msg =
        error.response.data.error ||
        error.response.data.message ||
        "Login failed";
      Toast.show({
        type: "error",
        text1: msg,
        position: "bottom",
      });
    } else if (error.message === "Network Error") {
      Toast.show({
        type: "error",
        text1: `connection problem`,
        text2: "Please try again later",
        position: "bottom",
      });
    } else {
      // Handle other types of errors
      Toast.show({
        type: "error",
        text1: "An unexpected error occurred",
        position: "bottom",
      });
    }
  } else {
    //Handle non-Axios errors
    Toast.show({
      type: "error",
      text1: "something wrong",
      text2: "please try again later",
      position: "bottom",
    });
  }
}
