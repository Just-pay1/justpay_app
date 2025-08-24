import React, { useState } from "react";
import { View, ScrollView, Text, Modal, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CustomText from "@/components/ui/CustomText";
import PrimaryButton from "@/components/ui/Custombutton";
import { router, useLocalSearchParams } from "expo-router";
import Ref from "@/assets/svg/reference_number_logo.svg";
import { OTPInput } from "@/components/auth/Otpinput";
import { apiClient } from "@/config/axios.config";
import CustomErrorToast from "@/components/ui/CustomErrorToast";
import ErrorModal from "@/components/ui/ErrorModal";
import { Ionicons } from "@expo/vector-icons";
import { AxiosError } from "axios";

import { useQueryClient } from "@tanstack/react-query";
import { encryptData, getCurrentLocation } from "@/utils";
import RenderIcon from "@/components/ui/RenderIcon";
import OTPModel from "@/components/ui/OTPModel";
const RefnumBillingDetails = () => {
  const { dataWillBeShown } = useLocalSearchParams();
  const Data = JSON.parse((dataWillBeShown as string) || "{}");
  const {
    reference_number,
    amount,
    fee,
    status,
    model,
    total,
    commercial_name,
    service_type,
  } = Data;
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pinCode, setPinCode] = useState("");
  // const [location, setLocation] = useState<Location.LocationObject | null>(
  //   null
  // );
  const [isLoading, setIsLoading] = useState(false);
  const handleConfirm = () => {
    setIsModalVisible(true);
  };

  const queryClient = useQueryClient();
  const onVerifyHandler = async () => {
    setIsLoading(true);
    const currentLocation = await getCurrentLocation();
    if (!currentLocation) {
      setIsLoading(false);
      setIsModalVisible(false);
      CustomErrorToast(new Error("Location access is required to continue"));
      return;
    }
    try {
      const { data } = await apiClient.post(
        `/identity/walletConfig/verifyPinCode`,
        {
          pin_code: pinCode,
        }
      );
      if (data) {
        setIsModalVisible(false);
        try {
          const { signature, timestamp, nonce } = encryptData(reference_number);
          const paymentData = {
            bill_id: reference_number,
            source: "reference",
            long: currentLocation.coords.longitude,
            lat: currentLocation.coords.latitude,
            signature: signature,
            timestamp: timestamp,
            nonce: nonce,
            category: "reference_bill",
          };
          const { data, status } = await apiClient.post(
            `/transactions/api/transaction/pay`,
            paymentData
          );
          if (status === 200) {
            queryClient.invalidateQueries({ queryKey: ["balance"] });
            router.replace({
              pathname: "/Services/success",
              params: {
                sucessData: JSON.stringify(data),
              },
            });
          }
        } catch (error) {
          setIsOpen(true);
          if (error instanceof AxiosError) {
            setErrorMessage(error.response?.data?.message);
          }
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
      <ErrorModal
        open={isOpen}
        setIsOpen={setIsOpen}
        errorMessage={errorMessage}
      />
      {/* Header Section */}
      <LinearGradient colors={["#1A5A60", "#113E41", "#081C1C"]}>
        <View className="pb-28 pt-16 items-center -mx-5">
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute left-10 top-5"
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <RenderIcon serviceType={service_type} size={60} />
          <CustomText className="color-secondary text-4xl  mt-2 mx-4">
            {commercial_name}
          </CustomText>
        </View>
      </LinearGradient>

      {/* Payment Details Section */}

      <View className="flex-1 bg-secondary rounded-t-[40px] -mt-16 pt-8 px-5 ">
        <ScrollView
          className="flex-1 pb-20"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="p-6 bg-white rounded-2xl ">
            <CustomText className="text-primary text-2xl  mb-1 text-left">
              Payment Details
            </CustomText>
            <View className="border-t border-muted ">
              <View className="flex-row justify-between p-1  my-1">
                <CustomText className="color-primary-foreground p-0">
                  Id Number
                </CustomText>
                <CustomText className="color-primary-foreground text-sm p-0">
                  {reference_number}
                </CustomText>
              </View>
            </View>

            <View className="border-t border-muted  ">
              <View className="flex-row justify-between p-1  my-1">
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
            </View>
            <View className="border-t border-muted  ">
              <View className="flex-row justify-between p-1 my-1">
                <CustomText className="color-primary-foreground p-0">
                  Date
                </CustomText>
                <CustomText className="color-primary-foreground p-0">
                  {new Date(Date.now()).toLocaleDateString()}
                </CustomText>
              </View>
            </View>
            <View className="border-t border-muted  ">
              <View className="flex-row justify-between p-1 my-1">
                <Text className="color-primary-foreground p-0">Status</Text>
                <Text className="color-primary-foreground p-0">{status}</Text>
              </View>
            </View>
            <View className="border-t border-muted  ">
              <View className="flex-row justify-between p-1 my-1">
                <CustomText className="color-primary-foreground p-0">
                  payment method
                </CustomText>
                <CustomText className="color-primary-foreground p-0">
                  JustPay Wallet
                </CustomText>
              </View>
            </View>

            <View className="border-t border-muted  ">
              <View className="flex-row justify-between p-1 my-1">
                <Text className="color-primary-foreground  p-0 ">Amount</Text>
                <Text className="color-primary-foreground p-0">
                  {amount.toFixed(2)} EGP
                </Text>
              </View>
            </View>

            <View className="border-t border-muted  ">
              <View className="flex-row justify-between p-1 my-1">
                <Text className="color-primary-foreground  p-0 ">Fee</Text>
                <Text className="color-primary-foreground p-0">
                  {fee.toFixed(2)} EGP
                </Text>
              </View>
            </View>

            <View className="border-t border-muted  ">
              <View className="flex-row justify-between p-1 my-1">
                <Text className="color-primary-foreground  p-0 ">Total</Text>
                <Text className="color-primary-foreground p-0">
                  {total.toFixed(2)} EGP
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Buttons Section */}
        <View className="mt-2 items-center">
          <PrimaryButton
            width="w-[70%]"
            bgColor="bg-primary"
            onPress={handleConfirm}
            loading={isLoading}
          >
            <CustomText className="color-secondary">Pay</CustomText>
          </PrimaryButton>

          <PrimaryButton
            width="w-[70%] "
            bgColor="bg-secondary"
            onPress={() => router.back()}
            disabled={isLoading}
            borderColor="border-primary"
            style={[]}
          >
            <CustomText className="color-primary">Cancel</CustomText>
          </PrimaryButton>
        </View>

        <View className="items-center pb-12 mt-8">
          <Text className="color-muted text-sm  ">
            🔒 All Transactions are Secure and protected.
          </Text>
        </View>
      </View>

      {/* OTP Modal */}
      {/* <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 justify-end">
          <View className="bg-primary p-6 rounded-t-[40px] w-full h-[72%]">
            <View className="items-center mb-6">
              <View className="w-12 h-1 bg-gray-300 rounded-full mb-4" />
              <CustomText className="text-secondary text-2xl mb-4 text-center">
                Enter Your PIN Code
              </CustomText>
            </View>
            <OTPInput otpCode={pinCode} setOtpCode={setPinCode} />
            <View className="mt-6">
              <PrimaryButton
                width="w-full"
                bgColor="bg-secondary"
                disabled={pinCode.length !== 6 || isLoading}
                loading={isLoading}
                textLoading="verifying"
                textLoadingColor="text-primary"
                onPress={onVerifyHandler}
                style={[
                  (pinCode.length !== 6 || isLoading) && {
                    backgroundColor: "rgba(159, 153, 153, 0.5)",
                  },
                ]}
              >
                <CustomText className="text-primary">Verify</CustomText>
              </PrimaryButton>
              <PrimaryButton
                width="w-full mt-2"
                bgColor="bg-transparent"
                disabled={isLoading}
                onPress={() => setIsModalVisible(false)}
                style={[
                  isLoading && {
                    backgroundColor: "rgba(159, 153, 153, 0.5)",
                  },
                ]}
              >
                <CustomText className="text-primary">Close</CustomText>
              </PrimaryButton>
            </View>
          </View>
        </View>
      </Modal> */}
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

export default RefnumBillingDetails;
