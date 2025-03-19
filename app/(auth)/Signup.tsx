import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { requirements } from "@/validation";
import CustomInput from "@/components/ui/CustomInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { userRegisterSchema } from "@/validation";
import { REGISTER_FORM } from "@/data";
import { useState } from "react";
import PrimaryButton from "@/components/ui/Custombutton";
import { apiClient } from "@/config/axios.config";
import { storeTokens } from "@/config/auth";
import { Link, router } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setCredentials } from "@/store/authSlice";
import AuthHeader from "@/components/auth/AuthHeader";
import CustomText from "@/components/ui/CustomText";
import Toast from "react-native-toast-message";
import axios from "axios";

interface IFormInput {
  name: string;
  password: string;
  email: string;
  phone: string;
}

export default function Signup() {
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(userRegisterSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (dataa) => {
    try {
      setIsLoading(true);
      const { data } = await apiClient.post("/register", dataa);
      const { accessToken, refreshToken, user } = data;
      dispatch(setCredentials({ accessToken, user }));
      await storeTokens(user, user.id, accessToken, refreshToken);
      // <Redirect href="/(main)/home" />;
      Toast.show({
        type: "info",
        text1: `check your email!`,
        position: "bottom",
      });
      router.replace("/Otp");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorMessage = error.response.data.error || "Login failed";
          Toast.show({
            type: "error",
            text1: errorMessage,
            position: "bottom",
          });
        }
      }
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
            } ${req.test(password) ? "text-primary" : "text-muted"}`}>
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
                if (type === "password") {
                  setPassword(text);
                }
              }}
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
          <AuthHeader title="sign up" />
          <View className="flex-1">
            <View className="gap-y-5 w-[80%] mx-auto">
              {renderRegisterForm}
              {renderPasswordRequirements()}
              <View className="px-4">
                <PrimaryButton
                  onPress={handleSubmit(onSubmit)}
                  width="w-full"
                  disabled={isLoading}
                  styled={{ marginTop: 0 }}>
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
                        "Sign up"
                      )}
                    </CustomText>
                  </View>
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
