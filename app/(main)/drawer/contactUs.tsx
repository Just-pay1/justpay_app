import React, { useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  Pressable,
  
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import CustomInput from "@/components/ui/CustomInput";
import CustomText from "@/components/ui/CustomText";
import PrimaryButton from "@/components/ui/Custombutton";
import { useRouter } from "expo-router";
import { apiClient } from "@/config/axios.config";
import Toast from "react-native-toast-message";

const ContactUs = () => {
  const user = JSON.parse(SecureStore.getItem("user") || "{}");
  const [email, setEmail] = useState(user.email);
  const [message, setMessage] = useState("");
  const [agree, setAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmitRequest = async () => {
    if (!agree) {
  Toast.show({
    type: "error",
    text1: "Agreement Required",
    text2: "You must agree to the terms before submitting.",
    position: "bottom",
  });
  return;
}

if (!message.trim()) {
  Toast.show({
    type: "error",
    text1: "Message Required",
    text2: "Please enter a message before submitting.",
    position: "bottom",
  });
  return;
}

    try {
      setIsLoading(true);

      // Send request with ONLY message (no headers here)
      await apiClient.post("/identity/request/create", { message });

      Toast.show({
        type: "success",
        text1: "Request submitted successfully!",
        position: "bottom",
      });

      setMessage("");
      setAgree(false);
      router.back();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Submission failed",
        text2: "Please try again later",
        position: "bottom",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-secondary">
      {/* Header */}
      <View className="px-5 pt-1 pb-3 flex-row items-center">
        <Ionicons onPress={() => router.back()} name="chevron-back" size={24} color="#1A5A60" />
        <CustomText className="text-primary text-xl mx-auto font-bold">
          Contact Us
        </CustomText>
      </View>

      <ScrollView className="px-5" showsVerticalScrollIndicator={false}>
        {/* Title */}
        <View className="mb-2 mt-2">
          <CustomText className="text-xl text-center font-semibold text-black">
            Have a Question or Need Help?
          </CustomText>
          <CustomText className="text-center text-muted mt-1 text-base">
            Fill out the form below and our team will{"\n"}respond within 24 hours.
          </CustomText>
        </View>

        {/* Form */}
        <View className="space-y-4 mt-4">
          {/* Email (readonly) */}
          <View className="opacity-50">
            <CustomText className="text-black text-start mb-1">
              Email
              <CustomText className="text-danger">*</CustomText>
            </CustomText>
            <CustomInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              editable={false}
            />
          </View>

          {/* Message */}
          <View>
            <CustomText className="text-black text-start mb-1">
              Message
              <CustomText className="text-danger">*</CustomText>
            </CustomText>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Type your message"
              multiline
              numberOfLines={4}
              className="bg-white border border-gray-300 rounded-xl p-3 text-base text-black h-36"
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Checkbox */}
        <View className="flex-row items-center mt-4">
          <Pressable onPress={() => setAgree(!agree)} className="mr-2">
            <View
              className={`w-5 h-5 border-2 rounded border-gray-400 items-center justify-center ${
                agree ? "bg-primary" : "bg-white"
              }`}
            >
              {agree && <Ionicons name="checkmark" size={16} color="#fff" />}
            </View>
          </Pressable>
          <CustomText className="text-sm text-gray-600 flex-1">
            I agree with Terms of Use and Privacy Policy
          </CustomText>
        </View>

        {/* Submit Button */}
        <View className="mt-6 items-center">
          <PrimaryButton
            onPress={handleSubmitRequest}
            loading={isLoading}
            width="w-full"
            className="rounded-full bg-primary"
          >
            <CustomText className="text-secondary text-lg text-center">
              Submit
            </CustomText>
          </PrimaryButton>
          <CustomText className="text-gray-500 text-sm mt-2 text-center">
            We'll get back to you within 24 hours
          </CustomText>
        </View>
      </ScrollView>
    </View>
  );
};

export default ContactUs;
