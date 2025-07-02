import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useAppSelector } from "@/store/store";
import { getItem } from "expo-secure-store";
import { ActivityIndicator, View } from "react-native";

const Page = () => {
  const router = useRouter();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const isCompletedInfo = getItem("isCompletedInfo");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    if (isLoggedIn) {
      if (isCompletedInfo === "username") {
        router.dismissTo("/(auth)/userNameInfo");
      } else if (isCompletedInfo === "pincode") {
        router.dismissTo("/(auth)/PinCode");
      } else {
        router.dismissTo("/(main)/home");
        // router.dismissTo("/Services/paymentDetails");
      }
    } else {
      router.dismissTo("/(auth)/Signin");
    }
  }, [isLoggedIn, isCompletedInfo, isReady]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={50} color="#2c7075" />
    </View>
  );
};

export default Page;
