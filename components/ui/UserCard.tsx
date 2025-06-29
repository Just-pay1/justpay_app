import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  type: "from" | "to";
  name: string;
  address: string;
};

const UserCard: React.FC<Props> = ({ type, name, address }) => {
  const isFrom = type === "from";

  return (
    <View className="bg-transparent border border-muted px-4 py-3 rounded-3xl flex-row items-center">
      <Ionicons
        name={isFrom ? "arrow-back" : "arrow-forward"}
        size={28}
        color="#2c7075"
      />
      <View className="ml-3">
        <Text className="text-xs font-bases text-primary-foreground mb-1 ">
          {isFrom ? "From" : "To"}
        </Text>
        <Text className="text-xl font-semibold">{name}</Text>
        <Text className="text-xs font-base text-primary-foreground">
          {address}
        </Text>
      </View>
    </View>
  );
};

export default UserCard;
