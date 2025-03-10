import { View, ScrollView } from "react-native";
import PrimaryButton from "@/components/ui/Custombutton";
import Icon from "@/assets/svg/Otpicon.svg";
import Bag from "@/assets/svg/wallet.svg";
import AuthHeader from "@/components/auth/AuthHeader";
import CustomText from "@/components/ui/CustomText";
import { useLayoutEffect, useState } from "react";
import { apiClient } from "@/config/axios.config";
import { router } from "expo-router";
import { ActivityIndicator } from "react-native";
import CustomErrorToast from "@/components/ui/CustomErrorToast";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "@/components/ui/CustomInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserNameSchema } from "@/validation";
import { setItemAsync } from "expo-secure-store";
import CustomMsgError from "@/components/ui/CustomMsgError";
interface IUserName {
  username: string;
}
export default function UserNameInfo() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
    setError,
  } = useForm<IUserName>({
    resolver: yupResolver(UserNameSchema),
    mode: "onChange",
  });
  const username = watch("username");
  console.log(isSubmitting);
  useLayoutEffect(() => {
    const onChangeHandler = async () => {
      try {
        setIsLoading(true);
        const { data } = await apiClient.post(
          "/walletConfig/checkUsernameAvailability",
          { username }
        );
        if (!data.available) {
          setError("username", {
            type: "manual",
            message: "This username is already taken.",
          });
        }
      } catch (error) {
        CustomErrorToast(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (username && !errors.username) {
      console.log(username);
      onChangeHandler();
    }
  }, [username, errors.username]);

  const onsubmitHandler = handleSubmit(async (dataa) => {
    try {
      setIsLoading(true);
      const { data } = await apiClient.post("/walletConfig/username", {
        username: dataa.username,
      });
      await setItemAsync("isCompletedInfo", "pincode");
      router.dismissTo("/");
    } catch (error) {
      CustomErrorToast(error);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <ScrollView>
      <AuthHeader title="Let's Set Up Your Wallet!" />
      <View className="mx-auto relative items-center justify-center">
        <Icon scaleY={1.15} />
        <Bag
          style={{
            position: "absolute",
          }}
        />
      </View>
      <View className="mx-auto my-4 w-[80%]">
        <CustomText className="text-[12px] text-primary-foreground w-[120%] -left-[10%]">
          Secure, Fast, and Easy - Create Your JustPay Wallet!
        </CustomText>
        <View className="relative">
          <Controller
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <CustomInput
                placeholder="Username"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="default"
              />
            )}
            name="username"
          />
          {errors.username && <CustomMsgError msg={errors.username.message} />}
          {isLoading && !isSubmitting && (
            <ActivityIndicator
              size="small"
              color="#444444"
              className="absolute right-3 top-1/2 -translate-y-1/2"
            />
          )}
        </View>
        <PrimaryButton
          bgColor="bg-primary"
          disabled={isLoading || !!errors.username || !username}
          loading={isSubmitting}
          onPress={onsubmitHandler}
          width="w-full"
        >
          <CustomText className="color-secondary">continue</CustomText>
        </PrimaryButton>
      </View>
    </ScrollView>
  );
}
