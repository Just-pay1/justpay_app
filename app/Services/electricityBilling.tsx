import CustomInput from "@/components/ui/CustomInput";
import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import PrimaryButton from "@/components/ui/Custombutton";
import CustomText from "@/components/ui/CustomText";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import Elec from "@/assets/svg/elec.svg";
import { apiClient } from "@/config/axios.config";

const ElectricityBilling = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const handleContinue = async () => {
    if (code.length !== 13) {
      Alert.alert("Invalid Code", "E-Payment Code must be 13 digits.");
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post("/", {
        paymentCode: code,
      });

      if (response.status === 200) {
        const { billId, time, date, paymentmethod, total, status } =
          response.data;
        router.push({
          pathname: "/Services/paymentDetails",
          params: {
            billId,
            time,
            date,
            paymentmethod,
            total,
            status,
          },
        });
      } else {
        Alert.alert("Error", "Invalid E-Payment Code.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <View className="flex-1 bg-secondary">
      {/* Header Section */}
      <LinearGradient colors={["#1A5A60", "#113E41", "#081C1C"]}>
        <View className=" pb-28 pt-16 items-center -mx-5">
          <Elec width={60} height={60} />
          <CustomText className="color-secondary text-4xl mt-2 ">
            Electricity Billing
          </CustomText>
        </View>
      </LinearGradient>

      <View className="flex-1 bg-secondary rounded-t-[40px] -mt-16 pt-8 px-5">
        {/* Input Section */}
        <View className="mt-10 px-1">
          <CustomText className="color-primary text-left text-xl  mb-2 ">
            E-Payment Code
          </CustomText>
          <CustomInput
            placeholder="E-Payment Code (13 Digits)"
            keyboardType="numeric"
            maxLength={13}
            value={code}
            onChangeText={setCode}
            className="border-2 border-primary rounded-full px-4 py-3 text-secondary-foreground"
          />
        </View>
        {/* Button Section */}
        <View className="mt-8 ">
          <PrimaryButton
            width="w-[90%]"
            borderColor="border-primary"
            onPress={handleContinue}
            bgColor="bg-primary">
            <CustomText className="color-secondary ">Continue</CustomText>
          </PrimaryButton>
        </View>

        <View className="items-center mt-2">
          <Text className="color-muted text-sm  ">
            🔒 All Transactions Are Secure And Protected.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ElectricityBilling;
