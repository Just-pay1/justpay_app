import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  title: string;
  subtitle: string;
  isRead?: boolean;
  onPress?: () => void;
};

const NotificationCard: React.FC<Props> = ({
  title,
  subtitle,
  isRead = false,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-xl px-4 py-3 flex-row items-center  ${
        isRead ? "bg-white" : "bg-[#a9d3d0]"
      }`}>
      <View className="w-10 h-10 rounded-full bg-white justify-center items-center mr-3">
        <Ionicons name="notifications" size={20} color="#2c7075" />
      </View>

      <View className="flex-1">
        <Text className="font-semibold text-[16px] text-[#444444]">
          {title}
        </Text>
        <Text className="text-[13px] text-[#444444] mt-1">{subtitle}</Text>
      </View>
    </Pressable>
  );
};

export default NotificationCard;
