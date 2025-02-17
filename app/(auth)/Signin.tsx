import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import CustomInput from "@/components/ui/CustomInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { userLoginSchema } from "@/validation";
import { LOGIN_FORM } from "@/data";
import PrimaryButton from "@/components/ui/Custombutton";
import { apiClient } from "@/config/axios.config";
import { storeStatus, storeTokens } from "@/config/auth";
import { Link, router } from "expo-router";
import { useAppDispatch } from "@/store/store";
import { setCredentials, setLoggedInStatus } from "@/store/authSlice";
import AuthHeader from "@/components/auth/AuthHeader";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import CustomText from "@/components/ui/CustomText";
interface IFormInput {
  email: string;
  password: string;
}
export default function Signin() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(userLoginSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (dataa) => {
    try {
      setIsLoading(true);
      /*const { data } = await apiClient.post("/login", dataa);
      const { accessToken, refreshToken, user } = data;
      await storeTokens(user, user.id, accessToken, refreshToken);
      await storeStatus("true");
      dispatch(setCredentials({ accessToken, user }));
      dispatch(setLoggedInStatus(true));
      Toast.show({
        type: "success",
        text1: `Login successfully!`,
        position: "bottom",
      });*/
      //router.navigate("/(main)/home");
      router.push("/home");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.message === "Network Error") {
          Toast.show({
            type: "error",
            text1: `connection problem`,
            text2: "Please try again later",
            position: "bottom",
          });
        } else if (error.response) {
          const errorMessage = error.response.data.error || "Login failed";
          Toast.show({
            type: "error",
            text1: errorMessage,
            position: "bottom",
          });
        } else {
          // Handle other types of errors
          Toast.show({
            type: "error",
            text1: "An unexpected error occurred",
            position: "bottom",
          });
        }
      }
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
        {errors[name] && (
          <Text className="color-danger ml-2">*{errors[name].message}</Text>
        )}
      </View>
    )
  );

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
          <AuthHeader title="sign in" />
          <View className="flex-1">
            <View className="gap-y-5 w-[80%] mx-auto">
              {renderRegisterForm}
              <View className="px-4">
                <PrimaryButton
                  onPress={handleSubmit(onSubmit)}
                  width="w-full"
                  disabled={isLoading}>
                  <View className="flex-row items-center justify-center">
                    <CustomText className="color-secondary">
                      {isLoading ? (
                        <View className="flex-row items-center">
                          <CustomText className="p-0 color-secondary">
                            loading{" "}
                          </CustomText>
                          <ActivityIndicator color="white" size={25} />
                        </View>
                      ) : (
                        "log in"
                      )}
                    </CustomText>
                  </View>
                </PrimaryButton>
                <PrimaryButton
                  onPress={handleSubmit(onSubmit)}
                  width="w-full"
                  borderColor="border-primary"
                  bgColor="bg-transparent">
                  <CustomText className="color-primary">
                    login with fingerprint
                  </CustomText>
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
