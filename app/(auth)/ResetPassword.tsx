import { View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import CustomInput from "@/components/ui/CustomInput";
import PrimaryButton from "@/components/ui/Custombutton";
import AuthHeader from "@/components/auth/AuthHeader";
import Toast from "react-native-toast-message";
import { useState } from "react";
import { router } from "expo-router";
import CustomText from "@/components/ui/CustomText";
import { resetPasswordSchema } from "@/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { RESET_PASSWORD_FIELDS } from "@/data";
import { apiClient } from "@/config/axios.config";
import Icon from "@/assets/svg/Otpicon.svg";
import Lock from "@/assets/svg/lock.svg";
import { getItemAsync, deleteItemAsync } from "expo-secure-store";
import CustomErrorToast from "@/components/ui/CustomErrorToast";
import CustomMsgError from "@/components/ui/CustomMsgError";
interface IResetPasswordInput {
  newPassword: string;
  confirmedPassword: string;
}
export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPasswordInput>({
    resolver: yupResolver(resetPasswordSchema),
  });
  const onSubmit = async (dataa: IResetPasswordInput) => {
    try {
      const resetToken = await getItemAsync("resetToken");
      console.log(dataa);
      console.log(resetToken);
      setIsLoading(true);
      const { status } = await apiClient.post(
        "/identity/resetPassword",
        dataa,
        {
          headers: {
            Authorization: `Bearer ${resetToken}`,
          },
        }
      );
      if (status === 200) {
        await deleteItemAsync("resetToken");
      }
      Toast.show({
        type: "success",
        text1: "Password Reset Successfully!",
        text2: "You can now log in with your new password",
        position: "bottom",
      });
      router.replace("/Signin");
    } catch (error) {
      CustomErrorToast(error);
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
              <CustomInput
                placeholder={placeholder}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={type === "password"}
              />
            </>
          )}
          name={name}
        />
        {errors[name] && <CustomMsgError msg={errors[name].message} />}
      </View>
    ));
  return (
    <View>
      <AuthHeader title="Reset Password" />
      <View className="mx-auto relative items-center justify-center">
        <Icon />
        <Lock
          style={{
            position: "absolute",
          }}
        />
      </View>
      <View className="flex-1 w-[80%] mx-auto ">
        <View className="gap-y-5">
          <View className="gap-y-4">{renderResetPasswordForm()}</View>
          <View style={{ width: "95%", alignSelf: "center" }}>
            <PrimaryButton
              // onPress={handleSubmit(onSubmit, validateFields)}
              onPress={handleSubmit(onSubmit)}
              width="w-[95%]"
              loading={isLoading}
              textLoading="Resetting"
            >
              <CustomText className="color-secondary ">Confirm</CustomText>
            </PrimaryButton>
            <PrimaryButton
              onPress={() => router.back()}
              width="w-[95%]"
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
