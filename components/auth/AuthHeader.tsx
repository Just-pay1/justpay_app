import React from "react";
import { Text, View } from "react-native";
import MYicon from "@/assets/svg/icon.svg";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const aspectRatio = 173 / 380;
const height = width * aspectRatio;
interface IProps {
  title: React.ReactNode;
}
const AuthHeader = ({ title }: IProps) => {
  return (
    <View>
      <MYicon width={width} height={height} translateY={-30} />
      <View className="absolute top-[50%] -translate-y-1/2 flex flex-row justify-center items-center w-full">
        <Text className="w-fit font-Nunitosemi text-4xl text-primary-foreground capitalize text-center">
          {title}
        </Text>
      </View>
    </View>
  );
};

export default AuthHeader;
