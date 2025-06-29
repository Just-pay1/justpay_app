import { Drawer } from "expo-router/drawer";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch } from "@/store/store";
import { logoutThunk } from "@/store/authSlice";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

interface MenuItem {
  name: string;
  route: string; // as a prop
  icon: keyof typeof Ionicons.glyphMap;
}

const menuItems: MenuItem[] = [
  { name: "Settings", route: "drawer/setting", icon: "settings" },
  { name: "Policy", route: "drawer/policy", icon: "document-text" },
  { name: "Help", route: "drawer/help", icon: "help-circle" },
  { name: "About", route: "drawer/about", icon: "information-circle" },
  { name: "Contact Us", route: "drawer/contactUs", icon: "chatbox-ellipses-outline" },
];

function CustomDrawerContent(props: DrawerContentComponentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    router.replace("/(auth)/Signin");
  };

  return (
    <LinearGradient
      colors={["#d5e6e7", "#ffffff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1">
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <View className="pt-2 pb-2 items-center">
          <Image
            source={require("@/assets/images/1924a99473c91bfdac585c9cc9c2bc58.png")}
            className="w-16 h-16 rounded-full mb-2"
          />
          <Text className="text-[16px] font-semibold color-primary-foreground">
            UserName
          </Text>
        </View>

        {/*card */}
        <View className="bg-white flex-1 rounded-t-[25px] px-5 pt-6 pb-10">
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.route}
              className="flex-row items-center py-5 border-b border-dotted border-[#ccc]"
              onPress={() => props.navigation.navigate(item.route)}>
              <Ionicons name={item.icon} size={22} color="#2c7075" />
              <Text className="ml-4 text-[16px] text-[#2c7075] font-medium">
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            className="flex-row items-center py-5"
            onPress={handleLogout}>
            <Ionicons name="log-out" size={22} color="#2c7075" />
            <Text className="ml-4 text-[16px] color-primary-foreground  font-medium">
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </LinearGradient>
  );
}

export default function RootLayout(): JSX.Element {
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="home" options={{ headerShown: false }} />
      {menuItems.map((item) => (
        <Drawer.Screen
          key={item.route}
          name={item.route}
          options={{
            title: item.name,
            headerShown: false,
            drawerIcon: ({ color, size }) => (
              <Ionicons name={item.icon} size={size} color={color} />
            ),
            drawerLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? "#2c7075" : "gray",
                  fontWeight: focused ? "bold" : "normal",
                }}>
                {item.name}
              </Text>
            ),
          }}
        />
      ))}
    </Drawer>
  );
}
