import { Text, View } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import CustomInput from "@/components/ui/CustomInput";
import PrimaryButton from "@/components/ui/Custombutton";
import AuthHeader from "@/components/auth/AuthHeader";
import Toast from "react-native-toast-message";
import { useState } from "react";
import { apiClient } from "@/config/axios.config";
import { useRouter } from "expo-router";
import CustomText from "@/components/ui/CustomText";
import Icon from "@/assets/svg/Otpicon.svg";
import Lock from "@/assets/svg/lock.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import { ForgotPasswordSchema } from "@/validation";
import CustomErrorToast from "@/components/ui/CustomErrorToast";
import CustomMsgError from "@/components/ui/CustomMsgError";
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
    resolver: yupResolver(ForgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<IForgotPasswordInput> = async (data) => {
    console.log(data);
    try {
      setIsLoading(true);
      await apiClient.post("/identity/forgetPassword", data);
      Toast.show({
        type: "info",
        text1: " Code sent successfully!",
        text2: "Check your email to reset your password",
        position: "bottom",
      });
      router.replace({
        pathname: "/Otp",
        params: { source: "forgotPassword", email: data.email },
      });
    } catch (error) {
      CustomErrorToast(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View>
      <AuthHeader title="Forgot Password" />
      <View className="mx-auto relative items-center justify-center">
        <Icon scaleY={1.15} />
        <Lock
          style={{
            position: "absolute",
          }}
        />
      </View>
      <View className="flex-1 w-[80%] mx-auto">
        <View className="gap-y-5">
          <View>
            <View className="mb-6 w-[120%] -left-[10%]">
              <Text className="color-secondary-foreground font-semibold text-center mt-4">
                Enter your email to receive a verification code
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
            {errors.email && <CustomMsgError msg={errors.email.message} />}
          </View>
          <View style={{ width: "100%" }}>
            <PrimaryButton
              onPress={handleSubmit(onSubmit)}
              width="w-full"
              loading={isLoading}
              textLoading="Sending"
            >
              <CustomText className="color-secondary">Send Code</CustomText>
            </PrimaryButton>
            <PrimaryButton
              onPress={() => router.back()}
              width="w-full"
              borderColor="border-primary"
              bgColor="bg-transparent"
            >
              <CustomText className="color-primary">Back</CustomText>
            </PrimaryButton>
          </View>
        </View>
      </View>
    </View>
  );
}
