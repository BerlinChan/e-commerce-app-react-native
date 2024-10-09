import { Stack } from "expo-router";

export default function AuthStack() {
  return (
    <Stack
      initialRouteName="signInSignUp"
      screenOptions={{ headerShown: false }}
    />
  );
}
