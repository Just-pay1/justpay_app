import React, { useState } from "react";
import { View, ScrollView, Text, Modal, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CustomText from "@/components/ui/CustomText";
import PrimaryButton from "@/components/ui/Custombutton";
import { router, useLocalSearchParams } from "expo-router";
import Elec from "@/assets/svg/elec.svg";
import { OTPInput } from "@/components/auth/Otpinput";
import { apiClient, apiWallet } from "@/config/axios.config";
import CustomErrorToast from "@/components/ui/CustomErrorToast";
import ErrorModal from "@/components/ui/ErrorModal";

const PaymentDetails = () => {
  const { source, dataWillBeShown } = useLocalSearchParams();
  const Data = JSON.parse((dataWillBeShown as string) || "{}");
  const { bill_id, amount, fee, status, model, total_amount } = Data;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pinCode, setPinCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleConfirm = () => {
    console.log("Opening modal...");
    setIsModalVisible(true);
  };
  const onVerifyHandler = async () => {
    try {
      setIsLoading(true);
      console.log(pinCode);
      const { data } = await apiClient.post(`/walletConfig/verifyPinCode`, {
        pin_code: pinCode,
      });
      if (data) {
        setIsModalVisible(false);
        try {
          const { data } = await apiWallet.post(`/transaction/pay`, {
            bill_id: pinCode,
            source: source,
          });
          router.replace("/Services/success");
        } catch (error) {
          router.replace("/Services/failed");
        }
      }
    } catch (error) {
      CustomErrorToast(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-secondary">
      <ErrorModal />
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

      <View className="flex-1 bg-secondary rounded-t-[40px] -mt-16 pt-8 px-5 ">
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
                <CustomText className="color-primary-foreground text-sm">
                  {bill_id}
                </CustomText>
              </View>
            </View>

            <View className="flex-row justify-between">
              <CustomText className="color-primary-foreground">Time</CustomText>
              <CustomText className="color-primary-foreground">
                {new Date(Date.now()).toLocaleTimeString("en-US", {
                  hourCycle: "h23",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </CustomText>
            </View>

            <View className="flex-row justify-between">
              <CustomText className="color-primary-foreground">Date</CustomText>
              <CustomText className="color-primary-foreground">
                {new Date(Date.now()).toLocaleDateString()}
              </CustomText>
            </View>

            <View className="border-t border-muted  ">
              <View className="flex-row justify-between mt-2">
                <Text className="color-primary-foreground  text-xl ">
                  Status
                </Text>
                <Text className="color-primary-foreground text-xl">
                  {status}
                </Text>
              </View>
            </View>
            <View className="border-t border-muted  ">
              <View className="flex-row justify-between mt-2">
                <Text className="color-primary-foreground  text-xl ">
                  Amount
                </Text>
                <Text className="color-primary-foreground text-xl">
                  {amount} EGP
                </Text>
              </View>
            </View>
            <View className="border-t border-muted  ">
              <View className="flex-row justify-between mt-2">
                <Text className="color-primary-foreground  text-xl ">Fee</Text>
                <Text className="color-primary-foreground text-xl">
                  {fee} EGP
                </Text>
              </View>
            </View>
            <View className="border-t border-muted  ">
              <View className="flex-row justify-between mt-2">
                <Text className="color-primary-foreground  text-xl ">
                  Total
                </Text>
                <Text className="color-primary-foreground text-xl">
                  {total_amount} EGP
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
            loading={isLoading}>
            <CustomText className="color-secondary">Confirm</CustomText>
          </PrimaryButton>

          <PrimaryButton
            width="w-[70%] "
            bgColor="bg-secondary"
            onPress={() => router.push("/(main)/home")}
            disabled={isLoading}
            borderColor="border-primary"
            style={[]}>
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
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setIsModalVisible(false)}>
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
                ]}>
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
                ]}>
                <CustomText className="text-primary">Close</CustomText>
              </PrimaryButton>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PaymentDetails;
