import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
} from "react-native";
import PrimaryButton from "@/components/ui/Custombutton";
import Otpicon from "../../assets/svg/Otpicon.svg";
import Otpimage from "../../assets/svg/Optimage.svg";
import { OTPInput } from "@/components/auth/Otpinput";
import AuthHeader from "@/components/auth/AuthHeader";
import CustomText from "@/components/ui/CustomText";
import { useEffect, useState } from "react";
import { apiClient } from "@/config/axios.config";
import { Redirect, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { setLoggedInStatus } from "@/store/authSlice";
import { useAppDispatch } from "@/store/store";
import { ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";
export default function Otp() {
  const [otpCode, setOtpCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        router.navigate("/");
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);
  const otpHandler = async () => {
    try {
      setIsLoading(true);
      const { data } = await apiClient.post("/otp/verifyOTP", {
        otp: otpCode,
      });
      await SecureStore.setItemAsync("isVerified", "true");
      dispatch(setLoggedInStatus(true));
      router.navigate("/");
      Toast.show({
        type: "success",
        text1: "logged in successfuly!",
        position: "bottom",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          const errorMessage = error.response.data?.error || "Login failed";
          Toast.show({
            type: "error",
            text1: errorMessage,
            position: "bottom",
          });
        } else {
          // Handle errors without a response
          Toast.show({
            type: "error",
            text1: "A network error occurred",
            position: "bottom",
          });
        }
      } else {
        // Handle non-Axios errors
        Toast.show({
          type: "something wrong",
          text1: "please try again later",
          position: "bottom",
        });
      }
    } finally {
      setIsLoading(false);
      return;
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="min-h-full">
          <AuthHeader title="verification" />
          <View className="mx-auto relative items-center justify-center">
            <Otpicon scaleY={1.15} />
            <Otpimage
              style={{
                position: "absolute",
              }}
            />
          </View>
          <View className="mx-auto my-4 w-[95%]">
            <CustomText className="text-[12px] text-primary-foreground">
              enter the 6-digit code sent to your registered email !
            </CustomText>
          </View>
          <OTPInput otpCode={otpCode} setOtpCode={setOtpCode} />
          <PrimaryButton
            bgColor="bg-secondary-foreground"
            disabled={otpCode.length !== 6 || isLoading}
            onPress={otpHandler}
          >
            <View className="flex-row items-center justify-center">
              <CustomText className="color-secondary">
                {isLoading ? (
                  <View className="flex-row items-center">
                    <CustomText className="p-0 color-secondary">
                      Verifying{" "}
                    </CustomText>
                    <ActivityIndicator color="white" size={25} />
                  </View>
                ) : (
                  "next"
                )}
              </CustomText>
            </View>
          </PrimaryButton>
          <PrimaryButton
            bgColor="bg-transparent"
            borderColor="border-primary"
            onPress={() => router.navigate("/")}
          >
            <CustomText className="color-primary">back</CustomText>
          </PrimaryButton>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
