import React from "react";
import { View, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import CustomText from "@/components/ui/CustomText";
import PrimaryButton from "@/components/ui/Custombutton";
import {  useRouter } from "expo-router";

const AboutUs = () => {
  const router = useRouter()
  return (
    <View className="flex-1 bg-secondary">
      {/* Header */}
      <View className="px-5 pt-3 pb-4 flex-row items-center">
        <Ionicons name="chevron-back" size={24} color="#1A5A60" onPress={() => router.back()} />
        <CustomText className="text-primary text-xl mx-auto font-bold">
          About JustPay
        </CustomText>
      </View>

      <ScrollView className="px-5 space-y-6" showsVerticalScrollIndicator={false}>
        <View className="mt-2">
          <CustomText className="text-3xl font-extrabold text-primary text-center mb-2">
            Simplifying Your Payments
          </CustomText>
          <CustomText className="text-base text-gray-600 text-center leading-6">
            JustPay is your all-in-one payment solution — fast, secure, and easy.
            Designed to make managing your finances effortless.
          </CustomText>
        </View>
        <View className="bg-primary/10 p-4 rounded-2xl">
          <CustomText className="text-xl text-primary font-semibold mb-1">
            Our Mission
          </CustomText>
          <CustomText className="text-gray-700 text-base leading-6">
            To empower people with smart, intuitive, and reliable financial tools
            that simplify everyday transactions and foster financial confidence.
          </CustomText>
        </View>
        <View className="bg-primary/10 p-4 rounded-2xl">
          <CustomText className="text-xl text-primary font-semibold mb-1">
            Why Choose JustPay?
          </CustomText>
          <CustomText className="text-gray-700 text-base leading-6">
            • Intuitive user experience{"\n"}
            • Instant money transfers{"\n"}
            • End-to-end encryption{"\n"}
            • Trusted by thousands
          </CustomText>
        </View>

        <View className="bg-primary/10 p-4 rounded-2xl">
          <CustomText className="text-xl text-primary font-semibold mb-1">
            Our Vision
          </CustomText>
          <CustomText className="text-gray-700 text-base leading-6">
            To become the most loved and secure digital wallet across the region
            — where everyone pays smarter, not harder.
          </CustomText>
        </View>
        <CustomText className="text-gray-400 text-xs text-center mt-6 mb-8">
          © {new Date().getFullYear()} JustPay. All rights reserved.
        </CustomText>
      </ScrollView>
    </View>
  );
};

export default AboutUs;
