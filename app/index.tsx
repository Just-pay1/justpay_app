import { useAppSelector } from "@/store/store";
import Home from "./(main)/home";
import WelcomePage from "./(auth)/Welcome";
import UserNameInfo from "./(auth)/userNameInfo";
import PinCode from "./(auth)/PinCode";
import { getItem } from "expo-secure-store";
import ForgotPassword from "./(auth)/ForgotPassword";
import { Redirect } from "expo-router";
const Page = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const isCompletedInfo = getItem("isCompletedInfo");
  // if (isLoggedIn) return <Redirect href="/home" />;
  if (isLoggedIn) {
    if (isCompletedInfo === "username") {
      return <UserNameInfo />;
    } else if (isCompletedInfo === "pincode") {
      return <PinCode />;
    } else {
      return <Home />;
    }
  }
  return <WelcomePage />;
};

export default Page;
