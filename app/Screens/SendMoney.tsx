import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import CustomInputWithSuffix from "@/components/ui/CustomInputWithSuffix";
import CustomText from "@/components/ui/CustomText";
import PrimaryButton from "@/components/ui/Custombutton";
import Sendmoney from "@/assets/svg/sendmoney.svg";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CustomErrorToast from "@/components/ui/CustomErrorToast";
import { apiClient } from "@/config/axios.config";

const SendMoney = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<"username" | "phone">(
    "username"
  );
  const [inputData, setInputData] = useState({
    username: "",
    phone: "",
    amount: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const identifier =
        selectedTab === "username" ? inputData.username : inputData.phone;

      if (!identifier || !inputData.amount) {
        CustomErrorToast("Please fill in all fields");
        return;
      }

      const { data: userData, status } = await apiClient.post(
        `/identity/user/getUserByUsername`,
        {
          [selectedTab === "username" ? "username" : "phone"]: identifier,
        }
      );

      if (status === 200) {
        try {
          const { data, status } = await apiClient.get(
            `/transactions/api/transaction/cal-fees/${Number(inputData.amount)}`
          );
          if (status === 200) {
            router.push({
              pathname: "/Screens/SendDetails",
              params: {
                userData: JSON.stringify({
                  ...userData,
                  amount: inputData.amount,
                  fees: data.fees,
                  selectedTab,
                }),
              },
            });
          }
        } catch (error) {
          CustomErrorToast(error);
        }
      }
    } catch (error) {
      CustomErrorToast(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-secondary mb-2">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header Section */}
        <LinearGradient colors={["#1A5A60", "#113E41", "#081C1C"]}>
          <View className="h-[300px] justify-center items-center">
            <TouchableOpacity
              onPress={() => router.back()}
              className="absolute top-4 left-5"
            >
              <Ionicons name="chevron-back-outline" size={30} color="white" />
            </TouchableOpacity>
            <Sendmoney width={60} height={60} />
            <CustomText className="color-secondary text-4xl mt-2">
              Send Money
            </CustomText>
            {/* Tabs */}
            <View className="flex-row justify-center mt-6 w-full px-10">
              <TouchableOpacity
                onPress={() => setSelectedTab("username")}
                className={`flex-1 items-center py-2 border-b-2 ${
                  selectedTab === "username"
                    ? "border-primary"
                    : "border-secondary"
                }`}
              >
                <Ionicons
                  name="person-outline"
                  size={22}
                  color={selectedTab === "username" ? "#80cccc" : "#ffffff"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedTab("phone")}
                className={`flex-1 items-center py-2 border-b-2 ${
                  selectedTab === "phone"
                    ? "border-primary"
                    : "border-secondary"
                }`}
              >
                <Ionicons
                  name="call-outline"
                  size={22}
                  color={selectedTab === "phone" ? "#80cccc" : "#ffffff"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        <View className="flex-1 bg-secondary rounded-t-[40px] -mt-10 pt-6 px-8">
          {/* Address or phone */}
          <View className="mt-6">
            {selectedTab === "username" ? (
              <CustomInputWithSuffix
                placeholder="Payment Address"
                keyboardType="default"
                value={inputData.username}
                onChangeText={(text) =>
                  setInputData({ ...inputData, username: text })
                }
                suffix={
                  <Text className="color-secondary-foreground">@justpay</Text>
                }
              />
            ) : (
              <CustomInputWithSuffix
                placeholder="phone Number"
                keyboardType="phone-pad"
                value={inputData.phone}
                onChangeText={(text) =>
                  setInputData({ ...inputData, phone: text })
                }
                suffix={null}
              />
            )}
          </View>

          {/* Amount */}
          <View className="mt-6 pb-4">
            <CustomInputWithSuffix
              placeholder="Amount"
              keyboardType="numeric"
              value={inputData.amount}
              onChangeText={(text) =>
                setInputData({ ...inputData, amount: text })
              }
              suffix={<Text className="color-secondary-foreground">EGP</Text>}
            />
          </View>

          {/* Button */}
          <PrimaryButton
            bgColor="bg-primary"
            width="w-[90%]"
            onPress={onSubmit}
            disabled={
              isLoading ||
              (selectedTab === "username"
                ? inputData.username.length < 3
                : inputData.phone.length < 11) ||
              inputData.amount === ""
            }
            loading={isLoading}
          >
            <View className="flex-row items-center justify-center">
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
      </ScrollView>
    </View>
  );
};

export default SendMoney;
