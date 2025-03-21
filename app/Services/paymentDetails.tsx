import React from "react";
import { View, ScrollView, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CustomText from "@/components/ui/CustomText";
import PrimaryButton from "@/components/ui/Custombutton";
import { router } from "expo-router";
import Elec from "@/assets/svg/elec.svg";

const PaymentDetails = () => {
  return (
    <View className="flex-1 bg-secondary">
      {/* Header Section */}
      <LinearGradient colors={["#1A5A60", "#113E41", "#081C1C"]}>
        <View className="pb-28 pt-16 items-center -mx-5">
          <Elec width={60} height={60} />
          <CustomText className="color-secondary text-4xl  mt-2">
            Electricity Billing
          </CustomText>
        </View>
      </LinearGradient>

      {/* Payment Details Section */}

      <View className="flex-1 bg-secondary rounded-t-[40px] -mt-12 pt-8 px-5 ">
        <ScrollView
          className="flex-1 pb-20"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View className="p-6 bg-white rounded-2xl ">
            <CustomText className="text-primary text-2xl  mb-1 text-left">
              Payment Details
            </CustomText>
            <View className="border-t border-muted pt-2 ">
              <View className="flex-row justify-between">
                <CustomText className="color-primary-foreground">
                  Id Number
                </CustomText>
                <CustomText className="color-primary-foreground">
                  012514786354
                </CustomText>
              </View>
            </View>

            <View className="flex-row justify-between">
              <CustomText className="color-primary-foreground">Time</CustomText>
              <CustomText className="color-primary-foreground">
                07:42 PM
              </CustomText>
            </View>

            <View className="flex-row justify-between">
              <CustomText className="color-primary-foreground">Date</CustomText>
              <CustomText className="color-primary-foreground">
                25 Sep 2024
              </CustomText>
            </View>

            <View className="flex-row justify-between">
              <CustomText className=" color-primary-foreground">
                Payment Method
              </CustomText>
              <CustomText className="color-primary-foreground ">
                Credit Card
              </CustomText>
            </View>

            <View className="border-t border-muted  ">
              <View className="flex-row justify-between mt-2">
                <Text className="color-primary-foreground  text-xl ">
                  Total
                </Text>
                <Text className="color-primary-foreground text-xl">0 EGP</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Buttons Section */}
        <View className="mt-2 items-center">
          <PrimaryButton
            width="w-[71%]"
            borderColor="border-primary"
            bgColor="bg-primary">
            <CustomText className="color-secondary ">Confirm</CustomText>
          </PrimaryButton>

          <PrimaryButton
            width="w-[70%] "
            borderColor="border-primary"
            bgColor="bg-transparent"
            onPress={() => router.push("/(main)/home")}>
            <CustomText className="color-primary  ">Cancel</CustomText>
          </PrimaryButton>
        </View>

        <View className="items-center pb-12 mt-8">
          <Text className="color-muted text-sm  ">
            🔒 All Transactions are Secure and protected.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PaymentDetails;
