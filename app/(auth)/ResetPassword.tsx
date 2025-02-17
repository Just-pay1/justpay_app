import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import CustomInput from "@/components/ui/CustomInput";
import PrimaryButton from "@/components/ui/Custombutton";
import AuthHeader from "@/components/auth/AuthHeader";
import Toast from "react-native-toast-message";
import { ActivityIndicator } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import CustomText from "@/components/ui/CustomText";
import { resetPasswordSchema } from "@/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { RESET_PASSWORD_FIELDS } from "@/data";
import { apiClient } from "@/config/axios.config";

interface IResetPasswordInput {
  password: string;
  confirmPassword: string;
}

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isPasswordFocused, setIsPasswordFocused] = useState(false); // if the password field is focused
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPasswordInput>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: IResetPasswordInput) => {
    try {
      setIsLoading(true);
      await apiClient.post("/auth/reset-password", { password: data.password });
      Toast.show({
        type: "success",
        text1: "Password Reset Successful!",
        text2: "You can now log in with your new password",
        position: "bottom",
      });
      router.push("/(auth)/Signin");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to reset password. Please try again.",
        position: "bottom",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderResetPasswordForm = () =>
    RESET_PASSWORD_FIELDS.map(({ name, placeholder, type }, idx) => (
      <View key={idx}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              {/* Show label above password field */}
              {name === "password" && (
                <View className="mb-4">
                  <Text className="text-xl font-bold color-primary text-center">
                    Enter New Password
                  </Text>
                  <Text className="color-secondary-foreground text-sm text-left mt-4">
                    Your new password must be different from previously used
                    passwords.
                  </Text>
                </View>
              )}

              <CustomInput
                placeholder={placeholder}
                onBlur={() => {
                  onBlur();
                  if (name === "password") setIsPasswordFocused(true);
                }}
                onFocus={() => {
                  if (name === "password") setIsPasswordFocused(true);
                }}
                onChangeText={onChange}
                value={value}
                secureTextEntry={type === "password"}
              />
              {/*Show the message only if the field is focused */}
              {name === "password" && isPasswordFocused && (
                <View className="pl-4">
                  <Text className="color-muted text-sm  text-left mt-1">
                    Use 8 or more characters with an Upper and Lower letters ,
                    numbers and symbols
                  </Text>
                </View>
              )}
            </>
          )}
          name={name as "password" | "confirmPassword"} //define fields
        />
      </View>
    ));

  const validateFields = () => {
    if (Object.keys(errors).length > 0) {
      const firstErrorKey = Object.keys(errors)[0] as keyof IResetPasswordInput;
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: errors[firstErrorKey]?.message || "Please check your inputs.",
        position: "bottom",
      });
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
          <AuthHeader title="Reset Password" />
          <View className="flex-1 w-[80%] mx-auto ">
            <View className="gap-y-5">
              <View className="gap-y-4">{renderResetPasswordForm()}</View>
              <View style={{ width: "95%", alignSelf: "center" }}>
                <PrimaryButton
                  onPress={handleSubmit(onSubmit, validateFields)}
                  width="w-[95%]"
                  disabled={isLoading}>
                  <View className="flex-row items-center justify-center">
                    <CustomText className="color-secondary ">
                      {isLoading ? (
                        <View className="flex-row items-center">
                          <CustomText className="p-0 color-secondary ">
                            Resetting...
                          </CustomText>
                          <ActivityIndicator color="white" size={25} />
                        </View>
                      ) : (
                        "Reset Password"
                      )}
                    </CustomText>
                  </View>
                </PrimaryButton>
                <PrimaryButton
                  onPress={() => router.push("/(auth)/ForgotPassword")}
                  width="w-[95%]"
                  borderColor="border-primary"
                  bgColor="bg-transparent">
                  <CustomText className="color-primary">Back</CustomText>
                </PrimaryButton>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
