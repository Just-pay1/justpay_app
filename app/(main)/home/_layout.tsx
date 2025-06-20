import { Tabs } from "expo-router";
import { View, TouchableOpacity, Keyboard, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import MYicon from "@/assets/svg/icon.svg";
import Logo from "@/assets/svg/justpay_logo.svg";

const { width } = Dimensions.get("window");
const aspectRatio = 173 / 380;
const height = width * aspectRatio;

type RootDrawerParamList = {};
export default function HomeLayout() {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  const insets = useSafeAreaInsets();

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View>
        <View className={`relative h-[110]`}>
          <MYicon width={width} height={height} translateY={-70} />
          <View className=" absolute -translate-y-1/2 top-[40%] flex flex-row justify-center items-center w-full">
            <Logo />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={{ position: "absolute", top: 25, left: 20 }}
        >
          <Ionicons name="menu" size={30} color="#444444" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log("!!")}
          style={{ position: "absolute", top: 30, right: 20 }}
        >
          <Ionicons name="notifications" size={30} color="#444444" />
        </TouchableOpacity>
      </View>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#2c7075",
          tabBarInactiveTintColor: "#808080",
          tabBarHideOnKeyboard: true,
          tabBarStyle: keyboardVisible
            ? { display: "none" }
            : {
                paddingBottom: insets.bottom,
                height: 65,
              },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="home"
                size={30}
                color={focused ? "#2c7075" : "#808080"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="wallet"
          options={{
            headerShown: false,
            title: "Wallet",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="wallet"
                size={30}
                color={focused ? "#2c7075" : "#808080"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="offers"
          options={{
            headerShown: false,
            title: "Offers",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="pricetag"
                size={30}
                color={focused ? "#2c7075" : "#808080"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="person-circle"
                size={30}
                color={focused ? "#2c7075" : "#808080"}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
