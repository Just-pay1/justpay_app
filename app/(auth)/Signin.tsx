import { View } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import CustomInput from "@/components/ui/CustomInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { TLoginForm, userLoginSchema } from "@/validation";
import { LOGIN_FORM } from "@/data";
import PrimaryButton from "@/components/ui/Custombutton";
import { apiClient } from "@/config/axios.config";
import { storeStatus, storeTokens } from "@/config/auth";
import { Link, router } from "expo-router";
import { useAppDispatch } from "@/store/store";
import { setCredentials, setLoggedInStatus } from "@/store/authSlice";
import AuthHeader from "@/components/auth/AuthHeader";
import Toast from "react-native-toast-message";
import { useState } from "react";
import CustomText from "@/components/ui/CustomText";
import CustomErrorToast from "@/components/ui/CustomErrorToast";
import CustomMsgError from "@/components/ui/CustomMsgError";
export default function Signin() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginForm>({
    resolver: yupResolver(userLoginSchema),
  });

  const onSubmit: SubmitHandler<TLoginForm> = async (dataa) => {
    try {
      setIsLoading(true);
      const { data } = await apiClient.post("/identity/login", dataa);
      const { accessToken, refreshToken, user } = data;
      await storeTokens(user, user.id, accessToken, refreshToken);
      await storeStatus("true");
      dispatch(setCredentials({ accessToken, user }));
      dispatch(setLoggedInStatus(true));
      Toast.show({
        type: "success",
        text1: `Login successfully!`,
        position: "bottom",
      });
      router.dismissAll();
      router.replace("/");
    } catch (error) {
      CustomErrorToast(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderRegisterForm = LOGIN_FORM.map(
    ({ name, placeholder, type }, idx) => (
      <View key={idx}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              placeholder={placeholder}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={type === "password"}
            />
          )}
          name={name}
        />
        {errors[name] && <CustomMsgError msg={errors[name].message} />}
      </View>
    )
  );

  return (
    <View>
      <AuthHeader title="sign in" />
      <View className="flex-1">
        <View className="gap-y-5 w-[80%] mx-auto">
          {renderRegisterForm}
          <View className="px-4">
            <Link
              href={"/ForgotPassword"}
              className="color-primary font-RobotoSlabSemi text-sm text-right pt-0 mt-0"
              replace
            >
              Forget Password?
            </Link>
            <PrimaryButton
              onPress={handleSubmit(onSubmit)}
              width="w-full"
              loading={isLoading}
            >
              <CustomText className="color-secondary">log in</CustomText>
            </PrimaryButton>
            <CustomText className="color-primary-foreground p-0">
              doesn't have an account?
              <Link href={"/Signup"} className="color-primary">
                {" "}
                Sign Up
              </Link>
            </CustomText>
          </View>
        </View>
      </View>
    </View>
  );
}
