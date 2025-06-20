import { View } from "react-native";
import CustomText from "./CustomText";
import PrimaryButton from "./Custombutton";
import { Modal } from "react-native";
import React, { useState } from "react";
import DangerIcon from "@/assets/svg/danger.svg";
import { Ionicons } from "@expo/vector-icons";

const ErrorModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Modal
      visible={false}
      animationType="fade"
      transparent
      onRequestClose={() => setIsOpen(false)}
    >
      <View className="flex-1 justify-end">
        <View className="bg-secondary p-6 rounded-t-[40px] w-full h-[50%] border-2 border-b-[0] border-danger">
          <View className="items-center mb-6">
            <Ionicons
              name="close"
              size={30}
              className="absolute top-0 left-0 border-2 border-danger rounded-full"
              color="#444444"
              onPress={() => setIsOpen(false)}
            />
            <View className="w-12 h-1 bg-gray-300 rounded-full mb-4" />
            <DangerIcon />
            <CustomText className="text-danger text-2xl text-center">
              something went wrong
            </CustomText>
            <CustomText className="text-primary-foreground text-base p-0 text-center">
              Please check your connection, card details, or account balance,
              then try again.
            </CustomText>
          </View>
          <View>
            <PrimaryButton width="w-full mt-2" onPress={() => setIsOpen(false)}>
              <CustomText className="text-secondary">Close</CustomText>
            </PrimaryButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;
