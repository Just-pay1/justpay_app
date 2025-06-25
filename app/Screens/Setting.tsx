import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import CustomInput from "@/components/ui/CustomInput";
import * as SecureStore from "expo-secure-store";
import CustomMsgError from "@/components/ui/CustomMsgError";
import { Controller, useForm } from "react-hook-form";
import { TEditInfoForm, editInfoSchema } from "@/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiClient } from "@/config/axios.config";
import Toast from "react-native-toast-message";
import { EDIT_INFO_FORM } from "@/data";
import CustomErrorToast from "@/components/ui/CustomErrorToast";
import { useRouter } from "expo-router";
type RootStackParamList = {
  Setting: undefined;
  Otp: undefined;
};
type SettingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Setting"
>;
const SettingScreen = () => {
  const router = useRouter();
  const user = JSON.parse(SecureStore.getItem("user") || "{}");
  const navigation = useNavigation<SettingScreenNavigationProp>();
  const [editingField, setEditingField] = useState<keyof TEditInfoForm | null>(
    null
  );
  const [loading, setLoading] = useState<keyof TEditInfoForm | null>(null);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const {
    control,
    formState: { errors },
    trigger,
    getValues,
    resetField,
  } = useForm<TEditInfoForm>({
    defaultValues: {
      email: user.email,
      name: user.name,
      phone: user.phone,
    },
    resolver: yupResolver(editInfoSchema),
    mode: "onSubmit",
  });

  const handleUpdate = async (fieldName: keyof TEditInfoForm) => {
    const isValid = await trigger(fieldName);
    if (!isValid) return;
    const value = getValues(fieldName);
    setLoading(fieldName);
    try {
      if (fieldName === "email") {
        const { status, data } = await apiClient.put("/identity/edit_info", {
          email: value,
        });
        console.log(status);
        if (status === 200) {
          router.replace({
            pathname: "/Otp",
            params: {
              email: value,
              source: "setting",
              verificationId: data.verificationId,
            },
          });
          Toast.show({
            type: "info",
            text1: "Success",
            text2: `${data.message}`,
            position: "bottom",
          });
        }
      } else {
        await apiClient.put("/identity/edit_info", { [fieldName]: value });
        await SecureStore.setItemAsync(
          "user",
          JSON.stringify({ ...user, [fieldName]: value })
        );
        Toast.show({
          type: "success",
          text1: "Success",
          text2: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} updated successfully.`,
          position: "bottom",
        });
      }
    } catch (error: any) {
      CustomErrorToast(error);
    } finally {
      setLoading(null);
      setEditingField(null);
    }
  };

  const handleCancel = (fieldName: keyof TEditInfoForm) => {
    resetField(fieldName);
    setEditingField(null);
  };

  const startEditing = (fieldName: keyof TEditInfoForm) => {
    if (editingField && editingField !== fieldName) {
      handleCancel(editingField);
    }
    setEditingField(fieldName);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F7F7F7] px-5">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-center py-5">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="#2c7075" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-[#2c7075]">Setting</Text>
          <View className="w-6" />
        </View>

        <View className="mb-5">
          <Text className="text-lg font-semibold mb-2.5 text-primary-foreground">
            Account Information
          </Text>
          {EDIT_INFO_FORM.map((field) => (
            <React.Fragment key={field.name}>
              <View className="flex-row justify-between items-center py-2.5">
                <View className="flex-1 pr-2">
                  <Text className="text-sm text-muted">
                    {field.placeholder}
                  </Text>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        className="text-base text-primary-foreground p-0 rounded-md"
                        editable={editingField === field.name}
                      />
                    )}
                    name={field.name as keyof TEditInfoForm}
                  />
                  {errors[field.name as keyof TEditInfoForm] && (
                    <CustomMsgError
                      msg={errors[field.name as keyof TEditInfoForm]?.message}
                    />
                  )}
                </View>
                <View className="flex-row items-center justify-center">
                  {loading === field.name ? (
                    <ActivityIndicator color="#2c7075" />
                  ) : editingField === field.name ? (
                    <>
                      <TouchableOpacity
                        onPress={() =>
                          handleCancel(field.name as keyof TEditInfoForm)
                        }
                        className="p-1"
                      >
                        <Feather name="x" size={25} color="red" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          handleUpdate(field.name as keyof TEditInfoForm)
                        }
                        className="p-1 mr-1"
                      >
                        <Feather name="check" size={25} color="green" />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        startEditing(field.name as keyof TEditInfoForm)
                      }
                      className="p-1"
                    >
                      <Feather name="edit-2" size={23} color="#444444" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              <View className="h-[1px] bg-[#EAEAEA] my-1.5" />
            </React.Fragment>
          ))}
        </View>

        <View className="mb-5">
          <Text className="text-lg font-bold mb-2.5 text-[#333]">
            Allow Notifications
          </Text>
          <View className="flex-row justify-between items-center py-2.5">
            <Text className="text-base text-[#333]">Email Notifications</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#2c7075" }}
              thumbColor={emailNotifications ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                setEmailNotifications((previousState) => !previousState)
              }
              value={emailNotifications}
            />
          </View>
          <View className="flex-row justify-between items-center py-2.5">
            <Text className="text-base text-[#333]">SMS Alerts</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#2c7075" }}
              thumbColor={smsAlerts ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                setSmsAlerts((previousState) => !previousState)
              }
              value={smsAlerts}
            />
          </View>
          <View className="flex-row justify-between items-center py-2.5">
            <Text className="text-base text-[#333]">Push Notifications</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#2c7075" }}
              thumbColor={pushNotifications ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                setPushNotifications((previousState) => !previousState)
              }
              value={pushNotifications}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingScreen;
