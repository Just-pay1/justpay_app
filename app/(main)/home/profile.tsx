import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { getItemAsync } from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";

const Profile = () => {
  const [user, setUser] = useState<any>(null);

  const loadUser = async () => {
    const userData = await getItemAsync("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadUser();
    }, [])
  );

  if (!user) {
    return null;
  }

  return (
    // <ScrollView className="flex-1 bg-white px-6 pt-2 h-screen">
    <ScrollView
      className="flex-1 bg-white px-6 pt-2 h-screen"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <View className="flex-1 mb-4">
        <View className="items-center mb-8 pb-4 ">
          <View className="relative">
            <Image
              source={{
                uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
              }}
              className="w-36 h-36 rounded-full"
            />
            <Ionicons
              name="add-circle"
              size={40}
              color="#2c7075"
              style={{ position: "absolute", bottom: 0, right: 0 }}
            />
          </View>
          <Text className="text-4xl font-semibold mt-2">{user.name}</Text>
          <Text className="text-lg text-primary-foreground">{user.email}</Text>
          <Text className="text-lg text-primary-foreground">{user.phone}</Text>
        </View>

        <View className="flex-row flex-wrap justify-between gap-4">
          <Pressable
            className="w-[47%] bg-primary rounded-xl items-center justify-center py-7"
            onPress={() => router.push("/drawer/Setting")}>
            <Ionicons name="settings-outline" size={35} color="white" />
            <Text className="text-secondary mt-2 text-xl text-center">
              Setting
            </Text>
          </Pressable>

          <Pressable
            className="w-[47%] bg-primary rounded-xl items-center justify-center py-7"
            onPress={() => router.push("/Screens/History")}>
            <Ionicons name="document-text-outline" size={35} color="white" />
            <Text className="text-secondary mt-2 text-xl text-center">
              Transactions
            </Text>
          </Pressable>

          <Pressable className="w-[47%] bg-primary rounded-xl items-center justify-center py-7">
            <Ionicons name="lock-closed-outline" size={35} color="white" />
            <Text className="text-secondary mt-2 text-xl text-center">
              Change Password
            </Text>
          </Pressable>

          <Pressable
            className="w-[47%] bg-primary rounded-xl items-center justify-center py-7"
            onPress={() => router.push("/drawer/help")}>
            <Ionicons name="help-circle-outline" size={35} color="white" />
            <Text className="text-secondary mt-2 text-xl text-center">
              Support Center
            </Text>
          </Pressable>

          {/* <Pressable className="w-[47%] bg-primary rounded-xl items-center justify-start py-7 mt-2">
            <Ionicons name="log-out-outline" size={35} color="white" />
            <Text className="text-secondary mt-2 text-xl text-center">
              Logout
            </Text>
          </Pressable> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
