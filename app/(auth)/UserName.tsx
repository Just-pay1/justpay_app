import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import AuthHeader from "@/components/auth/AuthHeader";
import CustomText from "@/components/ui/CustomText";
import Otpicon from "@/assets/svg/Otpicon.svg";
import Walleticon from "@/assets/svg/Walleticon.svg";
import CustomInput from "@/components/ui/CustomInput";
import PrimaryButton from "@/components/ui/Custombutton";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Toast from "react-native-toast-message";
import { userNameSchema } from "@/validation";
import { apiClient } from "@/config/axios.config";

interface IUsernameForm {
  username: string;
}

const showErrorToast = (message: string) => {
  Toast.show({
    type: "error",
    text1: "Invalid Username",
    text2: message,
    position: "bottom",
  });
};

const UserName = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUsernameForm>({
    resolver: yupResolver(userNameSchema),
  });

  useEffect(() => {
    if (errors.username) {
      showErrorToast(errors.username.message!);
    }
  }, [errors.username]);

  const onSubmit = async (data: IUsernameForm) => {
    try {
      setIsLoading(true);

      // API
      const response = await apiClient.post("/", {
        username: data.username,
      });

      if (response.data.available) {
        router.navigate("/(auth)/PinPage");
      } else {
        showErrorToast(
          "This username is already registered. Please choose another."
        );
      }
    } catch (error: any) {
      // Handle API error
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      showErrorToast(errorMessage);
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
        <View className="min-half-full">
          <AuthHeader title="Set Up Your Wallet !" />
          <View className="mx-auto relative items-center justify-center">
            <Otpicon scaleY={1.1} />
            <Walleticon style={{ position: "absolute" }} />
          </View>
          <View className="my-2">
            <CustomText className="color-secondary-foreground text-center ">
              Secure, Fast, and Easy - create your JustPay wallet!
            </CustomText>
          </View>
          <View className="px-4">
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  placeholder="Username"
                  onChangeText={onChange}
                  value={value}
                  className="w-[80%] h-12 mx-auto rounded-full border border-secondary-foreground px-4 mb-5"
                />
              )}
            />
            <PrimaryButton
              width="w-[80%]"
              bgColor="bg-secondary-foreground"
              onPress={() => {
                handleSubmit(onSubmit)().catch(() => {
                  if (errors.username) {
                    showErrorToast(errors.username.message!);
                  }
                });
              }}>
              <View className="flex-row items-center justify-center space-x-2">
                <CustomText className="color-secondary">Continue</CustomText>
                {isLoading && <ActivityIndicator color="white" size={20} />}
              </View>
            </PrimaryButton>

            <PrimaryButton
              width="w-[80%]"
              bgColor="bg-transparent"
              borderColor="border-primary">
              <CustomText className="color-primary">Back</CustomText>
            </PrimaryButton>
          </View>
        </View>
      </ScrollView>
      <Toast />
    </KeyboardAvoidingView>
  );
};

export default UserName;
