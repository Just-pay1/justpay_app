import React, { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { OTPInput } from "@/components/auth/Otpinput";
import { LinearGradient } from "expo-linear-gradient";
import CustomErrorToast from "@/components/ui/CustomErrorToast";
import { apiClient } from "@/config/axios.config";
import PrimaryButton from "@/components/ui/Custombutton";
import CustomText from "@/components/ui/CustomText";
import { deleteItemAsync } from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { setItemAsync } from "expo-secure-store";
import * as SecureStore from "expo-secure-store";
const ConfirmPinCode = () => {
  const user = SecureStore.getItem("user");
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const PinCodeHandler = async () => {
    try {
      setIsLoading(true);
      const { data } = await apiClient.post(
        "/identity/walletConfig/confirmPinCode",
        {
          pin_code: pin,
        }
      );

      // store username in securestore
      if (data?.username) {
        const userData = JSON.parse(user || "{}");
        SecureStore.setItem(
          "user",
          JSON.stringify({ ...userData, username: data.username })
        );
      }

      await deleteItemAsync("isCompletedInfo");
      Toast.show({
        type: "success",
        text1: `Login successfully!`,
        position: "bottom",
      });
      router.dismissAll();
      router.replace("/SuccessPage");
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
      <Pressable
        className="absolute top-4 left-4 z-10"
        onPress={() => router.back()}
      >
        <Ionicons name="chevron-back-outline" size={32} color="white" />
      </Pressable>
      <View className="mt-16 mb-6">
        <Text className="color-secondary text-center font-Nunitosemi text-4xl ">
          Confirm PIN Code
        </Text>
      </View>
      <View>
        <OTPInput otpCode={pin} setOtpCode={setPin} />
        <PrimaryButton
          bgColor="bg-secondary-foreground"
          disabled={pin.length !== 6 || isLoading}
          loading={isLoading}
          onPress={PinCodeHandler}
          textLoading="verifying"
        >
          <CustomText className="color-secondary">next</CustomText>
        </PrimaryButton>
      </View>
    </LinearGradient>
  );
};

export default ConfirmPinCode;
