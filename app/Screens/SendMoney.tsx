import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import CustomInputWithSuffix from "@/components/ui/CustomInputWithSuffix";
import CustomText from "@/components/ui/CustomText";
import PrimaryButton from "@/components/ui/Custombutton";
import Sendmoney from "@/assets/svg/sendmoney.svg";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const SendMoney = () => {
  const router = useRouter();
  return (
    <View className="flex-1 bg-secondary">
      {/* Header Section */}
      <LinearGradient colors={["#1A5A60", "#113E41", "#081C1C"]}>
        <View className=" h-[300px] justify-center items-center ">
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-4 left-5">
            <Ionicons name="chevron-back-outline" size={30} color="white" />
          </TouchableOpacity>
          <Sendmoney width={60} height={60} />
          <CustomText className="color-secondary text-4xl mt-2 ">
            Send Money
          </CustomText>
        </View>
      </LinearGradient>

      <View className="flex-1 bg-secondary rounded-t-[40px] -mt-10 pt-2 px-8">
        {/* Payment Address */}
        <View className="mt-12">
          <CustomInputWithSuffix
            placeholder="Payment Address"
            keyboardType="default"
            suffix={
              <Text className="color-secondary-foreground">@justpay</Text>
            }
          />
        </View>

        {/* Amount */}
        <View className="mt-6 pb-4">
          <CustomInputWithSuffix
            placeholder="Amount"
            keyboardType="numeric"
            suffix={<Text className="color-secondary-foreground ">EGP</Text>}
          />
        </View>

        {/* Button */}

        <PrimaryButton
          bgColor="bg-primary"
          width="w-[90%]"
          onPress={() => router.push("/Screens/SendDetails")}>
          <View className="flex-row items-center justify-center ">
            <CustomText className="color-secondary text-xl">Next</CustomText>
          </View>
        </PrimaryButton>

        {/* Secure Note */}
        <View className="flex-row items-center justify-center mt-4">
          <Ionicons name="shield-checkmark" size={16} color="#1A5A60" />
          <Text className="text-xs text-gray-400 ml-2">
            All Transactions Are Secure And Protected.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SendMoney;
