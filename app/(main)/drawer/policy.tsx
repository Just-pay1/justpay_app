import React from "react";
import { View, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "@/components/ui/CustomText";

import {  useRouter } from "expo-router";

const Policy = () => {
  const router = useRouter()
  return (
    <View className="flex-1 bg-secondary">
      {/* Header */}
      <View className="px-5 pt-3 pb-4 flex-row items-center">
        <Ionicons name="chevron-back" size={24} color="#1A5A60" onPress={() => router.back()}/>
        <CustomText className="text-primary text-xl mx-auto font-bold">
          Privacy Policy
        </CustomText>
      </View>

      {/* Content */}
      <ScrollView className="px-5 space-y-6" showsVerticalScrollIndicator={false}>
        {/* Intro */}
        <View className="mt-2">
          <CustomText className="text-2xl font-extrabold text-primary mb-2">
            Your Privacy Matters
          </CustomText>
          <CustomText className="text-base text-gray-600 leading-6">
            At JustPay, your privacy is our priority. This policy outlines how we collect,
            use, and protect your information to ensure transparency and trust.
          </CustomText>
        </View>

        {/* Section 1 */}
        <View className="bg-primary/10 p-4 rounded-2xl">
          <CustomText className="text-lg text-primary font-semibold mb-1">
            1. Data We Collect
          </CustomText>
          <CustomText className="text-gray-700 text-base leading-6">
            We collect personal information like your name, email address, phone number,
            and payment details to provide you with our services.
          </CustomText>
        </View>

        {/* Section 2 */}
        <View className="bg-primary/10 p-4 rounded-2xl">
          <CustomText className="text-lg text-primary font-semibold mb-1">
            2. How We Use Your Data
          </CustomText>
          <CustomText className="text-gray-700 text-base leading-6">
            Your information is used to process transactions, send notifications,
            improve our services, and ensure secure access to your account.
          </CustomText>
        </View>

        {/* Section 3 */}
        <View className="bg-primary/10 p-4 rounded-2xl">
          <CustomText className="text-lg text-primary font-semibold mb-1">
            3. Data Protection
          </CustomText>
          <CustomText className="text-gray-700 text-base leading-6">
            We implement advanced security measures including encryption, authentication,
            and secure storage to keep your data safe.
          </CustomText>
        </View>

        {/* Section 4 */}
        <View className="bg-primary/10 p-4 rounded-2xl">
          <CustomText className="text-lg text-primary font-semibold mb-1">
            4. Third-Party Services
          </CustomText>
          <CustomText className="text-gray-700 text-base leading-6">
            We may share limited information with trusted third parties for processing payments
            or analytics — never for selling your data.
          </CustomText>
        </View>

        {/* Section 5 */}
        <View className="bg-primary/10 p-4 rounded-2xl">
          <CustomText className="text-lg text-primary font-semibold mb-1">
            5. Your Rights
          </CustomText>
          <CustomText className="text-gray-700 text-base leading-6">
            You have the right to access, update, or delete your personal data at any time.
            Contact our support team for assistance.
          </CustomText>
        </View>

        {/* Footer */}
        <CustomText className="text-gray-400 text-xs text-center mt-6 mb-8">
          Last updated: June 26, {new Date().getFullYear()}
        </CustomText>
      </ScrollView>
    </View>
  );
};

export default Policy;
