import { Text, View } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { requirements, TFormInput } from "@/validation";
import CustomInput from "@/components/ui/CustomInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { userRegisterSchema } from "@/validation";
import { REGISTER_FORM } from "@/data";
import { useState } from "react";
import PrimaryButton from "@/components/ui/Custombutton";
import { apiClient } from "@/config/axios.config";
import { storeTokens } from "@/config/auth";
import { Link, router } from "expo-router";
import { useAppDispatch } from "@/store/store";
import { setCredentials } from "@/store/authSlice";
import AuthHeader from "@/components/auth/AuthHeader";
import CustomText from "@/components/ui/CustomText";
import Toast from "react-native-toast-message";
import CustomErrorToast from "@/components/ui/CustomErrorToast";
import axios from "axios";
import CustomMsgError from "@/components/ui/CustomMsgError";

export default function Signup() {
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormInput>({
    resolver: yupResolver(userRegisterSchema),
  });
  const onSubmit: SubmitHandler<TFormInput> = async (dataa) => {
    try {
      const onlyDataRequired = {
        name: dataa.name,
        email: dataa.email,
        password: dataa.password,
        phone: dataa.phone,
      };
      setIsLoading(true);
      const { data } = await apiClient.post(
        "/identity/register",
        onlyDataRequired
      );
      const { accessToken, refreshToken, user } = data;
      dispatch(setCredentials({ accessToken, user }));
      await storeTokens(user, user.id, accessToken, refreshToken);
      Toast.show({
        type: "info",
        text1: `check your email!`,
        position: "bottom",
      });
      router.replace({
        pathname: "/Otp",
        params: { source: "register" },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.request);
      }
      CustomErrorToast(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderPasswordRequirements = () => (
    <View>
      {requirements.map((req, index) => (
        <View key={index} className="flex-row items-center ml-2">
          <View
            className={` w-2 h-2 rounded-full mr-1 ${
              req.test(password) ? "bg-primary" : "bg-muted"
            }`}
          />
          <Text
            className={`${
              index !== requirements.length - 1 ? "mb-1" : "mb-0"
            } ${req.test(password) ? "text-primary" : "text-muted"}`}
          >
            {req.text}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderRegisterForm = REGISTER_FORM.map(
    ({ name, placeholder, type }, idx) => (
      <View key={idx}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              placeholder={placeholder}
              onBlur={onBlur}
              onChangeText={(text) => {
                onChange(text);
                if (name === "password") {
                  setPassword(text);
                }
              }}
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
      <AuthHeader title="sign up" />
      <View className="flex-1">
        <View className="gap-y-5 w-[80%] mx-auto">
          {renderRegisterForm}
          {renderPasswordRequirements()}
          <View className="px-4">
            <PrimaryButton
              onPress={handleSubmit(onSubmit)}
              width="w-full"
              loading={isLoading}
              styled={{ marginTop: 0 }}
            >
              <CustomText className="color-secondary">Sign up</CustomText>
            </PrimaryButton>
            <CustomText className="color-primary-foreground p-0">
              Already have an account?
              <Link href={"/Signin"} className="color-primary">
                {" "}
                Log in
              </Link>
            </CustomText>
          </View>
        </View>
      </View>
    </View>
  );
}
