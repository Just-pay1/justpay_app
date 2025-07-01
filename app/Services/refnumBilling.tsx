import CustomInput from "@/components/ui/CustomInput";
import React, { useState } from "react";
import { View, Text, Alert, ScrollView } from "react-native";
import PrimaryButton from "@/components/ui/Custombutton";
import CustomText from "@/components/ui/CustomText";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { apiRefNumBilling, apiClient } from "@/config/axios.config";
import CustomErrorToast from "@/components/ui/CustomErrorToast";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import RenderIcon from "@/components/ui/RenderIcon";
const RefnumBilling = () => {
  const { merchant_id, service_type, service_id, commercial_name } =
    useLocalSearchParams();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const handleContinue = async () => {
    if (code.length !== 9) {
      Alert.alert("Invalid Code", "E-Payment Code must be 9 digits.");
      return;
    }
    try {
      setLoading(true);
      const { data } = await apiClient.get(
        `reference-number/api/billing/${code}`
      );
      console.log(data.data);
      router.replace({
        pathname: "/Services/refnumPaymentDetails",
        params: {
          dataWillBeShown: JSON.stringify({
            ...data.data,
            commercial_name,
            service_type,
          }),
        },
      });
    } catch (error) {
      CustomErrorToast(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-secondary">
      {/* Header Section */}
      <LinearGradient colors={["#1A5A60", "#113E41", "#081C1C"]}>
        <View className=" pb-28 pt-16 items-center -mx-5">
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute left-10 top-5"
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          <RenderIcon serviceType={service_type as string} size={50} />

          <CustomText className="color-secondary text-4xl mt-2 ">
            {commercial_name}
          </CustomText>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 bg-secondary rounded-t-[40px] -mt-16 px-5 mb-1">
        <View className="mt-10 px-1">
          <CustomText className="color-primary text-left text-xl  mb-2 ">
            Reference Number Code
          </CustomText>
          <CustomInput
            placeholder="E-Payment Code (9 Digits)"
            keyboardType="numeric"
            maxLength={9}
            value={code}
            onChangeText={setCode}
            className="border-2 border-primary rounded-full px-4 py-3 text-primary"
          />
        </View>
        {/* Button Section */}
        <View className="mt-4">
          <PrimaryButton
            width="w-[90%]"
            onPress={handleContinue}
            loading={loading}
          >
            <CustomText className="color-secondary bg-primary">
              Continue
            </CustomText>
          </PrimaryButton>
        </View>

        <View className="items-center mt-2">
          <Text className="color-muted text-sm  ">
            🔒 All Transactions Are Secure And Protected.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default RefnumBilling;
