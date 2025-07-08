import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import CustomText from "@/components/ui/CustomText";
import { TouchableOpacity } from "react-native";
import IconBackground from "@/assets/svg/IconBackground.svg";
import Success from "@/assets/svg/success.svg";
import PrimaryButton from "@/components/ui/Custombutton";

const success = () => {
  const { sucessData } = useLocalSearchParams();
  const Data = JSON.parse((sucessData as string) || "{}");
  const { amount, date, fee, id, time, total } = Data.model;
  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={["#1A5A60", "#113E41", "#081C1C"]}
        className="flex-1 justify-center items-center "
      >
        <View className="absolute top-4 left-0 right-0 flex-row items-center px-4 z-10">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <CustomText className="color-secondary flex-1 text-2xl text-center">
            Payment Succeeded
          </CustomText>
        </View>

        <View className="bg-[#F8FDFC] h-[450px] w-[90%] self-center mt-16 pt-8   px-4 rounded-2xl shadow-lg">
          <IconBackground
            style={{
              position: "absolute",
              top: -80,
              alignSelf: "center",
              transform: [{ translateX: 0 }],
            }}
          />
          <Success
            style={{
              position: "absolute",
              top: -40,
              alignSelf: "center",
              transform: [{ translateX: 0 }],
            }}
          />

          <Text className="text-2xl  mb-4 color-primary-foreground  mt-6 border-b border-primary-foreground">
            Payment Details
          </Text>
          <ScrollView>
            <View className="gap-y-2">
              <View className="flex-row justify-between">
                <CustomText className="color-primary-foreground p-0">
                  Id Number
                </CustomText>
                <CustomText className="color-primary-foreground p-0">
                  {id}
                </CustomText>
              </View>
              <View className="flex-row justify-between">
                <CustomText className="color-primary-foreground p-0">
                  Status
                </CustomText>
                <CustomText className="color-primary p-0">Success</CustomText>
              </View>
              <View className="flex-row justify-between">
                <CustomText className="color-primary-foreground p-0">
                  Time
                </CustomText>
                <CustomText className="color-primary-foreground p-0">
                  {new Date(Date.now()).toLocaleTimeString("en-US", {
                    hourCycle: "h23",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </CustomText>
              </View>
              <View className="flex-row justify-between">
                <CustomText className="color-primary-foreground p-0">
                  Date
                </CustomText>
                <CustomText className="color-primary-foreground p-0">
                  {new Date(Date.now()).toLocaleDateString()}
                </CustomText>
              </View>
              <View className="flex-row justify-between">
                <CustomText className="color-primary-foreground p-0">
                  Payment Method
                </CustomText>
                <CustomText className="color-primary-foreground p-0">
                  justpay Wallet
                </CustomText>
              </View>
              <View className="border-t border-primary-foreground pt-2">
                <View className="flex-row justify-between font-bold">
                  <CustomText className="color-primary-foreground text-xl p-0">
                    Amount
                  </CustomText>
                  <CustomText className="color-primary-foreground text-xl p-0">
                    {Number(amount).toFixed(2)}
                  </CustomText>
                </View>
              </View>
              <View className=" border-primary-foreground">
                <View className="flex-row justify-between font-bold">
                  <CustomText className="color-primary-foreground text-xl p-0">
                    Fee
                  </CustomText>
                  <CustomText className="color-primary-foreground text-xl p-0">
                    {Number(fee).toFixed(2)}
                  </CustomText>
                </View>
              </View>
              <View className="border-t border-primary-foreground pt-2">
                <View className="flex-row justify-between font-bold">
                  <CustomText className="color-primary-foreground text-xl p-0">
                    Total
                  </CustomText>
                  <CustomText className="color-primary text-xl p-0">
                    {Number(total).toFixed(2)}
                  </CustomText>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
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

export default success;
