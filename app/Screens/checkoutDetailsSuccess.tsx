import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import CustomText from "@/components/ui/CustomText";
import Success from "@/assets/svg/success.svg";
import PrimaryButton from "@/components/ui/Custombutton";
import { getItem } from "expo-secure-store";

const CheckoutDetailsSuccess = () => {
  const { sucessData } = useLocalSearchParams();
  const {
    total,
    amount,
    fee,
    id,
    date,
    time,
    name,
    username,
    selectedTab,
    phone,
  } = JSON.parse(sucessData as string);
  const user = JSON.parse(getItem("user") as string);
  const data = {
    amount: `${amount} EGP`,
    from: {
      name: user.name,
      email: `${selectedTab === "phone" ? user.phone : `${user.username}@justpay.com`}`,
    },
    to: {
      name: name,
      email: `${selectedTab === "phone" ? phone : `${username}@justpay.com`}`,
    },
    reference: id,
    date: date + " at " + time,
  };

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={["#1A5A60", "#113E41", "#081C1C"]}
        className="flex-1 justify-center items-center"
      >
        {/* Header */}
        <View className="absolute top-4 flex-row items-center w-full px-4">
          <TouchableOpacity onPress={() => router.dismissTo("/")}>
            <Ionicons name="chevron-back-outline" size={32} color="white" />
          </TouchableOpacity>
          <CustomText className="text-secondary text-3xl text-center flex-1 mr-8">
            Checkout Details
          </CustomText>
        </View>

        {/* Card */}
        <View className="bg-secondary w-[90%] mt-28 rounded-2xl px-5 pt-16 pb-8 relative shadow-lg">
          {/* Success Icon */}
          <View className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-secondary rounded-full p-8 shadow-md ml-4">
            <Success width={50} height={50} />
          </View>

          {/* Success Message */}
          <Text className="text-center text-xl mt-5 text-gray-500">
            Your transaction Has been completed successfully
          </Text>

          {/* Amount */}
          <Text className="text-center text-4xl font-bold text-black mt-2">
            {data.amount}
          </Text>
          <Text className="text-center text-xl text-gray-500 mb-3">
            Transfer Amount
          </Text>

          {/* From Section */}
          <View>
            <CustomText className="text-muted text-start p-0">From</CustomText>
            <CustomText className="text-2xl text-start p-0 ">
              {data.from.name}
            </CustomText>
            <CustomText className="text-muted text-start p-0 mb-3 ">
              {data.from.email}
            </CustomText>
          </View>

          {/* Divider with Dot */}
          <View className="relative items-center justify-center mb-4 w-full">
            <View className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#E5E7EB]" />
            <View className="bg-white z-10 p-1 rounded-full">
              <Success width={20} height={20} />
            </View>
          </View>

          {/* To Section */}
          <View>
            <CustomText className="text-muted text-start p-0">To</CustomText>
            <CustomText className="text-2xl text-start p-0">
              {data.to.name}
            </CustomText>
            <CustomText className="text-muted text-start p-0 mb-3 ">
              {data.to.email}
            </CustomText>
          </View>

          {/* Reference */}
          <View className="flex-row justify-between mb-1">
            <CustomText className="text-xl p-0">Reference</CustomText>
            <CustomText className="text-xl p-0">{data.reference}</CustomText>
          </View>
          <View
            className="w-full border-t border-muted"
            style={{ borderStyle: "dashed" }}
          />

          {/* Date */}
          <View className="flex-row justify-between my-2">
            <CustomText className="text-xl p-0">Date</CustomText>
            <CustomText className="text-primary text-xl p-0">
              {data.date}
            </CustomText>
          </View>

          {/* 🔵 Semi-Circle Bottom Decoration */}
          <View className="absolute -bottom-2 left-1 right-1 flex-row justify-between px-1">
            {Array.from({ length: 13 }).map((_, i) => (
              <View key={i} className="w-6 h-6 rounded-full bg-[#072424]" />
            ))}
          </View>
        </View>

        {/* Done Button */}
        <PrimaryButton
          width="w-[60%]"
          bgColor="bg-transparent"
          borderColor="border-white"
          onPress={() => router.dismissTo("/")}
          styled={{ marginTop: 20 }}
        >
          <CustomText className="text-primary text-lg">Done</CustomText>
        </PrimaryButton>
      </LinearGradient>
    </ScrollView>
  );
};

export default CheckoutDetailsSuccess;
