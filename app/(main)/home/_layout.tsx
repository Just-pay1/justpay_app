import AuthHeader from "@/components/auth/AuthHeader";
import { Tabs } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type RootDrawerParamList = {};
export default function HomeLayout() {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <View>
        <AuthHeader
          title={
            <Text style={{ fontSize: 30 }}>
              <Text style={{ color: "#757575" }}>Just</Text>
              <Text style={{ color: "#2c7075" }}>pay</Text>
            </Text>
          }
        />

        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={{ position: "absolute", top: 25, left: 20 }}>
          <Ionicons name="menu" size={30} color="#444444" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            // navigate to
            console.log("!!!!!!!!!!!!!!");
          }}
          style={{ position: "absolute", top: 30, right: 20 }}>
          <Ionicons name="notifications" size={30} color="#444444" />
        </TouchableOpacity>
      </View>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#2c7075",
          tabBarInactiveTintColor: "#808080",
          tabBarStyle: {
            paddingBottom: insets.bottom,
            height: 65,
          },
        }}>
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
          name="history"
          options={{
            headerShown: false,
            title: "History",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="time"
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
