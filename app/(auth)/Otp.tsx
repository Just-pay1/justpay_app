import { View } from "react-native";
import PrimaryButton from "@/components/ui/Custombutton";
import Otpicon from "@/assets/svg/Otpicon.svg";
import Otpimage from "@/assets/svg/Optimage.svg";
import { OTPInput } from "@/components/auth/Otpinput";
import AuthHeader from "@/components/auth/AuthHeader";
import CustomText from "@/components/ui/CustomText";
import { apiClient } from "@/config/axios.config";
import { router, useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { setLoggedInStatus } from "@/store/authSlice";
import { useAppDispatch } from "@/store/store";
import Toast from "react-native-toast-message";
import OtpTimer from "@/components/auth/OtpTimer";
import CustomErrorToast from "@/components/ui/CustomErrorToast";
import { useState } from "react";
export default function Otp() {
  const params = useLocalSearchParams();
  const storedUser = SecureStore.getItem("user");
  const objectUser = JSON.parse(storedUser!);
  const resendOtp = async () => {
    try {
      await apiClient.post("/identity/otp/resendOTP", {
        email: params.email ? params.email : objectUser.email,
      });
      Toast.show({
        type: "info",
        text1: "code resent successfuly!",
        position: "bottom",
      });
    } catch (error) {}
    console.log("OTP Resent!");
  };
  const [otpCode, setOtpCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     () => {
  //       router.navigate("/");
  //       return true;
  //     }
  //   );
  //   return () => backHandler.remove();
  // }, []);

  const otpHandler = async () => {
    try {
      setIsLoading(true);
      if (params.source === "setting") {
        console.log(params.verificationId);
        await apiClient.post("/identity/verify_email_update", {
          otp: otpCode,
          verificationId: params.verificationId,
        });
        await SecureStore.setItemAsync(
          "user",
          JSON.stringify({ ...objectUser, email: params.email })
        );
        router.dismissTo("/");
      } else {
        const dataSending = {
          otp: otpCode,
          email: params.source === "register" ? objectUser.email : params.email,
          flow: params.source === "register" ? "register" : "reset_password",
        };
        const { status, data } = await apiClient.post(
          "/identity/otp/verifyOTP",
          dataSending
        );
        if (status === 200) {
          await SecureStore.setItemAsync("isVerified", "true");
          await SecureStore.setItemAsync("isCompletedInfo", "username");
          dispatch(setLoggedInStatus(true));
          router.dismissTo("/");
        } else {
          await SecureStore.setItemAsync("resetToken", data.resetToken);
          console.log({ resetToken: data.resetToken });
          router.replace("/ResetPassword");
        }
      }
    } catch (error) {
      CustomErrorToast(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View>
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
        loading={isLoading}
        textLoading="verifying"
        onPress={otpHandler}
      >
        <CustomText className="color-secondary">next</CustomText>
      </PrimaryButton>

      <PrimaryButton
        bgColor="bg-transparent"
        borderColor="border-primary"
        onPress={() => router.back()}
      >
        <CustomText className="color-primary">back</CustomText>
      </PrimaryButton>
      <View>
        <OtpTimer onResend={resendOtp} />
      </View>
    </View>
  );
}
