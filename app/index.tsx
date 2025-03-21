import { useAppSelector } from "@/store/store";
import { Redirect } from "expo-router";
import Home from "./(main)/home";
import WelcomePage from "./(auth)/Welcome";
import HomeLayout from "./(main)/home/_layout";
import Otp from "./(auth)/Otp";
import PinPage from "./(auth)/PinPage";
import UserName from "./(auth)/UserName";
import SuccessPage from "./(auth)/SuccessPage";
import Signup from "./(auth)/Signup";
import Success from "./Services/success";
import Faild from "./Services/failed";
import Failed from "./Services/failed";
import ElectricityBilling from "./Services/electricityBilling";
import PaymentDetails from "./Services/paymentDetails";

const Page = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  // if (isLoggedIn) return <Redirect href="/(main)/home" />;
  if (isLoggedIn) return <Home />;

  // return <Redirect href="/(auth)/welcome" />;
  // return <SuccessPage />;
  return <ElectricityBilling />;
};

export default Page;
