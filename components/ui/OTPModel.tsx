import React from "react";
import { View } from "react-native";
import { Modal } from "react-native";
import CustomText from "./CustomText";
import { OTPInput } from "../auth/Otpinput";
import PrimaryButton from "./Custombutton";

interface IProps {
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
  pinCode: string;
  setPinCode: (pinCode: string) => void;
  isLoading: boolean;
  onVerifyHandler: () => void;
  hideText?: boolean;
}
const OTPModel = ({
  isModalVisible,
  setIsModalVisible,
  pinCode,
  setPinCode,
  isLoading,
  onVerifyHandler,
  hideText,
}: IProps) => {
  return (
    <Modal
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
          <OTPInput
            otpCode={pinCode}
            setOtpCode={setPinCode}
            hideText={hideText}
          />
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
    </Modal>
  );
};

export default OTPModel;
