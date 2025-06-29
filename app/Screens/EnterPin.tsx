import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { OTPInput } from "@/components/auth/Otpinput";
import { LinearGradient } from "expo-linear-gradient";
import PrimaryButton from "@/components/ui/Custombutton";
import CustomText from "@/components/ui/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const EnterPinCode = () => {
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LinearGradient
      colors={["#1A5A60", "#113E41", "#081C1C"]}
      className="flex-1 pt-20 justify-around">
      <Pressable
        className="absolute top-6 left-4 z-10"
        onPress={() => router.back()}>
        <Ionicons name="chevron-back-outline" size={30} color="white" />
      </Pressable>

      <View className="mt-4 mb-6">
        <Text className="color-secondary text-center font-Nunitosemi text-4xl mb-4">
          ENTER PIN
        </Text>
        <OTPInput otpCode={pin} setOtpCode={setPin} />
      </View>

      <View>
        <PrimaryButton
          bgColor="bg-secondary"
          disabled={pin.length !== 6 || isLoading}
          loading={isLoading}
          // onPress={ConfirmPaymentPin}
          textLoading="verifying">
          <CustomText className="color-secondary">next</CustomText>
        </PrimaryButton>
      </View>
    </LinearGradient>
  );
};

export default EnterPinCode;
