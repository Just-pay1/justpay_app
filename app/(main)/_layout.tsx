import { Drawer } from "expo-router/drawer";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch } from "@/store/store";
import { logoutThunk } from "@/store/authSlice";
import { useRouter } from "expo-router";

// Define the types for props
function CustomDrawerContent(props: DrawerContentComponentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // log out
  const handleLogout = async () => {
    await dispatch(logoutThunk());
    router.replace("/(auth)/Signin");
  };

  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <View style={styles.userContainer}>
        <Text style={styles.userName}>UserName</Text>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => props.navigation.navigate("drawer/profile")}>
          <Ionicons name="person" size={24} color="#2c7075" />
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => props.navigation.navigate("drawer/setting")}>
          <Ionicons name="settings" size={24} color="#2c7075" />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => props.navigation.navigate("drawer/addFingerPrint")}>
          <Ionicons name="finger-print" size={24} color="#2c7075" />
          <Text style={styles.menuText}>Add Fingerprint</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => props.navigation.navigate("drawer/policy")}>
          <Ionicons name="document-text" size={24} color="#2c7075" />
          <Text style={styles.menuText}>Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => props.navigation.navigate("drawer/help")}>
          <Ionicons name="help-circle" size={24} color="#2c7075" />
          <Text style={styles.menuText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => props.navigation.navigate("drawer/about")}>
          <Ionicons name="information-circle" size={24} color="#2c7075" />
          <Text style={styles.menuText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuItem, { marginTop: "auto", borderBottomWidth: 0 }]}
          onPress={handleLogout}>
          <Ionicons name="log-out" size={24} color="#2c7075" />
          <Text style={[styles.menuText, { color: "gray" }]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

export default function RootLayout(): JSX.Element {
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="home" // default screen
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="drawer/profile"
        options={{
          title: "Profile",
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          drawerLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#2c7075" : "gray",
                fontWeight: focused ? "bold" : "normal",
              }}>
              Profile
            </Text>
          ),
        }}
      />
      <Drawer.Screen
        name="drawer/setting"
        options={{
          title: "Setting",
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
          drawerLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#2c7075" : "gray",
                fontWeight: focused ? "bold" : "normal",
              }}>
              Setting
            </Text>
          ),
        }}
      />
      <Drawer.Screen
        name="drawer/addFingerPrint"
        options={{
          title: "AddFingerPrint",
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="finger-print" size={size} color={color} />
          ),
          drawerLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#2c7075" : "gray",
                fontWeight: focused ? "bold" : "normal",
              }}>
              Add Fingerprint
            </Text>
          ),
        }}
      />
      <Drawer.Screen
        name="drawer/policy"
        options={{
          title: "Policy",
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
          drawerLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#2c7075" : "gray",
                fontWeight: focused ? "bold" : "normal",
              }}>
              Policy
            </Text>
          ),
        }}
      />
      <Drawer.Screen
        name="drawer/help"
        options={{
          title: "Help",
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="help-circle" size={size} color={color} />
          ),
          drawerLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#2c7075" : "gray",
                fontWeight: focused ? "bold" : "normal",
              }}>
              Help
            </Text>
          ),
        }}
      />
      <Drawer.Screen
        name="drawer/about"
        options={{
          title: "About",
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="information-circle" size={size} color={color} />
          ),
          drawerLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#2c7075" : "gray",
                fontWeight: focused ? "bold" : "normal",
              }}>
              About
            </Text>
          ),
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  userContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
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
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
    color: "gray",
    fontWeight: "bold",
  },
});
