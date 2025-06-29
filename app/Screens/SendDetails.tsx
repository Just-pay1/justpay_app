import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import CustomText from "@/components/ui/CustomText";
import PrimaryButton from "@/components/ui/Custombutton";
import Sendmoney from "@/assets/svg/sendmoney.svg";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import UserCard from "@/components/ui/UserCard";

const SendDetails = () => {
  const router = useRouter();
  const amount = 90;
  const fees = 0.5;
  const total = amount + fees;

  const sender = {
    name: "Nada Gamal Ahmed",
    address: "Nada123@justpay",
  };

  const receiver = {
    name: "Mohamed A* E*****",
    address: "Mo123@justpay",
  };
  return (
    <View className="flex-1 bg-secondary">
      {/* Header Section */}
      <LinearGradient colors={["#1A5A60", "#113E41", "#081C1C"]}>
        <View className=" pb-12 pt-12 justify-center items-center ">
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

      <View className="flex-1 bg-secondary rounded-t-[40px] -mt-10 pt-6 px-6">
        {/* Amount & Fees */}
        <View className="items-center mt-4">
          <Text className="text-4xl font-bold ">{amount} EGP</Text>
          <Text className="text-xl text-base color-secondary-foreground mt-1">
            Transfer Amount
          </Text>
        </View>

        <View className="mt-6 space-y-2">
          <View className="flex-row justify-between">
            <Text className="font-semibold text-xl color-primary-foreground">
              Fees
            </Text>
            <Text className="text-base ">{fees.toFixed(2)} EGP</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="font-semibold text-xl color-primary-foreground">
              Total amount
            </Text>
            <Text className="text-base">{total.toFixed(2)} EGP</Text>
          </View>
        </View>

        {/* From & To */}
        <View className="mt-6">
          <UserCard
            type="from"
            name="Nada Gamal Ahmed"
            address="Nada123@Justppay"
          />
          <View className="h-3" />
          <UserCard
            type="to"
            name="Mohamed A** E*****"
            address="Mo123@Justppay"
          />
        </View>

        {/* Button */}
        <View className="mt-2 space-y-4 items-center ">
          <PrimaryButton
            bgColor="bg-primary"
            width="w-[90%]"
            onPress={() => router.push("/Screens/EnterPin")}>
            <View className="flex-row items-center justify-center ">
              <CustomText className="color-secondary text-xl">
                confirm
              </CustomText>
            </View>
          </PrimaryButton>

          <PrimaryButton
            bgColor="bg-transparent"
            width="w-[90%]"
            className="border border-primary rounded-full"
            onPress={() => router.push("/(main)/home/wallet")}>
            <View className="flex-row items-center justify-center ">
              <CustomText className="text-primary text-xl ">Cancel</CustomText>
            </View>
          </PrimaryButton>
        </View>
        {/* Secure Note */}
        <View className="flex-row items-center justify-center mt-4">
          <Ionicons name="shield-checkmark" size={16} color="#1A5A60" />
          <Text className="text-xs  text-gray-400 ml-2">
            All Transactions Are Secure And Protected.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SendDetails;
