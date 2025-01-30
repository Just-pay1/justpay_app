import { useAppSelector } from "@/store/store";
import { Redirect } from "expo-router";
import Home from "./(main)/home";
import WelcomePage from "./(auth)/Welcome";
import Otp from "./(auth)/Otp";

const Page = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  // if (isLoggedIn) return <Redirect href="/(main)/home" />;
  if (isLoggedIn) return <Home />;

  // return <Redirect href="/(auth)/welcome" />;
  return <Otp />;
};

export default Page;
