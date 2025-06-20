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
  const { billId, status, time, date, paymentmethod, total } =
    useLocalSearchParams();

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={["#1A5A60", "#113E41", "#081C1C"]}
        className="flex-1 justify-center items-center ">
        <View className=" absolute top-4 flex-row items-center px-2 ">
          <TouchableOpacity
            onPress={() => router.push("/(main)/home")}
            className="absolute left-0">
            <Ionicons name="chevron-back-outline" size={32} color="white" />
          </TouchableOpacity>
          <CustomText className="color-secondary flex-1 text-2xl  mx-auto  ">
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

          <Text className="text-2xl  mb-6 color-primary-foreground  mt-6 border-b border-primary-foreground">
            Payment Details
          </Text>
          <ScrollView>
            <View className="gap-y-2">
              <View className="flex-row justify-between">
                <Text className="color-secondary-foreground">Id Number</Text>
                <Text className="color-secondary-foreground">{billId}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="color-secondary-foreground">Status</Text>
                <Text className="color-primary">{status}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="color-secondary-foreground">Time</Text>
                <Text className="color-secondary-foreground">{time}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="color-secondary-foreground">Date</Text>
                <Text className="color-secondary-foreground">{date}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="color-secondary-foreground">
                  Payment Method
                </Text>
                <Text className="color-secondary-foreground">
                  {paymentmethod}
                </Text>
              </View>
              <View className="border-t border-primary-foreground mt-2 pt-2">
                <View className="flex-row justify-between font-bold">
                  <Text className="color-secondary-foreground text-xl">
                    Total
                  </Text>
                  <Text className="color-primary text-xl">{total}</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <PrimaryButton
          width="w-[60%]"
          bgColor="bg-transparent"
          borderColor="border-primary"
          onPress={() => router.push("/(main)/home")}
          styled={{ marginTop: 10 }}>
          <CustomText className="color-primary">Get PDF Receipt</CustomText>
        </PrimaryButton>
      </LinearGradient>
    </ScrollView>
  );
};

export default success;
