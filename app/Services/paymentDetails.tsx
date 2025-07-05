import React, { useState } from "react";
import { View, ScrollView, Text, Modal, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CustomText from "@/components/ui/CustomText";
import PrimaryButton from "@/components/ui/Custombutton";
import { router, useLocalSearchParams } from "expo-router";
import Elec from "@/assets/svg/elec.svg";
import { apiClient } from "@/config/axios.config";
import CustomErrorToast from "@/components/ui/CustomErrorToast";
import ErrorModal from "@/components/ui/ErrorModal";
import OTPModel from "@/components/ui/OTPModel";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { encryptData, getCurrentLocation } from "@/utils";
import RenderIcon from "@/components/ui/RenderIcon";

const PaymentDetails = () => {
  const queryClient = useQueryClient();
  const { source, dataWillBeShown } = useLocalSearchParams();
  const Data = JSON.parse((dataWillBeShown as string) || "{}");
  const {
    bill_id,
    amount,
    fee,
    status,
    model,
    total_amount,
    service_type,
    commercial_name,
    category,
  } = Data;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [pinCode, setPinCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [location, setLocation] = useState<Location.LocationObject | null>(
  //   null
  // );

  const handleConfirm = () => {
    console.log("Opening modal...");
    setIsModalVisible(true);
  };

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
          const { signature, timestamp, nonce } = encryptData(bill_id);
          const paymentData = {
            bill_id: bill_id,
            source: source,
            long: currentLocation.coords.longitude,
            lat: currentLocation.coords.latitude,
            signature: signature,
            timestamp: timestamp,
            nonce: nonce,
            category: category,
          };
          const { data } = await apiClient.post(
            `/transactions/api/transaction/pay`,
            paymentData
          );
          queryClient.invalidateQueries({ queryKey: ["balance"] });
          router.replace({
            pathname: "/Services/success",
            params: {
              sucessData: JSON.stringify(data),
            },
          });
        } catch (error) {
          // console.log(error.response.data);
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
          <RenderIcon serviceType={service_type} size={60} />
          <CustomText className="color-secondary text-4xl mt-2 mx-4">
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
          <View className="p-4 bg-white rounded-2xl ">
            <CustomText className="text-primary text-2xl text-left px-0">
              Payment Details
            </CustomText>
            <View className="border-t border-muted ">
              {/* <View className="border-2 border-primary "> */}
              <View className="flex-row justify-between p-1 my-1">
                <CustomText className="color-primary-foreground p-0">
                  Bill Id
                </CustomText>
                <CustomText className="color-primary-foreground text-sm p-1">
                  {bill_id.split("-").join("")}
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
                <Text className="color-primary-foreground  p-0 ">Amount</Text>
                <Text className="color-primary-foreground p-0">
                  {amount} EGP
                </Text>
              </View>
            </View>
            <View className="border-t border-muted  ">
              <View className="flex-row justify-between p-1 my-1">
                <Text className="color-primary-foreground  p-0 ">Fee</Text>
                <Text className="color-primary-foreground p-0">{fee} EGP</Text>
              </View>
            </View>
            <View className="border-t border-muted  ">
              <View className="flex-row justify-between p-1 my-1">
                <Text className="color-primary-foreground  p-0 ">Total</Text>
                <Text className="color-primary-foreground p-0">
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
            loading={isLoading}
          >
            <CustomText className="color-secondary">Confirm</CustomText>
          </PrimaryButton>

          <PrimaryButton
            width="w-[70%] "
            bgColor="bg-secondary"
            onPress={() => router.push("/(main)/home")}
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

export default PaymentDetails;
