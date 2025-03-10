import { Slot, Stack } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

export default function AuthLayout() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="min-h-full">
          <Slot />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
