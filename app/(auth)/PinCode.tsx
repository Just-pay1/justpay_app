import React, { useState } from "react";
import { View, Text } from "react-native";
import { OTPInput } from "@/components/auth/Otpinput";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import CustomErrorToast from "@/components/ui/CustomErrorToast";
import { apiClient } from "@/config/axios.config";
import PrimaryButton from "@/components/ui/Custombutton";
import CustomText from "@/components/ui/CustomText";

const PinCode = () => {
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const PinCodeHandler = async () => {
    try {
      setIsLoading(true);
      console.log(pin);
      const { data } = await apiClient.post("/walletConfig/pinCode", {
        pin_code: pin,
      });
      router.navigate("/ConfirmPinCode");
    } catch (error) {
      CustomErrorToast(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["#1A5A60", "#113E41", "#081C1C"]}
      className="flex-1 pt-20 justify-around"
    >
      <View className="mt-16 mb-6">
        <Text className="color-secondary text-center font-Nunitosemi text-4xl ">
          PIN Code
        </Text>
      </View>
      <View>
        <OTPInput otpCode={pin} setOtpCode={setPin} />
        <PrimaryButton
          bgColor="bg-secondary-foreground"
          disabled={pin.length !== 6 || isLoading}
          loading={isLoading}
          onPress={PinCodeHandler}
        >
          <CustomText className="color-secondary">next</CustomText>
        </PrimaryButton>
      </View>
    </LinearGradient>
  );
};

export default PinCode;
