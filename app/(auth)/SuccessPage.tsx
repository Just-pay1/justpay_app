import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import PrimaryButton from "@/components/ui/Custombutton";
import CustomText from "@/components/ui/CustomText";
import { router } from "expo-router";
import Congrates from "@/assets/svg/congrates.svg";

const SuccessPage = () => {
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
          className="flex-1  justify-center ">
          <View className="mx-auto relative items-center justify-center">
            <Congrates scaleY={1.1} scaleX={1.1} />
          </View>
          <View className="mt-16 mb-2">
            <Text className="color-secondary text-center font-Nunitosemi text-4xl">
              Congratulations ! Your Wallet is Ready.
            </Text>
          </View>
          <View className="flex-row justify-center items-center mb-6">
            <CustomText className="color-secondary text-center font-Nunitosemi ">
              You've successfully set up your JustPay wallet ! Enjoy fast and
              secure payments with JustPay .
            </CustomText>
          </View>
          <PrimaryButton
            width="w-[60%]"
            bgColor="bg-transparent"
            borderColor="border-primary"
            onPress={() => router.navigate("/(main)/home")}>
            <CustomText className="color-primary">Done</CustomText>
          </PrimaryButton>
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SuccessPage;
