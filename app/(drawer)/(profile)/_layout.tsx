import { Stack } from "expo-router";

export default function ProfileStackScreen() {
  return (
    <Stack
      initialRouteName="profile"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: "slide_from_bottom",
      }}
    />
  );
}
