import { View, Text } from "react-native";
import React from "react";
import CustomInput from "@/components/ui/CustomInput";

const profile = () => {
  return (
    <View>
      <View className="px-6">
        <Text className="color-primary-foreground text-left text-4xl">
          Profile
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
          marginTop: 32,
        }}>
        <CustomInput
          placeholder="Search"
          style={{
            width: "90%",
            height: 40,
            borderColor: "#9d9a9a",
            borderRadius: 10,
            borderWidth: 1,
            paddingHorizontal: 10,
          }}
        />
      </View>
    </View>
  );
};

export default profile;
