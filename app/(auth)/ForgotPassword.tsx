import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import CustomInput from "@/components/ui/CustomInput";
import PrimaryButton from "@/components/ui/Custombutton";
import AuthHeader from "@/components/auth/AuthHeader";
import Toast from "react-native-toast-message";
import { ActivityIndicator } from "react-native";
import { useState } from "react";
import { apiClient } from "@/config/axios.config";
import { useRouter } from "expo-router";
import CustomText from "@/components/ui/CustomText";

interface IForgotPasswordInput {
  email: string;
}

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPasswordInput>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<IForgotPasswordInput> = async (data) => {
    if (!data.email) {
      // show error message if email is not provided
      Toast.show({
        type: "error",
        text1: "Email is required",
        text2: "Please enter your email before proceeding",
        position: "bottom",
      });
      return;
    }

    // to check email validity
    const emailPattern = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(data.email)) {
      //  if email is not valid
      Toast.show({
        type: "error",
        text1: "Not a valid email address.",
        text2: "Please enter a valid email address",
        position: "bottom",
      });
      return;
    }

    try {
      setIsLoading(true);
      // Send request to backend
      await apiClient.post("/forgot-password", { email: data.email });
      Toast.show({
        type: "success",
        text1: " Code sent successfully!",
        text2: "Check your email to reset your password",
        position: "bottom",
      });

      router.push("/(auth)/Otp"); // Navigate back to Otp page
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to send reset link. Please try again later.",
        position: "bottom",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View className="min-h-full">
          <AuthHeader title="Forgot Password" />
          <View className="flex-1 w-[80%] mx-auto">
            <View className="gap-y-5">
              <View>
                <View className="mb-6">
                  <Text className="color-secondary-foreground font-bold text-left mt-4">
                    Enter the email address associated with your account
                  </Text>
                </View>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      placeholder="Email"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      keyboardType="email-address"
                    />
                  )}
                  name="email"
                />
                {errors.email && (
                  <Text className="color-danger ml-2">
                    *{errors.email.message}
                  </Text>
                )}
              </View>
              <View style={{ width: "100%" }}>
                <PrimaryButton
                  onPress={handleSubmit(onSubmit)}
                  width="w-full"
                  disabled={isLoading}>
                  <View className="flex-row items-center justify-center">
                    <CustomText className="color-secondary">
                      {isLoading ? (
                        <View className="flex-row items-center">
                          <CustomText className="p-0 color-secondary">
                            Sending{" "}
                          </CustomText>
                          <ActivityIndicator color="white" size={25} />
                        </View>
                      ) : (
                        "Send Code"
                      )}
                    </CustomText>
                  </View>
                </PrimaryButton>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
