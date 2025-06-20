import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import PrimaryButton from "@/components/ui/Custombutton";
import CustomText from "@/components/ui/CustomText";
import { router } from "expo-router";
import Congrats from "@/assets/animation/congrats.json";
import LottieView from "lottie-react-native";
import { useRef } from "react";
import Congrates from "@/assets/svg/congrates.svg";

const SuccessPage = () => {
  const animationRef = useRef(null);

  return (
    <LinearGradient
      colors={["#1A5A60", "#113E41", "#081C1C"]}
      className="flex-1  justify-center "
    >
      <View className="mx-auto relative items-center justify-center">
        <LottieView
          ref={animationRef}
          source={Congrats}
          autoPlay
          loop={false}
          style={{ width: 300, height: 300 }}
        />
      </View>
      <View className="mt-2 mb-2">
        <Text className="color-secondary text-center font-Nunitosemi text-4xl">
          Congratulations ! Your Wallet is Ready.
        </Text>
      </View>
      <View className="flex-row justify-center items-center mb-6">
        <CustomText className="color-secondary text-center font-Nunitosemi ">
          You've successfully set up your JustPay wallet ! Enjoy fast and secure
          payments with JustPay .
        </CustomText>
      </View>
      <PrimaryButton
        width="w-[60%]"
        bgColor="bg-transparent"
        borderColor="border-primary"
        onPress={() => {
          // router.dismissAll();
          router.replace("/");
        }}
      >
        <CustomText className="color-primary">Done</CustomText>
      </PrimaryButton>
    </LinearGradient>
  );
};

export default SuccessPage;
