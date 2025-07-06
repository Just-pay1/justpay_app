import { View } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import CustomInput from "@/components/ui/CustomInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordSchema, TChangePasswordForm } from "@/validation";
import PrimaryButton from "@/components/ui/Custombutton";
import { apiClient } from "@/config/axios.config";
import Toast from "react-native-toast-message";
import { useState } from "react";
import AuthHeader from "@/components/auth/AuthHeader";
import CustomText from "@/components/ui/CustomText";
import ChangePasswordErrorToast from "@/components/ui/ChangePasswordErrorToast";
import CustomMsgError from "@/components/ui/CustomMsgError";

export default function ChangePassword() {
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<TChangePasswordForm>({
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit: SubmitHandler<TChangePasswordForm> = async (formData) => {
    try {
      setIsLoading(true);
      await apiClient.put("/identity/changePassword", formData);
      Toast.show({
        type: "success",
        text1: "Password changed successfully!",
        position: "bottom",
      });
    } catch (error) {
      ChangePasswordErrorToast(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <AuthHeader title="Change Password" />
      <View className="flex-1">
        <View className="gap-y-5 w-[80%] mx-auto">

          {/* Old Password */}
          <View>
            <Controller
              control={control}
              name="oldPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  placeholder="Current Password"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.oldPassword && <CustomMsgError msg={errors.oldPassword.message} />}
          </View>

          {/* New Password */}
          <View>
            <Controller
              control={control}
              name="newPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  placeholder="New Password"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.newPassword && <CustomMsgError msg={errors.newPassword.message} />}
          </View>

          {/* Confirmed Password */}
          <View>
            <Controller
              control={control}
              name="confirmedPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  placeholder="Confirm New Password"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.confirmedPassword && <CustomMsgError msg={errors.confirmedPassword.message} />}
          </View>

          <PrimaryButton
            onPress={handleSubmit(onSubmit)}
            width="w-full"
            loading={isLoading}
          >
            <CustomText className="color-secondary">Change Password</CustomText>
          </PrimaryButton>
        </View>
      </View>
    </View>
  );
}
