import { Drawer } from "expo-router/drawer";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
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
  { name: "Profile", route: "drawer/profile", icon: "person" },
  { name: "Settings", route: "drawer/setting", icon: "settings" },
  {
    name: "Add Fingerprint",
    route: "drawer/addFingerPrint",
    icon: "finger-print",
  },
  { name: "Policy", route: "drawer/policy", icon: "document-text" },
  { name: "Help", route: "drawer/help", icon: "help-circle" },
  { name: "About", route: "drawer/about", icon: "information-circle" },
];

function CustomDrawerContent(props: DrawerContentComponentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // log out
  const handleLogout = async () => {
    await dispatch(logoutThunk());
    router.replace("/(auth)/Signin");
  };

  const { width } = Dimensions.get("window");

  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <View style={styles.userContainer}>
        <Text style={styles.userName}>UserName</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.route}
            style={styles.menuItem}
            onPress={() => props.navigation.navigate(item.route)}>
            <Ionicons name={item.icon} size={24} color="#2c7075" />
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[styles.menuItem, { marginTop: "auto", borderBottomWidth: 0 }]}
          onPress={handleLogout}>
          <Ionicons name="log-out" size={24} color="#2c7075" />
          <Text style={[styles.menuText, { color: "#444444" }]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#444444",
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#444444",
    fontWeight: "black",
  },
});
