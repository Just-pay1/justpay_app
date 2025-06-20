import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import CustomInput from "@/components/ui/CustomInput";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import CustomText from "@/components/ui/CustomText";
import ServicesSection from "@/components/services/ServicesSection";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ChatVector from "@/assets/svg/ChatVector.svg";

const Home = () => {
  const router = useRouter();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}>
            <Image
              source={require("@/assets/images/1924a99473c91bfdac585c9cc9c2bc58.png")}
              style={{ width: 40, height: 40, marginRight: 2, marginLeft: 15 }}
            />
            <View>
              <Text className="p-0 color-primary-foreground font-bold text-left  ml-4 text-lg">
                {" "}
                Hi{" "}
              </Text>
              <Text className="p-0 color-primary-foreground font-bold text-left  ml-4 text-lg">
                {" "}
                WelcomeBack!
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f0f0f0",
              marginTop: 30,
            }}>
            <CustomInput
              placeholder="Search"
              style={{
                width: "90%",
                height: 40,
                borderColor: "#9d9a9a",
                borderRadius: 10,
                borderWidth: 1,
                paddingHorizontal: 10,
              }}
            />
          </View>
          <View style={{ marginTop: 30 }}>
            <ServicesSection />
            {/* <Services />*/}
          </View>
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => router.push("/Chat/chatbot")}>
            <ChatVector width={40} height={40} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 70,
    right: 20,
    backgroundColor: "#2c7075",
    width: 70,
    height: 70,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default Home;
