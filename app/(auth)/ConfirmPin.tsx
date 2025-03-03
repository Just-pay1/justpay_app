import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { OTPInput } from "@/components/auth/Otpinput";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { apiClient } from "@/config/axios.config";

const ConfirmPin = () => {
  const { pinCode } = useLocalSearchParams<{ pinCode?: string }>();
  const [confirmPin, setConfirmPin] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const token = ""; //

  useEffect(() => {
    if (confirmPin.length === 6) {
      if (confirmPin !== pinCode) {
        setError("PIN Codes Don't Match ! Please Try Again .");
      } else {
        setError("");
        submitPin();
      }
    } else {
      setError("");
    }
  }, [confirmPin]);

  const submitPin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await apiClient.post(
        "/path-to-be-confirmed", // API
        { pin: confirmPin },
        {
          headers: {
            Authorization: `Bearer ${token}`, //
          },
        }
      );

      if (response?.data?.success) {
        router.push("/(auth)/SuccessPage");
      } else {
        setError("Failed to set PIN. Please try again.");
      }
    } catch (error) {
      console.error("Set PIN error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          className="flex-1 pt-20">
          <Pressable
            className="absolute top-4 left-4 z-10"
            onPress={() => router.push("/(auth)/PinPage")}>
            <Ionicons name="chevron-back-outline" size={32} color="white" />
          </Pressable>
          <View className="mt-16 mb-6">
            <Text className="color-secondary text-center font-Nunitosemi text-4xl">
              Confirm Your PIN
            </Text>
          </View>
          {error !== "" && (
            <View className="flex-row justify-center items-center mb-4">
              <Ionicons name="alert-circle" size={16} color="red" />
              <Text className="color-danger  text-base ml-1 font-Nunitosemi">
                {error}
              </Text>
            </View>
          )}

          <OTPInput otpCode={confirmPin} setOtpCode={setConfirmPin} />
          {loading && (
            <View className="mt-4">
              <ActivityIndicator size="small" color="#ffffff" />
            </View>
          )}
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ConfirmPin;
