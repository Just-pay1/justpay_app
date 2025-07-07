import CustomInput from "@/components/ui/CustomInput";
import React, { useState } from "react";
import { View, Text, Alert, ScrollView, TouchableOpacity } from "react-native";
import PrimaryButton from "@/components/ui/Custombutton";
import CustomText from "@/components/ui/CustomText";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import Elec from "@/assets/svg/elec.svg";
import { apiBilling, apiClient } from "@/config/axios.config";
import toastConfig from "@/config/toast";
import CustomErrorToast from "@/components/ui/CustomErrorToast";
import RenderIcon from "@/components/ui/RenderIcon";
import { Ionicons } from "@expo/vector-icons";

const GeneralBilling = () => {
  const { merchant_id, service_type, service_id, commercial_name } =
    useLocalSearchParams();
  console.log({ merchant_id, service_type, service_id, commercial_name });
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  // const whatService = () => {
  //   if (service_type.includes("internet")) {
  //     if (!code.startsWith("055") || code.length !== 10) {
  //       return {
  //         message: "your bill code must start with 055 and be 10 digits",
  //         length: 10,
  //       };
  //     }
  //   } else if (
  //     String(service_type).toLowerCase().includes("mobile") ||
  //     String(service_type).toLowerCase().includes("phone")
  //   ) {
  //     if (String(commercial_name).toLowerCase().includes("vodafone")) {
  //       if (
  //         !code.startsWith("010") ||
  //         code.startsWith("011") ||
  //         code.startsWith("012") ||
  //         code.length !== 11
  //       ) {
  //         return {
  //           message: "your bill code must start with 010 and be 11 digits",
  //           length: 11,
  //         };
  //       }
  //     } else if (String(commercial_name).toLowerCase().includes("orange")) {
  //       if (
  //         !code.startsWith("012") ||
  //         code.startsWith("010") ||
  //         code.startsWith("011") ||
  //         code.length !== 11
  //       ) {
  //         return {
  //           message: "your bill code must start with 012 and be 11 digits",
  //           length: 11,
  //         };
  //       }
  //     } else if (
  //       String(commercial_name).toLowerCase().includes("eti") ||
  //       String(commercial_name).toLowerCase().includes("itis")
  //     ) {
  //       if (
  //         !code.startsWith("011") ||
  //         code.startsWith("010") ||
  //         code.startsWith("012") ||
  //         code.length !== 11
  //       ) {
  //         return {
  //           message: "your bill code must start with 011 and be 11 digits",
  //           length: 11,
  //         };
  //       }
  //     }
  //   } else {
  //     return {
  //       message: "your bill code should be 4 digits",
  //       length: 4,
  //     };
  //   }
  // };
  const whatService = () => {
    if (service_type.includes("internet")) {
      if (!code.startsWith("055") || code.length !== 10) {
        return {
          message: "your bill code must start with 055 and be 10 digits",
          length: 10,
        };
      }
    } else if (
      String(service_type).toLowerCase().includes("mobile") ||
      String(service_type).toLowerCase().includes("phone")
    ) {
      if (String(commercial_name).toLowerCase().includes("vodafone")) {
        if (!code.startsWith("010") || code.length !== 11) {
          return {
            message: "your bill code must start with 010 and be 11 digits",
            length: 11,
          };
        }
      } else if (String(commercial_name).toLowerCase().includes("orange")) {
        if (!code.startsWith("012") || code.length !== 11) {
          return {
            message: "your bill code must start with 012 and be 11 digits",
            length: 11,
          };
        }
      } else if (
        String(commercial_name).toLowerCase().includes("eti") ||
        String(commercial_name).toLowerCase().includes("itis")
      ) {
        if (!code.startsWith("011") || code.length !== 11) {
          return {
            message: "your bill code must start with 011 and be 11 digits",
            length: 11,
          };
        }
      }
    } else {
      if (code.length !== 4) {
        return {
          message: "your bill code should be 4 digits",
          length: 4,
        };
      }
    }
    return null;
  };

  const handleContinue = async () => {
    const service = whatService();
    console.log(service);

    // Show error if validation failed
    if (service) {
      Alert.alert("Invalid Code", `${service.message}`);
      return;
    }
    try {
      setLoading(true);
      // let url = "";
      // if (service_type === "electric bills") {
      //   url = "electric-bill-details";
      // } else if (service_type === "water bills") {
      //   url = "water-bill-details";
      // } else if (service_type === "gas bills") {
      //   url = "/gas-bill-details";
      // }
      // const { data } = await apiBilling.get(
      //   `/bills/${url}?merchant_id=${merchant_id}&bill_code=BILL${code}`
      // );
      let url = "";
      if (
        service_type.includes("internet") ||
        service_type.includes("mobile") ||
        service_type.includes("phone")
      ) {
        url = `${code}`;
      } else {
        url = `BILL${code}`;
      }
      const { data } = await apiBilling.get(
        `/bills/get-bill-details?merchant_id=${merchant_id}&bill_code=${url}&service_id=${service_id}`
      );

      console.log(data.data);
      router.replace({
        pathname: "/Services/paymentDetails",
        params: {
          source: "billing",
          dataWillBeShown: JSON.stringify({
            ...data.data,
            service_type,
            commercial_name,
          }),
        },
      });
    } catch (error) {
      console.log(error);
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
          <RenderIcon
            serviceType={service_type as string}
            size={50}
            commercialName={commercial_name as string}
          />
          <CustomText className="color-secondary text-4xl mt-2 ">
            {commercial_name}
          </CustomText>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 bg-secondary rounded-t-[40px] -mt-16 px-5 mb-1">
        <View className="mt-10 px-1">
          <CustomText className="color-primary text-left text-xl  mb-2 ">
            E-Payment Code
          </CustomText>
          <CustomInput
            placeholder="E-Payment Code"
            keyboardType="numeric"
            inputMode="numeric"
            maxLength={
              service_type.includes("internet")
                ? 10
                : service_type.includes("mob") || service_type.includes("phone")
                  ? 11
                  : 4
            }
            value={code}
            onChangeText={setCode}
            className="border-2 border-primary rounded-full px-4 py-3 text-primary"
          />
        </View>
        {/* Button Section */}
        <View className="mt-4 ">
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

export default GeneralBilling;
