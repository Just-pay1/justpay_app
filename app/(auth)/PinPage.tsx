import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { OTPInput } from "@/components/auth/Otpinput";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { isValidPin } from "@/validation";

const PinPage: React.FC = () => {
  const [pin, setPin] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (pin.length === 6) {
      if (!isValidPin(pin)) {
        setErrorMessage("Weak PIN! Please choose a more secure PIN.");
        setPin("");
      } else {
        setErrorMessage("");
        router.push({
          pathname: "/(auth)/ConfirmPin",
          params: { pinCode: pin },
        });
      }
    }
  }, [pin]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={["#1A5A60", "#113E41", "#081C1C"]}
          className="flex-1 pt-20 ">
          <Pressable
            className="absolute top-4 left-4 z-10"
            onPress={() => router.push("/(auth)/UserName")}>
            <Ionicons name="chevron-back-outline" size={32} color="white" />
          </Pressable>

          <View className="mt-16 mb-6">
            <Text className="color-secondary text-center font-Nunitosemi  text-4xl ">
              PIN Code
            </Text>
          </View>
          {errorMessage !== "" && (
            <View className="flex-row justify-center items-center mb-4">
              <Ionicons name="alert-circle" size={16} color="red" />
              <Text className="color-danger  text-base ml-1 font-Nunitosemi">
                {errorMessage}
              </Text>
            </View>
          )}
          <OTPInput otpCode={pin} setOtpCode={setPin} />
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PinPage;
