import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import CustomText from "@/components/ui/CustomText";
import Walletvector from "@/assets/svg/walletvector.svg";
import Deposit from "@/assets/svg/deposit.svg";
import PrimaryButton from "@/components/ui/Custombutton";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";

const wallet = () => {
  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{
        flexGrow: 1,
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <View className="flex-1 ">
        <View className="px-5 ">
          <Text className="color-primary-foreground text-left text-4xl">
            {" "}
            Wallet{" "}
          </Text>
        </View>

        <View style={styles.container}>
          <LinearGradient
            colors={["#081C1C", "#113E41", "#1A5A60"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{
              borderRadius: 16,
              padding: 10,
            }}>
            <CustomText className="color-secondary text-left text-md pt-1">
              Total Balance
            </CustomText>
            <Text className="color-secondary text-left text-3xl pt-3 p-3 ">
              0 EGP
            </Text>
            <Text className="color-secondary text-right text-sm pt-3 p-4 ">
              **** **** ****
            </Text>
          </LinearGradient>
        </View>

        <View className="flex-row justify-between mt-1 px-8">
          <PrimaryButton
            width="w-[45%]"
            bgColor="bg-primary"
            borderColor="border-primary">
            <View className="flex-row items-center justify-center ">
              <CustomText className="color-secondary">Deposit</CustomText>
              <Deposit width={18} height={18} color="white" />
            </View>
          </PrimaryButton>

          <PrimaryButton
            width="w-[45%]"
            bgColor="bg-primary"
            borderColor="border-primary">
            <View className="flex-row items-center justify-center">
              <CustomText className="color-secondary ">send</CustomText>
              <Walletvector width={18} height={18} color="white" />
            </View>
          </PrimaryButton>
        </View>
        <View className="items-center">
          <View className="flex-row items-center justify-between w-full px-5">
            <CustomText className="color-primary-foreground text-3xl">
              Transation
            </CustomText>
            <TouchableOpacity>
              <CustomText className="color-muted text-xl">See All</CustomText>
            </TouchableOpacity>
          </View>
          <View className="border-b border-muted w-[90%] mt-1" />
        </View>
      </View>
    </ScrollView>
  );
};

export default wallet;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: "hidden",
    marginHorizontal: 20,
    marginTop: 14,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});
