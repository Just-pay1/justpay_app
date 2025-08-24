import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, BackHandler } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CustomText from "@/components/ui/CustomText";
import PrimaryButton from "@/components/ui/Custombutton";
import { router, useLocalSearchParams } from "expo-router";
import Elec from "@/assets/svg/elec.svg";
import { apiBilling, apiClient } from "@/config/axios.config";
import CustomErrorToast from "@/components/ui/CustomErrorToast";
import ErrorModal from "@/components/ui/ErrorModal";
import OTPModel from "@/components/ui/OTPModel";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { encryptData, getCurrentLocation } from "@/utils";
import RenderIcon from "@/components/ui/RenderIcon";
import Toast from "react-native-toast-message";

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
    setIsModalVisible(true);
  };

  const onVerifyHandler = async () => {
    setIsLoading(true);
    const currentLocation = await getCurrentLocation();
    if (!currentLocation) {
      setIsLoading(false);
      setIsModalVisible(false);
      Toast.show({
        text1: "Location access is required to continue",
        type: "error",
      });
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
          queryClient.invalidateQueries({ queryKey: ["transaction-history"] });
          router.replace({
            pathname: "/Services/success",
            params: {
              sucessData: JSON.stringify(data),
            },
          });
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

  const handleCancel = async () => {
    try {
      apiBilling.post("/bills/delete-bill", {
        bill_id: bill_id,
      });
    } catch (error) {
      CustomErrorToast(error);
    }
    router.dismissTo("/");
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        console.log("Back button pressed");
        handleCancel();
        return true; // Prevent default back behavior
      }
    );
    return () => backHandler.remove();
  }, []);

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
          <RenderIcon
            serviceType={service_type}
            size={60}
            commercialName={commercial_name}
          />
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
                <Text className="color-primary-foreground p-0">
                  {amount === total_amount ? 0 : fee.toFixed(2)} EGP
                </Text>
              </View>
            </View>
            <View className="border-t border-muted  ">
              <View className="flex-row justify-between p-1 my-1">
                <Text className="color-primary-foreground  p-0 ">Total</Text>
                <Text className="color-primary-foreground p-0">
                  {total_amount.toFixed(2)} EGP
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
            onPress={handleCancel}
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
