import { Stack } from "expo-router";

export default function HomeStackScreen() {
  return (
    <Stack
      initialRouteName="cart"
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
