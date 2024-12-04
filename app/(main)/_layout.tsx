import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
        contentStyle: {
          backgroundColor: "#f2f2f2",
        },
      }}
    >
      <Stack.Screen name="home" />
    </Stack>
  );
}
