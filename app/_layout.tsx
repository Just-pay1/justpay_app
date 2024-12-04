import "../global.css";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store, useAppDispatch } from "../store/store";
import { setCredentials, setLoggedInStatus } from "../store/authSlice";
import { ActivityIndicator, View } from "react-native";
import Toast from "react-native-toast-message";
import toastConfig from "@/config/toast";
import { getTokens } from "@/config/auth";

SplashScreen.preventAutoHideAsync();

function NavigationStack() {
  const [dataLoading, setDataLoading] = useState(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const loadDataFromStorage = async () => {
      try {
        // const refreshToken = await SecureStore.getItemAsync("refreshToken");
        const isVerified = await SecureStore.getItemAsync("isVerified");
        if (isVerified) {
          // const accessToken = await SecureStore.getItemAsync("accessToken");
          // const getUser = await SecureStore.getItemAsync("user");
          const { accessToken, user: getUser } = (await getTokens())!;
          const user = JSON.parse(getUser!);
          dispatch(setCredentials({ accessToken, user }));
          dispatch(setLoggedInStatus(true));
        }
      } finally {
        setDataLoading(false);
      }
    };
    loadDataFromStorage();
  }, []);

  if (dataLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={50} color="#2c7075" />
      </View>
    );
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#ffffff",
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(main)" />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    RobotoSlab: require("../assets/fonts/RobotoSlab-VariableFont_wght.ttf"),
    Nunito: require("../assets/fonts/Nunito-VariableFont_wght.ttf"),
    Nunitosemi: require("../assets/fonts/Nunito-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1">
      <StatusBar style="dark" backgroundColor="#ffffff" />
      <Provider store={store}>
        <NavigationStack />
      </Provider>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
}
