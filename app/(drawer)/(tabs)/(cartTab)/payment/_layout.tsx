import { Stack } from "expo-router";

export default function HomeStackScreen() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: "slide_from_bottom",
      }}
    />
  );
}
