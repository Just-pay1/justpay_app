import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import CustomText from "@/components/ui/CustomText";
import Success from "@/assets/svg/success.svg";
import PrimaryButton from "@/components/ui/Custombutton";

const CheckoutDetailsSuccess = () => {
  const data = {
    amount: "90 EGP",
    from: {
      name: "Nada Gamal Ahmed",
      email: "Nada123@Justppay",
    },
    to: {
      name: "Mohamed A** E*****",
      email: "Mo123@Justppay",
    },
    reference: "123456789",
    date: "25 June 2025 01:20 AM",
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
          <TouchableOpacity onPress={() => router.push("/(main)/home")}>
            <Ionicons name="chevron-back-outline" size={32} color="white" />
          </TouchableOpacity>
          <CustomText className="text-secondary text-3xl text-center flex-1 mr-8">
            Checkout Details
          </CustomText>
        </View>

        {/* Card */}
        <View className="bg-secondary w-[90%] mt-28 rounded-2xl px-5 pt-16 pb-8 relative shadow-lg">
          {/* Success Icon */}
          <View className="absolute -top-20 left-1/2 -ml-16 bg-secondary rounded-full p-10 shadow-md">
            <Success width={80} height={80} />
          </View>

          {/* Success Message */}
          <Text className="text-center text-xl mt-10 text-gray-500">
            Your Transaction Was Successful
          </Text>

          {/* Amount */}
          <Text className="text-center text-4xl font-bold text-black mt-2">
            {data.amount}
          </Text>
          <Text className="text-center text-xl text-gray-500 mb-6">
            Transfer Amount
          </Text>

          {/* From Section */}
          <View>
            <CustomText className="text-muted text-start">From</CustomText>
            <CustomText className="text-2xl text-start -mt-6">
              {data.from.name}
            </CustomText>
            <CustomText className="text-muted text-start mb-3 -mt-6">
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
            <CustomText className="text-muted text-start">To</CustomText>
            <CustomText className="text-2xl text-start -mt-6">
              {data.to.name}
            </CustomText>
            <CustomText className="text-muted text-start mb-3 -mt-6">
              {data.to.email}
            </CustomText>
          </View>

          {/* Reference */}
          <View className="flex-row justify-between mb-1">
            <CustomText className="text-xl">Reference</CustomText>
            <CustomText className="text-xl">{data.reference}</CustomText>
          </View>
          <View
            className="w-full border-t border-muted"
            style={{ borderStyle: "dashed" }}
          />

          {/* Date */}
          <View className="flex-row justify-between mb-4">
            <CustomText className="text-xl">Date</CustomText>
            <CustomText className="text-primary text-xl">
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
          onPress={() => router.push("/(main)/home")}
          styled={{ marginTop: 30 }}
        >
          <CustomText className="text-white text-lg">Done</CustomText>
        </PrimaryButton>
      </LinearGradient>
    </ScrollView>
  );
};

export default CheckoutDetailsSuccess;
