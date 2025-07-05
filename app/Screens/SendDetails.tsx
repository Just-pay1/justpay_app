import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import CustomText from "@/components/ui/CustomText";
import PrimaryButton from "@/components/ui/Custombutton";
import Sendmoney from "@/assets/svg/sendmoney.svg";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import UserCard from "@/components/ui/UserCard";
import { getItem } from "expo-secure-store";
import OTPModel from "@/components/ui/OTPModel";
import { apiClient } from "@/config/axios.config";
import { encryptData } from "@/utils";
import CustomErrorToast from "@/components/ui/CustomErrorToast";
import ErrorModal from "@/components/ui/ErrorModal";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";

const SendDetails = () => {
  const { userData } = useLocalSearchParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pinCode, setPinCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { amount, fees, id, username, name, selectedTab, phone } = JSON.parse(
    userData as string
  );
  const router = useRouter();
  const queryClient = useQueryClient();
  const total = Number(amount) + Number(fees);
  const user = JSON.parse(getItem("user") as string);
  const handleConfirm = () => {
    setIsModalVisible(true);
  };
  const onVerifyHandler = async () => {
    try {
      setIsLoading(true);
      const { status } = await apiClient.post(
        `/identity/walletConfig/verifyPinCode`,
        {
          pin_code: pinCode,
        }
      );
      if (status === 200) {
        setIsModalVisible(false);
        try {
          const { signature, timestamp, nonce } = encryptData(id, amount);
          const paymentData = {
            receiver_id: id,
            amount: amount,
            signature: signature,
            timestamp: timestamp,
            nonce: nonce,
          };
          const { data } = await apiClient.post(
            `/transactions/api/transaction/send-money`,
            paymentData
          );
          queryClient.invalidateQueries({ queryKey: ["balance"] });
          router.replace({
            pathname: "/Screens/checkoutDetailsSuccess",
            params: {
              sucessData: JSON.stringify({
                ...data.model,
                name: name,
                username: username,
                phone: phone,
                selectedTab,
              }),
            },
          });
        } catch (error) {
          router.replace({
            pathname: "/Screens/checkoutDetailsFailed",
            params: {
              errorMessage: ((error as AxiosError)?.response?.data as any)
                ?.message,
              receiverData: JSON.stringify({
                name: name,
                username: username,
                amount: amount,
                id: id,
              }),
            },
          });
        }
      }
    } catch (error) {
      setIsModalVisible(false);
      CustomErrorToast(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View className="flex-1 bg-secondary">
      <ErrorModal open={isOpen} setIsOpen={setIsOpen} />
      {/* Header Section */}
      <LinearGradient colors={["#1A5A60", "#113E41", "#081C1C"]}>
        <View className=" pb-12 pt-12 justify-center items-center ">
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-4 left-5"
          >
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
          <Text className="text-xl  color-secondary-foreground mt-1">
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
            name={user.name}
            address={selectedTab === "username" ? user.username : user.phone}
          />
          <View className="h-3" />
          <UserCard
            type="to"
            name={name}
            address={selectedTab === "username" ? username : phone}
          />
        </View>

        {/* Button */}
        <View className="mt-2 space-y-4 items-center ">
          <PrimaryButton
            bgColor="bg-primary"
            width="w-[90%]"
            onPress={handleConfirm}
            loading={isLoading}
          >
            <View className="flex-row items-center justify-center ">
              <CustomText className="color-secondary text-xl">
                confirm
              </CustomText>
            </View>
          </PrimaryButton>

          <PrimaryButton
            bgColor="bg-transparent"
            width="w-[90%]"
            className=" rounded-full"
            borderColor="border-primary"
            disabled={!isLoading}
            style={[]}
            onPress={() => router.dismissTo("/(main)/home/wallet")}
          >
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
      <OTPModel
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        pinCode={pinCode}
        setPinCode={setPinCode}
        isLoading={isLoading}
        onVerifyHandler={onVerifyHandler}
        hideText={true}
      />
    </View>
  );
};

export default SendDetails;
